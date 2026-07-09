# Privacy and Safety

## Current status and licensing

ProChat Memory for QA package version `0.1.0`, prerelease tag `v0.1.0-beta.1`, is available to approved beta testers and approved business evaluators.

No npm package is published. The beta is not production-ready.

The public source is source-available, not open source. Approved beta use is limited to testing and evaluation under the beta license. Production use, resale, redistribution, hosted use, embedded use, and commercial use outside evaluation require a separate written agreement.

MCP is not included in the public snapshot.

## Local-first storage

ProChat Memory for QA is designed around local workspaces.

The software package and the workspace are separate:

- the installed package provides the CLI and runtime;
- the workspace contains Markdown memory, configuration, drafts, inbox material, and a rebuildable SQLite index.

The workspace remains on the local filesystem unless a user or organization deliberately moves, backs up, synchronizes, or shares it.

## Client and project separation

Do not combine unrelated clients, customers, or confidential projects in one shared workspace without an approved isolation design.

Use separate workspaces or clearly separated scopes where required by:

- client confidentiality;
- contractual obligations;
- organizational access controls;
- data-retention rules;
- legal or regulatory requirements;
- project ownership boundaries.

Use neutral aliases where public feedback or demonstrations are involved. Do not expose real client or confidential project names.

## Sanitization before ingestion

Only ingest material you are authorized to process.

Before ingestion, remove or replace:

- secrets and credentials;
- personal information;
- client identifiers;
- internal URLs and hostnames;
- confidential source excerpts;
- private repository references;
- sensitive logs and traces;
- production data that is not approved for evaluation;
- information subject to retention or disclosure restrictions.

Use synthetic or thoroughly sanitized examples whenever possible.

## Secrets are prohibited

Do not store passwords, access tokens, private keys, certificates, recovery codes, connection strings, or other credentials in QA memory, drafts, examples, or public feedback.

If sensitive material is discovered, stop processing it, follow the applicable organizational incident process, and replace the affected content with a sanitized version before continuing.

## Markdown is the durable source of truth

Reviewed reusable memory is stored as Markdown.

Markdown files should remain:

- understandable without the index;
- reviewable by a human;
- traceable to authorized evidence;
- free of unnecessary sensitive detail;
- scoped to the correct project or workspace;
- maintainable through normal versioning or backup practices chosen by the organization.

Do not treat generated or indexed output as more authoritative than the reviewed Markdown source.

## SQLite is disposable and rebuildable

The local SQLite index exists to support search and retrieval.

It is not the durable source of truth and should be treated as disposable. If the index is corrupted, stale, or removed, rebuild it from the reviewed Markdown memory.

Deleting the index does not intentionally delete the underlying Markdown memory. Deleting Markdown memory is a separate and deliberate data-removal action.

## Human approval is required

Ingestion, retrieval, or draft generation must not silently promote information into reusable memory.

A human reviewer must verify:

- factual accuracy;
- relevance;
- correct project scope;
- absence of secrets and sensitive data;
- suitable wording;
- whether the information should be reusable at all.

Only reviewed drafts should be approved.

## Filesystem permissions and access

Store workspaces only in locations with appropriate operating-system and organizational access controls.

Consider:

- who can read or modify the files;
- whether the location is synchronized or backed up;
- whether endpoint security is active;
- whether contractors or shared accounts have access;
- whether file permissions match the data classification;
- whether temporary files or editor backups expose content.

The software does not replace operating-system security or organizational access management.

## Backups, retention, and deletion

The user or organization is responsible for deciding:

- whether the workspace should be backed up;
- where backups are stored;
- how long memory and drafts are retained;
- when records must be deleted;
- whether legal holds or contractual retention duties apply;
- how deletion is verified.

Uninstalling the package does not delete the workspace.

Delete workspace data only after confirming that retention, backup, legal, client, and organizational requirements have been satisfied.

## Public feedback safety

GitHub Issues and Discussions in the public repository are the public feedback channels. Code contributions are not accepted during the beta.

Never submit the following publicly:

- secrets or credentials;
- client or customer data;
- private QA memory;
- confidential logs or screenshots;
- internal URLs or hostnames;
- private repository links;
- proprietary project names;
- unredacted workspace files;
- personal information;
- sensitive database contents.

Use synthetic or thoroughly sanitized reproduction steps. Security concerns should follow the private reporting method described in the security policy rather than a public Issue or Discussion.

## Responsibility during beta evaluation

Approved testers must follow the applicable beta agreement, organizational policies, data-handling rules, and authorization boundaries.

Source visibility does not grant permission to use, redistribute, host, embed, or commercialize the software beyond the rights provided by the applicable beta terms or future commercial agreement.
