const codecov = require('@api/codecov');
const getSHA = require('../get-sha');

const RETRY_DELAY = 10000;

/**
 * @description Compiles the health score components
 * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
 * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
 * @returns {number} Number of uncovered lines of code, or 0 in the case of no codecov token specified
 */
module.exports = async function retrieveCodeCoverage(core, github) {
  // See if we can get a coverage overview for this commit from codecov
  const codecovToken = core.getInput('codecov_token');
  let misses = 0;
  let attempts = 1;
  if (codecovToken) {
    const ctx = github.context;
    codecov.auth(codecovToken);
    while (attempts < 10) {
      try {
        core.info('Pinging codecov API for coverage data...');
        const coverage = await codecov.repos_commits_retrieve({
          service: 'github',
          owner_username: ctx.repo.owner,
          repo_name: ctx.repo.repo,
          commitid: getSHA(core, github),
        });
        core.info(`codecov api response: ${JSON.stringify(coverage, null, 2)}`);
        if (coverage && coverage.data) {
          if (coverage.data.totals && coverage.data.totals.misses) {
            misses = coverage.data.totals.misses;
            core.info(`${misses} uncovered lines according to codecov`);
          } else {
            // if totals are missing, probably codecov has not compiled the coverage info yet; delay and try again.
            core.info(`No coverage details available yet; sleeping for ${RETRY_DELAY / 1000} seconds.`);
            attempts += 1;
            await sleep(RETRY_DELAY);
          }
        } else {
          // TODO: if there's no data, what do we do?
        }
      } catch (e) {
        core.error('Failed to retrieve codecov commits');
        core.error(e);
      }
    }
  }
  return misses;
};

function sleep(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
