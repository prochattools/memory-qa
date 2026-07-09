# ProChat Memory for QA

ProChat Memory for QA is a local, source-available beta for QA testers and test teams that use AI during failed-test investigation.

It helps testers preserve reviewed lessons from Playwright, Cypress, Selenium, Robot Framework, CI output, exploratory testing, and manual QA work, then retrieve those lessons when similar failures happen again.

This public-facing source snapshot is generated from a separate private canonical development repository. The private repository remains the only source of truth. Public snapshots are produced through a reviewed, allowlist-based export process; private roadmaps, implementation plans, commercial material, tester records, and internal documentation are never part of the public export.

## Current status

ProChat Memory for QA `0.1.0-beta.1` is available to approved beta testers and approved business evaluators.

This is beta software. It is not production-ready, and no npm package is published.

The source is visible for evaluation, but it is not open source. Approved beta users may clone, inspect, build, run, and locally modify the beta for testing and evaluation in authorized environments under the [ProChat Memory for QA Beta Evaluation License](LICENSE.md).

The beta license does not allow resale, redistribution, public hosting, sublicensing, production use, or commercial use beyond evaluation/testing without a separate written agreement.

## Included in the public beta snapshot

The public beta snapshot includes:

- the local CLI;
- the shared core runtime;
- the self-contained `@prochat/memory` distribution tooling;
- reviewed installation and quick-start documentation;
- privacy, safety, troubleshooting, architecture, security, contribution, trademark, version, and changelog documents;
- synthetic examples and templates after explicit review.

MCP is not included in the public beta snapshot.

## Feedback during the beta

The public feedback channels are GitHub Issues and GitHub Discussions when they are enabled for the public beta repository.

Code contributions are not yet accepted. Product fixes and documentation changes will be implemented in the private canonical repository and included in a later generated public snapshot.

Do not submit secrets, client data, private logs, confidential screenshots, internal URLs, credentials, private repository links, or sensitive project information through public feedback channels.

## Release model

Each public version will be generated from one reviewed private source commit.

A public snapshot will record:

- product version;
- package version;
- exact canonical source commit;
- export timestamp;
- export-format version;
- whether MCP is included;
- a sorted manifest of exported files;
- release-asset checksums.

Public releases will not copy private Git history. A failed export or validation leaves the public repository unchanged.

## Beta licensing

The current public snapshot is governed by the ProChat Memory for QA Beta Evaluation License.

Approved beta users may:

- clone and inspect the source;
- run the software locally for testing and evaluation;
- create local modifications for evaluation;
- use synthetic or authorized sanitized QA evidence;
- test it in authorized business or client environments when permitted by that environment.

Approved beta users may not:

- resell, rent, sublicense, or redistribute the software;
- publish modified versions or mirrors;
- offer ProChat Memory for QA as a hosted service;
- embed it in another commercial product;
- use it for production operations outside the beta evaluation;
- remove notices, license terms, or ProChat branding.

Future commercial use requires a separate written agreement.

## Safety principles

- QA memory remains local unless a user explicitly moves or shares it.
- Markdown is the durable source of truth.
- Local indexes are disposable and rebuildable.
- Reusable memory requires human review.
- Client and project data must remain separated.
- Sensitive data must be sanitized before reuse or feedback submission.

## Availability

Approved beta testers may use the reviewed public beta snapshot or another approved beta artifact supplied by ProChat.

No public npm package is published.
