# Security

## Threat Model

### Overview

AgentX Code is an AI-powered coding assistant that runs locally on your machine. It provides an agent system with access to powerful tools including shell execution, file operations, and web access.

### No Sandbox

AgentX Code does **not** sandbox the agent. The permission system exists as a UX feature to help users stay aware of what actions the agent is taking — it prompts for confirmation before executing commands, writing files, etc. However, it is not designed to provide security isolation.

If you need true isolation, run AgentX Code inside a Docker container or virtual machine.

### Server Mode

Server mode is opt-in only. When enabled, set `AGENTX_SERVER_PASSWORD` to require HTTP Basic Auth. Without this, the server runs unauthenticated (with a warning). It is the end user's responsibility to secure the server.

### Out of Scope

| Category | Rationale |
|---|---|
| **Server access when opted-in** | If you enable server mode, API access is expected behavior |
| **Sandbox escapes** | The permission system is not a sandbox (see above) |
| **LLM provider data handling** | Data sent to your configured LLM provider is governed by their policies |
| **MCP server behavior** | External MCP servers you configure are outside our trust boundary |
| **Malicious config files** | Users control their own config; modifying it is not an attack vector |

---

## Reporting Security Issues

If you discover a security vulnerability in AgentX Code, please open a confidential advisory at [github.com/SohailKhan0525/agentxcode/security/advisories](https://github.com/SohailKhan0525/agentxcode/security/advisories).
