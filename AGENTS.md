# AGENTS.md — AgentX Code Engineering Rules

AgentX Code (`agentx`) is an open-source, autonomous AI coding agent built for the terminal and VS Code, supporting premier cloud LLMs and first-class local runtimes (Ollama, LM Studio, Jan, LocalAI).

## Absolute Rules & Standards

1. **Package Identity**:
   - npm package name: `@agent-qofeno/agentx-cli` (MUST NEVER BE CHANGED — already published).
   - CLI command: `agentx`
   - Config directory: `~/.agentxcode` and workspace `.agentxcode/`
   - Repository: `SohailKhan0525/agentxcode`
   - Default release branch: `dev` / `main`
2. **Quality & Zero-Defect Standards**:
   - Zero `TODO`, `FIXME`, or placeholder comments in product code.
   - Zero stub functions with empty bodies or comments instead of logic.
   - Zero hardcoded secrets, API keys, or tokens in source files.
   - Never use fake or dummy mock data in production paths.
3. **Binary Compilation Pipeline**:
   - Bun compilation MUST use `splitting: false` in `packages/opencode/script/build.ts` to prevent symbol export crashes on startup across all 12 platform matrix targets.
   - Packaging: `.tar.gz` for Linux and macOS, `.zip` for Windows, with `SHA256SUMS.txt`.

## Build and Dev Commands

- **Dev**: `bun run dev` (runs from root) or `bun run --cwd packages/opencode src/index.ts`
- **Typecheck**: `bun turbo typecheck` (uses `tsgo`)
- **Tests**: `bun test` from `packages/opencode/` (package-level test execution)
- **Local AI Scan**: `bun run --cwd packages/opencode src/index.ts local --scan`
- **Build Single Binary**: `bun run script/build.ts --single --skip-install` in `packages/opencode/`
- **VS Code Extension**: `bun run package` in `sdks/vscode/` to produce `agentx-vscode.vsix`

## Release Protocol

- Check the currently published version on npm registry.
- Synchronize version across root `package.json` and all subpackages.
- Tag releases with annotated git tag `v<version>` (e.g. `v3.0.1`).
- Pushing the tag triggers `.github/workflows/publish.yml`, which compiles all 12 platform binaries, signs/packages archives, creates GitHub Release, publishes to npm, JSR, GitHub Packages, and updates the Homebrew formula.
