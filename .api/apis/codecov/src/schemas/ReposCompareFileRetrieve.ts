const ReposCompareFileRetrieve = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "file_path": {
            "type": "string",
            "description": "file path"
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
          "file_path",
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
        "name": {
          "type": "object",
          "additionalProperties": true
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
        "has_diff": {
          "type": "boolean"
        },
        "stats": {
          "type": "object",
          "additionalProperties": true
        },
        "change_summary": {
          "type": "object",
          "additionalProperties": true
        },
        "lines": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "value": {
                "type": "string"
              },
              "number": {
                "type": "object",
                "additionalProperties": true
              },
              "coverage": {
                "type": "object",
                "additionalProperties": true
              },
              "is_diff": {
                "type": "boolean"
              },
              "added": {
                "type": "boolean"
              },
              "removed": {
                "type": "boolean"
              },
              "sessions": {
                "type": "integer"
              }
            },
            "required": [
              "added",
              "coverage",
              "is_diff",
              "number",
              "removed",
              "sessions",
              "value"
            ]
          }
        }
      },
      "required": [
        "change_summary",
        "has_diff",
        "lines",
        "name",
        "stats",
        "totals"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposCompareFileRetrieve
