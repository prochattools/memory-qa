# Security Policy

## Current status

ProChat Memory for QA is in a private beta and public evaluation phase. No npm package has been published.

The public source snapshot is source-available rather than open source. Approved beta testers may evaluate the designated beta version only under the applicable provisional evaluation terms. Those rights do not permit unrestricted production use, resale, redistribution, sublicensing, public SaaS operation, embedding, or competitive commercial use.

MCP is not included in the public source snapshot.

ProChat Memory for QA requires Node.js `>=22.13.0`.

## Reporting a security issue

Do not use a public Issue or Discussion to report a vulnerability. Use the private security-reporting mechanism configured for the public repository or identified in the applicable release documentation.

Do not disclose suspected vulnerabilities publicly before a coordinated fix or disclosure decision is made.

A useful report should contain only the minimum sanitized information necessary to reproduce the issue:

- affected version;
- affected command or workflow;
- sanitized reproduction steps;
- expected result;
- actual result;
- security impact;
- whether the issue affects local data, workspace isolation, package installation, or command execution.

## Information that must not be submitted publicly

Never include the following in GitHub Issues, Discussions, screenshots, examples, or reproduction archives:

- passwords, tokens, credentials, keys, or certificates;
- client or customer data;
- private QA memory;
- confidential logs or traces;
- private screenshots;
- internal URLs or hostnames;
- private repository links;
- proprietary project names;
- personal information;
- unredacted workspace files;
- sensitive database contents.

Use synthetic or thoroughly sanitized examples.

## Supported beta versions

During the beta, only versions explicitly designated as supported in the beta documentation or agreement receive security fixes.

Beta testers may be required to upgrade to a newer beta version before further investigation or support continues. Older beta versions may be withdrawn when a security or data-handling issue is found.

This document omits private infrastructure, escalation paths, and response procedures.

## Local-first security model

ProChat Memory for QA is designed around local workspaces and explicit user-controlled files.

Security assumptions include:

- Markdown is the durable source of truth;
- the SQLite index is local, disposable, and rebuildable;
- client and project workspaces remain separated;
- reusable memory requires human approval;
- sensitive data is sanitized before reuse or feedback submission;
- users control where the workspace is stored and who can access it.

Users remain responsible for operating-system permissions, backup security, endpoint protection, and access control for their local workspace.

## Contributions and feedback

GitHub Issues and Discussions in the public repository are the initial public feedback channels. Code contributions are not accepted during this beta phase.

Security fixes are implemented in the private canonical repository and included in a later reviewed public snapshot or release.

Production and commercial use require a separate written agreement.
