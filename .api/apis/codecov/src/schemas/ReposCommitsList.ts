const ReposCommitsList = {
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
          "branch": {
            "type": "string",
            "description": "branch name"
          },
          "page": {
            "type": "integer",
            "description": "A page number within the paginated result set."
          },
          "page_size": {
            "type": "integer",
            "description": "Number of results to return per page."
          }
        }
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "count": {
          "type": "integer",
          "examples": [
            123
          ]
        },
        "next": {
          "type": [
            "string",
            "null"
          ],
          "format": "uri",
          "examples": [
            "http://api.example.org/accounts/?page=4"
          ]
        },
        "previous": {
          "type": [
            "string",
            "null"
          ],
          "format": "uri",
          "examples": [
            "http://api.example.org/accounts/?page=2"
          ]
        },
        "results": {
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
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposCommitsList
