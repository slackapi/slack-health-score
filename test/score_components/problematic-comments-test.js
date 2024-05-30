const { assert } = require('chai');
const sinon = require('sinon');
const { fakeCore, fakeChildProcess, fakeFs } = require('../stubs/stubs');
const grepForProblematicComments = require('../../src/score_components/find-problematic-comments');

const commentPattern = '\\s*(//|/\\*|\\*).*\\b(TODO|HACK|FIXME)\\b';
describe('score component: problematic comments', () => {
  beforeEach(() => {
    sinon.reset();
  });
  it('should throw error incase execSync fails', async () => {
    const score = { comments: grepForProblematicComments(fakeCore, ['js'], [], []), coverageMisses: 0 };
    fakeChildProcess.execSync.throws('error');
    fakeFs.returns(null);
    assert(fakeCore.error.calledWith(sinon.match('child_process execSync failed to execute')));
    assert.deepEqual(score.comments, []);
  });
  describe('should handle different inputs', async () => {
    it('should default to . if includes not provided', async () => {
      const score = { comments: grepForProblematicComments(fakeCore, ['js'], [], []), coverageMisses: 0 };
      fakeChildProcess.execSync.returns('');
      fakeFs.returns(null);
      let find = 'find .';
      find += ' \\( -name "*.js" \\) ';
      find += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;
      assert(fakeChildProcess.execSync.calledWith(find));
      assert.deepEqual(score.comments, []);
    });
    it('should default to gitignore if excludes not provided', async () => {
      const score = { comments: grepForProblematicComments(fakeCore, ['js'], [], []), coverageMisses: 0 };
      fakeChildProcess.execSync.returns('');
      fakeFs.returns(null);
      assert(fakeFs.calledWith('.gitignore'));
      assert.deepEqual(score.comments, []);
    });
    it('should handle both includes and excludes', async () => {
      const score = { comments: grepForProblematicComments(fakeCore, ['js'], ['src'], ['test/']), coverageMisses: 0 };
      fakeChildProcess.execSync.returns('');
      fakeFs.returns(null);
      let find = 'find src';
      find += ' \\( -name "*.js" \\) ';
      find += ' -not -path "*/test/*" -not -path "*/test"';
      find += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;
      assert(fakeChildProcess.execSync.calledWith(find));
      assert.deepEqual(score.comments, []);
    });
    it('should handle both multiples includes, excludes and extensions', async () => {
      const score = { comments: grepForProblematicComments(fakeCore, ['js', 'ts'], ['src', 'dir'], ['test/', 'dist']), coverageMisses: 5 };
      fakeChildProcess.execSync.returns('');
      fakeFs.returns(null);
      let find = 'find src dir';
      find += ' \\( -name "*.js" -o -name "*.ts" \\) ';
      find += ' -not -path "*/test/*" -not -path "*/test" -not -path "*/dist"';
      find += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;
      assert(fakeChildProcess.execSync.calledWith(find));
      assert.deepEqual(score.comments, []);
    });
  });
  describe('should generate JSON in required format with grep results', async () => {
    it('should handle empty grep results', async () => {
      fakeChildProcess.execSync.returns('');
      const score = { comments: grepForProblematicComments(fakeCore, ['js'], ['src'], []), coverageMisses: 0 };
      assert.deepEqual(score.comments, []);
    });
    it('should handle grep results', async () => {
      fakeChildProcess.execSync.returns('path:10: // TODO: random stuff');
      const score = { comments: grepForProblematicComments(fakeCore, ['js'], ['src'], []), coverageMisses: 0 };
      assert.deepEqual(score.comments, [{ path: 'path', line_no: 10, comment: '// TODO: random stuff', commentType: 'TODO' }]);
    });
    it('should handle multiple grep results', async () => {
      fakeChildProcess.execSync.returns('path:10: // TODO: random stuff \n path2:15: // FIXME: random stuff');
      const score = { comments: grepForProblematicComments(fakeCore, ['js'], ['src'], []), coverageMisses: 0 };
      assert.deepEqual(score.comments, [{ path: 'path', line_no: 10, comment: '// TODO: random stuff', commentType: 'TODO' }, { path: 'path2', line_no: 15, comment: '// FIXME: random stuff', commentType: 'FIXME' }]);
    });
    it('should handle grep results not in the correct format', async () => {
      fakeChildProcess.execSync.returns('path:10: // TODO: random stuff \n path2:15: // random things TODO');
      const score = { comments: grepForProblematicComments(fakeCore, ['js'], ['src'], []), coverageMisses: 0 };
      assert.deepEqual(score.comments, [{ path: 'path', line_no: 10, comment: '// TODO: random stuff', commentType: 'TODO' }, { path: 'path2', line_no: 15, comment: '// random things TODO', commentType: null }]);
    });
  });
});
