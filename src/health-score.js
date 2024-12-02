const findProblematicComments = require('./score_components/find-problematic-comments');
const retrieveCodeCoverage = require('./score_components/coverage');
const reportStatus = require('./report');
const { parseYamlArray } = require('./helpers/helper-functions');

module.exports = {
  /**
   * @description Compiles the health score components
   * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
   * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
   * @returns {Promise<import('./types').HealthScore>} score Health score details object
   */
  compile: async function compileScore(core, github) {
    // TODO: wire up action outputs
    const extensionInput = core.getInput('extension');
    const includeInput = core.getInput('include');
    const excludeInput = core.getInput('exclude');

    const extensions = parseYamlArray(extensionInput);
    const includes = parseYamlArray(includeInput);
    const excludes = parseYamlArray(excludeInput);

    let com = '';
    const misses = await module.exports.coverage(core, github); // uncovered LoC
    if (extensions.length === 0) {
      core.error('Extensions not specified');
    } else {
      if (includes.length === 0)
        core.warning('Directories to be included not specified');
      com = module.exports.grep(core, extensions, includes, excludes); // to-do et al comments
    }
    return {
      comments: com,
      coverageMisses: misses,
    };
  },
  grep: findProblematicComments,
  coverage: retrieveCodeCoverage,
  report: reportStatus,
};
