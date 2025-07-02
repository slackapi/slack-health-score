const { assert } = require('chai');
const sinon = require('sinon');
const {
  fakeCore,
  fakeGithub,
  fakeComments,
  fakeCoverage,
} = require('./stubs/stubs');
const hs = require('../src/health-score');

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
  let fakeContext = {};
  beforeEach(() => {
    sinon.reset();
  });
  it('should have a grep function', async () => {
    assert.ok(hs.grep);
  });
  describe('check: inputs', () => {
    describe('should call actions/core.error for invalid input', async () => {
      it('should check for empty includes', async () => {
        fakeContext = contextValue;
        fakeCore.getInput.withArgs('extension').returns('js');
        fakeCore.getInput.withArgs('include').returns(null);
        fakeCore.getInput.withArgs('exclude').returns('test');
        await hs.compile(fakeContext, fakeCore, fakeGithub);
        assert(
          fakeCore.warning.calledWith(
            sinon.match('Directories to be included not specified'),
          ),
        );
      });
      it('should check for invalid extensions', async () => {
        fakeContext = contextValue;
        fakeCore.getInput.withArgs('extension').returns('');
        fakeCore.getInput.withArgs('include').returns('src');
        fakeCore.getInput.withArgs('exclude').returns(null);
        await hs.compile(fakeContext, fakeCore, fakeGithub);
        assert(
          fakeCore.error.calledWith(sinon.match('Extensions not specified')),
        );
      });
    });
    it('should take single input', async () => {
      fakeContext = contextValue;
      fakeCore.getInput.withArgs('extension').returns('js');
      fakeCore.getInput.withArgs('include').returns('src');
      fakeCore.getInput.withArgs('exclude').returns('test');
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeContext, fakeCore, fakeGithub);

      assert(fakeComments.calledWith(fakeCore, ['js'], ['src'], ['test']));
      assert(fakeCoverage.calledWith(fakeContext, fakeCore, fakeGithub));
    });

    it('should handle inputs as block format', async () => {
      fakeContext = contextValue;
      fakeCore.getInput.withArgs('extension').returns('-js\n- ts');
      fakeCore.getInput.withArgs('include').returns('- src\n- lib');
      fakeCore.getInput.withArgs('exclude').returns('- test\n- dist');
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeContext, fakeCore, fakeGithub);

      assert(
        fakeComments.calledWith(
          fakeCore,
          ['js', 'ts'],
          ['src', 'lib'],
          ['test', 'dist'],
        ),
      );
      assert(fakeCoverage.calledWith(fakeContext, fakeCore, fakeGithub));
    });

    it('should handle inputs in flow format', async () => {
      fakeContext = contextValue;
      fakeCore.getInput.withArgs('extension').returns("['js', 'ts']");
      fakeCore.getInput.withArgs('include').returns("['src', 'lib']");
      fakeCore.getInput.withArgs('exclude').returns("['test', 'dist']");
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeContext, fakeCore, fakeGithub);

      assert(
        fakeComments.calledWith(
          fakeCore,
          ['js', 'ts'],
          ['src', 'lib'],
          ['test', 'dist'],
        ),
      );
      assert(fakeCoverage.calledWith(fakeContext, fakeCore, fakeGithub));
    });
    it('should handle combined and unformatted inputs', async () => {
      fakeContext = contextValue;
      fakeCore.getInput.withArgs('extension').returns('[js, ts]');
      fakeCore.getInput.withArgs('include').returns(' -       src\n -lib');
      fakeCore.getInput.withArgs('exclude').returns('["test", \'dist\']');
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeContext, fakeCore, fakeGithub);

      assert(
        fakeComments.calledWith(
          fakeCore,
          ['js', 'ts'],
          ['src', 'lib'],
          ['test', 'dist'],
        ),
      );
      assert(fakeCoverage.calledWith(fakeContext, fakeCore, fakeGithub));
    });
  });
  it('should have a report function', async () => {
    assert.ok(hs.report);
  });
  describe('check: report', () => {
    it('should handle invalid github token', async () => {
      fakeContext = contextValue;
      fakeCore.getInput.withArgs('github_token').returns(null);
      const score = { comments: [], coverageMisses: 0 };
      const startTime = new Date();
      const points = await hs.report(
        fakeContext,
        startTime,
        fakeCore,
        fakeGithub,
        score,
      );
      assert(
        fakeCore.warning.calledWith(
          sinon.match(
            'No GitHub token found; will not report score on commit status.',
          ),
        ),
      );
      assert.deepEqual(points, 0);
    });
    it('should calculate points accurately', async () => {
      fakeContext = contextValue;
      fakeCore.getInput.withArgs('github_token').returns('test');
      const score = {
        comments: [
          { path: 'path', line_no: 10, comment: '// TODO: random stuff' },
          { path: 'path2', line_no: 15, comment: '// FIXME: random stuff' },
        ],
        coverageMisses: 5,
      };
      const startTime = new Date();
      const points = await hs.report(
        fakeContext,
        startTime,
        fakeCore,
        fakeGithub,
        score,
      );
      assert.deepEqual(points, -205);
    });
  });
});
