const { assert } = require('chai');
const sinon = require('sinon');
const { fakeCore, fakeGithub } = require('./stubs/stubs');
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
  const fakeComments = sinon.stub(hs, 'grep');
  const fakeCoverage = sinon.stub(hs, 'coverage');
  const originalGithubContext = fakeGithub.context;
  beforeEach(() => {
    sinon.reset();
    fakeGithub.context = originalGithubContext;
  });
  it('should have a grep function', async () => {
    assert.ok(hs.grep);
  });
  describe('check: inputs', () => {
    it('should handle invalid input', async () => {
      fakeCore.getInput.withArgs('extension').returns('');
      fakeCore.getInput.withArgs('include').returns(null);
      fakeCore.getInput.withArgs('exclude').returns('');
      fakeGithub.context = contextValue;
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeCore, fakeGithub);

      assert(fakeComments.calledWith([], [], []));
      assert(fakeCoverage.calledWith(fakeCore, fakeGithub));
    });
    it('should take single input', async () => {
      fakeCore.getInput.withArgs('extension').returns('js');
      fakeCore.getInput.withArgs('include').returns('src');
      fakeCore.getInput.withArgs('exclude').returns('test');
      fakeGithub.context = contextValue;
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeCore, fakeGithub);

      assert(fakeComments.calledWith(['js'], ['src'], ['test']));
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

      assert(fakeComments.calledWith(['js', 'ts'], ['src', 'lib'], ['test', 'dist']));
      assert(fakeCoverage.calledWith(fakeCore, fakeGithub));
    });

    it('should handle inputs in flow format', async () => {
      fakeCore.getInput.withArgs('extension').returns('[\'js\', \'ts\']');
      fakeCore.getInput.withArgs('include').returns('[\'src\', \'lib\']');
      fakeCore.getInput.withArgs('exclude').returns('[\'test\', \'dist\']');
      fakeGithub.context = contextValue;
      fakeComments.onCall().returns(['']);
      fakeCoverage.onCall().returns(0);

      await hs.compile(fakeCore, fakeGithub);

      assert(fakeComments.calledWith(['js', 'ts'], ['src', 'lib'], ['test', 'dist']));
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

      assert(fakeComments.calledWith(['js', 'ts'], ['src', 'lib'], ['test', 'dist']));
      assert(fakeCoverage.calledWith(fakeCore, fakeGithub));
    });
  });
});
