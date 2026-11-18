const ReposCompareSegmentsRetrieve = {
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
        "segments": {
          "readOnly": true,
          "type": "object",
          "required": [
            "has_unintended_changes",
            "header",
            "lines"
          ],
          "properties": {
            "header": {
              "type": "string",
              "readOnly": true
            },
            "has_unintended_changes": {
              "type": "boolean"
            },
            "lines": {
              "type": "array",
              "readOnly": true,
              "items": {}
            }
          }
        }
      },
      "required": [
        "segments"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposCompareSegmentsRetrieve
