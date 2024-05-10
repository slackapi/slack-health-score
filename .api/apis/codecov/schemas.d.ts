declare const ReposBranchesList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly author: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly ordering: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Which field to use when ordering the results.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A page number within the paginated result set.";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to return per page.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly examples: readonly [123];
                };
                readonly next: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=4"];
                };
                readonly previous: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=2"];
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly title: "branch name";
                            };
                            readonly updatestamp: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly title: "last updated timestamp";
                            };
                        };
                        readonly required: readonly ["name", "updatestamp"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposBranchesRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "branch name";
                };
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["name", "owner_username", "repo_name", "service"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                    readonly title: "branch name";
                };
                readonly updatestamp: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly title: "last updated timestamp";
                };
                readonly head_commit: {
                    readonly readOnly: true;
                    readonly title: "branch's current head commit";
                    readonly type: "object";
                    readonly required: readonly ["author", "branch", "ci_passed", "commitid", "message", "parent", "report", "state", "timestamp", "totals"];
                    readonly properties: {
                        readonly commitid: {
                            readonly type: "string";
                            readonly title: "commit SHA";
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly title: "commit message";
                        };
                        readonly timestamp: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly title: "timestamp when commit was made";
                        };
                        readonly ci_passed: {
                            readonly type: "boolean";
                            readonly title: "indicates whether the CI process passed for this commit";
                        };
                        readonly author: {
                            readonly title: "author of the commit";
                            readonly type: "object";
                            readonly required: readonly ["name", "service", "username"];
                            readonly properties: {
                                readonly service: {
                                    readonly readOnly: true;
                                    readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                                    readonly type: "string";
                                    readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                                };
                                readonly username: {
                                    readonly type: readonly ["string", "null"];
                                    readonly readOnly: true;
                                };
                                readonly name: {
                                    readonly type: readonly ["string", "null"];
                                    readonly readOnly: true;
                                };
                            };
                        };
                        readonly branch: {
                            readonly type: "string";
                            readonly title: "branch name on which this commit currently lives";
                        };
                        readonly totals: {
                            readonly title: "coverage totals";
                            readonly type: "object";
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "integer";
                                    readonly readOnly: true;
                                    readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                                };
                            };
                        };
                        readonly state: {
                            readonly title: "Codecov processing state for this commit";
                            readonly enum: readonly ["complete", "pending", "error", "skipped"];
                            readonly type: "string";
                            readonly description: "* `complete` - Complete\n* `pending` - Pending\n* `error` - Error\n* `skipped` - Skipped\n\n`complete` `pending` `error` `skipped`";
                        };
                        readonly parent: {
                            readonly type: "string";
                            readonly title: "commit SHA of first ancestor commit with coverage";
                        };
                        readonly report: {
                            readonly title: "coverage report";
                            readonly type: "object";
                            readonly required: readonly ["files", "totals"];
                            readonly properties: {
                                readonly totals: {
                                    readonly title: "coverage totals";
                                    readonly type: "object";
                                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                                    readonly properties: {
                                        readonly files: {
                                            readonly type: "integer";
                                        };
                                        readonly lines: {
                                            readonly type: "integer";
                                        };
                                        readonly hits: {
                                            readonly type: "integer";
                                        };
                                        readonly misses: {
                                            readonly type: "integer";
                                        };
                                        readonly partials: {
                                            readonly type: "integer";
                                        };
                                        readonly coverage: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly readOnly: true;
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly branches: {
                                            readonly type: "integer";
                                        };
                                        readonly methods: {
                                            readonly type: "integer";
                                        };
                                        readonly messages: {
                                            readonly type: "integer";
                                        };
                                        readonly sessions: {
                                            readonly type: "integer";
                                        };
                                        readonly complexity: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly complexity_total: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly complexity_ratio: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly readOnly: true;
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly diff: {
                                            readonly type: "object";
                                            readonly additionalProperties: true;
                                        };
                                    };
                                };
                                readonly files: {
                                    readonly readOnly: true;
                                    readonly title: "file specific coverage totals";
                                    readonly type: "object";
                                    readonly required: readonly ["line_coverage", "name", "totals"];
                                    readonly properties: {
                                        readonly name: {
                                            readonly type: "string";
                                            readonly title: "file path";
                                        };
                                        readonly totals: {
                                            readonly title: "coverage totals";
                                            readonly type: "object";
                                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                                            readonly properties: {
                                                readonly files: {
                                                    readonly type: "integer";
                                                };
                                                readonly lines: {
                                                    readonly type: "integer";
                                                };
                                                readonly hits: {
                                                    readonly type: "integer";
                                                };
                                                readonly misses: {
                                                    readonly type: "integer";
                                                };
                                                readonly partials: {
                                                    readonly type: "integer";
                                                };
                                                readonly coverage: {
                                                    readonly type: "number";
                                                    readonly format: "double";
                                                    readonly readOnly: true;
                                                    readonly minimum: -1.7976931348623157e+308;
                                                    readonly maximum: 1.7976931348623157e+308;
                                                };
                                                readonly branches: {
                                                    readonly type: "integer";
                                                };
                                                readonly methods: {
                                                    readonly type: "integer";
                                                };
                                                readonly messages: {
                                                    readonly type: "integer";
                                                };
                                                readonly sessions: {
                                                    readonly type: "integer";
                                                };
                                                readonly complexity: {
                                                    readonly type: "number";
                                                    readonly format: "double";
                                                    readonly minimum: -1.7976931348623157e+308;
                                                    readonly maximum: 1.7976931348623157e+308;
                                                };
                                                readonly complexity_total: {
                                                    readonly type: "number";
                                                    readonly format: "double";
                                                    readonly minimum: -1.7976931348623157e+308;
                                                    readonly maximum: 1.7976931348623157e+308;
                                                };
                                                readonly complexity_ratio: {
                                                    readonly type: "number";
                                                    readonly format: "double";
                                                    readonly readOnly: true;
                                                    readonly minimum: -1.7976931348623157e+308;
                                                    readonly maximum: 1.7976931348623157e+308;
                                                };
                                                readonly diff: {
                                                    readonly type: "object";
                                                    readonly additionalProperties: true;
                                                };
                                            };
                                        };
                                        readonly line_coverage: {
                                            readonly type: "array";
                                            readonly readOnly: true;
                                            readonly title: "line-by-line coverage values";
                                            readonly items: {};
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["head_commit", "name", "updatestamp"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposCommitsList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly branch: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "branch name";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A page number within the paginated result set.";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to return per page.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly examples: readonly [123];
                };
                readonly next: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=4"];
                };
                readonly previous: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=2"];
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly commitid: {
                                readonly type: "string";
                                readonly title: "commit SHA";
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly title: "commit message";
                            };
                            readonly timestamp: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly title: "timestamp when commit was made";
                            };
                            readonly ci_passed: {
                                readonly type: "boolean";
                                readonly title: "indicates whether the CI process passed for this commit";
                            };
                            readonly author: {
                                readonly title: "author of the commit";
                                readonly type: "object";
                                readonly required: readonly ["name", "service", "username"];
                                readonly properties: {
                                    readonly service: {
                                        readonly readOnly: true;
                                        readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                                        readonly type: "string";
                                        readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                                    };
                                    readonly username: {
                                        readonly type: readonly ["string", "null"];
                                        readonly readOnly: true;
                                    };
                                    readonly name: {
                                        readonly type: readonly ["string", "null"];
                                        readonly readOnly: true;
                                    };
                                };
                            };
                            readonly branch: {
                                readonly type: "string";
                                readonly title: "branch name on which this commit currently lives";
                            };
                            readonly totals: {
                                readonly title: "coverage totals";
                                readonly type: "object";
                                readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                                readonly properties: {
                                    readonly files: {
                                        readonly type: "integer";
                                    };
                                    readonly lines: {
                                        readonly type: "integer";
                                    };
                                    readonly hits: {
                                        readonly type: "integer";
                                    };
                                    readonly misses: {
                                        readonly type: "integer";
                                    };
                                    readonly partials: {
                                        readonly type: "integer";
                                    };
                                    readonly coverage: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly branches: {
                                        readonly type: "integer";
                                    };
                                    readonly methods: {
                                        readonly type: "integer";
                                    };
                                    readonly sessions: {
                                        readonly type: "integer";
                                    };
                                    readonly complexity: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_total: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_ratio: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly diff: {
                                        readonly type: "integer";
                                        readonly readOnly: true;
                                        readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                                    };
                                };
                            };
                            readonly state: {
                                readonly title: "Codecov processing state for this commit";
                                readonly enum: readonly ["complete", "pending", "error", "skipped"];
                                readonly type: "string";
                                readonly description: "* `complete` - Complete\n* `pending` - Pending\n* `error` - Error\n* `skipped` - Skipped\n\n`complete` `pending` `error` `skipped`";
                            };
                            readonly parent: {
                                readonly type: "string";
                                readonly title: "commit SHA of first ancestor commit with coverage";
                            };
                        };
                        readonly required: readonly ["author", "branch", "ci_passed", "commitid", "message", "parent", "state", "timestamp", "totals"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposCommitsRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly commitid: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "commit SHA";
                };
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["commitid", "owner_username", "repo_name", "service"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly commitid: {
                    readonly type: "string";
                    readonly title: "commit SHA";
                };
                readonly message: {
                    readonly type: "string";
                    readonly title: "commit message";
                };
                readonly timestamp: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly title: "timestamp when commit was made";
                };
                readonly ci_passed: {
                    readonly type: "boolean";
                    readonly title: "indicates whether the CI process passed for this commit";
                };
                readonly author: {
                    readonly title: "author of the commit";
                    readonly type: "object";
                    readonly required: readonly ["name", "service", "username"];
                    readonly properties: {
                        readonly service: {
                            readonly readOnly: true;
                            readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                            readonly type: "string";
                            readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                        };
                        readonly username: {
                            readonly type: readonly ["string", "null"];
                            readonly readOnly: true;
                        };
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                            readonly readOnly: true;
                        };
                    };
                };
                readonly branch: {
                    readonly type: "string";
                    readonly title: "branch name on which this commit currently lives";
                };
                readonly totals: {
                    readonly title: "coverage totals";
                    readonly type: "object";
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "integer";
                            readonly readOnly: true;
                            readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                        };
                    };
                };
                readonly state: {
                    readonly title: "Codecov processing state for this commit";
                    readonly enum: readonly ["complete", "pending", "error", "skipped"];
                    readonly type: "string";
                    readonly description: "* `complete` - Complete\n* `pending` - Pending\n* `error` - Error\n* `skipped` - Skipped\n\n`complete` `pending` `error` `skipped`";
                };
                readonly parent: {
                    readonly type: "string";
                    readonly title: "commit SHA of first ancestor commit with coverage";
                };
                readonly report: {
                    readonly title: "coverage report";
                    readonly type: "object";
                    readonly required: readonly ["files", "totals"];
                    readonly properties: {
                        readonly totals: {
                            readonly title: "coverage totals";
                            readonly type: "object";
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                        readonly files: {
                            readonly readOnly: true;
                            readonly title: "file specific coverage totals";
                            readonly type: "object";
                            readonly required: readonly ["line_coverage", "name", "totals"];
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                    readonly title: "file path";
                                };
                                readonly totals: {
                                    readonly title: "coverage totals";
                                    readonly type: "object";
                                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                                    readonly properties: {
                                        readonly files: {
                                            readonly type: "integer";
                                        };
                                        readonly lines: {
                                            readonly type: "integer";
                                        };
                                        readonly hits: {
                                            readonly type: "integer";
                                        };
                                        readonly misses: {
                                            readonly type: "integer";
                                        };
                                        readonly partials: {
                                            readonly type: "integer";
                                        };
                                        readonly coverage: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly readOnly: true;
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly branches: {
                                            readonly type: "integer";
                                        };
                                        readonly methods: {
                                            readonly type: "integer";
                                        };
                                        readonly messages: {
                                            readonly type: "integer";
                                        };
                                        readonly sessions: {
                                            readonly type: "integer";
                                        };
                                        readonly complexity: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly complexity_total: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly complexity_ratio: {
                                            readonly type: "number";
                                            readonly format: "double";
                                            readonly readOnly: true;
                                            readonly minimum: -1.7976931348623157e+308;
                                            readonly maximum: 1.7976931348623157e+308;
                                        };
                                        readonly diff: {
                                            readonly type: "object";
                                            readonly additionalProperties: true;
                                        };
                                    };
                                };
                                readonly line_coverage: {
                                    readonly type: "array";
                                    readonly readOnly: true;
                                    readonly title: "line-by-line coverage values";
                                    readonly items: {};
                                };
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["author", "branch", "ci_passed", "commitid", "message", "parent", "report", "state", "timestamp", "totals"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposCommitsUploadsList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly commitid: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "commit SHA";
                };
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["commitid", "owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A page number within the paginated result set.";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to return per page.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly examples: readonly [123];
                };
                readonly next: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=4"];
                };
                readonly previous: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=2"];
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly created_at: {
                                readonly type: "string";
                            };
                            readonly updated_at: {
                                readonly type: "string";
                            };
                            readonly storage_path: {
                                readonly type: "string";
                            };
                            readonly flags: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly provider: {
                                readonly type: "string";
                            };
                            readonly build_code: {
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly job_code: {
                                readonly type: "string";
                            };
                            readonly build_url: {
                                readonly type: "string";
                            };
                            readonly state: {
                                readonly type: "string";
                            };
                            readonly env: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly upload_type: {
                                readonly type: "string";
                            };
                            readonly upload_extras: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly totals: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly files: {
                                        readonly type: "integer";
                                    };
                                    readonly lines: {
                                        readonly type: "integer";
                                    };
                                    readonly hits: {
                                        readonly type: "integer";
                                    };
                                    readonly misses: {
                                        readonly type: "integer";
                                    };
                                    readonly partials: {
                                        readonly type: "integer";
                                    };
                                    readonly coverage: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly branches: {
                                        readonly type: "integer";
                                    };
                                    readonly methods: {
                                        readonly type: "integer";
                                    };
                                };
                                readonly required: readonly ["branches", "coverage", "files", "hits", "lines", "methods", "misses", "partials"];
                            };
                        };
                        readonly required: readonly ["build_code", "build_url", "created_at", "env", "flags", "job_code", "name", "provider", "state", "storage_path", "totals", "updated_at", "upload_extras", "upload_type"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposCompareComponentsRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly base: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "base commit SHA (`head` also required)";
                };
                readonly head: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "head commit SHA (`base` also required)";
                };
                readonly pullid: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "pull ID on which to perform the comparison (alternative to specifying `base` and `head`)";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly component_id: {
                    readonly type: "string";
                };
                readonly name: {
                    readonly type: "string";
                };
                readonly base_report_totals: {
                    readonly type: "object";
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly messages: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                    };
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                };
                readonly head_report_totals: {
                    readonly type: "object";
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly messages: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                    };
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                };
                readonly diff_totals: {
                    readonly type: "object";
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly messages: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                    };
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                };
            };
            readonly required: readonly ["base_report_totals", "component_id", "diff_totals", "head_report_totals", "name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposCompareFileRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly file_path: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "file path";
                };
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["file_path", "owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly base: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "base commit SHA (`head` also required)";
                };
                readonly head: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "head commit SHA (`base` also required)";
                };
                readonly pullid: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "pull ID on which to perform the comparison (alternative to specifying `base` and `head`)";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
                readonly totals: {
                    readonly type: "object";
                    readonly properties: {
                        readonly base: {
                            readonly type: "object";
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                        };
                        readonly head: {
                            readonly type: "object";
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                        };
                        readonly patch: {
                            readonly type: "object";
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                        };
                    };
                    readonly required: readonly ["base", "head", "patch"];
                };
                readonly has_diff: {
                    readonly type: "boolean";
                };
                readonly stats: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
                readonly change_summary: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
                readonly lines: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly value: {
                                readonly type: "string";
                            };
                            readonly number: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly coverage: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly is_diff: {
                                readonly type: "boolean";
                            };
                            readonly added: {
                                readonly type: "boolean";
                            };
                            readonly removed: {
                                readonly type: "boolean";
                            };
                            readonly sessions: {
                                readonly type: "integer";
                            };
                        };
                        readonly required: readonly ["added", "coverage", "is_diff", "number", "removed", "sessions", "value"];
                    };
                };
            };
            readonly required: readonly ["change_summary", "has_diff", "lines", "name", "stats", "totals"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposCompareFlagsRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly base: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "base commit SHA (`head` also required)";
                };
                readonly head: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "head commit SHA (`base` also required)";
                };
                readonly pullid: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "pull ID on which to perform the comparison (alternative to specifying `base` and `head`)";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                };
                readonly base_report_totals: {
                    readonly type: "string";
                    readonly readOnly: true;
                };
                readonly head_report_totals: {
                    readonly type: "object";
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly messages: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                    };
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                };
                readonly diff_totals: {
                    readonly type: "object";
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly messages: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                    };
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                };
            };
            readonly required: readonly ["base_report_totals", "diff_totals", "head_report_totals", "name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposCompareImpactedFilesRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly base: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "base commit SHA (`head` also required)";
                };
                readonly head: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "head commit SHA (`base` also required)";
                };
                readonly pullid: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "pull ID on which to perform the comparison (alternative to specifying `base` and `head`)";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly base_commit: {
                    readonly type: "string";
                };
                readonly head_commit: {
                    readonly type: "string";
                };
                readonly totals: {
                    readonly type: "object";
                    readonly properties: {
                        readonly base: {
                            readonly type: "object";
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                        };
                        readonly head: {
                            readonly type: "object";
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                        };
                        readonly patch: {
                            readonly type: "object";
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                        };
                    };
                    readonly required: readonly ["base", "head", "patch"];
                };
                readonly commit_uploads: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly commitid: {
                                readonly type: "string";
                                readonly title: "commit SHA";
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly title: "commit message";
                            };
                            readonly timestamp: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly title: "timestamp when commit was made";
                            };
                            readonly ci_passed: {
                                readonly type: "boolean";
                                readonly title: "indicates whether the CI process passed for this commit";
                            };
                            readonly author: {
                                readonly title: "author of the commit";
                                readonly type: "object";
                                readonly required: readonly ["name", "service", "username"];
                                readonly properties: {
                                    readonly service: {
                                        readonly readOnly: true;
                                        readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                                        readonly type: "string";
                                        readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                                    };
                                    readonly username: {
                                        readonly type: readonly ["string", "null"];
                                        readonly readOnly: true;
                                    };
                                    readonly name: {
                                        readonly type: readonly ["string", "null"];
                                        readonly readOnly: true;
                                    };
                                };
                            };
                            readonly branch: {
                                readonly type: "string";
                                readonly title: "branch name on which this commit currently lives";
                            };
                            readonly totals: {
                                readonly title: "coverage totals";
                                readonly type: "object";
                                readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                                readonly properties: {
                                    readonly files: {
                                        readonly type: "integer";
                                    };
                                    readonly lines: {
                                        readonly type: "integer";
                                    };
                                    readonly hits: {
                                        readonly type: "integer";
                                    };
                                    readonly misses: {
                                        readonly type: "integer";
                                    };
                                    readonly partials: {
                                        readonly type: "integer";
                                    };
                                    readonly coverage: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly branches: {
                                        readonly type: "integer";
                                    };
                                    readonly methods: {
                                        readonly type: "integer";
                                    };
                                    readonly sessions: {
                                        readonly type: "integer";
                                    };
                                    readonly complexity: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_total: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_ratio: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly diff: {
                                        readonly type: "integer";
                                        readonly readOnly: true;
                                        readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                                    };
                                };
                            };
                            readonly state: {
                                readonly title: "Codecov processing state for this commit";
                                readonly enum: readonly ["complete", "pending", "error", "skipped"];
                                readonly type: "string";
                                readonly description: "* `complete` - Complete\n* `pending` - Pending\n* `error` - Error\n* `skipped` - Skipped\n\n`complete` `pending` `error` `skipped`";
                            };
                            readonly parent: {
                                readonly type: "string";
                                readonly title: "commit SHA of first ancestor commit with coverage";
                            };
                        };
                        readonly required: readonly ["author", "branch", "ci_passed", "commitid", "message", "parent", "state", "timestamp", "totals"];
                    };
                };
                readonly diff: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                    readonly readOnly: true;
                };
                readonly files: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                    readonly readOnly: true;
                };
                readonly untracked: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly readOnly: true;
                };
                readonly has_unmerged_base_commits: {
                    readonly type: "boolean";
                };
                readonly state: {
                    readonly type: "string";
                    readonly readOnly: true;
                };
            };
            readonly required: readonly ["base_commit", "commit_uploads", "diff", "files", "has_unmerged_base_commits", "head_commit", "state", "totals", "untracked"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposCompareRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly base: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "base commit SHA (`head` also required)";
                };
                readonly head: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "head commit SHA (`base` also required)";
                };
                readonly pullid: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "pull ID on which to perform the comparison (alternative to specifying `base` and `head`)";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly base_commit: {
                    readonly type: "string";
                };
                readonly head_commit: {
                    readonly type: "string";
                };
                readonly totals: {
                    readonly type: "object";
                    readonly properties: {
                        readonly base: {
                            readonly type: "object";
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                        };
                        readonly head: {
                            readonly type: "object";
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                        };
                        readonly patch: {
                            readonly type: "object";
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                        };
                    };
                    readonly required: readonly ["base", "head", "patch"];
                };
                readonly commit_uploads: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly commitid: {
                                readonly type: "string";
                                readonly title: "commit SHA";
                            };
                            readonly message: {
                                readonly type: "string";
                                readonly title: "commit message";
                            };
                            readonly timestamp: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly title: "timestamp when commit was made";
                            };
                            readonly ci_passed: {
                                readonly type: "boolean";
                                readonly title: "indicates whether the CI process passed for this commit";
                            };
                            readonly author: {
                                readonly title: "author of the commit";
                                readonly type: "object";
                                readonly required: readonly ["name", "service", "username"];
                                readonly properties: {
                                    readonly service: {
                                        readonly readOnly: true;
                                        readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                                        readonly type: "string";
                                        readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                                    };
                                    readonly username: {
                                        readonly type: readonly ["string", "null"];
                                        readonly readOnly: true;
                                    };
                                    readonly name: {
                                        readonly type: readonly ["string", "null"];
                                        readonly readOnly: true;
                                    };
                                };
                            };
                            readonly branch: {
                                readonly type: "string";
                                readonly title: "branch name on which this commit currently lives";
                            };
                            readonly totals: {
                                readonly title: "coverage totals";
                                readonly type: "object";
                                readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                                readonly properties: {
                                    readonly files: {
                                        readonly type: "integer";
                                    };
                                    readonly lines: {
                                        readonly type: "integer";
                                    };
                                    readonly hits: {
                                        readonly type: "integer";
                                    };
                                    readonly misses: {
                                        readonly type: "integer";
                                    };
                                    readonly partials: {
                                        readonly type: "integer";
                                    };
                                    readonly coverage: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly branches: {
                                        readonly type: "integer";
                                    };
                                    readonly methods: {
                                        readonly type: "integer";
                                    };
                                    readonly sessions: {
                                        readonly type: "integer";
                                    };
                                    readonly complexity: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_total: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_ratio: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly diff: {
                                        readonly type: "integer";
                                        readonly readOnly: true;
                                        readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                                    };
                                };
                            };
                            readonly state: {
                                readonly title: "Codecov processing state for this commit";
                                readonly enum: readonly ["complete", "pending", "error", "skipped"];
                                readonly type: "string";
                                readonly description: "* `complete` - Complete\n* `pending` - Pending\n* `error` - Error\n* `skipped` - Skipped\n\n`complete` `pending` `error` `skipped`";
                            };
                            readonly parent: {
                                readonly type: "string";
                                readonly title: "commit SHA of first ancestor commit with coverage";
                            };
                        };
                        readonly required: readonly ["author", "branch", "ci_passed", "commitid", "message", "parent", "state", "timestamp", "totals"];
                    };
                };
                readonly diff: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                    readonly readOnly: true;
                };
                readonly files: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                    readonly readOnly: true;
                };
                readonly untracked: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly readOnly: true;
                };
                readonly has_unmerged_base_commits: {
                    readonly type: "boolean";
                };
            };
            readonly required: readonly ["base_commit", "commit_uploads", "diff", "files", "has_unmerged_base_commits", "head_commit", "totals", "untracked"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposCompareSegmentsRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly file_path: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "file path";
                };
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["file_path", "owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly base: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "base commit SHA (`head` also required)";
                };
                readonly head: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "head commit SHA (`base` also required)";
                };
                readonly pullid: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "pull ID on which to perform the comparison (alternative to specifying `base` and `head`)";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly segments: {
                    readonly readOnly: true;
                    readonly type: "object";
                    readonly required: readonly ["has_unintended_changes", "header", "lines"];
                    readonly properties: {
                        readonly header: {
                            readonly type: "string";
                            readonly readOnly: true;
                        };
                        readonly has_unintended_changes: {
                            readonly type: "boolean";
                        };
                        readonly lines: {
                            readonly type: "array";
                            readonly readOnly: true;
                            readonly items: {};
                        };
                    };
                };
            };
            readonly required: readonly ["segments"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposComponentsList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly branch: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "branch name for which to return components (of head commit)";
                };
                readonly sha: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "commit SHA for which to return components";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly component_id: {
                        readonly type: "string";
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly title: "component name";
                    };
                    readonly coverage: {
                        readonly type: "number";
                        readonly format: "double";
                        readonly title: "component coverage";
                        readonly minimum: -1.7976931348623157e+308;
                        readonly maximum: 1.7976931348623157e+308;
                    };
                };
                readonly required: readonly ["component_id", "coverage", "name"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposConfigRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly upload_token: {
                    readonly type: "string";
                    readonly title: "token used for uploading coverage reports for this repo";
                };
                readonly graph_token: {
                    readonly type: "string";
                    readonly title: "token used for repository graphs";
                };
            };
            readonly required: readonly ["graph_token", "upload_token"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposCoverageList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly branch: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "branch name";
                };
                readonly end_date: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "end datetime (inclusive)";
                };
                readonly interval: {
                    readonly type: "string";
                    readonly enum: readonly ["1d", "30d", "7d"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "* `1d` - 1 day\n* `7d` - 7 day\n* `30d` - 30 day";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A page number within the paginated result set.";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to return per page.";
                };
                readonly start_date: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "start datetime (inclusive)";
                };
            };
            readonly required: readonly ["interval"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly examples: readonly [123];
                };
                readonly next: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=4"];
                };
                readonly previous: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=2"];
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly timestamp: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly title: "timestamp at the start of the interval";
                            };
                            readonly min: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly title: "minimum value in the interval";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly max: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly title: "maximum value in the interval";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly avg: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly title: "average value in the interval";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["avg", "max", "min", "timestamp"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposFileReportRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly path: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "the file path for which to retrieve coverage info";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "path", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly branch: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "branch name for which to return report (of head commit)";
                };
                readonly sha: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "commit SHA for which to return report";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                    readonly title: "file path";
                };
                readonly totals: {
                    readonly title: "coverage totals";
                    readonly type: "object";
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly messages: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                    };
                };
                readonly line_coverage: {
                    readonly type: "array";
                    readonly items: {};
                    readonly readOnly: true;
                    readonly title: "line-by-line coverage values";
                };
                readonly commit_sha: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly title: "commit SHA of the commit for which coverage info was found";
                };
                readonly commit_file_url: {
                    readonly type: "string";
                    readonly readOnly: true;
                    readonly title: "Codecov URL to see file coverage on commit.";
                };
            };
            readonly required: readonly ["commit_file_url", "commit_sha", "line_coverage", "name", "totals"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposFlagsCoverageList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly flag_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["flag_name", "owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly branch: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "branch name";
                };
                readonly end_date: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "end datetime (inclusive)";
                };
                readonly interval: {
                    readonly type: "string";
                    readonly enum: readonly ["1d", "30d", "7d"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "* `1d` - 1 day\n* `7d` - 7 day\n* `30d` - 30 day";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A page number within the paginated result set.";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to return per page.";
                };
                readonly start_date: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "start datetime (inclusive)";
                };
            };
            readonly required: readonly ["interval"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly examples: readonly [123];
                };
                readonly next: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=4"];
                };
                readonly previous: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=2"];
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly timestamp: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly title: "timestamp at the start of the interval";
                            };
                            readonly min: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly title: "minimum value in the interval";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly max: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly title: "maximum value in the interval";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                            readonly avg: {
                                readonly type: "number";
                                readonly format: "double";
                                readonly title: "average value in the interval";
                                readonly minimum: -1.7976931348623157e+308;
                                readonly maximum: 1.7976931348623157e+308;
                            };
                        };
                        readonly required: readonly ["avg", "max", "min", "timestamp"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposFlagsList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A page number within the paginated result set.";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to return per page.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly examples: readonly [123];
                };
                readonly next: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=4"];
                };
                readonly previous: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=2"];
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly flag_name: {
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["flag_name"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly active: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "whether the repository has received an upload";
                };
                readonly names: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "list of repository names";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A page number within the paginated result set.";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to return per page.";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A search term.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly examples: readonly [123];
                };
                readonly next: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=4"];
                };
                readonly previous: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=2"];
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly title: "repository name";
                            };
                            readonly private: {
                                readonly type: "boolean";
                                readonly title: "indicates private vs. public repository";
                            };
                            readonly updatestamp: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly title: "last updated timestamp";
                            };
                            readonly author: {
                                readonly title: "repository owner";
                                readonly type: "object";
                                readonly required: readonly ["name", "service", "username"];
                                readonly properties: {
                                    readonly service: {
                                        readonly readOnly: true;
                                        readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                                        readonly type: "string";
                                        readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                                    };
                                    readonly username: {
                                        readonly type: readonly ["string", "null"];
                                        readonly readOnly: true;
                                    };
                                    readonly name: {
                                        readonly type: readonly ["string", "null"];
                                        readonly readOnly: true;
                                    };
                                };
                            };
                            readonly language: {
                                readonly type: "string";
                                readonly title: "primary programming language used";
                            };
                            readonly branch: {
                                readonly type: "string";
                                readonly title: "default branch name";
                            };
                            readonly active: {
                                readonly type: "boolean";
                                readonly title: "indicates whether the repository has received a coverage upload";
                            };
                            readonly activated: {
                                readonly type: "boolean";
                                readonly title: "indicates whether the repository has been manually deactivated";
                            };
                            readonly totals: {
                                readonly title: "recent commit totals on the default branch";
                                readonly type: "object";
                                readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                                readonly properties: {
                                    readonly files: {
                                        readonly type: "integer";
                                    };
                                    readonly lines: {
                                        readonly type: "integer";
                                    };
                                    readonly hits: {
                                        readonly type: "integer";
                                    };
                                    readonly misses: {
                                        readonly type: "integer";
                                    };
                                    readonly partials: {
                                        readonly type: "integer";
                                    };
                                    readonly coverage: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly branches: {
                                        readonly type: "integer";
                                    };
                                    readonly methods: {
                                        readonly type: "integer";
                                    };
                                    readonly sessions: {
                                        readonly type: "integer";
                                    };
                                    readonly complexity: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_total: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_ratio: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly diff: {
                                        readonly type: "integer";
                                        readonly readOnly: true;
                                        readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["activated", "active", "author", "branch", "language", "name", "private", "totals", "updatestamp"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposPullsList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly ordering: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Which field to use when ordering the results.";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A page number within the paginated result set.";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to return per page.";
                };
                readonly start_date: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "only return pulls with updatestamp on or after this date";
                };
                readonly state: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "the state of the pull (open/merged/closed)";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly examples: readonly [123];
                };
                readonly next: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=4"];
                };
                readonly previous: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=2"];
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly pullid: {
                                readonly type: "integer";
                                readonly title: "pull ID number";
                            };
                            readonly title: {
                                readonly type: "string";
                                readonly title: "title of the pull";
                            };
                            readonly base_totals: {
                                readonly title: "coverage totals of base commit";
                                readonly type: "object";
                                readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                                readonly properties: {
                                    readonly files: {
                                        readonly type: "integer";
                                    };
                                    readonly lines: {
                                        readonly type: "integer";
                                    };
                                    readonly hits: {
                                        readonly type: "integer";
                                    };
                                    readonly misses: {
                                        readonly type: "integer";
                                    };
                                    readonly partials: {
                                        readonly type: "integer";
                                    };
                                    readonly coverage: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly branches: {
                                        readonly type: "integer";
                                    };
                                    readonly methods: {
                                        readonly type: "integer";
                                    };
                                    readonly sessions: {
                                        readonly type: "integer";
                                    };
                                    readonly complexity: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_total: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_ratio: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly diff: {
                                        readonly type: "integer";
                                        readonly readOnly: true;
                                        readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                                    };
                                };
                            };
                            readonly head_totals: {
                                readonly title: "coverage totals of head commit";
                                readonly type: "object";
                                readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                                readonly properties: {
                                    readonly files: {
                                        readonly type: "integer";
                                    };
                                    readonly lines: {
                                        readonly type: "integer";
                                    };
                                    readonly hits: {
                                        readonly type: "integer";
                                    };
                                    readonly misses: {
                                        readonly type: "integer";
                                    };
                                    readonly partials: {
                                        readonly type: "integer";
                                    };
                                    readonly coverage: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly branches: {
                                        readonly type: "integer";
                                    };
                                    readonly methods: {
                                        readonly type: "integer";
                                    };
                                    readonly sessions: {
                                        readonly type: "integer";
                                    };
                                    readonly complexity: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_total: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly complexity_ratio: {
                                        readonly type: "number";
                                        readonly format: "double";
                                        readonly readOnly: true;
                                        readonly minimum: -1.7976931348623157e+308;
                                        readonly maximum: 1.7976931348623157e+308;
                                    };
                                    readonly diff: {
                                        readonly type: "integer";
                                        readonly readOnly: true;
                                        readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                                    };
                                };
                            };
                            readonly updatestamp: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly title: "last updated timestamp";
                            };
                            readonly state: {
                                readonly title: "state of the pull";
                                readonly enum: readonly ["open", "merged", "closed"];
                                readonly type: "string";
                                readonly description: "* `open` - Open\n* `merged` - Merged\n* `closed` - Closed\n\n`open` `merged` `closed`";
                            };
                            readonly ci_passed: {
                                readonly type: "boolean";
                                readonly title: "indicates whether the CI process passed for the head commit of this pull";
                            };
                            readonly author: {
                                readonly title: "pull author";
                                readonly type: "object";
                                readonly required: readonly ["name", "service", "username"];
                                readonly properties: {
                                    readonly service: {
                                        readonly readOnly: true;
                                        readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                                        readonly type: "string";
                                        readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                                    };
                                    readonly username: {
                                        readonly type: readonly ["string", "null"];
                                        readonly readOnly: true;
                                    };
                                    readonly name: {
                                        readonly type: readonly ["string", "null"];
                                        readonly readOnly: true;
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["author", "base_totals", "ci_passed", "head_totals", "pullid", "state", "title", "updatestamp"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposPullsRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly pullid: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "pull ID";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "pullid", "repo_name", "service"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly pullid: {
                    readonly type: "integer";
                    readonly title: "pull ID number";
                };
                readonly title: {
                    readonly type: "string";
                    readonly title: "title of the pull";
                };
                readonly base_totals: {
                    readonly title: "coverage totals of base commit";
                    readonly type: "object";
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "integer";
                            readonly readOnly: true;
                            readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                        };
                    };
                };
                readonly head_totals: {
                    readonly title: "coverage totals of head commit";
                    readonly type: "object";
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "integer";
                            readonly readOnly: true;
                            readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                        };
                    };
                };
                readonly updatestamp: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly title: "last updated timestamp";
                };
                readonly state: {
                    readonly title: "state of the pull";
                    readonly enum: readonly ["open", "merged", "closed"];
                    readonly type: "string";
                    readonly description: "* `open` - Open\n* `merged` - Merged\n* `closed` - Closed\n\n`open` `merged` `closed`";
                };
                readonly ci_passed: {
                    readonly type: "boolean";
                    readonly title: "indicates whether the CI process passed for the head commit of this pull";
                };
                readonly author: {
                    readonly title: "pull author";
                    readonly type: "object";
                    readonly required: readonly ["name", "service", "username"];
                    readonly properties: {
                        readonly service: {
                            readonly readOnly: true;
                            readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                            readonly type: "string";
                            readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                        };
                        readonly username: {
                            readonly type: readonly ["string", "null"];
                            readonly readOnly: true;
                        };
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                            readonly readOnly: true;
                        };
                    };
                };
            };
            readonly required: readonly ["author", "base_totals", "ci_passed", "head_totals", "pullid", "state", "title", "updatestamp"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposReportRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly branch: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "branch name for which to return report (of head commit)";
                };
                readonly component_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "filter report to only include info pertaining to given component id";
                };
                readonly flag: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "filter report to only include info pertaining to given flag name";
                };
                readonly path: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "filter report to only include file paths starting with this value";
                };
                readonly sha: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "commit SHA for which to return report";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totals: {
                    readonly title: "coverage totals";
                    readonly type: "object";
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly messages: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                    };
                };
                readonly files: {
                    readonly readOnly: true;
                    readonly title: "file specific coverage totals";
                    readonly type: "object";
                    readonly required: readonly ["line_coverage", "name", "totals"];
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                            readonly title: "file path";
                        };
                        readonly totals: {
                            readonly title: "coverage totals";
                            readonly type: "object";
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                        readonly line_coverage: {
                            readonly type: "array";
                            readonly readOnly: true;
                            readonly title: "line-by-line coverage values";
                            readonly items: {};
                        };
                    };
                };
                readonly commit_file_url: {
                    readonly type: "string";
                    readonly title: "Codecov url to see file coverage on commit. Can be unreliable with partial path names.";
                };
            };
            readonly required: readonly ["commit_file_url", "files", "totals"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposReportTreeRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly branch: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "branch name for which to return report (of head commit)";
                };
                readonly component_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "filter report to only include info pertaining to given component id";
                };
                readonly depth: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "depth of the traversal (default=1)";
                };
                readonly flag: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "filter report to only include info pertaining to given flag name";
                };
                readonly path: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "starting path of the traversal (default is root path)";
                };
                readonly sha: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "commit SHA for which to return report";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                };
                readonly full_path: {
                    readonly type: "string";
                };
                readonly coverage: {
                    readonly type: "number";
                    readonly format: "double";
                    readonly minimum: -1.7976931348623157e+308;
                    readonly maximum: 1.7976931348623157e+308;
                };
                readonly lines: {
                    readonly type: "integer";
                };
                readonly hits: {
                    readonly type: "integer";
                };
                readonly partials: {
                    readonly type: "integer";
                };
                readonly misses: {
                    readonly type: "integer";
                };
            };
            readonly required: readonly ["coverage", "full_path", "hits", "lines", "misses", "name", "partials"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly name: {
                    readonly type: "string";
                    readonly title: "repository name";
                };
                readonly private: {
                    readonly type: "boolean";
                    readonly title: "indicates private vs. public repository";
                };
                readonly updatestamp: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly title: "last updated timestamp";
                };
                readonly author: {
                    readonly title: "repository owner";
                    readonly type: "object";
                    readonly required: readonly ["name", "service", "username"];
                    readonly properties: {
                        readonly service: {
                            readonly readOnly: true;
                            readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                            readonly type: "string";
                            readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                        };
                        readonly username: {
                            readonly type: readonly ["string", "null"];
                            readonly readOnly: true;
                        };
                        readonly name: {
                            readonly type: readonly ["string", "null"];
                            readonly readOnly: true;
                        };
                    };
                };
                readonly language: {
                    readonly type: "string";
                    readonly title: "primary programming language used";
                };
                readonly branch: {
                    readonly type: "string";
                    readonly title: "default branch name";
                };
                readonly active: {
                    readonly type: "boolean";
                    readonly title: "indicates whether the repository has received a coverage upload";
                };
                readonly activated: {
                    readonly type: "boolean";
                    readonly title: "indicates whether the repository has been manually deactivated";
                };
                readonly totals: {
                    readonly title: "recent commit totals on the default branch";
                    readonly type: "object";
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "methods", "misses", "partials", "sessions"];
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "integer";
                            readonly readOnly: true;
                            readonly title: "Deprecated: this will always return 0.  Please use comparison endpoint for diff totals instead.";
                        };
                    };
                };
            };
            readonly required: readonly ["activated", "active", "author", "branch", "language", "name", "private", "totals", "updatestamp"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReposTotalsRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly repo_name: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "repository name";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "repo_name", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly branch: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "branch name for which to return report (of head commit)";
                };
                readonly component_id: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "filter report to only include info pertaining to given component id";
                };
                readonly flag: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "filter report to only include info pertaining to given flag name";
                };
                readonly path: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "filter report to only include file paths starting with this value";
                };
                readonly sha: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "commit SHA for which to return report";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly totals: {
                    readonly title: "coverage totals";
                    readonly type: "object";
                    readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                    readonly properties: {
                        readonly files: {
                            readonly type: "integer";
                        };
                        readonly lines: {
                            readonly type: "integer";
                        };
                        readonly hits: {
                            readonly type: "integer";
                        };
                        readonly misses: {
                            readonly type: "integer";
                        };
                        readonly partials: {
                            readonly type: "integer";
                        };
                        readonly coverage: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly branches: {
                            readonly type: "integer";
                        };
                        readonly methods: {
                            readonly type: "integer";
                        };
                        readonly messages: {
                            readonly type: "integer";
                        };
                        readonly sessions: {
                            readonly type: "integer";
                        };
                        readonly complexity: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_total: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly complexity_ratio: {
                            readonly type: "number";
                            readonly format: "double";
                            readonly readOnly: true;
                            readonly minimum: -1.7976931348623157e+308;
                            readonly maximum: 1.7976931348623157e+308;
                        };
                        readonly diff: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                    };
                };
                readonly files: {
                    readonly readOnly: true;
                    readonly title: "file specific coverage totals";
                    readonly type: "object";
                    readonly required: readonly ["line_coverage", "name", "totals"];
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                            readonly title: "file path";
                        };
                        readonly totals: {
                            readonly title: "coverage totals";
                            readonly type: "object";
                            readonly required: readonly ["branches", "complexity", "complexity_ratio", "complexity_total", "coverage", "diff", "files", "hits", "lines", "messages", "methods", "misses", "partials", "sessions"];
                            readonly properties: {
                                readonly files: {
                                    readonly type: "integer";
                                };
                                readonly lines: {
                                    readonly type: "integer";
                                };
                                readonly hits: {
                                    readonly type: "integer";
                                };
                                readonly misses: {
                                    readonly type: "integer";
                                };
                                readonly partials: {
                                    readonly type: "integer";
                                };
                                readonly coverage: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly branches: {
                                    readonly type: "integer";
                                };
                                readonly methods: {
                                    readonly type: "integer";
                                };
                                readonly messages: {
                                    readonly type: "integer";
                                };
                                readonly sessions: {
                                    readonly type: "integer";
                                };
                                readonly complexity: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_total: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly complexity_ratio: {
                                    readonly type: "number";
                                    readonly format: "double";
                                    readonly readOnly: true;
                                    readonly minimum: -1.7976931348623157e+308;
                                    readonly maximum: 1.7976931348623157e+308;
                                };
                                readonly diff: {
                                    readonly type: "object";
                                    readonly additionalProperties: true;
                                };
                            };
                        };
                        readonly line_coverage: {
                            readonly type: "array";
                            readonly readOnly: true;
                            readonly title: "line-by-line coverage values";
                            readonly items: {};
                        };
                    };
                };
                readonly commit_file_url: {
                    readonly type: "string";
                    readonly title: "Codecov url to see file coverage on commit. Can be unreliable with partial path names.";
                };
            };
            readonly required: readonly ["commit_file_url", "files", "totals"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RootList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A page number within the paginated result set.";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to return per page.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly examples: readonly [123];
                };
                readonly next: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=4"];
                };
                readonly previous: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=2"];
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly service: {
                                readonly readOnly: true;
                                readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                                readonly type: "string";
                                readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                            };
                            readonly username: {
                                readonly type: readonly ["string", "null"];
                                readonly readOnly: true;
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                                readonly readOnly: true;
                            };
                        };
                        readonly required: readonly ["name", "service", "username"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RootRetrieve: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "service"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly service: {
                    readonly readOnly: true;
                    readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                    readonly type: "string";
                    readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                };
                readonly username: {
                    readonly type: readonly ["string", "null"];
                    readonly readOnly: true;
                };
                readonly name: {
                    readonly type: readonly ["string", "null"];
                    readonly readOnly: true;
                };
            };
            readonly required: readonly ["name", "service", "username"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UsersList: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly owner_username: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "username from service provider";
                };
                readonly service: {
                    readonly type: "string";
                    readonly enum: readonly ["bitbucket", "bitbucket_server", "github", "github_enterprise", "gitlab", "gitlab_enterprise"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Git hosting service provider";
                };
            };
            readonly required: readonly ["owner_username", "service"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly activated: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly is_admin: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly page: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A page number within the paginated result set.";
                };
                readonly page_size: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of results to return per page.";
                };
                readonly search: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A search term.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly count: {
                    readonly type: "integer";
                    readonly examples: readonly [123];
                };
                readonly next: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=4"];
                };
                readonly previous: {
                    readonly type: readonly ["string", "null"];
                    readonly format: "uri";
                    readonly examples: readonly ["http://api.example.org/accounts/?page=2"];
                };
                readonly results: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly service: {
                                readonly enum: readonly ["github", "gitlab", "bitbucket", "github_enterprise", "gitlab_enterprise", "bitbucket_server"];
                                readonly type: "string";
                                readonly description: "* `github` - Github\n* `gitlab` - Gitlab\n* `bitbucket` - Bitbucket\n* `github_enterprise` - Github Enterprise\n* `gitlab_enterprise` - Gitlab Enterprise\n* `bitbucket_server` - Bitbucket Server\n\n`github` `gitlab` `bitbucket` `github_enterprise` `gitlab_enterprise` `bitbucket_server`";
                            };
                            readonly username: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly name: {
                                readonly type: readonly ["string", "null"];
                            };
                            readonly activated: {
                                readonly type: "boolean";
                            };
                            readonly is_admin: {
                                readonly type: "boolean";
                            };
                            readonly email: {
                                readonly type: readonly ["string", "null"];
                            };
                        };
                        readonly required: readonly ["activated", "is_admin", "service"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { ReposBranchesList, ReposBranchesRetrieve, ReposCommitsList, ReposCommitsRetrieve, ReposCommitsUploadsList, ReposCompareComponentsRetrieve, ReposCompareFileRetrieve, ReposCompareFlagsRetrieve, ReposCompareImpactedFilesRetrieve, ReposCompareRetrieve, ReposCompareSegmentsRetrieve, ReposComponentsList, ReposConfigRetrieve, ReposCoverageList, ReposFileReportRetrieve, ReposFlagsCoverageList, ReposFlagsList, ReposList, ReposPullsList, ReposPullsRetrieve, ReposReportRetrieve, ReposReportTreeRetrieve, ReposRetrieve, ReposTotalsRetrieve, RootList, RootRetrieve, UsersList };
