const codecov = require('@api/codecov');
const getSHA = require('../get-sha');

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
  if (codecovToken) {
    const ctx = github.context;
    codecov.auth(codecovToken);
    try {
      const coverage = await codecov.repos_commits_retrieve({
        service: 'github',
        owner_username: ctx.repo.owner,
        repo_name: ctx.repo.repo,
        commitid: getSHA(core, github),
      });
      if (coverage && coverage.data && coverage.data.totals && coverage.data.totals.misses) {
        misses = coverage.data.totals.misses;
        core.info(`${misses} uncovered lines according to codecov`);
      }
    } catch (e) {
      core.error('Failed to retrieve codecov commits');
      core.error(e);
    }
  }
  return misses;
};
