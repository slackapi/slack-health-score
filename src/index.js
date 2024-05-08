const core = require('@actions/core');
const hs = require('./health-score');

console.log(hs.calc(core));
