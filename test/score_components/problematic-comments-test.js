import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Node.js modules with vi.mock
vi.mock('node:child_process', () => ({
  default: {
    execSync: vi.fn(),
  },
}));

vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}));

// Import the mocked modules and the function under test
import child_process from 'node:child_process';
import fs from 'node:fs';
import grepForProblematicComments from '../../src/score_components/find-problematic-comments.js';

describe('score component: problematic comments', () => {
  const fakeCore = {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export a function', () => {
    expect(grepForProblematicComments).toBeTypeOf('function');
  });

  const commentPattern = '\\s*(//|/\\*|\\*).*\\b(TODO|HACK|FIXME)\\b';

  describe('should handle different inputs', () => {
    it('should throw error in case execSync fails', () => {
      child_process.execSync.mockImplementation(() => {
        throw new Error('test error');
      });
      fs.existsSync.mockReturnValue(false);

      const result = grepForProblematicComments(fakeCore, ['js'], [], []);

      expect(fakeCore.error).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should default to . if includes not provided', () => {
      child_process.execSync.mockReturnValue('');
      fs.existsSync.mockReturnValue(false);

      grepForProblematicComments(fakeCore, ['js'], [], []);

      let expectedFind = 'find .';
      expectedFind += ' \\( -name "*.js" \\) ';
      expectedFind += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;

      expect(child_process.execSync).toHaveBeenCalledWith(expectedFind);
    });

    it('should default to gitignore if excludes not provided', () => {
      child_process.execSync.mockReturnValue('');
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue('node_modules/\n.git/\n');

      grepForProblematicComments(fakeCore, ['js'], [], []);

      expect(fs.existsSync).toHaveBeenCalledWith('.gitignore');
    });

    it('should handle both includes and excludes', () => {
      child_process.execSync.mockReturnValue('');
      fs.existsSync.mockReturnValue(false);

      grepForProblematicComments(fakeCore, ['js'], ['src'], ['test/']);

      let expectedFind = 'find src';
      expectedFind += ' \\( -name "*.js" \\) ';
      expectedFind += ' -not -path "*/test/*" -not -path "*/test"';
      expectedFind += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;

      expect(child_process.execSync).toHaveBeenCalledWith(expectedFind);
    });

    it('should handle both multiples includes, excludes and extensions', () => {
      child_process.execSync.mockReturnValue('');
      fs.existsSync.mockReturnValue(false);

      grepForProblematicComments(
        fakeCore,
        ['js', 'ts'],
        ['src', 'dir'],
        ['test/', 'dist'],
      );

      let expectedFind = 'find src dir';
      expectedFind += ' \\( -name "*.js" -o -name "*.ts" \\) ';
      expectedFind +=
        ' -not -path "*/test/*" -not -path "*/test" -not -path "*/dist"';
      expectedFind += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;

      expect(child_process.execSync).toHaveBeenCalledWith(expectedFind);
    });
  });

  describe('should generate JSON in required format with grep results', () => {
    it('should handle empty grep results', () => {
      child_process.execSync.mockReturnValue('');
      fs.existsSync.mockReturnValue(false);

      const result = grepForProblematicComments(fakeCore, ['js'], ['src'], []);
      expect(result).toEqual([]);
    });

    it('should handle grep results', () => {
      child_process.execSync.mockReturnValue('path:10: // TODO: random stuff');
      fs.existsSync.mockReturnValue(false);

      const result = grepForProblematicComments(fakeCore, ['js'], ['src'], []);
      expect(result).toEqual([
        {
          path: 'path',
          line_no: 10,
          comment: '// TODO: random stuff',
          commentType: 'TODO',
        },
      ]);
    });

    it('should handle multiple grep results', () => {
      child_process.execSync.mockReturnValue(
        'path:10: // TODO: random stuff \n path2:15: // FIXME: random stuff',
      );
      fs.existsSync.mockReturnValue(false);

      const result = grepForProblematicComments(fakeCore, ['js'], ['src'], []);
      expect(result).toEqual([
        {
          path: 'path',
          line_no: 10,
          comment: '// TODO: random stuff',
          commentType: 'TODO',
        },
        {
          path: 'path2',
          line_no: 15,
          comment: '// FIXME: random stuff',
          commentType: 'FIXME',
        },
      ]);
    });

    it('should handle grep results not in the correct format', () => {
      child_process.execSync.mockReturnValue(
        'path:10: // TODO: random stuff \n path2:15: // random things TODO',
      );
      fs.existsSync.mockReturnValue(false);

      const result = grepForProblematicComments(fakeCore, ['js'], ['src'], []);
      expect(result).toEqual([
        {
          path: 'path',
          line_no: 10,
          comment: '// TODO: random stuff',
          commentType: 'TODO',
        },
        {
          path: 'path2',
          line_no: 15,
          comment: '// random things TODO',
          commentType: null,
        },
      ]);
    });

    it('should handle grep results that have types without colons', () => {
      child_process.execSync.mockReturnValue('path:10: // TODO random stuff');
      fs.existsSync.mockReturnValue(false);

      const result = grepForProblematicComments(fakeCore, ['js'], ['src'], []);
      expect(result).toEqual([
        {
          path: 'path',
          line_no: 10,
          comment: '// TODO random stuff',
          commentType: 'TODO',
        },
      ]);
    });

    it('should handle grep results that starts with code', () => {
      child_process.execSync.mockReturnValue(
        'path:10: const result = "hello:world" // TODO: random stuff',
      );
      fs.existsSync.mockReturnValue(false);

      const result = grepForProblematicComments(fakeCore, ['js'], ['src'], []);
      expect(result).toEqual([
        {
          path: 'path',
          line_no: 10,
          comment: '// TODO: random stuff',
          commentType: 'TODO',
        },
      ]);
    });
  });
});
