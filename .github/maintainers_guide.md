# Maintainers Guide

This document describes tools, tasks and workflow that one needs to be familiar with in order to effectively maintain
this project. If you use this package within your own software as is but don't plan on modifying it, this guide is
**not** for you.

## Tools

All you need to work with this project is a supported version of [Node.js](https://nodejs.org/en/)
(see `package.json` field "engines") and npm (which is distributed with Node.js).

## Tasks

### Developing

Iterate quickly by developing and testing a local version of this action using `npm run local`.
Information on setting up and configuring mocked events can be found in [`.github/workflows/local/README.md`](./workflows/local/README.md).

### Testing

When testing locally, ensure at least linting and unit tests pass by running `npm test`.
Additionally, sending a PR is highly recommended with every change as there are several GitHub
Actions jobs that execute what are effectively integration tests for this GitHub Action.

#### Checks on PRs

Actions that run the integration tests on PRs from a fork will require approval before running.
These checks use stored secrets so the changes should be reviewed before approving the workflow to
avoid accidently leaking tokens!

### Releasing

1. Look at the issues merged since the last release and consult the contributors to the next version to release. It must follow [semantic versioning](https://semver.org/).
2. Create a new branch from `main` name it the release version (example: `v0.1.1`)
    1. Update the `"version"` field in `package.json`.
    2. Update all references to versions in the `README.md` to refer to the latest release.
    3. Run all tests using `npm test` to make sure the tests pass.
3. Commit the changes and open a Pull Request to merge your release branch into `main`.
4. Create a GitHub Release:
    1. `Draft a new release` from the [release page](https://github.com/slackapi/slack-health-score/releases).
    2. Check the "Publish this Action to the GitHub Marketplace" checkbox.
    3. Leave the default settings for this project.
    4. Input a manual tag in the "Choose a tag" input that matches the version in `package.json`; click the "Create a new tag" button under the input. (this will not immediately create a tag, but only once you are doing creating the release)
    5. Manually select the previous latest tag in the "Previous tag" dropdown, then click "Generate release notes" and review them: make sure they make sense for a consumer of the Action.
    6. Release title should be automatically populated to match the new tag name. (example: `v0.1.1`)
    7. Check the `Set as the latest release` box.
    8. Click "Publish release". This will trigger the `publish.yml` GitHub workflow, which, once complete, will also overwrite the major, minor and patch tags of this project
5. Notify the appropriate channels of the release.

## Workflow

### Versioning and Tags

This project is versioned using [Semantic Versioning](http://semver.org/), particularly in the
[npm flavor](https://docs.npmjs.com/getting-started/semantic-versioning). Each release is tagged
using git.

### Fork

As a maintainer, the development you do will be almost entirely off of your forked version of this repository. The exception to this rule pertains to multiple collaborators working on the same feature, which is detailed in the **Branches** section below.

### Branches

`main` is where active development occurs.

When developing, branches should be created off of your fork and not directly off of this repository. If working on a long-running feature and in collaboration with others, a corresponding branch of the same name is permitted. This makes collaboration on a single branch possible, as contributors working on the same feature cannot push commits to others' open Pull Requests.

After a major version increment, there also may be maintenance branches created specifically for supporting older major versions.

### Issue Management

Labels are used to run issues through an organized workflow. Here are the basic definitions:

* `bug`: A confirmed bug report. A bug is considered confirmed when reproduction steps have been
   documented and the issue has been reproduced.
* `enhancement`: A feature request for something this package might not already do.
* `docs`: An issue that is purely about documentation work.
* `tests`: An issue that is purely about testing work.
* `needs feedback`: An issue that may have claimed to be a bug but was not reproducible, or was otherwise missing some information.
* `discussion`: An issue that is purely meant to hold a discussion. Typically the maintainers are looking for feedback in this issues.
* `question`: An issue that is like a support request because the user's usage was not correct.
* `semver:major|minor|patch`: Metadata about how resolving this issue would affect the version number.
* `security`: An issue that has special consideration for security reasons.
* `good first contribution`: An issue that has a well-defined relatively-small scope, with clear expectations. It helps when the testing approach is also known.
* `duplicate`: An issue that is functionally the same as another issue. Apply this only if you've linked the other issue by number.

**Triage** is the process of taking new issues that aren't yet "seen" and marking them with a basic
level of information with labels. An issue should have **one** of the following labels applied:
`bug`, `enhancement`, `question`, `needs feedback`, `docs`, `tests`, or `discussion`.

Issues are closed when a resolution has been reached. If for any reason a closed issue seems
relevant once again, reopening is great and better than creating a duplicate issue.

## Everything else

When in doubt, find the other maintainers and ask.
