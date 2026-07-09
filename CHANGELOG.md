# Changelog

## 0.1.0-beta.1 — Private beta and public evaluation

ProChat Memory for QA 0.1.0-beta.1 introduces a local, tool-agnostic QA memory workflow for approved beta evaluation.

### Included

- product rename to ProChat Memory for QA;
- package rename to `@prochat/memory*`;
- preserved `prochat` CLI command;
- local CLI commands;
- shared core runtime;
- local workspace initialization;
- project aliases and memory scopes;
- authorized plain-text and JUnit XML ingestion;
- scoped memory retrieval with match explanations;
- draft creation and review;
- explicit approval before reusable memory is written;
- rebuildable local SQLite indexing;
- self-contained `@prochat/memory` package tooling for reviewed local tarball installation;
- deterministic public source export generated from the private canonical source.

### Excluded

- MCP from the public source snapshot;
- npm publication;
- hosted services;
- cloud synchronization;
- test execution;
- browser or mobile automation;
- natural-language test generation;
- self-healing test execution;
- dashboards;
- unrestricted production or commercial deployment.

### Runtime and release model

- package version: `0.1.0`;
- prerelease tag: `v0.1.0-beta.1`;
- Node.js requirement: `>=22.13.0`;
- local-first operation;
- public source snapshot is source-available, not open source;
- the release is available to approved beta testers and approved business evaluators, but is not production-ready.

### Availability and licensing

Approved beta testers and business evaluators may use the designated beta only under the ProChat Memory for QA Beta Evaluation License. Those rights do not permit unrestricted production use, resale, redistribution, sublicensing, public SaaS operation, embedding in another commercial product, or competitive commercial use.

Production and commercial use require a separate written agreement.

### Feedback

GitHub Issues and Discussions in the public repository are the initial public feedback channels. Do not submit secrets, client data, private logs, credentials, or other confidential material.

Code contributions are not accepted during this beta phase. Fixes are implemented in the private canonical repository and included in a later generated public snapshot.
