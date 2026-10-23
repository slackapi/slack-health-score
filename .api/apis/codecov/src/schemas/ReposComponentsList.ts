const ReposComponentsList = {
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
            "description": "branch name for which to return components (of head commit)"
          },
          "sha": {
            "type": "string",
            "description": "commit SHA for which to return components"
          }
        }
      }
    ]
  },
  "response": {
    "200": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "component_id": {
            "type": "string"
          },
          "name": {
            "type": "string",
            "title": "component name"
          },
          "coverage": {
            "type": "number",
            "format": "double",
            "title": "component coverage"
          }
        },
        "required": [
          "component_id",
          "coverage",
          "name"
        ]
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposComponentsList
