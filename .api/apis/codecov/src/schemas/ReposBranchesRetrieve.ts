const ReposBranchesRetrieve = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "branch name"
          },
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
          "name",
          "owner_username",
          "repo_name",
          "service"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "title": "branch name"
        },
        "updatestamp": {
          "type": "string",
          "format": "date-time",
          "title": "last updated timestamp"
        },
        "head_commit": {
          "readOnly": true,
          "title": "branch's current head commit",
          "type": "object",
          "required": [
            "author",
            "branch",
            "ci_passed",
            "commitid",
            "message",
            "parent",
            "report",
            "state",
            "timestamp",
            "totals"
          ],
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
            },
            "report": {
              "title": "coverage report",
              "type": "object",
              "required": [
                "files",
                "totals"
              ],
              "properties": {
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
                    "messages",
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
                  }
                },
                "files": {
                  "readOnly": true,
                  "title": "file specific coverage totals",
                  "type": "object",
                  "required": [
                    "line_coverage",
                    "name",
                    "totals"
                  ],
                  "properties": {
                    "name": {
                      "type": "string",
                      "title": "file path"
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
                        "messages",
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
                      }
                    },
                    "line_coverage": {
                      "type": "array",
                      "readOnly": true,
                      "title": "line-by-line coverage values",
                      "items": {}
                    }
                  }
                }
              }
            }
          }
        }
      },
      "required": [
        "head_commit",
        "name",
        "updatestamp"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposBranchesRetrieve
