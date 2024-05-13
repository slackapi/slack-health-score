# slack-health-score

[![codecov](https://codecov.io/gh/slackapi/slack-health-score/graph/badge.svg?token=WS6IJ61GUU)](https://codecov.io/gh/slackapi/slack-health-score)

> Report a rough metric on high level code quality based on some heuristics Slack Engineering employs

## Installation

In order for this Action to work on your repo, your repo's Settings -> Actions -> Workflow Permissions must be set to "Read and write permissions." This gives this Action the ability to write Checks. If this setting is configured to Read only, then you may encounter the following error:

> Resource not accessible by integration - https://docs.github.com/rest/checks/runs#create-a-check-run
