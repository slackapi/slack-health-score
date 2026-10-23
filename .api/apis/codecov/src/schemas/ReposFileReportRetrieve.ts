const ReposFileReportRetrieve = {
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
          "path": {
            "type": "string",
            "description": "the file path for which to retrieve coverage info"
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
          "path",
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
          "items": {},
          "readOnly": true,
          "title": "line-by-line coverage values"
        },
        "commit_sha": {
          "type": "string",
          "readOnly": true,
          "title": "commit SHA of the commit for which coverage info was found"
        },
        "commit_file_url": {
          "type": "string",
          "readOnly": true,
          "title": "Codecov URL to see file coverage on commit."
        }
      },
      "required": [
        "commit_file_url",
        "commit_sha",
        "line_coverage",
        "name",
        "totals"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposFileReportRetrieve
