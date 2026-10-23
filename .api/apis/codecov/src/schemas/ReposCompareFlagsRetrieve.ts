const ReposCompareFlagsRetrieve = {
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
        "name": {
          "type": "string"
        },
        "base_report_totals": {
          "type": "string",
          "readOnly": true
        },
        "head_report_totals": {
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
        "diff_totals": {
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
        "base_report_totals",
        "diff_totals",
        "head_report_totals",
        "name"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposCompareFlagsRetrieve
