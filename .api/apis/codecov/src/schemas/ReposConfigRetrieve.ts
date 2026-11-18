const ReposConfigRetrieve = {
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
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "upload_token": {
          "type": "string",
          "title": "token used for uploading coverage reports for this repo"
        },
        "graph_token": {
          "type": "string",
          "title": "token used for repository graphs"
        }
      },
      "required": [
        "graph_token",
        "upload_token"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposConfigRetrieve
