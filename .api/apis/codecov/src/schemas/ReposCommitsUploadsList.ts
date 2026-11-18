const ReposCommitsUploadsList = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "commitid": {
            "type": "string",
            "description": "commit SHA"
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
          "commitid",
          "owner_username",
          "repo_name",
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
              "created_at": {
                "type": "string"
              },
              "updated_at": {
                "type": "string"
              },
              "storage_path": {
                "type": "string"
              },
              "flags": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "provider": {
                "type": "string"
              },
              "build_code": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "job_code": {
                "type": "string"
              },
              "build_url": {
                "type": "string"
              },
              "state": {
                "type": "string"
              },
              "env": {
                "type": "object",
                "additionalProperties": true
              },
              "upload_type": {
                "type": "string"
              },
              "upload_extras": {
                "type": "object",
                "additionalProperties": true
              },
              "totals": {
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
                  }
                },
                "required": [
                  "branches",
                  "coverage",
                  "files",
                  "hits",
                  "lines",
                  "methods",
                  "misses",
                  "partials"
                ]
              }
            },
            "required": [
              "build_code",
              "build_url",
              "created_at",
              "env",
              "flags",
              "job_code",
              "name",
              "provider",
              "state",
              "storage_path",
              "totals",
              "updated_at",
              "upload_extras",
              "upload_type"
            ]
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposCommitsUploadsList
