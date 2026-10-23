const RootRetrieve = {
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
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
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
      },
      "required": [
        "name",
        "service",
        "username"
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default RootRetrieve
