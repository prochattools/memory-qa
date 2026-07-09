# Architecture

## Release status

ProChat Memory for QA package version `0.1.0`, prerelease tag `v0.1.0-beta.1`, is available to approved beta testers and approved business evaluators.

The public source is source-available, not open source. No npm package is published. The release is not production-ready.

MCP is not included in the public snapshot.

## Local product architecture

ProChat Memory for QA uses a local-first architecture built around:

- a local `prochat` CLI;
- a shared core runtime;
- a tester-controlled workspace;
- Markdown as the durable source of truth;
- a rebuildable local SQLite index;
- explicit project aliases and memory scopes;
- human approval before reusable memory is written.

The CLI and shared core operate on local files. The product does not require hosted services or cloud synchronization for the supported beta workflow.

## Durable and generated data

Reviewed reusable memory is stored as Markdown. The Markdown files remain readable and reviewable without the search index.

SQLite stores a generated local index used for retrieval. The index is disposable and rebuildable from the Markdown source of truth. Removing or rebuilding the index must not delete reviewed Markdown memory.

## Workspace boundaries

The software installation and QA memory workspace are separate.

A workspace may contain:

- Markdown memory files;
- project aliases and configuration;
- inbox material;
- drafts;
- a rebuildable SQLite index;
- local metadata required by the supported workflow.

Users are responsible for selecting workspace locations that satisfy their organization’s access-control, confidentiality, retention, and backup requirements.

Separate clients and unrelated confidential projects must remain in separate workspaces or approved isolated scopes.

## Public source snapshot

The public snapshot is generated from a private canonical source.

The export process:

- starts from an exact canonical source commit;
- copies only explicitly allowlisted public files;
- records the exact canonical source commit in generated provenance;
- does not include private Git history;
- rejects files outside the approved public set;
- excludes secrets, credentials, private data, and internal operational material;
- validates the generated snapshot before publication.

The public repository is a generated snapshot, not an independently maintained source of truth.

## Provenance and review

Generated provenance records the release identity and exact canonical source commit used to create the public snapshot.

The snapshot is reviewed for:

- release-name and version consistency;
- allowed file paths;
- absence of private Git history;
- absence of secrets and credentials;
- absence of private QA memory and client data;
- absence of internal operational material;
- successful validation of the exported source.

## Product boundaries

The beta architecture does not provide:

- hosted services;
- cloud synchronization;
- test execution;
- browser or mobile automation;
- natural-language test authoring;
- self-healing execution;
- dashboards;
- unrestricted production or commercial-use rights.

Production and commercial use require a separate written agreement.
