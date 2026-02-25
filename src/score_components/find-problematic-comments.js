const CommentType = Object.freeze({
  TODO: 'TODO',
  FIXME: 'FIXME',
  HACK: 'HACK',
});

/**
 * @description Searches for problematic comments (TODO, FIXME, HACK) in the codebase
 * @param {import('@actions/core')} core `@actions/core` GitHub Actions core helper utility
 * @param {import('node:child_process')} childProcess Node.js child_process module
 * @param {import('node:fs')} fs Node.js fs module
 * @param {string[]} ext File extensions to search
 * @param {string[]} include Directories to include
 * @param {string[]} exclude Directories to exclude
 * @returns {Array<{path: string, line_no: number, comment: string, commentType: string|null}>} Array of problematic comments found
 */
export default function grepForProblematicComments(
  core,
  childProcess,
  fs,
  ext,
  include,
  exclude,
) {
  let find = 'find';
  if (include?.length) {
    for (const i of include) {
      find += ` ${i}`;
    }
  } else {
    find += ' .';
  }

  const conditions = ext.map((ex) => `-name "*.${ex}"`).join(' -o ');
  if (conditions) find += ` \\( ${conditions} \\) `;

  let ignores = [];
  if (exclude?.length) {
    ignores = exclude;
  } else if (fs.existsSync('.gitignore')) {
    ignores = fs
      .readFileSync('.gitignore')
      .toString()
      .split('\n')
      .filter(Boolean)
      .map((entry) => entry.trim());
  }
  for (const ex of ignores) {
    const isDirectory = ex.endsWith('/');
    if (isDirectory) {
      const dirPath = ex.slice(0, -1);
      find += ` -not -path "*/${dirPath}/*" -not -path "*/${dirPath}"`;
    } else {
      find += ` -not -path "*/${ex}"`;
    }
  }
  const commentPattern = `\\s*(//|/\\*|\\*).*\\b(${CommentType.TODO}|${CommentType.HACK}|${CommentType.FIXME})\\b`;

  // Modify the grep command to search within comments only
  find += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;
  let output = '';
  try {
    output = childProcess.execSync(find).toString().trim();
  } catch (e) {
    core.error(e);
    core.error('child_process execSync failed to execute');
  }
  const result = output
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      // example line output = "./src/report.js:47:  // TODO: handle API call erroring out"
      const [path, lineNo, ...data] = line.split(':');

      const lineData = data.join(':');
      const [_code, ...rawCommentData] = lineData.split('//');

      const commentData = rawCommentData.join('//');
      const commentType = getCommentType(commentData);

      return {
        path: path.trim(),
        line_no: Number.parseInt(lineNo, 10),
        comment: `//${commentData}`.trim(),
        commentType,
      };
    });
  return result;
}

/**
 * Get the comment type.
 * @param {string} comment
 * @returns {string|null} comment type or null
 */
function getCommentType(comment) {
  const cleanComment = comment.trim();
  if (cleanComment.startsWith(CommentType.TODO)) {
    return CommentType.TODO;
  }
  if (cleanComment.startsWith(CommentType.HACK)) {
    return CommentType.HACK;
  }
  if (cleanComment.startsWith(CommentType.FIXME)) {
    return CommentType.FIXME;
  }
  return null;
}
