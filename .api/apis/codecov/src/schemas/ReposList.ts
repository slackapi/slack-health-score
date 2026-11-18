const ReposList = {
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
          "service"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "active": {
            "type": "boolean",
            "description": "whether the repository has received an upload"
          },
          "names": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "list of repository names"
          },
          "page": {
            "type": "integer",
            "description": "A page number within the paginated result set."
          },
          "page_size": {
            "type": "integer",
            "description": "Number of results to return per page."
          },
          "search": {
            "type": "string",
            "description": "A search term."
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
              "name": {
                "type": "string",
                "title": "repository name"
              },
              "private": {
                "type": "boolean",
                "title": "indicates private vs. public repository"
              },
              "updatestamp": {
                "type": "string",
                "format": "date-time",
                "title": "last updated timestamp"
              },
              "author": {
                "title": "repository owner",
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
              "language": {
                "type": "string",
                "title": "primary programming language used"
              },
              "branch": {
                "type": "string",
                "title": "default branch name"
              },
              "active": {
                "type": "boolean",
                "title": "indicates whether the repository has received a coverage upload"
              },
              "activated": {
                "type": "boolean",
                "title": "indicates whether the repository has been manually deactivated"
              },
              "totals": {
                "title": "recent commit totals on the default branch",
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
              }
            },
            "required": [
              "activated",
              "active",
              "author",
              "branch",
              "language",
              "name",
              "private",
              "totals",
              "updatestamp"
            ]
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposList
