const codecov = require('@api/codecov');
const getSHA = require('../get-sha');

/**
 * @description Compiles the health score components
 * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
 * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
 * @returns {Promise<number>} Number of uncovered lines of code, or 0 in the case of no codecov token specified
 */
module.exports = async function retrieveCodeCoverage(core, github) {
  // See if we can get a coverage overview for this commit from codecov
  const codecovToken = core.getInput('codecov_token');
  const maxAttempts = parseInt(core.getInput('codecov_max_attempts'), 10) > 0 ? parseInt(core.getInput('codecov_max_attempts'), 10) : 10;
  const retryDelay = parseInt(core.getInput('codecov_retry_delay'), 10) || 10000;
  const treatTimeoutAsError = core.getInput('codecov_treat_timeout_as_error') === 'true';

  let misses = 0;
  let attempts = 1;

  if (codecovToken) {
    const ctx = github.context;
    codecov.auth(codecovToken);
    const sha = getSHA(core, github);
    while (attempts <= maxAttempts) {
      try {
        core.info('Pinging codecov API for coverage data...');
        const coverage = await codecov.repos_commits_retrieve({
          service: 'github',
          owner_username: ctx.repo.owner,
          repo_name: ctx.repo.repo,
          commitid: sha,
        });
        core.debug(`codecov api response: ${JSON.stringify(coverage, null, 2)}`);
        if (coverage && coverage.data) {
          if (coverage.data.totals && coverage.data.totals.misses) {
            misses = coverage.data.totals.misses;
            core.info(`${misses} uncovered lines according to codecov`);
            break;
          } else {
            core.info('codecov response data present but missing totals, delaying');
            // if totals are missing, probably codecov has not compiled the coverage info yet; delay and try again.
            attempts += 1;
            await sleep(retryDelay);
          }
        } else {
          core.info('codecov response data missing, delaying');
          // if totals are missing, probably codecov has not compiled the coverage info yet; delay and try again.
          attempts += 1;
          await sleep(retryDelay);
        }
      } catch (e) {
        core.error('Failed to retrieve codecov commits');
        core.error(e);
        break;
      }
    }
    if (attempts > maxAttempts) {
      const message = `Reached maximum attempts (${maxAttempts}) without retrieving coverage data.`;
      if (treatTimeoutAsError) {
        core.error(message);
      } else {
        core.warning(message);
      }
    }
  } else {
    core.info('No codecov token provided, skipping coverage retrieval.');
  }
  return misses;
};

function sleep(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
