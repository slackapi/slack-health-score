# slack-health-score

[![codecov](https://codecov.io/gh/slackapi/slack-health-score/graph/badge.svg?token=WS6IJ61GUU)](https://codecov.io/gh/slackapi/slack-health-score)

> Report a rough metric on high level code quality based on some heuristics Slack Engineering employs

## Installation

### Workflow Setup

It is recommended to set up this action as a separate GitHub Workflow `job`. This way, any other continuous integration tasks that might be needed to run first, such as code coverage reporting, can be run in a separate job that the Health Score job requires to complete first.

The following is an example `job` that requires that the `test` job completes first:

```yaml
jobs:
  health-score:
    needs: test
    permissions:
      checks: write
      security-events: write
    runs-on: ubuntu-latest
    steps:
      - name: Setup repo
        uses: actions/checkout@v4
      - name: Report health score
        uses: slackapi/slack-health-score@v0
        with:
          codecov_token: ${{ secrets.CODECOV_API_TOKEN }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
          extension: ts
          include: src
```

### API Tokens

Two important notes about the API tokens this action relies on:

1. The `github_token` input is used to create a status check on PRs/commits and report the health score using this GitHub API. Therefore, this token must have `checks: write` permission. As you can see in the above example workflow YAML, this is explicitly provided to the job via `permissions: checks: write`.
2. The `codecov_token` input is used to _retrieve_ code coverage details from codecov.io. You _cannot_ use the CodeCov "Global Upload" token as it has insufficient permissions to access CodeCov's HTTP API. You _must_ use [a human-generated API token][codecov-token] for this input.

## Usage

```yaml
- uses: slackapi/slack-health-score@v0
  with:
    # The file extension to inspect as part of health score calculation. For example, 'js'
    # or 'go' These conditions are logically OR'ed together using -o (OR) in the find command.
    # This input is required.
    extension: ''

    # A GitHub access token with permissions to write GitHub Checks. Recommended to set
    # this to `${{ secrets.GITHUB_TOKEN }}` in a workflow `job` that has `checks: write`
    # permissions. See the full `job` example at the beginning of this README.
    # This input is required.
    github_token: ''

    # Only parse the specified files and directories (recursively). Defaults to `.`.
    # E.g. "src"
    include: ''

    # Ignore the specified files and directories. Essentially a direct argument into
    # `find` `-not -path "{arg}"`. Defaults to contents of `.gitignore`.
    # E.g. "node_modules"
    exclude: ''

    # A CodeCov API access token with read permissions to the repo. This _cannot_ be
    # a CodeCov "Global Upload" token - it _must_ be a human user API access token.
    # Setting this will try to pull coverage information for the repo from CodeCov to
    # include in health score calculation; not setting it will exclude code coverage
    # from health score calculation.
    codecov_token: ''

    # Maximum number of times to try retrieving code coverage information from codecov.
    # Defaults to 10.
    codecov_max_attempts: ''

    # Number of milliseconds to wait when retrying retrieving code coverage information
    # from codecov. Defaults to 10000 (10 seconds).
    codecov_retry_delay: ''

    # If retrieving code coverage from CodeCov times out (according to the configuration
    # set up via the `codecov_max_attempts` and `codecov_retry_delay` inputs), should that
    # cause this action to error out. Defaults to false.
    codecov_treat_timeout_as_error: ''
```

## What is Slack's Health Score?

Slack Engineering calculates a health score for software projects making up the product. This score is a heuristic or proxy metric for code quality. It is not perfect and is intended for providing awareness. The score ranges from some negative number to 0 - a score of 0 signals "no problems detected."

The score is currently calculated from the following:

- Problematic comments. Comments that include "TODO", "HACK" and "FIXME" tend to signal that some corners were cut and shortcuts taken, which may negatively impact the long-term health of a project.
- Missing code coverage. While not a perfect metric, code coverage via tests is generally correlated with higher quality.

[codecov-token]: https://docs.codecov.com/reference/overview
