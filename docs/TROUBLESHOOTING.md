# Troubleshooting

## Current status and support boundary

ProChat Memory for QA package version `0.1.0`, prerelease tag `v0.1.0-beta.1`, is available to approved beta testers and approved business evaluators.

No npm package is published. The beta is not production-ready.

MCP is not included in the public snapshot. This guide covers the CLI and local workspace only.

## Unsupported Node.js version

Check the installed runtime:

```bash
node --version
```

ProChat Memory for QA requires Node.js `>=22.13.0`.

If the version is older, install a supported Node.js release using your organization’s approved method, then rebuild from the source checkout or reinstall the reviewed local tarball.

## Source checkout build fails

From the reviewed beta source checkout, run:

```bash
npm ci --ignore-scripts
npm run build
```

Confirm that:

- Node.js and npm meet the stated requirements;
- the checkout is the approved beta snapshot;
- the working directory is writable;
- dependency installation completed before the build command;
- no local edits changed package manifests, TypeScript configuration, or source files unexpectedly.

If the source checkout has local edits, reproduce the issue from a clean clone before reporting it.

## Local tarball installation fails

Confirm that:

- the tarball came from the approved beta distribution channel;
- the filename is `prochat-memory-0.1.0.tgz`;
- the checksum matches the supplied checksum;
- Node.js and npm meet the stated requirements;
- the current project directory is writable;
- an incomplete previous installation is not blocking npm.

Install the exact reviewed tarball with a relative path:

```bash
npm install --ignore-scripts ./prochat-memory-0.1.0.tgz
```

Do not substitute a similarly named package from an unapproved registry or download source.

## Checksum or package-source concerns

Do not install the tarball when:

- the checksum differs;
- the file was forwarded through an unapproved channel;
- the filename or version is unexpected;
- the archive contents differ from the supplied release manifest;
- the source cannot be verified.

Request a fresh approved package through the beta distribution process.

## The `prochat` binary is missing

If you are using the source checkout, run the CLI directly:

```bash
node packages/cli/dist/index.js --help
```

If that fails, rebuild the source checkout before troubleshooting tarball installation:

```bash
npm run build
```

If you are using a reviewed local tarball, confirm that the package is installed in the current project:

```bash
npm list @prochat/memory
```

Then test the local binary:

```bash
npx --no-install prochat --help
```

If the package is not listed, reinstall the approved tarball in the current project.

## `npx --no-install` fails

The `--no-install` option prevents npm from downloading an unrelated package from a registry.

If the command fails:

- confirm you are in the project where the tarball was installed;
- confirm `node_modules` exists;
- run `npm list @prochat/memory`;
- reinstall the approved tarball if the dependency is missing;
- do not remove `--no-install` merely to bypass the error.

## Workspace initialization fails

Use a relative, writable location:

```bash
node packages/cli/dist/index.js init ./qa-memory-workspace
```

Check that:

- the parent directory exists or can be created;
- the current user has write permission;
- an existing file is not occupying the intended directory name;
- the path is not controlled by a restrictive synchronization or security policy;
- the workspace is appropriate for the project’s data classification.

## Path and permission problems

Prefer relative paths in commands and confirm them from the current working directory.

Common causes include:

- typing the wrong relative path;
- running the command from a different directory;
- missing read permission on an input file;
- missing write permission on the workspace;
- security software blocking file creation;
- shared or synchronized folders applying unexpected restrictions.

Do not move sensitive workspace data into a less secure location merely to work around permissions.

## Invalid metadata

If a Markdown memory file is rejected:

- inspect the metadata fields and formatting;
- compare them with the reviewed public examples supplied for the same version;
- confirm required fields are present;
- confirm values use the supported format;
- remove unsupported or malformed fields;
- preserve project and scope boundaries.

Do not bypass metadata validation by editing the SQLite index directly.

## Project alias problems

If a project alias cannot be found or added:

- confirm the correct workspace was selected;
- use a neutral alias without confidential names;
- check whether the alias already exists;
- verify that the alias points to the intended project scope;
- avoid reusing one alias for unrelated clients or projects.

## Ingestion fails

Confirm that:

- the input path is correct and relative to the current directory;
- the file is readable;
- the input type is supported;
- the content is synthetic or thoroughly sanitized;
- no secrets, credentials, unapproved client data, or restricted production data are present;
- the selected project alias exists;
- the workspace is writable.

Do not repeatedly ingest the same failing file without reviewing whether the content is appropriate.

## Retrieval returns no matches

No result may mean:

- the workspace contains no relevant reviewed memory;
- the wrong project or scope was selected;
- the query is too narrow or too broad;
- the index is stale;
- relevant material exists only in an unapproved draft;
- the Markdown source does not contain the expected terminology.

Try a clearer sanitized query, confirm the project scope, and rebuild the index if necessary.

## Rebuild the SQLite index

The SQLite index is disposable and rebuildable. Markdown remains the durable source of truth.

Use the documented CLI index-rebuild command for the supplied beta version. Before rebuilding, confirm that the workspace points to the intended Markdown memory and that no other process is modifying it.

Do not edit SQLite tables manually. Rebuilding the index should not delete reviewed Markdown memory.

## Uninstall safely

Remove the installed package from the current project with:

```bash
npm uninstall @prochat/memory
```

Uninstalling the package does not delete the separately stored workspace.

Delete workspace data only after confirming that backup, retention, legal, client, and organizational requirements have been satisfied.

## Report a problem safely

GitHub Issues and Discussions in the public repository are the public feedback channels. Code contributions are not accepted during the beta. Submit only sanitized reports publicly; security concerns must follow the private reporting process in the security policy.

A useful sanitized report includes:

- affected version;
- command or workflow;
- synthetic reproduction steps;
- expected result;
- actual result;
- whether the problem is repeatable;
- relevant non-sensitive environment details.

Never submit:

- secrets or credentials;
- client or customer data;
- private logs or screenshots;
- internal URLs or hostnames;
- private repository links;
- proprietary project names;
- unredacted workspace files;
- personal information;
- sensitive database contents.

Security concerns should follow the private reporting process described in the security policy rather than a public Issue or Discussion.
