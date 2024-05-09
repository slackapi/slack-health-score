const child_process = require('child_process');
const fs = require('fs');

module.exports = {
  calc: function calculateScore(/* core */) {
    // TODO: wire up action inputs
    console.log('pwd:', child_process.execSync('pwd').toString());
    console.log('ls -al:', child_process.execSync('ls -al').toString());
    // TODO: wire up action outputs
    return module.exports.grep('js', ['src'], []);
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
    return output.split('\n').filter(Boolean).length;
  },
};
