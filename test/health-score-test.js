import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import hs from '../src/health-score.js';
import { mocks } from './stubs/stubs.js';

const contextValue = {
  eventName: 'pull_request',
  payload: {
    after: 'abcd1234',
  },
  repo: {
    owner: 'slackapi',
    repo: 'slack-health-score',
  },
};

describe('health-score', () => {
  beforeEach(() => {
    mocks.reset();
  });

  it('should have a grep function', () => {
    assert.ok(hs.grep);
  });

  describe('check: inputs', () => {
    describe('should call actions/core.error for invalid input', () => {
      it('should check for empty includes', async () => {
        mocks.inputs = {
          extension: 'js',
          include: '',
          exclude: 'test',
        };
        mocks.github.context = contextValue;
        await hs.compile(mocks.core, mocks.github);
        assert.ok(
          mocks.core.warning.mock.calls.some((c) =>
            c.arguments[0].includes('Directories to be included not specified'),
          ),
        );
      });

      it('should check for invalid extensions', async () => {
        mocks.inputs = {
          extension: '',
          include: 'src',
          exclude: '',
        };
        mocks.github.context = contextValue;
        await hs.compile(mocks.core, mocks.github);
        assert.ok(
          mocks.core.error.mock.calls.some((c) =>
            c.arguments[0].includes('Extensions not specified'),
          ),
        );
      });
    });

    it('should take single input', async () => {
      mocks.inputs = {
        extension: 'js',
        include: 'src',
        exclude: 'test',
      };
      mocks.github.context = contextValue;
      mocks._grepReturns = [''];
      mocks._coverageReturns = 0;

      await hs.compile(mocks.core, mocks.github);

      assert.equal(mocks.grep.mock.callCount(), 1);
      const [core, exts, includes, excludes] =
        mocks.grep.mock.calls[0].arguments;
      assert.equal(core, mocks.core);
      assert.deepEqual(exts, ['js']);
      assert.deepEqual(includes, ['src']);
      assert.deepEqual(excludes, ['test']);

      assert.equal(mocks.coverage.mock.callCount(), 1);
      const [coreArg, githubArg] = mocks.coverage.mock.calls[0].arguments;
      assert.equal(coreArg, mocks.core);
      assert.equal(githubArg, mocks.github);
    });

    it('should handle inputs as block format', async () => {
      mocks.inputs = {
        extension: '-js\n- ts',
        include: '- src\n- lib',
        exclude: '- test\n- dist',
      };
      mocks.github.context = contextValue;
      mocks._grepReturns = [''];
      mocks._coverageReturns = 0;

      await hs.compile(mocks.core, mocks.github);

      assert.equal(mocks.grep.mock.callCount(), 1);
      const [_core, exts, includes, excludes] =
        mocks.grep.mock.calls[0].arguments;
      assert.deepEqual(exts, ['js', 'ts']);
      assert.deepEqual(includes, ['src', 'lib']);
      assert.deepEqual(excludes, ['test', 'dist']);

      assert.equal(mocks.coverage.mock.callCount(), 1);
    });

    it('should handle inputs in flow format', async () => {
      mocks.inputs = {
        extension: "['js', 'ts']",
        include: "['src', 'lib']",
        exclude: "['test', 'dist']",
      };
      mocks.github.context = contextValue;
      mocks._grepReturns = [''];
      mocks._coverageReturns = 0;

      await hs.compile(mocks.core, mocks.github);

      assert.equal(mocks.grep.mock.callCount(), 1);
      const [_core, exts, includes, excludes] =
        mocks.grep.mock.calls[0].arguments;
      assert.deepEqual(exts, ['js', 'ts']);
      assert.deepEqual(includes, ['src', 'lib']);
      assert.deepEqual(excludes, ['test', 'dist']);

      assert.equal(mocks.coverage.mock.callCount(), 1);
    });

    it('should handle combined and unformatted inputs', async () => {
      mocks.inputs = {
        extension: '[js, ts]',
        include: ' -       src\n -lib',
        exclude: '["test", \'dist\']',
      };
      mocks.github.context = contextValue;
      mocks._grepReturns = [''];
      mocks._coverageReturns = 0;

      await hs.compile(mocks.core, mocks.github);

      assert.equal(mocks.grep.mock.callCount(), 1);
      const [_core, exts, includes, excludes] =
        mocks.grep.mock.calls[0].arguments;
      assert.deepEqual(exts, ['js', 'ts']);
      assert.deepEqual(includes, ['src', 'lib']);
      assert.deepEqual(excludes, ['test', 'dist']);

      assert.equal(mocks.coverage.mock.callCount(), 1);
    });
  });

  it('should have a report function', () => {
    assert.ok(hs.report);
  });

  describe('check: report', () => {
    it('should handle invalid github token', async () => {
      mocks.inputs = { github_token: '' };
      mocks.github.context = contextValue;
      const score = { comments: [], coverageMisses: 0 };
      const startTime = new Date();
      const points = await hs.report(
        startTime,
        mocks.core,
        mocks.github,
        score,
      );
      assert.ok(
        mocks.core.warning.mock.calls.some((c) =>
          c.arguments[0].includes(
            'No GitHub token found; will not report score on commit status.',
          ),
        ),
      );
      assert.equal(points, 0);
    });

    it('should calculate points accurately', async () => {
      mocks.inputs = { github_token: 'test' };
      mocks.github.context = contextValue;
      const score = {
        comments: [
          { path: 'path', line_no: 10, comment: '// TODO: random stuff' },
          { path: 'path2', line_no: 15, comment: '// FIXME: random stuff' },
        ],
        coverageMisses: 5,
      };
      const startTime = new Date();
      const points = await hs.report(
        startTime,
        mocks.core,
        mocks.github,
        score,
      );
      assert.equal(points, -205);
    });
  });
});
