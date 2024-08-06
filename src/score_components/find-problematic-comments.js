const fs = require('fs');
const child_process = require('child_process');

const CommentType = Object.freeze({
  TODO: 'TODO',
  FIXME: 'FIXME',
  HACK: 'HACK',
});

module.exports = function grepForProblematicComments(core, ext, include, exclude) {
  let find = 'find';
  if (include && include.length) {
    include.forEach((i) => {
      find += ` ${i}`;
    });
  } else {
    find += ' .';
  }

  const conditions = ext.map((ex) => `-name "*.${ex}"`).join(' -o ');
  if (conditions) find += ` \\( ${conditions} \\) `;

  let ignores = [];
  if (exclude && exclude.length) {
    ignores = exclude;
  } else if (fs.existsSync('.gitignore')) {
    ignores = fs.readFileSync('.gitignore').toString().split('\n')
      .filter(Boolean)
      .map((entry) => entry.trim());
  }
  ignores.forEach((ex) => {
    const isDirectory = ex.endsWith('/');
    if (isDirectory) {
      const dirPath = ex.slice(0, -1);
      find += ` -not -path "*/${dirPath}/*" -not -path "*/${dirPath}"`;
    } else {
      find += ` -not -path "*/${ex}"`;
    }
  });
  const commentPattern = `\\s*(//|/\\*|\\*).*\\b(${CommentType.TODO}|${CommentType.HACK}|${CommentType.FIXME})\\b`;

  // Modify the grep command to search within comments only
  find += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;
  let output = '';
  try {
    output = child_process.execSync(find).toString().trim();
  } catch (e) {
    core.error(e);
    core.error('child_process execSync failed to execute');
  }
  const result = output.split('\n').filter(Boolean).map((line) => {
    // example line output = "./src/report.js:47:  // TODO: handle API call erroring out"
    const [path, lineNo, ...data] = line.split(':');

    const lineData = data.join(':');
    const [_code, ...rawCommentData] = lineData.split('//');

    const commentData = rawCommentData.join('//');
    const commentType = getCommentType(commentData);

    return { path: path.trim(), line_no: parseInt(lineNo, 10), comment: `//${commentData}`.trim(), commentType };
  });
  return result;
};

/**
 * Returns the comment type or null 
 * @param {String} comment
 * @returns {String|null}
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
