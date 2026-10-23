const ReposReportTreeRetrieve = {
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
          "depth": {
            "type": "string",
            "description": "depth of the traversal (default=1)"
          },
          "flag": {
            "type": "string",
            "description": "filter report to only include info pertaining to given flag name"
          },
          "path": {
            "type": "string",
            "description": "starting path of the traversal (default is root path)"
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
          "type": "string"
        },
        "full_path": {
          "type": "string"
        },
        "coverage": {
          "type": "number",
          "format": "double"
        },
        "lines": {
          "type": "integer"
        },
        "hits": {
          "type": "integer"
        },
        "partials": {
          "type": "integer"
        },
        "misses": {
          "type": "integer"
        }
      },
      "required": [
        "coverage",
        "full_path",
        "hits",
        "lines",
        "misses",
        "name",
        "partials"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposReportTreeRetrieve
