# slack-health-score

[![codecov](https://codecov.io/gh/slackapi/slack-health-score/graph/badge.svg?token=WS6IJ61GUU)](https://codecov.io/gh/slackapi/slack-health-score)

> Report a rough metric on high level code quality based on some heuristics Slack Engineering employs

## Installation

### Workflow Setup

It is recommended to set up this action as a separate GitHub Workflow `job`. This way, any other continuous integration tasks that might be needed to run first, such as code coverage reporting, can be run in a separate job that the Health Score job requires to complete first.

The following is an example `job` that requires that the `test` job completes first:

```yaml
  health-score:
    needs: test
    permissions:
      checks: write
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
2. The `codecov_token` input is used to _retrieve_ code coverage details from codecov.io. You _cannot_ use the CodeCov "Global Upload" token as it has insufficient permissions to access CodeCov's HTTP API. You _must_ use a human-generated API token for this input.
