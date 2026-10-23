const ReposPullsRetrieve = {
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
          "pullid": {
            "type": "string",
            "description": "pull ID"
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
          "pullid",
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
        "pullid": {
          "type": "integer",
          "title": "pull ID number"
        },
        "title": {
          "type": "string",
          "title": "title of the pull"
        },
        "base_totals": {
          "title": "coverage totals of base commit",
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
        "head_totals": {
          "title": "coverage totals of head commit",
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
        "updatestamp": {
          "type": "string",
          "format": "date-time",
          "title": "last updated timestamp"
        },
        "state": {
          "title": "state of the pull",
          "enum": [
            "open",
            "merged",
            "closed"
          ],
          "type": "string",
          "description": "* `open` - Open\n* `merged` - Merged\n* `closed` - Closed\n\n`open` `merged` `closed`"
        },
        "ci_passed": {
          "type": "boolean",
          "title": "indicates whether the CI process passed for the head commit of this pull"
        },
        "author": {
          "title": "pull author",
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
        }
      },
      "required": [
        "author",
        "base_totals",
        "ci_passed",
        "head_totals",
        "pullid",
        "state",
        "title",
        "updatestamp"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposPullsRetrieve
