const fs = require('fs');
const child_process = require('child_process');

module.exports = function grepForProblematicComments(ext, include, exclude) {
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
    const isDirectory = ex.endsWith('/');
    if (isDirectory) {
      const dirPath = ex.slice(0, -1);
      find += ` -not -path "*/${dirPath}/*" -not -path "*/${dirPath}"`;
    } else {
      find += ` -not -path "*/${ex}"`;
    }
  });
  find += ' -exec grep -E \'TODO|HACK|FIXME\' {} \\;';
  let output;
  try {
    output = child_process.execSync(find).toString().trim();
  } catch (e) {
    // TODO: handle error
    output = ''; // temporary fix to avoid undefined
  }
  return output.split('\n').filter(Boolean);
};
