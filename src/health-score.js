const findProblematicComments = require('./score_components/find-problematic-comments');
const retrieveCodeCoverage = require('./score_components/coverage');
const reportStatus = require('./report');

module.exports = {
  /**
   * @description Compiles the health score components
   * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
   * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
   * @returns {import('./types').HealthScore} score Health score details object
   */
  compile: async function compileScore(core, github) {
    // TODO: wire up action outputs
    return {
      // TODO: support src as arrays
      // TODO: wire up exclude input
      comments: module.exports.grep(core.getInput('extension'), [core.getInput('include') || '.'], []), // to-do et al comments
      coverageMisses: await module.exports.coverage(core, github), // uncovered LoC
    };
  },
  grep: findProblematicComments,
  coverage: retrieveCodeCoverage,
  report: reportStatus,
};
