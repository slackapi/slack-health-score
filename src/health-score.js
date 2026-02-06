import { parseYamlArray } from './helpers/helper-functions.js';
import reportStatus from './report.js';
import retrieveCodeCoverage from './score_components/coverage.js';
import findProblematicComments from './score_components/find-problematic-comments.js';

const hs = {
  /**
   * @description Compiles the health score components
   * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
   * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
   * @returns {Promise<import('./types.js').HealthScore>} score Health score details object
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
    const misses = await hs.coverage(core, github); // uncovered LoC
    if (extensions.length === 0) {
      core.error('Extensions not specified');
    } else {
      if (includes.length === 0)
        core.warning('Directories to be included not specified');
      com = hs.grep(core, extensions, includes, excludes); // to-do et al comments
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

export default hs;
