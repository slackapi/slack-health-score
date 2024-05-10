"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'codecov/2.0.0 (api/6.1.1)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Returns all owners to which the currently authenticated user has access
     *
     * @summary Service owners
     */
    SDK.prototype.root_list = function (metadata) {
        return this.core.fetch('/{service}/', 'get', metadata);
    };
    /**
     * Returns a single owner by name
     *
     * @summary Owner detail
     */
    SDK.prototype.root_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/', 'get', metadata);
    };
    /**
     * Returns a paginated list of repositories for the specified provider service and owner
     * username
     *
     * Optionally filterable by:
     * * a list of repository `name`s
     * * a `search` term which matches against the name
     * * whether the repository is `active` or not
     *
     * @summary Repository list
     */
    SDK.prototype.repos_list = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/', 'get', metadata);
    };
    /**
     * Returns a single repository by name
     *
     * @summary Repository detail
     */
    SDK.prototype.repos_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/', 'get', metadata);
    };
    /**
     * Returns a paginated list of branches for the specified repository
     *
     * @summary Branch list
     */
    SDK.prototype.repos_branches_list = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/branches/', 'get', metadata);
    };
    /**
     * Returns a single branch by name.
     * Includes head commit information embedded in the response.
     *
     * @summary Branch detail
     */
    SDK.prototype.repos_branches_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/branches/{name}/', 'get', metadata);
    };
    /**
     * Returns a paginated list of commits for the specified repository
     *
     * Optionally filterable by:
     * * a `branch` name
     *
     * @summary Commit list
     */
    SDK.prototype.repos_commits_list = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/commits/', 'get', metadata);
    };
    /**
     * Returns a single commit by commitid (SHA)
     *
     * @summary Commit detail
     */
    SDK.prototype.repos_commits_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/commits/{commitid}/', 'get', metadata);
    };
    /**
     * Returns a paginated list of uploads for a single commit by commitid (SHA)
     *
     * @summary Commit uploads
     */
    SDK.prototype.repos_commits_uploads_list = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/commits/{commitid}/uploads/', 'get', metadata);
    };
    /**
     * Returns a comparison for either a pair of commits or a pull
     *
     * @summary Comparison
     */
    SDK.prototype.repos_compare_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/compare/', 'get', metadata);
    };
    /**
     * Component comparison
     *
     */
    SDK.prototype.repos_compare_components_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/compare/components', 'get', metadata);
    };
    /**
     * Returns a comparison for a specific file path
     *
     * @summary File comparison
     */
    SDK.prototype.repos_compare_file_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/compare/file/{file_path}', 'get', metadata);
    };
    /**
     * Returns flag comparisons
     *
     * @summary Flag comparison
     */
    SDK.prototype.repos_compare_flags_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/compare/flags', 'get', metadata);
    };
    /**
     * Returns a comparison for either a pair of commits or a pull
     * Will only return pre-computed impacted files comparisons if available
     * If unavailable `files` will be empty, however once the computation is ready
     * the files will appear on subsequent calls
     * `state: "processed"` means `files` are finished computing and returned
     * `state: "pending"` means `files` are still computing, poll again later
     *
     * @summary Impacted files comparison
     */
    SDK.prototype.repos_compare_impacted_files_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/compare/impacted_files', 'get', metadata);
    };
    /**
     * Returns a comparison for a specific file path only showing the segments
     * of the file that are impacted instead of all lines in file
     *
     * @summary Segmented file comparison
     */
    SDK.prototype.repos_compare_segments_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/compare/segments/{file_path}', 'get', metadata);
    };
    /**
     * Returns a list of components for the specified repository
     *
     * @summary Component list
     */
    SDK.prototype.repos_components_list = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/components/', 'get', metadata);
    };
    /**
     * Repository config
     *
     */
    SDK.prototype.repos_config_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/config/', 'get', metadata);
    };
    /**
     * Returns a paginated list of timeseries measurements aggregated by the specified
     * `interval`.  If there are no measurements on `start_date` then the response will include
     * 1 measurement older than `start_date` so that the coverage value can be carried forward
     * if necessary.
     *
     * Optionally filterable by:
     * * `branch`
     * * `start_date`
     * * `end_date`
     *
     * @summary Coverage trend
     */
    SDK.prototype.repos_coverage_list = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/coverage/', 'get', metadata);
    };
    /**
     * Similar to the coverage report endpoint but only returns coverage info for a single
     * file specified by `path`.
     *
     * By default that commit is the head of the default branch but can also be specified
     * explictily by:
     * * `sha` - return report for the commit with the given SHA
     * * `branch` - return report for the head commit of the branch with the given name
     *
     * @summary File coverage report
     */
    SDK.prototype.repos_file_report_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/file_report/{path}/', 'get', metadata);
    };
    /**
     * Returns a paginated list of flags for the specified repository
     *
     * @summary Flag list
     */
    SDK.prototype.repos_flags_list = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/flags/', 'get', metadata);
    };
    /**
     * Returns a paginated list of timeseries measurements aggregated by the specified
     * `interval`.  If there are no measurements on `start_date` then the response will include
     * 1 measurement older than `start_date` so that the coverage value can be carried forward
     * if necessary.
     *
     * Optionally filterable by:
     * * `branch`
     * * `start_date`
     * * `end_date`
     *
     * @summary Coverage trend
     */
    SDK.prototype.repos_flags_coverage_list = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/flags/{flag_name}/coverage/', 'get', metadata);
    };
    /**
     * Returns a paginated list of pulls for the specified repository
     *
     * Optionally filterable by:
     * * `state`
     * * `start_date`
     *
     * Orderable by:
     * * `pullid`
     *
     * @summary Pull list
     */
    SDK.prototype.repos_pulls_list = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/pulls/', 'get', metadata);
    };
    /**
     * Returns a single pull by ID
     *
     * @summary Pull detail
     */
    SDK.prototype.repos_pulls_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/pulls/{pullid}/', 'get', metadata);
    };
    /**
     * Similar to the coverage totals endpoint but also returns line-by-line
     * coverage info (hit=0/miss=1/partial=2).
     *
     * By default that commit is the head of the default branch but can also be specified
     * explictily by:
     * * `sha` - return report for the commit with the given SHA
     * * `branch` - return report for the head commit of the branch with the given name
     *
     * The report can be optionally filtered by specifying:
     * * `path` - only show report info for pathnames that start with this value
     * * `flag` - only show report info that applies to the specified flag name
     * * `component_id` - only show report info that applies to the specified component
     *
     * @summary Commit coverage report
     */
    SDK.prototype.repos_report_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/report/', 'get', metadata);
    };
    /**
     * Returns a hierarchical view of the report that matches the file structure of the covered
     * files
     * with coverage info rollups at each level.
     *
     * Returns only top-level data by default but the depth of the traversal can be controlled
     * via
     * the `depth` parameter.
     *
     * * `depth` - how deep in the tree to traverse (default=1)
     * * `path` - path in the tree from which to start the traversal (default is the root)
     *
     * @summary Coverage report tree
     */
    SDK.prototype.repos_report_tree_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/report/tree', 'get', metadata);
    };
    /**
     * Returns the coverage totals for a given commit and the
     * coverage totals broken down by file.
     *
     * By default that commit is the head of the default branch but can also be specified
     * explictily by:
     * * `sha` - return totals for the commit with the given SHA
     * * `branch` - return totals for the head commit of the branch with the given name
     *
     * The totals can be optionally filtered by specifying:
     * * `path` - only show totals for pathnames that start with this value
     * * `flag` - only show totals that applies to the specified flag name
     * * `component_id` - only show totals that applies to the specified component
     *
     * @summary Commit coverage totals
     */
    SDK.prototype.repos_totals_retrieve = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/repos/{repo_name}/totals/', 'get', metadata);
    };
    /**
     * Returns a paginated list of users for the specified owner (org)
     *
     * @summary User list
     */
    SDK.prototype.users_list = function (metadata) {
        return this.core.fetch('/{service}/{owner_username}/users/', 'get', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
