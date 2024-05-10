const getSHA = require('./get-sha');

/**
 * @param {Date} startTime the JavaScript Date of the start of this action's run
 * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
 * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
 * @param {import('./types').HealthScore} score The health score to be reported
 * @returns {Promise<number>} Total calculated health score
 */
module.exports = async function reportStatus(startTime, core, github, score) {
  const gh = core.getInput('github_token');
  if (!gh) {
    core.warning('No GitHub token found; will not report score on commit status.');
    return 0;
  }

  core.info(JSON.stringify(score, null, 2));
  // Calculate score
  const points = (
    (score.comments.length * 100)
    + (score.coverageMisses * 1)
  ) * -1;

  // Report the thing
  const ctx = github.context;
  const octokit = github.getOctokit(gh);
  let details = `# Score Breakdown

## Problematic Comments
${score.comments.map((c) => `- \`${c.trim()}\``).join('\n')}\n`;
  if (score.coverageMisses) {
    details += `\n## Code Coverage

According to [the code coverage for this project](https://app.codecov.io/gh/${ctx.repo.owner}/${ctx.repo.repo}), there are ${score.coverageMisses} uncovered lines of code.`;
  }

  // TODO: handle API call erroring out
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
    },
  });
  return points;
};
