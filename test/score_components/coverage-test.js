import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the codecov and get-sha modules
vi.mock('@api/codecov', () => ({
  default: {
    auth: vi.fn(),
    repos_commits_retrieve: vi.fn(),
  },
}));

vi.mock('../../src/get-sha.js', () => ({
  default: vi.fn(),
}));

// Import mocked modules and the function under test
import codecov from '@api/codecov';
import getSHA from '../../src/get-sha.js';
import cov from '../../src/score_components/coverage.js';

describe('score component: code coverage', () => {
  let fakeCore;
  let fakeGithub;
  let fakeContext;

  beforeEach(() => {
    vi.clearAllMocks();

    fakeCore = {
      getInput: vi.fn(),
      info: vi.fn(),
      debug: vi.fn(),
      warning: vi.fn(),
      error: vi.fn(),
    };

    fakeGithub = {};

    fakeContext = {
      eventName: 'pull_request',
      payload: {
        after: 'abcd1234',
      },
      repo: {
        owner: 'slackapi',
        repo: 'slack-health-score',
      },
    };

    getSHA.mockReturnValue('abcd1234');
  });

  it('should export a function', () => {
    expect(cov).toBeTypeOf('function');
  });

  it('should return 0 if no `codecov_token` input provided', async () => {
    fakeCore.getInput.mockImplementation((input) => {
      if (input === 'codecov_token') return null;
      return undefined;
    });

    const res = await cov(fakeContext, fakeCore, fakeGithub);
    expect(res).toBe(0);
  });

  it('should return total number of missed lines from a successful codecov API response', async () => {
    fakeCore.getInput.mockImplementation((input) => {
      if (input === 'codecov_token') return 'abcd1234';
      if (input === 'codecov_max_attempts') return '10';
      if (input === 'codecov_retry_delay') return '10000';
      if (input === 'codecov_treat_timeout_as_error') return 'false';
      return undefined;
    });

    codecov.repos_commits_retrieve.mockResolvedValue({
      data: {
        totals: {
          misses: 1337,
        },
      },
    });

    const res = await cov(fakeContext, fakeCore, fakeGithub);
    expect(res).toBe(1337);
  });

  describe('retry, delay and timeout-error behaviour/inputs', () => {
    it('should default to 10 max attempts if invalid codecov_max_attempts provided', async () => {
      fakeCore.getInput.mockImplementation((input) => {
        if (input === 'codecov_token') return 'abcd1234';
        if (input === 'codecov_max_attempts') return '-1';
        if (input === 'codecov_retry_delay') return '10';
        if (input === 'codecov_treat_timeout_as_error') return 'false';
        return undefined;
      });

      // Mock to resolve on the 10th call (index 9)
      codecov.repos_commits_retrieve
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValue({ data: { totals: { misses: 42 } } });

      const res = await cov(fakeContext, fakeCore, fakeGithub);
      expect(res).toBe(42);
    });

    it('should retry fetching with configured delay', async () => {
      fakeCore.getInput.mockImplementation((input) => {
        if (input === 'codecov_token') return 'abcd1234';
        if (input === 'codecov_max_attempts') return '2';
        if (input === 'codecov_retry_delay') return '12';
        if (input === 'codecov_treat_timeout_as_error') return 'false';
        return undefined;
      });

      codecov.repos_commits_retrieve
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValue({ data: { totals: { misses: 42 } } });

      const startTime = performance.now();
      const res = await cov(fakeContext, fakeCore, fakeGithub);
      const endTime = performance.now();

      expect(res).toBe(42);
      expect(codecov.repos_commits_retrieve).toHaveBeenCalledTimes(2);

      const timeTaken = endTime - startTime;
      expect(timeTaken).toBeGreaterThan(10);
      expect(timeTaken).toBeLessThan(30);
    });

    it('should retry fetching not exceeding configured attempts', async () => {
      fakeCore.getInput.mockImplementation((input) => {
        if (input === 'codecov_token') return 'abcd1234';
        if (input === 'codecov_max_attempts') return '1';
        if (input === 'codecov_retry_delay') return '10';
        if (input === 'codecov_treat_timeout_as_error') return 'false';
        return undefined;
      });

      codecov.repos_commits_retrieve.mockResolvedValue({ data: {} });

      const res = await cov(fakeContext, fakeCore, fakeGithub);

      expect(res).toBe(0);
      expect(codecov.repos_commits_retrieve).toHaveBeenCalledTimes(1);
      expect(fakeCore.warning).toHaveBeenCalledWith(
        expect.stringContaining('Reached maximum attempts'),
      );
    });

    it('should call actions/core.error if `codecov_treat_timeout_as_error` set to true and `codecov_max_attempts` exceeded', async () => {
      fakeCore.getInput.mockImplementation((input) => {
        if (input === 'codecov_token') return 'abcd1234';
        if (input === 'codecov_max_attempts') return '1';
        if (input === 'codecov_retry_delay') return '10';
        if (input === 'codecov_treat_timeout_as_error') return 'true';
        return undefined;
      });

      codecov.repos_commits_retrieve.mockResolvedValue({ data: {} });

      await cov(fakeContext, fakeCore, fakeGithub);

      expect(fakeCore.error).toHaveBeenCalledWith(
        expect.stringContaining('Reached maximum attempts'),
      );
    });
  });
});
