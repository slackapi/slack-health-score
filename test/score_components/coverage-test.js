const { assert } = require('chai');
const sinon = require('sinon');
const core = require('@actions/core');
const github = require('@actions/github');
const codecov = require('@api/codecov');
const cov = require('../../src/score_components/coverage');

describe('score component: code coverage', () => {
  const fakeCore = sinon.stub(core);
  const fakeGithub = sinon.stub(github);
  const fakeCodecov = sinon.stub(codecov);
  const originalGithubContext = fakeGithub.context;
  beforeEach(() => {
    sinon.reset();
    fakeCore.info.callsFake(console.log);
    fakeCore.error.callsFake(console.error);
    fakeGithub.context = originalGithubContext;
  });

  it('should export a function', () => {
    assert.isFunction(cov);
  });
  it('should return 0 if no `codecov_token` input provided', async () => {
    fakeCore.getInput.withArgs('codecov_token').returns(null);
    const res = await cov(fakeCore, fakeGithub);
    assert.equal(res, 0);
  });
  it('should return total number of missed lines from codecov API response', async () => {
    fakeCore.getInput.withArgs('codecov_token').returns('abcd1234');
    fakeGithub.context = {
      eventName: 'pull_request',
      payload: {
        after: 'abcd1234',
      },
      repo: {
        owner: 'slackapi',
        repo: 'slack-health-score',
      },
    };
    fakeCodecov.repos_commits_retrieve.resolves({
      data: {
        totals: {
          misses: 1337,
        },
      },
    });
    const res = await cov(fakeCore, fakeGithub);
    assert.equal(res, 1337);
  });
});
