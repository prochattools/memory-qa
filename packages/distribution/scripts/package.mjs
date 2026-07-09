#!/usr/bin/env node

import { access, chmod, cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(scriptDirectory, "..");
const repositoryRoot = resolve(packageRoot, "../..");
const distributionRoot = join(packageRoot, "dist");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

function run(command, args, options = {}) {
	const result = spawnSync(command, args, {
		cwd: options.cwd ?? repositoryRoot,
		encoding: "utf8",
		stdio: options.capture ? "pipe" : "inherit",
	});

	if (result.status !== 0) {
		if (options.capture) {
			process.stderr.write(result.stdout ?? "");
			process.stderr.write(result.stderr ?? "");
		}
		throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}.`);
	}

	return {
		stdout: result.stdout ?? "",
		stderr: result.stderr ?? "",
	};
}

async function walkFiles(root) {
	const entries = await readdir(root, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const path = join(root, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await walkFiles(path)));
		} else if (entry.isFile()) {
			files.push(path);
		}
	}

	return files;
}

async function rewriteCliImports() {
	const cliRoot = join(distributionRoot, "cli");
	const coreEntry = join(distributionRoot, "core", "index.js");
	const files = await walkFiles(cliRoot);

	for (const file of files) {
		if (!file.endsWith(".js")) continue;

		const original = await readFile(file, "utf8");
		let importPath = relative(dirname(file), coreEntry).split(sep).join("/");
		if (!importPath.startsWith(".")) importPath = `./${importPath}`;

		const rewritten = original
			.replaceAll('"@prochat/memory-core"', `"${importPath}"`)
			.replaceAll("'@prochat/memory-core'", `'${importPath}'`);

		await writeFile(file, rewritten, "utf8");
	}
}

async function patchDistributionCliEntry() {
	const cliEntry = join(distributionRoot, "cli", "index.js");
	const original = await readFile(cliEntry, "utf8");
	const guardPattern = /const executedFile = process\.argv\[1\][\s\S]*?if \(executedFile === currentFile\) \{\s*process\.exitCode = await runCli\(\);\s*\}/;

	if (!guardPattern.test(original)) {
		throw new Error("Could not find the copied CLI direct-execution guard to patch.");
	}

	await writeFile(
		cliEntry,
		original.replace(guardPattern, "process.exitCode = await runCli();"),
		"utf8",
	);
}

async function removeBuildMetadata(root) {
	const files = await walkFiles(root);
	await Promise.all(
		files
			.filter((file) => file.endsWith(".tsbuildinfo"))
			.map((file) => rm(file, { force: true })),
	);
}

async function buildDistribution() {
	run(npmCommand, ["run", "build", "--workspace", "@prochat/memory-core"]);
	run(npmCommand, ["run", "build", "--workspace", "@prochat/memory-cli"]);

	await rm(distributionRoot, { recursive: true, force: true });
	await mkdir(distributionRoot, { recursive: true });
	await cp(join(repositoryRoot, "packages/core/dist"), join(distributionRoot, "core"), {
		recursive: true,
	});
	await cp(join(repositoryRoot, "packages/cli/dist"), join(distributionRoot, "cli"), {
		recursive: true,
	});
	await rewriteCliImports();
	await patchDistributionCliEntry();
	await removeBuildMetadata(distributionRoot);
	await chmod(join(distributionRoot, "cli", "index.js"), 0o755);
	await cp(join(repositoryRoot, "README.md"), join(packageRoot, "README.md"));
	await cp(join(repositoryRoot, "LICENSE.md"), join(packageRoot, "LICENSE.md"));

	console.log("Built self-contained @prochat/memory distribution.");
}

function parsePackJson(stdout) {
	const parsed = JSON.parse(stdout);
	if (!Array.isArray(parsed) || parsed.length !== 1) {
		throw new Error("Unexpected npm pack JSON output.");
	}
	return parsed[0];
}

function validatePackedFiles(packResult) {
	const forbiddenPatterns = [
		/INTERNAL-ROADMAP/i,
		/V0\.1-AUTOMATION-IMPLEMENTATION-PLAN/i,
		/PRIVATE-REPOSITORY-README/i,
		/PUBLIC-REPOSITORY-CONTENT-MANIFEST/i,
		/(^|\/)test(s)?\//i,
		/\.sqlite$/i,
		/\.env(\.|$)/i,
		/\.tsbuildinfo$/i,
		/(^|\/)node_modules\//i,
		/(^|\/)mcp\//i,
	];

	const forbidden = packResult.files
		.map((entry) => entry.path)
		.filter((path) => forbiddenPatterns.some((pattern) => pattern.test(path)));

	if (forbidden.length > 0) {
		throw new Error(`Forbidden package files detected:\n${forbidden.join("\n")}`);
	}

	const required = ["package.json", "README.md", "LICENSE.md", "dist/cli/index.js", "dist/core/index.js"];
	const packedPaths = new Set(packResult.files.map((entry) => entry.path));
	const missing = required.filter((path) => !packedPaths.has(path));

	if (missing.length > 0) {
		throw new Error(`Required package files are missing:\n${missing.join("\n")}`);
	}
}

async function inspectDistribution() {
	await buildDistribution();
	const { stdout } = run(npmCommand, ["pack", "--dry-run", "--json"], {
		cwd: packageRoot,
		capture: true,
	});
	const packResult = parsePackJson(stdout);
	validatePackedFiles(packResult);

	console.log(`Package: ${packResult.name}@${packResult.version}`);
	console.log(`Packed size: ${packResult.size} bytes`);
	for (const file of packResult.files) console.log(file.path);
}

async function packDistribution(destination = join(packageRoot, "artifacts")) {
	await buildDistribution();
	await mkdir(destination, { recursive: true });
	const { stdout } = run(
		npmCommand,
		["pack", "--json", "--pack-destination", destination],
		{ cwd: packageRoot, capture: true },
	);
	const packResult = parsePackJson(stdout);
	validatePackedFiles(packResult);
	const tarball = join(destination, packResult.filename);
	console.log(tarball);
	return tarball;
}

async function assertPathExists(path, description) {
	try {
		await access(path);
	} catch {
		throw new Error(`${description} is missing: ${path}`);
	}
}

async function testPackedCli() {
	const temporaryRoot = await mkdtemp(join(tmpdir(), "prochat-memory-pack-"));
	try {
		const tarball = await packDistribution(temporaryRoot);
		const installRoot = join(temporaryRoot, "install");
		const workspaceRoot = join(temporaryRoot, "workspace");
		await mkdir(installRoot, { recursive: true });
		run(npmCommand, ["init", "-y"], { cwd: installRoot });
		run(
			npmCommand,
			["install", "--ignore-scripts", "--no-audit", "--no-fund", tarball],
			{ cwd: installRoot },
		);

		const binaryName = process.platform === "win32" ? "prochat.cmd" : "prochat";
		const binaryPath = join(installRoot, "node_modules", ".bin", binaryName);
		await assertPathExists(binaryPath, "Installed prochat binary");

		let npxResult;
		try {
			npxResult = run(npxCommand, ["--no-install", "prochat", "init", workspaceRoot], {
				cwd: installRoot,
				capture: true,
			});
		} catch (error) {
			throw new Error(
				`Installed prochat command failed.\n${error instanceof Error ? error.message : String(error)}`,
			);
		}

		console.log(`npx stdout:\n${npxResult.stdout || "<empty>"}`);
		console.log(`npx stderr:\n${npxResult.stderr || "<empty>"}`);

		if (!npxResult.stdout.includes("Initialized ProChat Memory for QA")) {
			throw new Error(
				`npx did not execute the installed ProChat CLI. Expected initialization output, received:\nstdout:\n${npxResult.stdout || "<empty>"}\nstderr:\n${npxResult.stderr || "<empty>"}`,
			);
		}

		await assertPathExists(workspaceRoot, "Initialized workspace directory");

		const requiredDirectories = ["memory", "inbox", "drafts", ".prochat"];
		const requiredFiles = ["workspace.json", "projects.json", ".gitignore"];

		for (const directory of requiredDirectories) {
			await assertPathExists(
				join(workspaceRoot, directory),
				"Initialized workspace directory",
			);
		}

		for (const file of requiredFiles) {
			await assertPathExists(join(workspaceRoot, file), "Initialized workspace file");
		}

		let workspaceConfig;
		try {
			workspaceConfig = JSON.parse(await readFile(join(workspaceRoot, "workspace.json"), "utf8"));
		} catch (error) {
			throw new Error(
				`workspace.json is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
			);
		}

		const expectedWorkspaceRoot = resolve(workspaceRoot);
		const expectedPaths = {
			workspaceRoot: expectedWorkspaceRoot,
			projectsFile: join(expectedWorkspaceRoot, "projects.json"),
			memoryRoot: join(expectedWorkspaceRoot, "memory"),
			inboxRoot: join(expectedWorkspaceRoot, "inbox"),
			draftsRoot: join(expectedWorkspaceRoot, "drafts"),
			indexFile: join(expectedWorkspaceRoot, ".prochat", "index.sqlite"),
		};

		if (workspaceConfig.version !== 1) {
			throw new Error(`workspace.json version must be 1; received ${String(workspaceConfig.version)}.`);
		}

		for (const [field, expected] of Object.entries(expectedPaths)) {
			if (workspaceConfig[field] !== expected) {
				throw new Error(
					`workspace.json ${field} must equal ${expected}; received ${String(workspaceConfig[field])}.`,
				);
			}
		}

		console.log("Packed CLI clean-install test passed with verified workspace structure.");
	} finally {
		await rm(temporaryRoot, { recursive: true, force: true });
	}
}

const command = process.argv[2] ?? "build";

try {
	if (command === "build") await buildDistribution();
	else if (command === "inspect") await inspectDistribution();
	else if (command === "pack") await packDistribution();
	else if (command === "test") await testPackedCli();
	else throw new Error(`Unknown packaging command: ${command}`);
} catch (error) {
	console.error(error instanceof Error ? error.message : String(error));
	process.exitCode = 1;
}
