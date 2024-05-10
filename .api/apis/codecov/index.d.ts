import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * Returns all owners to which the currently authenticated user has access
     *
     * @summary Service owners
     */
    root_list(metadata: types.RootListMetadataParam): Promise<FetchResponse<200, types.RootListResponse200>>;
    /**
     * Returns a single owner by name
     *
     * @summary Owner detail
     */
    root_retrieve(metadata: types.RootRetrieveMetadataParam): Promise<FetchResponse<200, types.RootRetrieveResponse200>>;
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
    repos_list(metadata: types.ReposListMetadataParam): Promise<FetchResponse<200, types.ReposListResponse200>>;
    /**
     * Returns a single repository by name
     *
     * @summary Repository detail
     */
    repos_retrieve(metadata: types.ReposRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposRetrieveResponse200>>;
    /**
     * Returns a paginated list of branches for the specified repository
     *
     * @summary Branch list
     */
    repos_branches_list(metadata: types.ReposBranchesListMetadataParam): Promise<FetchResponse<200, types.ReposBranchesListResponse200>>;
    /**
     * Returns a single branch by name.
     * Includes head commit information embedded in the response.
     *
     * @summary Branch detail
     */
    repos_branches_retrieve(metadata: types.ReposBranchesRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposBranchesRetrieveResponse200>>;
    /**
     * Returns a paginated list of commits for the specified repository
     *
     * Optionally filterable by:
     * * a `branch` name
     *
     * @summary Commit list
     */
    repos_commits_list(metadata: types.ReposCommitsListMetadataParam): Promise<FetchResponse<200, types.ReposCommitsListResponse200>>;
    /**
     * Returns a single commit by commitid (SHA)
     *
     * @summary Commit detail
     */
    repos_commits_retrieve(metadata: types.ReposCommitsRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposCommitsRetrieveResponse200>>;
    /**
     * Returns a paginated list of uploads for a single commit by commitid (SHA)
     *
     * @summary Commit uploads
     */
    repos_commits_uploads_list(metadata: types.ReposCommitsUploadsListMetadataParam): Promise<FetchResponse<200, types.ReposCommitsUploadsListResponse200>>;
    /**
     * Returns a comparison for either a pair of commits or a pull
     *
     * @summary Comparison
     */
    repos_compare_retrieve(metadata: types.ReposCompareRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposCompareRetrieveResponse200>>;
    /**
     * Component comparison
     *
     */
    repos_compare_components_retrieve(metadata: types.ReposCompareComponentsRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposCompareComponentsRetrieveResponse200>>;
    /**
     * Returns a comparison for a specific file path
     *
     * @summary File comparison
     */
    repos_compare_file_retrieve(metadata: types.ReposCompareFileRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposCompareFileRetrieveResponse200>>;
    /**
     * Returns flag comparisons
     *
     * @summary Flag comparison
     */
    repos_compare_flags_retrieve(metadata: types.ReposCompareFlagsRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposCompareFlagsRetrieveResponse200>>;
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
    repos_compare_impacted_files_retrieve(metadata: types.ReposCompareImpactedFilesRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposCompareImpactedFilesRetrieveResponse200>>;
    /**
     * Returns a comparison for a specific file path only showing the segments
     * of the file that are impacted instead of all lines in file
     *
     * @summary Segmented file comparison
     */
    repos_compare_segments_retrieve(metadata: types.ReposCompareSegmentsRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposCompareSegmentsRetrieveResponse200>>;
    /**
     * Returns a list of components for the specified repository
     *
     * @summary Component list
     */
    repos_components_list(metadata: types.ReposComponentsListMetadataParam): Promise<FetchResponse<200, types.ReposComponentsListResponse200>>;
    /**
     * Repository config
     *
     */
    repos_config_retrieve(metadata: types.ReposConfigRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposConfigRetrieveResponse200>>;
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
    repos_coverage_list(metadata: types.ReposCoverageListMetadataParam): Promise<FetchResponse<200, types.ReposCoverageListResponse200>>;
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
    repos_file_report_retrieve(metadata: types.ReposFileReportRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposFileReportRetrieveResponse200>>;
    /**
     * Returns a paginated list of flags for the specified repository
     *
     * @summary Flag list
     */
    repos_flags_list(metadata: types.ReposFlagsListMetadataParam): Promise<FetchResponse<200, types.ReposFlagsListResponse200>>;
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
    repos_flags_coverage_list(metadata: types.ReposFlagsCoverageListMetadataParam): Promise<FetchResponse<200, types.ReposFlagsCoverageListResponse200>>;
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
    repos_pulls_list(metadata: types.ReposPullsListMetadataParam): Promise<FetchResponse<200, types.ReposPullsListResponse200>>;
    /**
     * Returns a single pull by ID
     *
     * @summary Pull detail
     */
    repos_pulls_retrieve(metadata: types.ReposPullsRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposPullsRetrieveResponse200>>;
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
    repos_report_retrieve(metadata: types.ReposReportRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposReportRetrieveResponse200>>;
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
    repos_report_tree_retrieve(metadata: types.ReposReportTreeRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposReportTreeRetrieveResponse200>>;
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
    repos_totals_retrieve(metadata: types.ReposTotalsRetrieveMetadataParam): Promise<FetchResponse<200, types.ReposTotalsRetrieveResponse200>>;
    /**
     * Returns a paginated list of users for the specified owner (org)
     *
     * @summary User list
     */
    users_list(metadata: types.UsersListMetadataParam): Promise<FetchResponse<200, types.UsersListResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
