import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';
import esmock from 'esmock';

const commentPattern = '\\s*(//|/\\*|\\*).*\\b(TODO|HACK|FIXME)\\b';

describe('score component: problematic comments', () => {
  let grepForProblematicComments;
  let mockChildProcess;
  let mockFs;
  let mockCore;

  beforeEach(async () => {
    mockChildProcess = {
      execSync: mock.fn(),
    };

    mockFs = {
      existsSync: mock.fn(),
      readFileSync: mock.fn(),
    };

    mockCore = {
      debug: mock.fn(),
      error: mock.fn(),
      getInput: mock.fn(),
      info: mock.fn(),
      warning: mock.fn(),
    };

    const module = await esmock(
      '../../src/score_components/find-problematic-comments.js',
      {
        'node:child_process': mockChildProcess,
        'node:fs': mockFs,
      },
    );
    grepForProblematicComments = module.default;
  });

  it('should export a function', () => {
    assert.equal(typeof grepForProblematicComments, 'function');
  });

  it('should throw error incase execSync fails', () => {
    mockChildProcess.execSync.mock.mockImplementation(() => {
      throw new Error('error');
    });
    mockFs.existsSync.mock.mockImplementation(() => false);
    const score = {
      comments: grepForProblematicComments(mockCore, ['js'], [], []),
      coverageMisses: 0,
    };
    assert.ok(
      mockCore.error.mock.calls.some((c) =>
        c.arguments[0]
          ?.toString()
          .includes('child_process execSync failed to execute'),
      ),
    );
    assert.deepEqual(score.comments, []);
  });

  describe('should handle different inputs', () => {
    it('should default to . if includes not provided', () => {
      mockChildProcess.execSync.mock.mockImplementation(() => '');
      mockFs.existsSync.mock.mockImplementation(() => false);
      const score = {
        comments: grepForProblematicComments(mockCore, ['js'], [], []),
        coverageMisses: 0,
      };
      let find = 'find .';
      find += ' \\( -name "*.js" \\) ';
      find += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;
      assert.equal(mockChildProcess.execSync.mock.calls[0].arguments[0], find);
      assert.deepEqual(score.comments, []);
    });

    it('should default to gitignore if excludes not provided', () => {
      mockChildProcess.execSync.mock.mockImplementation(() => '');
      mockFs.existsSync.mock.mockImplementation(() => false);
      grepForProblematicComments(mockCore, ['js'], [], []);
      assert.equal(mockFs.existsSync.mock.calls[0].arguments[0], '.gitignore');
    });

    it('should handle both includes and excludes', () => {
      mockChildProcess.execSync.mock.mockImplementation(() => '');
      mockFs.existsSync.mock.mockImplementation(() => false);
      const score = {
        comments: grepForProblematicComments(
          mockCore,
          ['js'],
          ['src'],
          ['test/'],
        ),
        coverageMisses: 0,
      };
      let find = 'find src';
      find += ' \\( -name "*.js" \\) ';
      find += ' -not -path "*/test/*" -not -path "*/test"';
      find += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;
      assert.equal(mockChildProcess.execSync.mock.calls[0].arguments[0], find);
      assert.deepEqual(score.comments, []);
    });

    it('should handle both multiples includes, excludes and extensions', () => {
      mockChildProcess.execSync.mock.mockImplementation(() => '');
      mockFs.existsSync.mock.mockImplementation(() => false);
      const score = {
        comments: grepForProblematicComments(
          mockCore,
          ['js', 'ts'],
          ['src', 'dir'],
          ['test/', 'dist'],
        ),
        coverageMisses: 5,
      };
      let find = 'find src dir';
      find += ' \\( -name "*.js" -o -name "*.ts" \\) ';
      find += ' -not -path "*/test/*" -not -path "*/test" -not -path "*/dist"';
      find += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;
      assert.equal(mockChildProcess.execSync.mock.calls[0].arguments[0], find);
      assert.deepEqual(score.comments, []);
    });
  });

  describe('should generate JSON in required format with grep results', () => {
    it('should handle empty grep results', () => {
      mockChildProcess.execSync.mock.mockImplementation(() => '');
      const score = {
        comments: grepForProblematicComments(mockCore, ['js'], ['src'], []),
        coverageMisses: 0,
      };
      assert.deepEqual(score.comments, []);
    });

    it('should handle grep results', () => {
      mockChildProcess.execSync.mock.mockImplementation(
        () => 'path:10: // TODO: random stuff',
      );
      const score = {
        comments: grepForProblematicComments(mockCore, ['js'], ['src'], []),
        coverageMisses: 0,
      };
      assert.deepEqual(score.comments, [
        {
          path: 'path',
          line_no: 10,
          comment: '// TODO: random stuff',
          commentType: 'TODO',
        },
      ]);
    });

    it('should handle multiple grep results', () => {
      mockChildProcess.execSync.mock.mockImplementation(
        () =>
          'path:10: // TODO: random stuff \n path2:15: // FIXME: random stuff',
      );
      const score = {
        comments: grepForProblematicComments(mockCore, ['js'], ['src'], []),
        coverageMisses: 0,
      };
      assert.deepEqual(score.comments, [
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
      mockChildProcess.execSync.mock.mockImplementation(
        () =>
          'path:10: // TODO: random stuff \n path2:15: // random things TODO',
      );
      const score = {
        comments: grepForProblematicComments(mockCore, ['js'], ['src'], []),
        coverageMisses: 0,
      };
      assert.deepEqual(score.comments, [
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
      mockChildProcess.execSync.mock.mockImplementation(
        () => 'path:10: // TODO random stuff',
      );
      const score = {
        comments: grepForProblematicComments(mockCore, ['js'], ['src'], []),
        coverageMisses: 0,
      };
      assert.deepEqual(score.comments, [
        {
          path: 'path',
          line_no: 10,
          comment: '// TODO random stuff',
          commentType: 'TODO',
        },
      ]);
    });

    it('should handle grep results that starts with code', () => {
      mockChildProcess.execSync.mock.mockImplementation(
        () => 'path:10: const result = "hello:world" // TODO: random stuff',
      );
      const score = {
        comments: grepForProblematicComments(mockCore, ['js'], ['src'], []),
        coverageMisses: 0,
      };
      assert.deepEqual(score.comments, [
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
