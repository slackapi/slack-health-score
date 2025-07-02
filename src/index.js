const hs = require('./health-score');

module.exports = async ({ context, core, github }) => {
  const startTime = new Date();
  hs.compile(context, core, github)
    .then((score) => hs.report(context, startTime, core, github, score))
    .then(console.log)
    .catch((err) => {
      core.setFailed('Failed to check up on the health score!');
      console.error(err);
    });
};
