# Contributing to AgentX Code

Thank you for your interest in contributing to AgentX Code!

## Quick Start

- **Prerequisites**: Bun 1.3.14+
- Clone the repository:
  ```bash
  git clone https://github.com/SohailKhan0525/agentxcode.git
  cd agentxcode
  ```
- Install dependencies:
  ```bash
  bun install
  ```
- Run the dev CLI:
  ```bash
  bun run dev
  ```

## Code Quality Standards

1. **Zero Placeholders**: Never commit `TODO`, `FIXME`, empty stub functions, or fake mock data.
2. **Typecheck & Tests**: Ensure all checks pass before opening a PR:
   ```bash
   bun turbo typecheck
   bun test --cwd packages/opencode
   ```
3. **Pull Requests**: Open pull requests against the `dev` branch at [github.com/SohailKhan0525/agentxcode](https://github.com/SohailKhan0525/agentxcode).
