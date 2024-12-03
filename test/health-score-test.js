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
  const originalGithubContext = fakeGithub.context;
  beforeEach(() => {
    sinon.reset();
    fakeGithub.context = originalGithubContext;
  });
  it('should have a grep function', async () => {
    assert.ok(hs.grep);
  });
  describe('check: inputs', () => {
    describe('should call actions/core.error for invalid input', async () => {
      it('should check for empty includes', async () => {
        fakeCore.getInput.withArgs('extension').returns('js');
        fakeCore.getInput.withArgs('include').returns(null);
        fakeCore.getInput.withArgs('exclude').returns('test');
        fakeGithub.context = contextValue;
        await hs.compile(fakeCore, fakeGithub);
        assert(
          fakeCore.warning.calledWith(
            sinon.match('Directories to be included not specified'),
          ),
        );
      });
      it('should check for invalid extensions', async () => {
        fakeCore.getInput.withArgs('extension').returns('');
        fakeCore.getInput.withArgs('include').returns('src');
        fakeCore.getInput.withArgs('exclude').returns(null);
        fakeGithub.context = contextValue;
        await hs.compile(fakeCore, fakeGithub);
        assert(
          fakeCore.error.calledWith(sinon.match('Extensions not specified')),
        );
      });
    });
    it('should take single input', async () => {
      fakeCore.getInput.withArgs('extension').returns('js');
      fakeCore.getInput.withArgs('include').returns('src');
      fakeCore.getInput.withArgs('exclude').returns('test');
      fakeGithub.context = contextValue;
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeCore, fakeGithub);

      assert(fakeComments.calledWith(fakeCore, ['js'], ['src'], ['test']));
      assert(fakeCoverage.calledWith(fakeCore, fakeGithub));
    });

    it('should handle inputs as block format', async () => {
      fakeCore.getInput.withArgs('extension').returns('-js\n- ts');
      fakeCore.getInput.withArgs('include').returns('- src\n- lib');
      fakeCore.getInput.withArgs('exclude').returns('- test\n- dist');
      fakeGithub.context = contextValue;
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeCore, fakeGithub);

      assert(
        fakeComments.calledWith(
          fakeCore,
          ['js', 'ts'],
          ['src', 'lib'],
          ['test', 'dist'],
        ),
      );
      assert(fakeCoverage.calledWith(fakeCore, fakeGithub));
    });

    it('should handle inputs in flow format', async () => {
      fakeCore.getInput.withArgs('extension').returns("['js', 'ts']");
      fakeCore.getInput.withArgs('include').returns("['src', 'lib']");
      fakeCore.getInput.withArgs('exclude').returns("['test', 'dist']");
      fakeGithub.context = contextValue;
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeCore, fakeGithub);

      assert(
        fakeComments.calledWith(
          fakeCore,
          ['js', 'ts'],
          ['src', 'lib'],
          ['test', 'dist'],
        ),
      );
      assert(fakeCoverage.calledWith(fakeCore, fakeGithub));
    });
    it('should handle combined and unformatted inputs', async () => {
      fakeCore.getInput.withArgs('extension').returns('[js, ts]');
      fakeCore.getInput.withArgs('include').returns(' -       src\n -lib');
      fakeCore.getInput.withArgs('exclude').returns('["test", \'dist\']');
      fakeGithub.context = contextValue;
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeCore, fakeGithub);

      assert(
        fakeComments.calledWith(
          fakeCore,
          ['js', 'ts'],
          ['src', 'lib'],
          ['test', 'dist'],
        ),
      );
      assert(fakeCoverage.calledWith(fakeCore, fakeGithub));
    });
  });
  it('should have a report function', async () => {
    assert.ok(hs.report);
  });
  describe('check: report', () => {
    it('should handle invalid github token', async () => {
      fakeCore.getInput.withArgs('github_token').returns(null);
      fakeGithub.context = contextValue;
      const score = { comments: [], coverageMisses: 0 };
      const startTime = new Date();
      const points = await hs.report(startTime, fakeCore, fakeGithub, score);
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
      fakeCore.getInput.withArgs('github_token').returns('test');
      fakeGithub.context = contextValue;
      const score = {
        comments: [
          { path: 'path', line_no: 10, comment: '// TODO: random stuff' },
          { path: 'path2', line_no: 15, comment: '// FIXME: random stuff' },
        ],
        coverageMisses: 5,
      };
      const startTime = new Date();
      const points = await hs.report(startTime, fakeCore, fakeGithub, score);
      assert.deepEqual(points, -205);
    });
  });
});
