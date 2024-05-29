const sinon = require('sinon');
const core = require('@actions/core');
const github = require('@actions/github');
const codecov = require('@api/codecov');
const child_process = require('child_process');
const fs = require('fs');
const hs = require('../../src/health-score');

const fakeCore = sinon.stub(core);
const fakeGithub = sinon.stub(github);
const fakeCodecov = sinon.stub(codecov);
const fakeChildProcess = sinon.stub(child_process);
const fakeComments = sinon.stub(hs, 'grep');
const fakeCoverage = sinon.stub(hs, 'coverage');
const fakeFs = sinon.stub(fs, 'existsSync');
module.exports = { fakeCore, fakeGithub, fakeCodecov, fakeChildProcess, fakeComments, fakeCoverage, fakeFs };
