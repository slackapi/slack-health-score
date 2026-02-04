import { mock } from 'node:test';
import hs from '../../src/health-score.js';

/**
 * The Mock class sets expected behaviors and test listeners for dependencies.
 */
export class Mock {
  /**
   * Setup mocked dependencies for all tests.
   */
  constructor() {
    this.core = {
      debug: mock.fn(),
      error: mock.fn(),
      getInput: mock.fn((key) => this.inputs[key] ?? ''),
      info: mock.fn(),
      setFailed: mock.fn(),
      setOutput: mock.fn(),
      warning: mock.fn(),
    };

    this.github = {
      context: {
        eventName: '',
        payload: {},
        repo: { owner: '', repo: '' },
        sha: '',
      },
      getOctokit: mock.fn(() => ({
        rest: {
          checks: {
            create: mock.fn(() => Promise.resolve({})),
          },
        },
      })),
    };

    this.codecov = {
      auth: mock.fn(),
      repos_commits_retrieve: mock.fn(() => {
        if (this.codecov._resolves !== undefined) {
          return Promise.resolve(this.codecov._resolves);
        }
        return Promise.resolve({ data: {} });
      }),
    };

    this.childProcess = {
      execSync: mock.fn(() => this.childProcess._returns ?? ''),
    };

    this.fs = {
      existsSync: mock.fn(() => this.fs._returns ?? false),
      readFileSync: mock.fn(() => this.fs._readReturns ?? ''),
    };

    this.inputs = {};
    this._grepReturns = [];
    this._coverageReturns = 0;

    // Create method mocks for hs module
    this.grep = mock.method(hs, 'grep', () => this._grepReturns);
    this.coverage = mock.method(hs, 'coverage', () =>
      Promise.resolve(this._coverageReturns),
    );
  }

  /**
   * Testing interface that removes internal state from existing mocks.
   */
  reset() {
    this.core.debug.mock.resetCalls();
    this.core.error.mock.resetCalls();
    this.core.getInput.mock.resetCalls();
    this.core.info.mock.resetCalls();
    this.core.setFailed.mock.resetCalls();
    this.core.setOutput.mock.resetCalls();
    this.core.warning.mock.resetCalls();
    this.github.getOctokit.mock.resetCalls();
    this.codecov.auth.mock.resetCalls();
    this.codecov.repos_commits_retrieve.mock.resetCalls();
    this.codecov._resolves = undefined;
    this.childProcess.execSync.mock.resetCalls();
    this.childProcess._returns = '';
    this.fs.existsSync.mock.resetCalls();
    this.fs._returns = false;
    this.fs.readFileSync.mock.resetCalls();
    this.fs._readReturns = '';
    this.inputs = {};
    this.github.context = {
      eventName: '',
      payload: {},
      repo: { owner: '', repo: '' },
      sha: '',
    };
    this._grepReturns = [];
    this._coverageReturns = 0;
    this.grep.mock.resetCalls();
    this.coverage.mock.resetCalls();
  }
}

export const mocks = new Mock();

// Backwards compatibility exports
export const fakeCore = mocks.core;
export const fakeGithub = mocks.github;
export const fakeCodecov = mocks.codecov;
export const fakeChildProcess = mocks.childProcess;
export const fakeFs = mocks.fs.existsSync;
export const fakeComments = mocks.grep;
export const fakeCoverage = mocks.coverage;
