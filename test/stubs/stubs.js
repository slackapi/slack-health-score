const sinon = require('sinon');
const core = require('@actions/core');
const github = require('@actions/github');
const codecov = require('@api/codecov');

const fakeCore = sinon.stub(core);
const fakeGithub = sinon.stub(github);
const fakeCodecov = sinon.stub(codecov);
module.exports = { fakeCore, fakeGithub, fakeCodecov };
