# Installation

## Current availability

ProChat Memory for QA package version `0.1.0`, prerelease tag `v0.1.0-beta.1`, is available to approved beta testers and approved business evaluators.

No npm package is published. The beta is not production-ready.

MCP is not included in the public snapshot.

## Requirements

Install:

- Node.js `>=22.13.0`;
- npm compatible with the installed Node.js release;
- a reviewed public beta source snapshot or the reviewed local tarball `prochat-memory-0.1.0.tgz`;
- a writable location for the QA memory workspace.

Check the installed versions:

```bash
node --version
npm --version
```

If ProChat supplied a tarball, verify the filename and SHA-256 checksum against the release information supplied with the beta before installation.

## Install from the reviewed source snapshot

From the checked-out beta source repository:

```bash
npm install --ignore-scripts
npm run build
node packages/cli/dist/index.js --help
```

Run the CLI directly from source:

```bash
node packages/cli/dist/index.js init ./qa-memory-workspace
```

Use this source-based flow unless your beta invitation supplies a reviewed local tarball.

## Install from the reviewed local tarball

Create or select a clean project directory, then install the exact supplied tarball:

```bash
npm init -y
npm install --ignore-scripts ./prochat-memory-0.1.0.tgz
npx --no-install prochat --help
```

Use `--no-install` so npm does not fetch an unrelated package from a registry.

Do not install a similarly named package from a public registry or unapproved download source.

## Initialize a workspace

Software installation and workspace storage are separate decisions.

Initialize a workspace in a location you control:

```bash
npx --no-install prochat init ./qa-memory-workspace
```

The installed package provides the CLI and runtime. The workspace stores local QA memory, configuration, drafts, inbox material, project mappings, and a rebuildable SQLite index.

Choose a workspace location appropriate for the applicable data classification, access controls, backup policy, and client or project separation requirements.

Do not place unrelated clients or confidential projects in one shared workspace.

## Local data behavior

ProChat Memory for QA follows a local-first model.

The workspace remains on the local filesystem unless a user or organization deliberately moves, backs up, synchronizes, or shares it.

The workspace may contain:

- Markdown memory files;
- workspace and project configuration;
- drafts;
- inbox material;
- a rebuildable SQLite index;
- ignore rules and local metadata.

Uninstalling the package does not delete the workspace.

## Uninstall the software

From the project where the tarball was installed:

```bash
npm uninstall @prochat/memory
```

This removes the installed package from that project. It does not remove a separately stored QA memory workspace.

## Remove local workspace data

Delete a workspace only after confirming that its contents are no longer required and that applicable retention, backup, legal, client, and organizational requirements have been satisfied.

Use the normal file-management tools for your operating system to remove the chosen workspace directory. Review the directory carefully before deletion.

The SQLite index is rebuildable and may be removed and recreated without deleting the Markdown source of truth. Do not delete Markdown memory files unless deliberate data removal is intended.

## Upgrades

Use only a beta version explicitly supplied or approved for the evaluation.

Before upgrading:

- read the supplied release notes;
- verify the new tarball and checksum;
- back up required workspace files according to organizational policy;
- confirm the supported Node.js version;
- test the new package in a clean project before replacing an existing installation.

Do not assume that beta versions are backward-compatible or production-ready.
