const core = require('@actions/core');
const hs = require('./health-score');

const score = hs.calc(core);
console.log(score);
// TODO: report the score using github status checks
// hs.report(score);
