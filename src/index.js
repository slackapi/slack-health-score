const hs = require('./health-score');

/**
 * @param {Object} context Context of the workflow run - https://github.com/actions/toolkit/blob/main/packages/github/src/context.ts
 * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
 * @param {import('@octokit/rest').Octokit} github `@octokit/rest` GitHub Actions client
 */
module.exports = async (context, core, github) => {
  const startTime = new Date();
  hs.compile(context, core, github)
    .then((score) => hs.report(context, startTime, core, github, score))
    .then(console.log)
    .catch((err) => {
      core.setFailed('Failed to check up on the health score!');
      console.error(err);
    });
};
