const child_process = require('child_process');
const fs = require('fs');

/**
 * Health Score object containing health score details.
 * @typedef {object} HealthScore
 * @property {Array.string} comments Array of problematic comments detected in code.
 */

module.exports = {
  /**
   * @description Compiles the health score components
   * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
   * @returns {HealthScore} score Health score details object
   */
  compile: function compileScore(core) {
    // TODO: wire up action outputs
    return {
      // TODO: support src as arrays
      comments: module.exports.grep(core.getInput('extension'), [core.getInput('src') || '.'], []), // to-do et al comments
    };
  },
  grep: function grepForProblematicComments(ext, include, exclude) {
    let find = 'find';
    if (include && include.length) {
      include.forEach((i) => {
        find += ` ${i}`;
      });
    } else {
      find += ' .';
    }
    find += ` -name "*.${ext}"`;
    let ignores = [];
    if (exclude && exclude.length) {
      ignores = exclude;
    } else if (fs.existsSync('.gitignore')) {
      ignores = fs.readFileSync('.gitignore').toString().split('\n')
        .filter(Boolean)
        .map((entry) => entry.trim());
    }
    ignores.forEach((ex) => {
      find += ` -not -path "*/${ex}/*" -not -path "*/${ex}"`;
    });
    find += ' -exec grep -E \'TODO|HACK|FIXME\' {} \\;';
    console.log(find);
    let output;
    try {
      output = child_process.execSync(find).toString().trim();
      console.log(output);
    } catch (e) {
      // TODO: handle error
    }
    return output.split('\n').filter(Boolean);
  },
  /**
   * @param {Date} startTime the JavaScript Date of the start of this action's run
   * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
   * @param {import('@actions/github')} github `@actions/github` GitHub Actions core helper utility
   * @param {HealthScore} score The health score to be reported
   * @returns {Promise<number>} Total calculated health score
   */
  report: async function reportStatus(startTime, core, github, score) {
    const gh = core.getInput('github_token');
    if (!gh) {
      core.warning('No GitHub token found; will not report score on commit status.');
      return 0;
    }
    // Calculate score
    const points = (
      score.comments.length * 100
    ) * -1;

    // Report the thing
    const ctx = github.context;
    // TODO: replace console logs with core.debug et al
    console.log('github event, payload', ctx.eventName, ctx.payload);
    let sha;
    switch (ctx.eventName) {
      case 'pull_request':
        sha = ctx.payload.after;
        break;
      // TODO: what about the push-to-main case?
      default:
        sha = ctx.sha;
    }
    const octokit = github.getOctokit(gh);
    // TODO: handle API call erroring out
    await octokit.rest.checks.create({
      name: 'Health Score',
      owner: ctx.repo.owner,
      repo: ctx.repo.repo,
      head_sha: sha,
      status: 'completed',
      conclusion: 'neutral',
      completed_at: new Date().toISOString(),
      started_at: startTime.toISOString(),
      output: {
        title: `${points}`,
        summary: `${points} health score points`,
        text: `# Score Breakdown

## Problematic Comments
${score.comments.map((c) => `- \`${c.trim()}\``).join('\n')}`,
      },
    });
    return points;
  },
};
