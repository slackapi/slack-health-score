const ReposCompareRetrieve = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "owner_username": {
            "type": "string",
            "description": "username from service provider"
          },
          "repo_name": {
            "type": "string",
            "description": "repository name"
          },
          "service": {
            "type": "string",
            "enum": [
              "bitbucket",
              "bitbucket_server",
              "github",
              "github_enterprise",
              "gitlab",
              "gitlab_enterprise"
            ],
            "description": "Git hosting service provider"
          }
        },
        "required": [
          "owner_username",
          "repo_name",
          "service"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "base": {
            "type": "string",
            "description": "base commit SHA (`head` also required)"
          },
          "head": {
            "type": "string",
            "description": "head commit SHA (`base` also required)"
          },
          "pullid": {
            "type": "integer",
            "description": "pull ID on which to perform the comparison (alternative to specifying `base` and `head`)"
          }
        }
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "base_commit": {
          "type": "string"
        },
        "head_commit": {
          "type": "string"
        },
        "totals": {
          "type": "object",
          "properties": {
            "base": {
              "type": "object",
              "properties": {
                "files": {
                  "type": "integer"
                },
                "lines": {
                  "type": "integer"
                },
                "hits": {
                  "type": "integer"
                },
                "misses": {
                  "type": "integer"
                },
                "partials": {
                  "type": "integer"
                },
                "coverage": {
                  "type": "number",
                  "format": "double",
                  "readOnly": true
                },
                "branches": {
                  "type": "integer"
                },
                "methods": {
                  "type": "integer"
                },
                "messages": {
                  "type": "integer"
                },
                "sessions": {
                  "type": "integer"
                },
                "complexity": {
                  "type": "number",
                  "format": "double"
                },
                "complexity_total": {
                  "type": "number",
                  "format": "double"
                },
                "complexity_ratio": {
                  "type": "number",
                  "format": "double",
                  "readOnly": true
                },
                "diff": {
                  "type": "object",
                  "additionalProperties": true
                }
              },
              "required": [
                "branches",
                "complexity",
                "complexity_ratio",
                "complexity_total",
                "coverage",
                "diff",
                "files",
                "hits",
                "lines",
                "messages",
                "methods",
                "misses",
                "partials",
                "sessions"
              ]
            },
            "head": {
              "type": "object",
              "properties": {
                "files": {
                  "type": "integer"
                },
                "lines": {
                  "type": "integer"
                },
                "hits": {
                  "type": "integer"
                },
                "misses": {
                  "type": "integer"
                },
                "partials": {
                  "type": "integer"
                },
                "coverage": {
                  "type": "number",
                  "format": "double",
                  "readOnly": true
                },
                "branches": {
                  "type": "integer"
                },
                "methods": {
                  "type": "integer"
                },
                "messages": {
                  "type": "integer"
                },
                "sessions": {
                  "type": "integer"
                },
                "complexity": {
                  "type": "number",
                  "format": "double"
                },
                "complexity_total": {
                  "type": "number",
                  "format": "double"
                },
                "complexity_ratio": {
                  "type": "number",
                  "format": "double",
                  "readOnly": true
                },
                "diff": {
                  "type": "object",
                  "additionalProperties": true
                }
              },
              "required": [
                "branches",
                "complexity",
                "complexity_ratio",
                "complexity_total",
                "coverage",
                "diff",
                "files",
                "hits",
                "lines",
                "messages",
                "methods",
                "misses",
                "partials",
                "sessions"
              ]
            },
            "patch": {
              "type": "object",
              "properties": {
                "files": {
                  "type": "integer"
                },
                "lines": {
                  "type": "integer"
                },
                "hits": {
                  "type": "integer"
                },
                "misses": {
                  "type": "integer"
                },
                "partials": {
                  "type": "integer"
                },
                "coverage": {
                  "type": "number",
                  "format": "double",
                  "readOnly": true
                },
                "branches": {
                  "type": "integer"
                },
                "methods": {
                  "type": "integer"
                },
                "messages": {
                  "type": "integer"
                },
                "sessions": {
                  "type": "integer"
                },
                "complexity": {
                  "type": "number",
                  "format": "double"
                },
                "complexity_total": {
                  "type": "number",
                  "format": "double"
                },
                "complexity_ratio": {
                  "type": "number",
                  "format": "double",
                  "readOnly": true
                },
                "diff": {
                  "type": "object",
                  "additionalProperties": true
                }
              },
              "required": [
                "branches",
                "complexity",
                "complexity_ratio",
                "complexity_total",
                "coverage",
                "diff",
                "files",
                "hits",
                "lines",
                "messages",
                "methods",
                "misses",
                "partials",
                "sessions"
              ]
            }
          },
          "required": [
            "base",
            "head",
            "patch"
          ]
        },
        "commit_uploads": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "commitid": {
                "type": "string",
                "title": "commit SHA"
              },
              "message": {
                "type": "string",
                "title": "commit message"
              },
              "timestamp": {
                "type": "string",
                "format": "date-time",
                "title": "timestamp when commit was made"
              },
              "ci_passed": {
                "type": "boolean",
                "title": "indicates whether the CI process passed for this commit"
              },
              "author": {
                "title": "author of the commit",
                "type": "object",
                "required": [
                  "name",
                  "service",
                  "username"
                ],
                "properties": {
                  "service": {
                    "readOnly": true,
                    "enum": [
                      "github",
                      "gitlab",
                      "bitbucket",
                      "github_enterprise",
                      "gitlab_enterprise",
                      "bitbucket_server"
                    ],
                    "type": "string",
                    "description": "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`"
                  },
                  "username": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "readOnly": true
                  },
                  "name": {
                    "type": [
                      "string",
                      "null"
                    ],
                    "readOnly": true
                  }
                }
              },
              "branch": {
                "type": "string",
                "title": "branch name on which this commit currently lives"
              },
              "totals": {
                "title": "coverage totals",
                "type": "object",
                "required": [
                  "branches",
                  "complexity",
                  "complexity_ratio",
                  "complexity_total",
                  "coverage",
                  "diff",
                  "files",
                  "hits",
                  "lines",
                  "methods",
                  "misses",
                  "partials",
                  "sessions"
                ],
                "properties": {
                  "files": {
                    "type": "integer"
                  },
                  "lines": {
                    "type": "integer"
                  },
                  "hits": {
                    "type": "integer"
                  },
                  "misses": {
                    "type": "integer"
                  },
                  "partials": {
                    "type": "integer"
                  },
                  "coverage": {
                    "type": "number",
                    "format": "double",
                    "readOnly": true
                  },
                  "branches": {
                    "type": "integer"
                  },
                  "methods": {
                    "type": "integer"
                  },
                  "sessions": {
                    "type": "integer"
                  },
                  "complexity": {
                    "type": "number",
                    "format": "double"
                  },
                  "complexity_total": {
                    "type": "number",
                    "format": "double"
                  },
                  "complexity_ratio": {
                    "type": "number",
                    "format": "double",
                    "readOnly": true
                  },
                  "diff": {
                    "type": "integer",
                    "readOnly": true,
                    "title": "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead."
                  }
                }
              },
              "state": {
                "title": "Codecov processing state for this commit",
                "enum": [
                  "complete",
                  "pending",
                  "error",
                  "skipped"
                ],
                "type": "string",
                "description": "* `complete` - Complete\n* `pending` - Pending\n* `error` - Error\n* `skipped` - Skipped\n\n`complete` `pending` `error` `skipped`"
              },
              "parent": {
                "type": "string",
                "title": "commit SHA of first ancestor commit with coverage"
              }
            },
            "required": [
              "author",
              "branch",
              "ci_passed",
              "commitid",
              "message",
              "parent",
              "state",
              "timestamp",
              "totals"
            ]
          }
        },
        "diff": {
          "type": "object",
          "additionalProperties": true,
          "readOnly": true
        },
        "files": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": true
          },
          "readOnly": true
        },
        "untracked": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "readOnly": true
        },
        "has_unmerged_base_commits": {
          "type": "boolean"
        }
      },
      "required": [
        "base_commit",
        "commit_uploads",
        "diff",
        "files",
        "has_unmerged_base_commits",
        "head_commit",
        "totals",
        "untracked"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposCompareRetrieve
