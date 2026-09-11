# AgentX Code — Developer & AI Agent Guidelines

## 1. Overview & Vision

AgentX Code is an autonomous, open-source AI coding agent built for the terminal. It provides a keyboard-driven, high-performance developer experience with first-class support for both sovereign local LLMs (Ollama, LM Studio, Jan, GPT4All, llama.cpp, LocalAI) and premier cloud model providers. It is designed for engineers who want deep code intelligence, multi-file edits, automated tool execution, and local-first privacy directly in their shell.

- **Display Name**: AgentX Code
- **CLI Binary Command**: `agentx`
- **Config Directory**: `.agentxcode` (user home `~/.agentxcode`, workspace `.agentxcode/`)
- **Repository**: `SohailKhan0525/agentxcode`
- **npm Package**: `@agent-qofeno/agentx-cli` (DO NOT CHANGE — already published)
- **Version**: `3.0.0`
- **Documentation**: `https://agentx.js.org`

---

## 2. Architecture & Monorepo Structure

The codebase is organized as a Bun workspace under `packages/`:

- **`packages/opencode`**: Core CLI entrypoint, command router (`src/cli/cmd`), local API server (`src/server`), agent loop orchestration, tool runner, and session lifecycle.
- **`packages/core`**: Effect-TS foundation services, file system utilities, provider registry, configuration loaders (`src/config.ts`), and local model runtime & hardware detector (`src/local/`).
- **`packages/tui`**: Solid.js terminal user interface powered by `@opentui`, featuring high-contrast yellow branding, ANSI ASCII art, diff renderers, status bars, and split-footer prompt input.
- **`packages/llm`**: AI SDK provider adapters, prompt templates, streaming transformers, and token bounding.
- **`packages/protocol`**: Public HTTP/SSE API schema definitions, event schemas, request and response envelope types.
- **`packages/schema`**: Zero-dependency domain types and structs shared between client and core.
- **`packages/client`**: Public generated Promise and Effect client libraries (`@opencode-ai/client`).
- **`packages/sdk` & `packages/sdk-next`**: In-process host and high-level client wrappers.
- **`packages/plugin`**: Extensible plugin system and hook dispatchers.
- **`sdks/vscode`**: Companion VS Code extension for running AgentX Code inside editor terminals.

Runtime dependency direction:
`Schema` -> `Core` & `Protocol` -> `Server` & `CLI`. Client runtime depends on `Schema` and `Protocol` but never on `Core` or `Server`.

---

## 3. Development, Build & Release Workflows

### Running Locally

- Start development CLI: `bun run --cwd packages/opencode src/index.ts`
- Run typechecking: `bun typecheck` (always from package root or via turbo, never run bare `tsc`)
- Run tests: From package directories only, e.g., `cd packages/opencode && bun test` (tests cannot run from repo root)

### Binary Compilation (`packages/opencode/script/build.ts`)

- Standalone binaries are compiled using Bun: `bun build --compile`.
- **Bun 1.3.14 Code-Splitting Fix**: Binaries must compile with `splitting: false` to avoid startup symbol export crashes on baseline builds.
- Packaging:
  - Linux & macOS: compressed as `agentx-<os>-<arch>.tar.gz`
  - Windows: compressed as `agentx-<os>-<arch>.zip`
  - Checksums: SHA-256 hashes generated into `dist/SHA256SUMS.txt`
- Targets supported (12 variants):
  - `windows-x64`, `windows-x64-baseline`, `windows-arm64`
  - `darwin-x64`, `darwin-x64-baseline`, `darwin-arm64`
  - `linux-x64`, `linux-x64-baseline`, `linux-x64-musl`, `linux-x64-baseline-musl`
  - `linux-arm64`, `linux-arm64-musl`

### Publishing & Distribution

- **npm**: Automated release with provenance attestation: `npm publish --provenance` under `@agent-qofeno/agentx-cli`.
- **JSR**: `bunx jsr publish` under `@agent-qofeno/agentx-cli`.
- **GitHub Packages**: Published to `npm.pkg.github.com/@SohailKhan0525/agentx-cli`.
- **Homebrew**: Formula automatically pushed to `SohailKhan0525/homebrew-agentx`.
- **VS Code Extension**: Packaged via `@vscode/vsce package` and attached as `agentx-vscode.vsix` to GitHub releases.

---

## 4. Coding Standards & Absolute Quality Rules

### Absolute Prohibitions

1. **Never write TODO, FIXME, or placeholder comments** of any kind.
2. **Never write stub functions** with empty bodies or comments that say "implement later". Every function must be fully implemented.
3. **Never generate dummy, mock, or fake data** in production code.
4. **Never hardcode secrets, tokens, or credentials**. Always consume via environment variables or secret vaults.
5. **Never guess**. Verify every file, type, and workflow before modifying.

### TypeScript & Style Guidelines

- **Strict Mode**: TypeScript strict mode is enabled across all packages. Avoid `any`; use `unknown` with type guards.
- **Inlining**: When a variable is used only once, inline it. Avoid unnecessary destructuring; use dot notation to preserve context.
- **Imports**: Never alias imports (`import { foo as bar }`). Never use star imports (`import * as Foo`).
- **Effect-TS Generators**: In Effect generators, bind services to named variables before calling methods. Do not use nested service yields.
- **Functional Arrays**: Prefer `map`, `filter`, `flatMap` over imperative loops.
- **Early Returns**: Avoid `else` blocks; use early returns and ternaries for assignment.

---

## 5. Provider & Tool Extension Architecture

### Adding a New Cloud AI Provider

1. Define the provider options schema and models catalog in `packages/core/src/plugin/provider/<provider-name>.ts`.
2. Register the provider in `packages/core/src/plugin/provider.ts`.
3. Provide SDK resolution in `packages/opencode/src/provider/provider.ts` via `@ai-sdk/*` or custom transport.
4. Support environment variable fallback and user credentials via `Auth.Info`.

### Local Models First-Class Provider

- Local models are managed by `packages/core/src/local/`.
- Detection probes Ollama (`:11434`), LM Studio (`:1234`), Jan (`:1337`), GPT4All (`:4891`), llama.cpp (`:8080`), and LocalAI (`:8080`).
- Hardware profiler checks CPU cores, RAM, GPU, and VRAM to recommend Fast, Balanced, or Quality models.
- Communication uses the OpenAI-compatible HTTP/SSE interface (`/v1/models`, `/v1/chat/completions`).

### Adding a New Built-in Tool

1. Create the tool specification in `packages/core/src/tool/`.
2. Export tool definitions and typed argument schemas with Zod / Effect Schema.
3. Register the tool in `packages/core/src/tool/registry.ts`.
4. Enforce output bounds via Managed Tool Output files if output exceeds terminal token thresholds.

---

## 6. Brand Identity & Visual Assets

- **Colors**: Bright Vivid Yellow (`#FFE600` / ANSI Yellow) and Deep Black (`#000000`).
- **Logo PNG**: `agentx_icon.png` (used in README, VS Code extension, and web documentation).
- **TUI Startup Screen**:
  - The TUI displays `AGENTX CODE` in bright yellow text.
  - Features the two startup ASCII art blocks:
    1. Cyan ANSI art spelling `AGENTX`
    2. Plain text art spelling `CODE`
- **Config Directory**: `.agentxcode` in user home and workspace roots.

---

## 7. Required Skills & MCP Tooling

Before performing complex tasks, AI agents should utilize the following skills from `skills.sh`:

- `writing-plans` (obra/superpowers): Write comprehensive implementation plans before executing multi-step tasks.
- `executing-plans` (obra/superpowers): Execute plans systematically with review checkpoints.
- `systematic-debugging` (obra/superpowers): Isolate root causes methodically before proposing fixes.
- `verification-before-completion` (obra/superpowers): Verify with evidence before asserting success.
- `subagent-driven-development` (obra/superpowers): Deconstruct large tasks into focused worker agents.
- `dispatching-parallel-agents` (obra/superpowers): Investigate independent domains in parallel.
- `finishing-a-development-branch` (obra/superpowers): Cleanly verify, commit, and push changes.
- `terminal-ui` (pproenca/dot-skills): Maintain high standards for terminal interaction and rendering.

MCP servers configured:

- **GitHub MCP**: Access issues, pull requests, commits, and release assets.
- **Playwright MCP**: Browser-based UI testing and visual verification.
- **Shadcn MCP**: UI registry lookup.

---

## 8. What Must NEVER Be Done

1. **NEVER modify the npm package name**: It must remain `@agent-qofeno/agentx-cli` as it is already published.
2. **NEVER re-add OpenCode Zen or OpenCode Go**: These proprietary services are strictly removed.
3. **NEVER commit secrets, tokens, or API keys** to the repository.
4. **NEVER run tests from the workspace root**: Always execute from individual package directories.
5. **NEVER alter version numbers randomly**: Keep version `3.0.0` synchronized across all `package.json` files.
