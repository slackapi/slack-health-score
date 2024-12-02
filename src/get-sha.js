/**
 * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
 * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
 * @returns {string} SHA of the commit being inspected, regardless of underlying GitHub event
 */
module.exports = function getCommitSHA(core, github) {
  // Get GitHub-event-relevant contextual details, like commit SHA
  const ctx = github.context;
  core.debug(
    `event is ${ctx.eventName} with payload ${JSON.stringify(ctx.payload, null, 2)}`,
  );
  let sha;
  // Depending on the exact GitHub event that triggers the action, we need to report the status on different payload
  // fields representing the correct SHA
  switch (ctx.eventName) {
    case 'pull_request':
      sha = ctx.payload.after || ctx.payload.pull_request.head.sha || ctx.sha;
      break;
    case 'pull_request_target':
      sha = ctx.payload.pull_request.head.sha;
      break;
    default:
      sha = ctx.sha;
  }
  if (!sha) {
    throw new Error(
      `Could not determine SHA from GitHub context payload: ${JSON.stringify(ctx, null, 2)}`,
    );
  }
  core.info(`Using SHA: ${sha}`);
  return sha;
};
