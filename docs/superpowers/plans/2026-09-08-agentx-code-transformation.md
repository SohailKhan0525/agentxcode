# AgentX Code Transformation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the opencode codebase into AgentX Code (binary `agentx`, version `3.0.0`, package `@agent-qofeno/agentx-cli`, repo `SohailKhan0525/agentxcode`), completely eliminating proprietary OpenCode Zen/Go providers, fully implementing first-class local models, establishing native multi-platform binary compilation and release pipelines, yellow/black TUI brand identity with ASCII art, updated VS Code extension, root install script, and full documentation.

**Architecture:** A TypeScript monorepo powered by Bun workspaces, Solid.js terminal UI (`@opentui`), Effect-TS core runtime, multi-provider LLM orchestration, and cross-platform native binary compilation with GitHub Actions and provenance attestation.

**Tech Stack:** Bun 1.3.14, TypeScript 5.8, Effect 4.0, Solid.js, OpenTUI, Drizzle ORM, GitHub Actions, `@vscode/vsce`, npm/JSR/GitHub Packages.

**Spec:** `AGENTX-CODE-ULTIMATE-PROMPT.md`

## Global Constraints

- Never write TODO, FIXME, placeholder comments, stub functions, fake data, or hardcoded credentials.
- The binary command name is `agentx`.
- The display name is `AgentX Code`.
- The npm package name is `@agent-qofeno/agentx-cli` (DO NOT CHANGE).
- The repository name is `SohailKhan0525/agentxcode`.
- The version is `3.0.0` everywhere across root and all package.json files.
- The configuration directory in home is `.agentxcode`.
- The website URL is `agentx.js.org`.
- TUI branding displays `AGENTX CODE` in bright yellow text and includes the two ASCII art blocks (cyan `AGENTX` and plain `CODE`).
- Image logo is `agentx_icon.png` (provided in root).
- Proprietary OpenCode Zen and OpenCode Go providers are completely removed.
- Local model support is first-class for Ollama, LM Studio, Jan, GPT4All, llama.cpp, LocalAI with automatic hardware profiling (CPU, RAM, GPU, VRAM) and tiered recommendations.
- Binary releases support all 12 platform targets (Linux, macOS, Windows x64/arm64/baseline/musl), packaged as `.tar.gz` for Linux/macOS and `.zip` for Windows.

---

## Phase Breakdown and Tasks

### Task 1: Phase Zero Verification & MCP Environment (Completed)
- [x] Verify all required skills (`writing-plans`, `executing-plans`, `systematic-debugging`, `verification-before-completion`, `subagent-driven-development`, `find-skills`, `dispatching-parallel-agents`, `finishing-a-development-branch`, `terminal-ui`, `ui-ux-pro-max`, `frontend-ui-ux-wizard`).
- [x] Verify GitHub CLI (`gh`) authentication with `SohailKhan0525` and appropriate scopes.
- [x] Inspect local tools and runtime capabilities.

### Task 2: Phase One & Two Analysis & Repository Inventory
- [x] Deep study of Kilocode reference at `C:\kilocode`: binary compilation (`build.ts`, `splitting: false`), multi-target matrix, packaging (`.tar.gz` for unix, `.zip` for windows), install script, smoke tests.
- [x] Full audit of working repository: packages, providers, local models, TUI rendering, VS Code extension, config paths, workflows.
- [x] Document planned copies and adaptations from Kilocode.

### Task 3: Phase Three Secrets & Credentials Audit (STOP & CONFIRM GATE)
- [x] Compile exhaustive inventory of all secrets, API keys, tokens, and environment variables across codebase.
- [x] Identify required repository secrets: `NPM_TOKEN`, `HOMEBREW_TAP_TOKEN`, `JSR_TOKEN`, `GITHUB_TOKEN`.
- [ ] Present secrets report to user and halt execution until confirmed.

### Task 4: Phase Four Repository Configuration & Comprehensive AGENTS.md
- [ ] Verify git remote points to `https://github.com/SohailKhan0525/agentxcode.git`.
- [ ] Create/update root-level `AGENTS.md` covering architecture, rules, build/release, provider extension, brand identity, and prohibitions.

### Task 5: Phase Five Cleanup of Non-Needed Artifacts & Legacy Workflows
- [ ] Verify removal of `infra`, `sst.config.ts`, `sst-env.d.ts`, `nix`, `flake.nix`, `flake.lock`, `STATS.md`.
- [ ] Remove `unlock.yml` (SST cloud deploy) and clean any unused cloud deployment scripts.
- [ ] Verify build remains intact after removals.

### Task 6: Phase Six Kilocode Adaptations for Binary Compilation & Packaging
- [ ] Update `packages/opencode/script/build.ts` with Kilocode improvements: set `splitting: false` to avoid Bun 1.3.14 bug, ensure correct binary output paths, copy tree-sitter wasms if needed.
- [ ] Ensure packaging creates `agentx-windows-*.zip`, `agentx-darwin-*.tar.gz`, `agentx-linux-*.tar.gz`.

### Task 7: Phase Seven Rebrand User-Facing Strings & Version 3.0.0
- [ ] Update config directory to `.agentxcode` in `packages/core/src/config.ts`, `packages/core/src/global.ts`, `packages/opencode/src/config/paths.ts`, etc.
- [ ] Ensure all `package.json` files throughout the repository have `"version": "3.0.0"`.
- [ ] Ensure binary command `agentx` is configured in `package.json` bin fields.
- [ ] Search and replace remaining `opencode.ai` -> `agentx.js.org`, `anomalyco` -> `SohailKhan0525`, `anomalyco/opencode` -> `SohailKhan0525/agentxcode`.

### Task 8: Phase Eight Brand Assets, Visual Identity & TUI Yellow Branding
- [ ] Ensure `agentx_icon.png` is placed and referenced in `README.md`, `sdks/vscode/images/icon.png`, and documentation.
- [ ] In `packages/tui/src/logo.ts` and `packages/tui/src/theme/`, ensure vivid yellow `#FFE600` / ANSI yellow color styling for `AGENTX CODE` text.
- [ ] Add the two ASCII art blocks (cyan ANSI `AGENTX` and plain `CODE`) to TUI startup screen / tips view / presentation.
- [ ] Ensure terminal screenshot SVG reflects AgentX Code identity.

### Task 9: Phase Nine Complete Removal of OpenCode Zen & Go Providers
- [ ] Verify zero occurrences of OpenCode Zen and OpenCode Go in provider registry, model definitions, options, UI, and tests.
- [ ] Verify all other providers remain intact and functional.

### Task 10: Phase Ten Local Model Provider Verification & Polish
- [ ] Verify detector for Ollama (11434), LM Studio (1234), Jan (1337), GPT4All (4891), llama.cpp (8080), LocalAI (8080).
- [ ] Verify hardware profiler (CPU, RAM, GPU, VRAM) and tiered recommendations (Fast, Balanced, Quality).
- [ ] Verify model pulling via CLI commands.

### Task 11: Phase Eleven Native Multi-Platform Binary Release Pipeline
- [ ] Build GitHub Actions release workflow `publish.yml` compiling all 12 targets with `bun build --compile`.
- [ ] Package archives (`.zip` for windows, `.tar.gz` for unix), checksums `SHA256SUMS.txt`, attach VS Code `.vsix`, and publish GitHub Release.

### Task 12: Phase Twelve Publishing Workflows & Secret Validation
- [ ] Update npm publish with `--provenance` and `id-token: write`.
- [ ] Update JSR publish configuration.
- [ ] Add secret validation step to workflows with descriptive error messages when secrets are missing.
- [ ] Update cross-platform test workflow.

### Task 13: Phase Thirteen Comprehensive Documentation Update
- [ ] Rewrite root `README.md` with AgentX Code logo, yellow TUI ASCII art, installation instructions, provider list, local models table, badges.
- [ ] Update all translated README files (`README.*.md`) ensuring zero opencode references remain.
- [ ] Update `CONTRIBUTING.md`, `SECURITY.md`, and subpackage markdown files.

### Task 14: Phase Fourteen VS Code Extension Polish & VSIX Build
- [ ] Verify `sdks/vscode/package.json` (`agentx`, `AgentX Code`, `3.0.0`, `agentx_icon.png`).
- [ ] Verify vsix packaging script `bun run package` and `@vscode/vsce package`.

### Task 15: Phase Fifteen Standalone Install Script
- [ ] Create root `install` script for macOS/Linux and `install.ps1` for Windows.
- [ ] Test architecture and OS detection, download from `SohailKhan0525/agentxcode/releases`, extraction to `~/.agentxcode/bin`, and PATH setup.

### Task 16: Phase Sixteen Build, Fix, and Verification
- [ ] Run typecheck and builds across all packages using `verification-before-completion`.
- [ ] Fix any syntax or import issues.
- [ ] Verify `agentx --version` reports `3.0.0`.

### Task 17: Phase Seventeen Final Commit and Release Guidance
- [ ] Apply `finishing-a-development-branch` skill.
- [ ] Stage all files, write conventional commit message, push to `SohailKhan0525/agentxcode`.
- [ ] Provide release tagging instructions to user.
