const RootList = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
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
          "service"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "page": {
            "type": "integer",
            "description": "A page number within the paginated result set."
          },
          "page_size": {
            "type": "integer",
            "description": "Number of results to return per page."
          }
        }
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "count": {
          "type": "integer",
          "examples": [
            123
          ]
        },
        "next": {
          "type": [
            "string",
            "null"
          ],
          "format": "uri",
          "examples": [
            "http://api.example.org/accounts/?page=4"
          ]
        },
        "previous": {
          "type": [
            "string",
            "null"
          ],
          "format": "uri",
          "examples": [
            "http://api.example.org/accounts/?page=2"
          ]
        },
        "results": {
          "type": "array",
          "items": {
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
            ]
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default RootList
