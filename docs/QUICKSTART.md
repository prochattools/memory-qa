# Quick Start

## Current status and permission to use

ProChat Memory for QA package version `0.1.0`, prerelease tag `v0.1.0-beta.1`, is available to approved beta testers and approved business evaluators.

No npm package is published. The beta is not production-ready.

MCP is not included in the public snapshot. This guide uses only the `prochat` CLI.

## Before you begin

Confirm that:

- Node.js `>=22.13.0` is installed;
- the reviewed source snapshot has been built, or the reviewed local tarball has already been installed;
- you are using authorized synthetic or thoroughly sanitized input;
- the workspace location is appropriate for the data and project involved;
- you have permission to evaluate the software under the applicable beta terms.

Never ingest secrets, credentials, unapproved client data, private production logs, or confidential information that has not been sanitized.

## 1. Initialize a workspace

Create a local workspace using a relative path:

```bash
node packages/cli/dist/index.js init ./qa-memory-workspace
```

The workspace stores Markdown memory, configuration, drafts, inbox material, and a rebuildable local SQLite index.

## 2. Add a project alias

Register a project alias for the workspace:

```bash
node packages/cli/dist/index.js project add sample-project ./qa-memory-workspace
```

Use a neutral alias that does not expose a real client, customer, or confidential project name.

## 3. Prepare authorized input

Create a synthetic or sanitized failure report in a relative location such as:

```text
./samples/failure.txt
```

Example content:

```text
Test: checkout summary renders totals
Result: failed
Observed: displayed subtotal did not match the sanitized fixture
Environment: approved beta evaluation
```

Do not place credentials, personal information, private URLs, or real client identifiers in the input.

## 4. Ingest the input

Ingest the authorized sample for the registered project:

```bash
node packages/cli/dist/index.js ingest ./samples/failure.txt --project sample-project ./qa-memory-workspace
```

Review command output before continuing. If the input contains information that should not become reusable memory, stop and sanitize it first.

## 5. Retrieve relevant memory

Search the project scope for relevant prior knowledge:

```bash
node packages/cli/dist/index.js retrieve --project sample-project --query "checkout subtotal mismatch" ./qa-memory-workspace
```

Review the returned matches and explanations. No result should be treated as authoritative without human judgment.

## 6. Create a draft

Create a proposed memory update from the reviewed evidence:

```bash
node packages/cli/dist/index.js draft create --from <ingestion-id> --project sample-project --title "Checkout subtotal mismatch" ./qa-memory-workspace
```

Inspect the generated draft in the workspace. Remove sensitive details, unsupported conclusions, temporary debugging noise, and project-specific information that should not be reused.

## 7. Approve the draft

Approve only after human review:

```bash
node packages/cli/dist/index.js approve <draft-id> ./qa-memory-workspace
```

Approval promotes reviewed information into reusable Markdown memory. Do not approve a draft merely because it was generated successfully.

## 8. Continue safely

Keep separate clients and unrelated confidential projects in separate workspaces or appropriately isolated scopes.

Treat Markdown as the durable source of truth. Treat the SQLite index as local, disposable, and rebuildable.

## Feedback

GitHub Issues and Discussions in the public repository are the public feedback channels. Code contributions are not accepted during the beta.

Submit only synthetic or thoroughly sanitized examples. Never submit secrets, credentials, client data, private logs, screenshots, internal URLs, workspace contents, or confidential project information.
