/**
 * @param {Object} context Context of the workflow run - https://github.com/actions/toolkit/blob/main/packages/github/src/context.ts
 * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
 * @returns {string} SHA of the commit being inspected, regardless of underlying GitHub event
 */
module.exports = function getCommitSHA(context, core) {
  // Get GitHub-event-relevant contextual details, like commit SHA
  core.debug(
    `event is ${context.eventName} with payload ${JSON.stringify(context.payload, null, 2)}`,
  );
  let sha;
  // Depending on the exact GitHub event that triggers the action, we need to report the status on different payload
  // fields representing the correct SHA
  switch (context.eventName) {
    case 'pull_request':
      sha =
        context.payload.after ||
        context.payload.pull_request.head.sha ||
        context.sha;
      break;
    case 'pull_request_target':
      sha = context.payload.pull_request.head.sha;
      break;
    default:
      sha = context.sha;
  }
  if (!sha) {
    throw new Error(
      `Could not determine SHA from GitHub context payload: ${JSON.stringify(context, null, 2)}`,
    );
  }
  core.info(`Using SHA: ${sha}`);
  return sha;
};
