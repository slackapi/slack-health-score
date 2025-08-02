import { parseYamlArray } from './helpers/helper-functions.js';
import reportStatus from './report.js';
import retrieveCodeCoverage from './score_components/coverage.js';
import findProblematicComments from './score_components/find-problematic-comments.js';

/**
 * @description Compiles the health score components
 * @param {Object} context Context of the workflow run - https://github.com/actions/toolkit/blob/main/packages/github/src/context.ts
 * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
 * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
 * @returns {Promise<import('./types').HealthScore>} score Health score details object
 */
export async function compile(context, core, github) {
  // TODO: wire up action outputs
  const extensionInput = core.getInput('extension');
  const includeInput = core.getInput('include');
  const excludeInput = core.getInput('exclude');

  const extensions = parseYamlArray(extensionInput);
  const includes = parseYamlArray(includeInput);
  const excludes = parseYamlArray(excludeInput);

  let com = '';
  const misses = await coverage(context, core, github); // uncovered LoC
  if (extensions.length === 0) {
    core.error('Extensions not specified');
  } else {
    if (includes.length === 0)
      core.warning('Directories to be included not specified');
    com = grep(core, extensions, includes, excludes); // to-do et al comments
  }
  return {
    comments: com,
    coverageMisses: misses,
  };
}

export const grep = findProblematicComments;
export const coverage = retrieveCodeCoverage;
export const report = reportStatus;
