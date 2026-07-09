# Version

Package version:

```text
0.1.0
```

Prerelease tag:

```text
v0.1.0-beta.1
```

Status:

```text
Private beta and public evaluation
```

ProChat Memory for QA 0.1.0-beta.1 is available to approved beta testers and approved business evaluators under the ProChat Memory for QA Beta Evaluation License. It is not production-ready and is not published to npm.

## Included capabilities

Version 0.1.0 includes:

- a local TypeScript CLI exposed as `prochat`;
- package identities under `@prochat/memory*`;
- a shared core runtime;
- safe workspace initialization;
- project aliases and memory scopes;
- Markdown as the durable source of truth;
- a disposable and rebuildable local SQLite index;
- authorized plain-text ingestion;
- authorized JUnit XML ingestion;
- scoped and explainable memory retrieval;
- draft memory updates;
- explicit human approval before reusable memory is written;
- deprecation support;
- self-contained package tooling for reviewed local tarball installation;
- deterministic generation of the public source snapshot from the private canonical source.

## Runtime requirement

ProChat Memory for QA requires Node.js `>=22.13.0`.

## Excluded capabilities

Version 0.1.0 does not include:

- MCP in the public source snapshot;
- npm publication;
- hosted services;
- cloud synchronization;
- test execution;
- browser or mobile automation;
- natural-language test authoring;
- self-healing execution;
- dashboards;
- vector search or embeddings;
- broad filesystem watchers;
- silent memory promotion;
- unrestricted production or commercial-use rights.

## Licensing status

The public source snapshot is source-available, not open source. Approved beta testers may evaluate this designated beta version only under the applicable provisional terms.

Evaluation rights do not permit unrestricted production use, resale, redistribution, sublicensing, public SaaS operation, embedding in another commercial product, or competitive commercial use. Production and commercial use require a separate written agreement.

The beta license allows approved evaluation and testing only. It does not allow resale, redistribution, sublicensing, public SaaS operation, embedding in another commercial product, production use outside the beta evaluation, or competitive commercial use without a separate written agreement.

## Feedback and contributions

GitHub Issues and Discussions in the public repository are the initial public feedback channels. Do not submit secrets, client data, private logs, credentials, or other confidential material.

Code contributions are not accepted during this beta phase. Product changes are implemented in the private canonical repository and later included in a generated public snapshot.
