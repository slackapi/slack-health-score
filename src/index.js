import * as hs from './health-score.js';

/**
 * @param {Object} context Context of the workflow run - https://github.com/actions/toolkit/blob/main/packages/github/src/context.ts
 * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
 * @param {import('@octokit/rest').Octokit} github `@octokit/rest` GitHub Actions client
 */
export default async (context, core, github) => {
  const startTime = new Date();
  core.debug = console.debug;
  hs.compile(context, core, github)
    .then((score) => hs.report(context, startTime, core, github, score))
    .then(console.log)
    .catch((err) => {
      core.setFailed('Failed to check up on the health score!');
      console.error(err);
    });
};
