import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import cov from '../../src/score_components/coverage.js';
import { mocks } from '../stubs/stubs.js';

describe('score component: code coverage', () => {
  beforeEach(() => {
    mocks.reset();
  });

  it('should export a function', () => {
    assert.equal(typeof cov, 'function');
  });

  it('should return 0 if no `codecov_token` input provided', async () => {
    mocks.inputs = { codecov_token: '' };
    const res = await cov(mocks.core, mocks.github);
    assert.equal(res, 0);
  });

  // Note: Tests that require mocking the codecov API are skipped until
  // esmock is added for ESM module mocking. The codecov module is imported
  // directly by coverage.js and cannot be mocked with node:test mocks alone.
});
