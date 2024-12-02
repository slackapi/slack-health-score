const { assert } = require('chai');
const sinon = require('sinon');
const { fakeCore, fakeGithub, fakeCodecov } = require('../stubs/stubs');
const cov = require('../../src/score_components/coverage');

describe('score component: code coverage', () => {
  const originalGithubContext = fakeGithub.context;
  beforeEach(() => {
    sinon.reset();
    // Uncomment the following to get logging output during testing.
    // fakeCore.info.callsFake(console.log);
    // fakeCore.warning.callsFake(console.warn);
    // fakeCore.error.callsFake(console.error);
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
  it('should return total number of missed lines from a successful codecov API response', async () => {
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
  describe('retry, delay and timeout-error behaviour/inputs', () => {
    it('should default to 10 max attempts if invalid codecov_max_attempts provided', async () => {
      fakeCore.getInput.withArgs('codecov_token').returns('abcd1234');
      fakeCore.getInput.withArgs('codecov_max_attempts').returns('-1');
      fakeCore.getInput.withArgs('codecov_retry_delay').returns('10');
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
      fakeCodecov.repos_commits_retrieve
        .onCall(9)
        .resolves({ data: { totals: { misses: 42 } } });
      const res = await cov(fakeCore, fakeGithub);
      assert.strictEqual(res, 42);
    });
    it('should retry fetching with configured delay', async () => {
      fakeCore.getInput.withArgs('codecov_token').returns('abcd1234');
      fakeCore.getInput.withArgs('codecov_max_attempts').returns('2');
      fakeCore.getInput.withArgs('codecov_retry_delay').returns('10');

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
      fakeCodecov.repos_commits_retrieve
        .onSecondCall()
        .resolves({ data: { totals: { misses: 42 } } });

      const startTime = performance.now();
      const res = await cov(fakeCore, fakeGithub);
      const endTime = performance.now();
      assert.equal(res, 42);
      assert.equal(fakeCodecov.repos_commits_retrieve.callCount, 2);
      const timeTaken = endTime - startTime;
      assert.isAbove(timeTaken, 10);
      assert.isBelow(timeTaken, 30);
    });
    it('should retry fetching not exceeding configured attempts', async () => {
      fakeCore.getInput.withArgs('codecov_token').returns('abcd1234');
      fakeCore.getInput.withArgs('codecov_max_attempts').returns('1');
      fakeCore.getInput.withArgs('codecov_retry_delay').returns('10');

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
      fakeCodecov.repos_commits_retrieve
        .onSecondCall()
        .resolves({ data: { totals: { misses: 42 } } });

      const res = await cov(fakeCore, fakeGithub);
      assert.equal(res, 0);
      assert.equal(fakeCodecov.repos_commits_retrieve.callCount, 1);
      assert(
        fakeCore.warning.calledWithMatch(
          sinon.match('Reached maximum attempts'),
        ),
      );
    });
    it('should call actions/core.error if `codecov_treat_timeout_as_error` set to true and `codecov_max_attempts` exceeded', async () => {
      fakeCore.getInput.withArgs('codecov_token').returns('abcd1234');
      fakeCore.getInput.withArgs('codecov_max_attempts').returns('1');
      fakeCore.getInput.withArgs('codecov_retry_delay').returns('10');
      fakeCore.getInput
        .withArgs('codecov_treat_timeout_as_error')
        .returns('true');

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
      fakeCodecov.repos_commits_retrieve
        .onSecondCall()
        .resolves({ data: { totals: { misses: 42 } } });
      await cov(fakeCore, fakeGithub);
      assert(
        fakeCore.error.calledWith(sinon.match('Reached maximum attempts')),
      );
    });
  });
});
