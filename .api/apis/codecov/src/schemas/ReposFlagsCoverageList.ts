const ReposFlagsCoverageList = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "flag_name": {
            "type": "string"
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
          "flag_name",
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
            "description": "branch name"
          },
          "end_date": {
            "type": "string",
            "format": "date-time",
            "description": "end datetime (inclusive)"
          },
          "interval": {
            "type": "string",
            "enum": [
              "1d",
              "30d",
              "7d"
            ],
            "description": "* `1d` - 1 day\n* `7d` - 7 day\n* `30d` - 30 day"
          },
          "page": {
            "type": "integer",
            "description": "A page number within the paginated result set."
          },
          "page_size": {
            "type": "integer",
            "description": "Number of results to return per page."
          },
          "start_date": {
            "type": "string",
            "format": "date-time",
            "description": "start datetime (inclusive)"
          }
        },
        "required": [
          "interval"
        ]
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
              "timestamp": {
                "type": "string",
                "format": "date-time",
                "title": "timestamp at the start of the interval"
              },
              "min": {
                "type": "number",
                "format": "double",
                "title": "minimum value in the interval"
              },
              "max": {
                "type": "number",
                "format": "double",
                "title": "maximum value in the interval"
              },
              "avg": {
                "type": "number",
                "format": "double",
                "title": "average value in the interval"
              }
            },
            "required": [
              "avg",
              "max",
              "min",
              "timestamp"
            ]
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ReposFlagsCoverageList
