const core = require('@actions/core');
const github = require('@actions/github');
const hs = require('./health-score');

const startTime = new Date();
const score = hs.compile(core, github);
hs.report(startTime, core, github, score).then(console.log);
