const UsersList = {
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
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "activated": {
            "type": "boolean"
          },
          "is_admin": {
            "type": "boolean"
          },
          "page": {
            "type": "integer",
            "description": "A page number within the paginated result set."
          },
          "page_size": {
            "type": "integer",
            "description": "Number of results to return per page."
          },
          "search": {
            "type": "string",
            "description": "A search term."
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
                ]
              },
              "name": {
                "type": [
                  "string",
                  "null"
                ]
              },
              "activated": {
                "type": "boolean"
              },
              "is_admin": {
                "type": "boolean"
              },
              "email": {
                "type": [
                  "string",
                  "null"
                ]
              }
            },
            "required": [
              "activated",
              "is_admin",
              "service"
            ]
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default UsersList
