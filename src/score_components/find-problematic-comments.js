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
};
