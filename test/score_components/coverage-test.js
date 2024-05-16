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
  describe('handle maximum attempts checks', () => {
    it('should default to 10 max attempts if invalid max_attempts provided', async () => {
      fakeCore.getInput.withArgs('codecov_token').returns('abcd1234');
      fakeCore.getInput.withArgs('max_attempts').returns('-1');
      fakeCore.getInput.withArgs('retry_delay').returns('10');
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
      fakeCodecov.repos_commits_retrieve.onCall(9).resolves({ data: { totals: { misses: 42 } } });
      const res = await cov(fakeCore, fakeGithub);
      assert.strictEqual(res, 42);
    });
    it('should retry fetching with configured delay', async () => {
      fakeCore.getInput.withArgs('codecov_token').returns('abcd1234');
      fakeCore.getInput.withArgs('max_attempts').returns('2');
      fakeCore.getInput.withArgs('retry_delay').returns('10');

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
      fakeCodecov.repos_commits_retrieve.onFirstCall().resolves({ data: {} });
      fakeCodecov.repos_commits_retrieve.onSecondCall().resolves({ data: { totals: { misses: 42 } } });

      const res = await cov(fakeCore, fakeGithub);
      const startTime = performance.now();
      assert.equal(res, 42);
      assert.equal(fakeCodecov.repos_commits_retrieve.callCount, 2);
      const endTime = performance.now();
      const timeTaken = endTime - startTime;
      assert.isBelow(timeTaken, 30);
    });
    it('should retry fetching not exceeding configured attempts', async () => {
      fakeCore.getInput.withArgs('codecov_token').returns('abcd1234');
      fakeCore.getInput.withArgs('max_attempts').returns('1');
      fakeCore.getInput.withArgs('retry_delay').returns('10');

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
      fakeCodecov.repos_commits_retrieve.onFirstCall().resolves({ data: {} });
      fakeCodecov.repos_commits_retrieve.onSecondCall().resolves({ data: { totals: { misses: 42 } } });

      const res = await cov(fakeCore, fakeGithub);
      assert.equal(res, 0);
      assert.equal(fakeCodecov.repos_commits_retrieve.callCount, 1);
    });
    it('should throw error only if input by user', async () => {
      fakeCore.getInput.withArgs('codecov_token').returns('abcd1234');
      fakeCore.getInput.withArgs('max_attempts').returns('1');
      fakeCore.getInput.withArgs('retry_delay').returns('10');
      fakeCore.getInput.withArgs('treat_timeout_as_error').returns('true');

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
      fakeCodecov.repos_commits_retrieve.onFirstCall().resolves({ data: {} });
      fakeCodecov.repos_commits_retrieve.onSecondCall().resolves({ data: { totals: { misses: 42 } } });
      await cov(fakeCore, fakeGithub);
      sinon.assert.calledWith(fakeCore.error, 'Reached maximum attempts (1) without retrieving coverage data.');
      sinon.reset();
      fakeCore.getInput.withArgs('codecov_token').returns('abcd1234');
      fakeCore.getInput.withArgs('max_attempts').returns('1');
      fakeCore.getInput.withArgs('retry_delay').returns('10');
      fakeCore.getInput.withArgs('treat_timeout_as_error').returns('false');

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
      fakeCodecov.repos_commits_retrieve.onFirstCall().resolves({ data: {} });
      fakeCodecov.repos_commits_retrieve.onSecondCall().resolves({ data: { totals: { misses: 42 } } });

      await cov(fakeCore, fakeGithub);
      sinon.assert.calledWith(fakeCore.warning, 'Reached maximum attempts (1) without retrieving coverage data.');
    });
  });
});
