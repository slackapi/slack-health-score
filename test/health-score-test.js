import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the dependencies first
vi.mock('../src/score_components/find-problematic-comments.js', () => ({
  default: vi.fn(),
}));

vi.mock('../src/score_components/coverage.js', () => ({
  default: vi.fn(),
}));

vi.mock('../src/report.js', () => ({
  default: vi.fn(),
}));

import * as hs from '../src/health-score.js';
import reportStatus from '../src/report.js';
import retrieveCodeCoverage from '../src/score_components/coverage.js';
// Import the mocked modules and the module under test
import findProblematicComments from '../src/score_components/find-problematic-comments.js';

describe('health-score', () => {
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

    fakeGithub = {
      rest: {
        checks: {
          create: vi.fn(),
        },
      },
    };

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
  });

  it('should have a compile function', () => {
    expect(hs.compile).toBeTypeOf('function');
  });

  it('should have a grep function', () => {
    expect(hs.grep).toBeTypeOf('function');
  });

  it('should have a coverage function', () => {
    expect(hs.coverage).toBeTypeOf('function');
  });

  it('should have a report function', () => {
    expect(hs.report).toBeTypeOf('function');
  });

  describe('check: inputs', () => {
    describe('should call actions/core.error for invalid input', () => {
      it('should check for empty includes', async () => {
        fakeCore.getInput.mockImplementation((input) => {
          if (input === 'extension') return 'js';
          if (input === 'include') return null;
          if (input === 'exclude') return 'test';
          return undefined;
        });

        findProblematicComments.mockReturnValue([]);
        retrieveCodeCoverage.mockResolvedValue(0);

        await hs.compile(fakeContext, fakeCore, fakeGithub);

        expect(fakeCore.warning).toHaveBeenCalledWith(
          expect.stringContaining('Directories to be included not specified'),
        );
      });

      it('should check for invalid extensions', async () => {
        fakeCore.getInput.mockImplementation((input) => {
          if (input === 'extension') return '';
          if (input === 'include') return 'src';
          if (input === 'exclude') return null;
          return undefined;
        });

        await hs.compile(fakeContext, fakeCore, fakeGithub);

        expect(fakeCore.error).toHaveBeenCalledWith(
          expect.stringContaining('Extensions not specified'),
        );
      });
    });

    it('should take single input', async () => {
      fakeCore.getInput.mockImplementation((input) => {
        if (input === 'extension') return 'js';
        if (input === 'include') return 'src';
        if (input === 'exclude') return 'test';
        return undefined;
      });

      findProblematicComments.mockReturnValue(['']);
      retrieveCodeCoverage.mockResolvedValue(0);

      await hs.compile(fakeContext, fakeCore, fakeGithub);

      expect(findProblematicComments).toHaveBeenCalledWith(
        fakeCore,
        ['js'],
        ['src'],
        ['test'],
      );
      expect(retrieveCodeCoverage).toHaveBeenCalledWith(
        fakeContext,
        fakeCore,
        fakeGithub,
      );
    });

    it('should handle inputs as block format', async () => {
      fakeCore.getInput.mockImplementation((input) => {
        if (input === 'extension') return '-js\n- ts';
        if (input === 'include') return '- src\n- lib';
        if (input === 'exclude') return '- test\n- dist';
        return undefined;
      });

      findProblematicComments.mockReturnValue(['']);
      retrieveCodeCoverage.mockResolvedValue(0);

      await hs.compile(fakeContext, fakeCore, fakeGithub);

      expect(findProblematicComments).toHaveBeenCalledWith(
        fakeCore,
        ['js', 'ts'],
        ['src', 'lib'],
        ['test', 'dist'],
      );
      expect(retrieveCodeCoverage).toHaveBeenCalledWith(
        fakeContext,
        fakeCore,
        fakeGithub,
      );
    });

    it('should handle inputs in flow format', async () => {
      fakeCore.getInput.mockImplementation((input) => {
        if (input === 'extension') return "['js', 'ts']";
        if (input === 'include') return "['src', 'lib']";
        if (input === 'exclude') return "['test', 'dist']";
        return undefined;
      });

      findProblematicComments.mockReturnValue(['']);
      retrieveCodeCoverage.mockResolvedValue(0);

      await hs.compile(fakeContext, fakeCore, fakeGithub);

      expect(findProblematicComments).toHaveBeenCalledWith(
        fakeCore,
        ['js', 'ts'],
        ['src', 'lib'],
        ['test', 'dist'],
      );
      expect(retrieveCodeCoverage).toHaveBeenCalledWith(
        fakeContext,
        fakeCore,
        fakeGithub,
      );
    });

    it('should handle combined and unformatted inputs', async () => {
      fakeCore.getInput.mockImplementation((input) => {
        if (input === 'extension') return '[js, ts]';
        if (input === 'include') return ' -       src\n -lib';
        if (input === 'exclude') return '["test", \'dist\']';
        return undefined;
      });

      findProblematicComments.mockReturnValue(['']);
      retrieveCodeCoverage.mockResolvedValue(0);

      await hs.compile(fakeContext, fakeCore, fakeGithub);

      expect(findProblematicComments).toHaveBeenCalledWith(
        fakeCore,
        ['js', 'ts'],
        ['src', 'lib'],
        ['test', 'dist'],
      );
      expect(retrieveCodeCoverage).toHaveBeenCalledWith(
        fakeContext,
        fakeCore,
        fakeGithub,
      );
    });
  });

  describe('check: report', () => {
    it('should handle invalid github token', async () => {
      fakeCore.getInput.mockImplementation((input) => {
        if (input === 'github_token') return null;
        return undefined;
      });

      const score = { comments: [], coverageMisses: 0 };
      const startTime = new Date();

      reportStatus.mockResolvedValue(0);

      const points = await hs.report(
        fakeContext,
        startTime,
        fakeCore,
        fakeGithub,
        score,
      );

      expect(reportStatus).toHaveBeenCalledWith(
        fakeContext,
        startTime,
        fakeCore,
        fakeGithub,
        score,
      );
      expect(points).toBe(0);
    });

    it('should calculate points accurately', async () => {
      fakeCore.getInput.mockImplementation((input) => {
        if (input === 'github_token') return 'test';
        return undefined;
      });

      const score = {
        comments: [
          { path: 'path', line_no: 10, comment: '// TODO: random stuff' },
          { path: 'path2', line_no: 15, comment: '// FIXME: random stuff' },
        ],
        coverageMisses: 5,
      };
      const startTime = new Date();

      reportStatus.mockResolvedValue(-205);

      const points = await hs.report(
        fakeContext,
        startTime,
        fakeCore,
        fakeGithub,
        score,
      );

      expect(points).toBe(-205);
    });
  });
});
