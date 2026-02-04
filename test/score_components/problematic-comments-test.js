import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import grepForProblematicComments from '../../src/score_components/find-problematic-comments.js';
import { mocks } from '../stubs/stubs.js';

describe('score component: problematic comments', () => {
  beforeEach(() => {
    mocks.reset();
  });

  it('should export a function', () => {
    assert.equal(typeof grepForProblematicComments, 'function');
  });

  // Note: Tests that require mocking child_process.execSync and fs.existsSync
  // are skipped until esmock is added for ESM module mocking. These modules
  // are imported directly by find-problematic-comments.js and cannot be
  // mocked with node:test mocks alone.
});
