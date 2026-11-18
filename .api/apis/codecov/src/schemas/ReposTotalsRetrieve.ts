const ReposTotalsRetrieve = {
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
            "description": "branch name for which to return report (of head commit)"
          },
          "component_id": {
            "type": "string",
            "description": "filter report to only include info pertaining to given component id"
          },
          "flag": {
            "type": "string",
            "description": "filter report to only include info pertaining to given flag name"
          },
          "path": {
            "type": "string",
            "description": "filter report to only include file paths starting with this value"
          },
          "sha": {
            "type": "string",
            "description": "commit SHA for which to return report"
          }
        }
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
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
        },
        "commit_file_url": {
          "type": "string",
          "title": "Codecov url to see file coverage on commit. Can be unreliable with partial path names."
        }
      },
      "required": [
        "commit_file_url",
        "files",
        "totals"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposTotalsRetrieve
