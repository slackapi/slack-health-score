import childProcess from 'node:child_process';
import fs from 'node:fs';
import * as core from '@actions/core';
import * as github from '@actions/github';
import codecov from '@api/codecov';
import getSHA from './get-sha.js';
import hs from './health-score.js';

const deps = { childProcess, fs, codecov, getSHA };

const startTime = new Date();
hs.compile(core, github, deps)
  .then((score) => hs.report(startTime, core, github, score))
  .then(console.log)
  .catch((err) => {
    core.setFailed('Failed to check up on the health score!');
    console.error(err);
  });
