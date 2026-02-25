import { parseYamlArray } from './helpers/helper-functions.js';
import reportStatus from './report.js';
import retrieveCodeCoverage from './score_components/coverage.js';
import findProblematicComments from './score_components/find-problematic-comments.js';

/**
 * @typedef {object} HealthScoreDeps
 * @property {import('@api/codecov')} codecov Codecov API client
 * @property {import('./get-sha.js')} getSHA Function to get commit SHA
 * @property {import('node:child_process')} childProcess Node.js child_process module
 * @property {import('node:fs')} fs Node.js fs module
 */

const hs = {
  /**
   * @description Compiles the health score components
   * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
   * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
   * @param {HealthScoreDeps} deps External dependencies
   * @returns {Promise<import('./types.js').HealthScore>} Health score details object
   */
  compile: async function compileScore(core, github, deps) {
    // TODO: wire up action outputs
    const extensionInput = core.getInput('extension');
    const includeInput = core.getInput('include');
    const excludeInput = core.getInput('exclude');

    const extensions = parseYamlArray(extensionInput);
    const includes = parseYamlArray(includeInput);
    const excludes = parseYamlArray(excludeInput);

    let com = '';
    const misses = await hs.coverage(core, github, deps.codecov, deps.getSHA); // uncovered LoC
    if (extensions.length === 0) {
      core.error('Extensions not specified');
    } else {
      if (includes.length === 0)
        core.warning('Directories to be included not specified');
      com = hs.grep(
        core,
        deps.childProcess,
        deps.fs,
        extensions,
        includes,
        excludes,
      ); // to-do et al comments
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
