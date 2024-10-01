const core = require('@actions/core');
const github = require('@actions/github');
const hs = require('./health-score');

const startTime = new Date();
hs.compile(core, github)
  .then((score) => hs.report(startTime, core, github, score))
  .then(console.log)
  .catch((err) => {
    core.setFailed('Failed to check up on the health score!');
    console.error(err);
  });
