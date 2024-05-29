const fs = require('fs');
const child_process = require('child_process');

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
  const commentPattern = '\\s*(//|/\\*|\\*).*\\b(TODO|HACK|FIXME)\\b';

  // Modify the grep command to search within comments only
  find += ` -exec sh -c 'grep -EHn "${commentPattern}" "$0"' {} \\;`;
  let output = '';
  try {
    output = child_process.execSync(find).toString().trim();
  } catch (e) {
    core.error('child_process execSync failed to execute');
  }
  const result = output.split('\n').filter(Boolean).map((line) => {
    const [path, lineNo, type, commentData] = line.split(':');
    if (type) type.trim();
    if (commentData) commentData.trim();
    const comment = (commentData == null) ? type.trim() : (`${type.trim()}: ${commentData.trim()}`).trim();
    return { path: path.trim(), line_no: parseInt(lineNo, 10), comment };
  });
  return result;
};
