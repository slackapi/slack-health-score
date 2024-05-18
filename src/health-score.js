const findProblematicComments = require('./score_components/find-problematic-comments');
const retrieveCodeCoverage = require('./score_components/coverage');
const reportStatus = require('./report');

/**
 *
 * @param input
 * @returns []
 */
function parseYamlArray(input) {
  if (!input) {
    return [];
  }
  const arr = input.trim().replace(/^\[|\]$/g, '');

  try {
    console.log(JSON.parse(arr));
    return JSON.parse(arr);
  } catch (e) {
    return arr
      .split(/,\s*|\n/)
      .map((item) => item.trim().replace(/^- */, ''))
      .filter(Boolean)
      .map((item) => {
        if ((item.startsWith('"') && item.endsWith('"')) || (item.startsWith("'") && item.endsWith("'"))) {
          return item.slice(1, -1);
        }
        return item;
      });
  }
}

module.exports = {
  /**
   * @description Compiles the health score components
   * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
   * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
   * @returns {import('./types').HealthScore} score Health score details object
   */
  compile: async function compileScore(core, github) {
    // TODO: wire up action outputs
    const extensionInput = core.getInput('extension');
    const includeInput = core.getInput('include');
    const excludeInput = core.getInput('exclude');

    const extensions = parseYamlArray(extensionInput);
    const includes = parseYamlArray(includeInput);
    const excludes = parseYamlArray(excludeInput);
    return {
      // TODO: wire up exclude input
      comments: module.exports.grep(extensions, includes, excludes), // to-do et al comments
      coverageMisses: await module.exports.coverage(core, github), // uncovered LoC
    };
  },
  grep: findProblematicComments,
  coverage: retrieveCodeCoverage,
  report: reportStatus,
};
