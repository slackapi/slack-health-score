const getSHA = require('./get-sha');
const { getAnnotations } = require('./helpers/helper-functions');

const UNCOVERED_LINE_PENALTY = 1;
const PROBLEMATIC_COMMENT_PENALTY = 100;

/**
 * @param {Date} startTime the JavaScript Date of the start of this action's run
 * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
 * @param {import('@octokit/rest').Octokit} github `@actions/github` GitHub Actions core helper utility
 * @param {import('./types').HealthScore} score The health score to be reported
 * @returns {Promise<number>} Total calculated health score
 */
module.exports = async function reportStatus(
  context,
  startTime,
  core,
  github,
  score,
) {
  const gh = core.getInput('github_token');
  if (!gh) {
    core.warning(
      'No GitHub token found; will not report score on commit status.',
    );
    return 0;
  }

  core.info(JSON.stringify(score, null, 2));
  // Calculate score
  const points =
    (score.comments.length * PROBLEMATIC_COMMENT_PENALTY +
      score.coverageMisses * UNCOVERED_LINE_PENALTY) *
    -1;

  // Report the thing
  const ctx = context;
  const octokit = github;
  let details = `# Score Breakdown
`;
  if (score.comments?.length) {
    details += `
## Problematic Comments

Each problematic comment (i.e. comments with TODO, HACK or FIXME in it) contributes -${PROBLEMATIC_COMMENT_PENALTY} points to the health score.

${score.comments.map((c) => `- \`${c.comment}\``).join('\n')}\n`;
  }
  if (score.coverageMisses) {
    details += `\n## Code Coverage

According to [the code coverage for this project](https://app.codecov.io/gh/${ctx.repo.owner}/${ctx.repo.repo}), there are ${score.coverageMisses} uncovered lines of code. Each uncovered line of code contributes -${UNCOVERED_LINE_PENALTY} to the health score.`;
  }
  const annotations = getAnnotations(score.comments);
  // TODO: handle API call erroring out
  try {
    core.info('-=- start -=-');
    await octokit.rest.checks.create({
      name: 'Health Score',
      owner: ctx.repo.owner,
      repo: ctx.repo.repo,
      head_sha: getSHA(core, github),
      status: 'completed',
      conclusion: 'neutral',
      completed_at: new Date().toISOString(),
      started_at: startTime.toISOString(),
      output: {
        title: `${points}`,
        summary: `${points} health score points`,
        text: details,
        annotations,
      },
    });
  } catch (e) {
    core.info('-=- error -=-');
    core.error(e);
    core.debug('-=- debug -=-');
    core.error('Octokit checks creation call failed');
  }
  return points;
};
