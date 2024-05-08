const core = require('@actions/core');
const hs = require('./health-score');

hs.calc(core);
