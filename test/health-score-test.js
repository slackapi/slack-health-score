const { assert } = require('chai');
// const sinon = require('sinon');
// const core = require('@actions/core');
// const github = require('@actions/github');
const hs = require('../src/health-score');

describe('health-score', () => {
  it('should have a grep function', async () => {
    assert.ok(hs.grep);
  });
});
