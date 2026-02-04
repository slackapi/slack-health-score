import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';
import esmock from 'esmock';

describe('score component: code coverage', () => {
  let cov;
  let mockCodecov;
  let mockCore;
  let mockGithub;

  beforeEach(async () => {
    mockCodecov = {
      auth: mock.fn(),
      repos_commits_retrieve: mock.fn(),
    };

    mockCore = {
      debug: mock.fn(),
      error: mock.fn(),
      getInput: mock.fn(),
      info: mock.fn(),
      warning: mock.fn(),
    };

    mockGithub = {
      context: {
        eventName: 'pull_request',
        payload: { after: 'abcd1234' },
        repo: { owner: 'slackapi', repo: 'slack-health-score' },
      },
    };

    cov = await esmock('../../src/score_components/coverage.js', {
      '@api/codecov': { default: mockCodecov },
    });
  });

  it('should export a function', () => {
    assert.equal(typeof cov.default, 'function');
  });

  it('should return 0 if no `codecov_token` input provided', async () => {
    mockCore.getInput.mock.mockImplementation(() => '');
    const res = await cov.default(mockCore, mockGithub);
    assert.equal(res, 0);
  });

  it('should return total number of missed lines from a successful codecov API response', async () => {
    mockCore.getInput.mock.mockImplementation((key) => {
      if (key === 'codecov_token') return 'abcd1234';
      return '';
    });
    mockCodecov.repos_commits_retrieve.mock.mockImplementation(() =>
      Promise.resolve({
        data: {
          totals: {
            misses: 1337,
          },
        },
      }),
    );
    const res = await cov.default(mockCore, mockGithub);
    assert.equal(res, 1337);
  });

  describe('retry, delay and timeout-error behaviour/inputs', () => {
    it('should default to 10 max attempts if invalid codecov_max_attempts provided', async () => {
      mockCore.getInput.mock.mockImplementation((key) => {
        const inputs = {
          codecov_token: 'abcd1234',
          codecov_max_attempts: '-1',
          codecov_retry_delay: '10',
        };
        return inputs[key] ?? '';
      });
      let callCount = 0;
      mockCodecov.repos_commits_retrieve.mock.mockImplementation(() => {
        callCount++;
        if (callCount === 10) {
          return Promise.resolve({ data: { totals: { misses: 42 } } });
        }
        return Promise.resolve({ data: {} });
      });
      const res = await cov.default(mockCore, mockGithub);
      assert.strictEqual(res, 42);
    });

    it('should retry fetching with configured delay', async () => {
      mockCore.getInput.mock.mockImplementation((key) => {
        const inputs = {
          codecov_token: 'abcd1234',
          codecov_max_attempts: '2',
          codecov_retry_delay: '10',
        };
        return inputs[key] ?? '';
      });
      let callCount = 0;
      mockCodecov.repos_commits_retrieve.mock.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({ data: {} });
        }
        return Promise.resolve({ data: { totals: { misses: 42 } } });
      });

      const startTime = performance.now();
      const res = await cov.default(mockCore, mockGithub);
      const endTime = performance.now();
      assert.equal(res, 42);
      assert.equal(mockCodecov.repos_commits_retrieve.mock.callCount(), 2);
      const timeTaken = endTime - startTime;
      assert.ok(
        timeTaken >= 10,
        `Expected at least 10ms delay, got ${timeTaken}ms`,
      );
      assert.ok(
        timeTaken < 100,
        `Expected less than 100ms, got ${timeTaken}ms`,
      );
    });

    it('should retry fetching not exceeding configured attempts', async () => {
      mockCore.getInput.mock.mockImplementation((key) => {
        const inputs = {
          codecov_token: 'abcd1234',
          codecov_max_attempts: '1',
          codecov_retry_delay: '10',
        };
        return inputs[key] ?? '';
      });
      let callCount = 0;
      mockCodecov.repos_commits_retrieve.mock.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({ data: {} });
        }
        return Promise.resolve({ data: { totals: { misses: 42 } } });
      });

      const res = await cov.default(mockCore, mockGithub);
      assert.equal(res, 0);
      assert.equal(mockCodecov.repos_commits_retrieve.mock.callCount(), 1);
      assert.ok(
        mockCore.warning.mock.calls.some((c) =>
          c.arguments[0].includes('Reached maximum attempts'),
        ),
      );
    });

    it('should call actions/core.error if `codecov_treat_timeout_as_error` set to true and `codecov_max_attempts` exceeded', async () => {
      mockCore.getInput.mock.mockImplementation((key) => {
        const inputs = {
          codecov_token: 'abcd1234',
          codecov_max_attempts: '1',
          codecov_retry_delay: '10',
          codecov_treat_timeout_as_error: 'true',
        };
        return inputs[key] ?? '';
      });
      mockCodecov.repos_commits_retrieve.mock.mockImplementation(() =>
        Promise.resolve({ data: {} }),
      );

      await cov.default(mockCore, mockGithub);
      assert.ok(
        mockCore.error.mock.calls.some((c) =>
          c.arguments[0].includes('Reached maximum attempts'),
        ),
      );
    });
  });
});
