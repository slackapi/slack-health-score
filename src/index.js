const hs = require('./health-score');

module.exports = async ({ core, github }) => {
  const startTime = new Date();
  hs.compile(core, github)
    .then((score) => hs.report(startTime, core, github, score))
    .then(console.log)
    .catch((err) => {
      core.setFailed('Failed to check up on the health score!');
      console.error(err);
    });
};
