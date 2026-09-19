<p align="center">
  <img src="agentx_icon.png" alt="AgentX Code logo" width="128" />
</p>
<h1 align="center">AgentX Code</h1>
<p align="center">The open source AI coding agent.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@agent-qofeno/agentx-cli"><img alt="npm" src="https://img.shields.io/npm/v/@agent-qofeno/agentx-cli?style=flat-square" /></a>
  <a href="https://github.com/SohailKhan0525/agentxcode/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/SohailKhan0525/agentxcode/publish.yml?style=flat-square&branch=dev" /></a>
</p>

---

### Installation

```bash
# Package managers
npm i -g @agent-qofeno/agentx-cli@latest        # or bun/pnpm/yarn
```

To run:
```bash
agentx
```

#### Installation Directory

The default fallback installation directory is:
`$HOME/.agentxcode/bin`

### Agents

AgentX Code includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

### Documentation

For configuration and options, explore the codebase guides and examples in this repository.

### Contributing

If you're interested in contributing to AgentX Code, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

---

**Connect** [X.com](https://x.com/qofeno) | [GitHub](https://github.com/qofeno) | [Repository](https://github.com/SohailKhan0525/agentxcode)
