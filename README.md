<p align="center">
  <img width="180" alt="AgentX Code Logo" src="./agentx_icon.png" />
</p>

<h1 align="center">AgentX Code</h1>

<p align="center">
  <strong>Autonomous, lightning-fast AI coding agent built for the terminal and VS Code.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@agent-qofeno/agentx-cli"><img src="https://img.shields.io/npm/v/@agent-qofeno/agentx-cli?color=FFE600&label=npm" alt="npm version" /></a>
  <a href="https://github.com/SohailKhan0525/agentxcode/releases"><img src="https://img.shields.io/github/v/release/SohailKhan0525/agentxcode?color=00E5FF&label=release" alt="GitHub release" /></a>
  <a href="https://github.com/SohailKhan0525/agentxcode/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://agentx.js.org"><img src="https://img.shields.io/badge/website-agentx.js.org-brightgreen" alt="Website" /></a>
</p>

---

## ⚡ Quick Start & Installation

### Linux & macOS (One-line installer)
```bash
curl -fsSL https://raw.githubusercontent.com/SohailKhan0525/agentxcode/main/install | bash
```

### Windows (PowerShell)
```powershell
irm https://raw.githubusercontent.com/SohailKhan0525/agentxcode/main/install.ps1 | iex
```

### npm Global Install
```bash
npm install -g @agent-qofeno/agentx-cli
```

### Homebrew Tap
```bash
brew tap SohailKhan0525/agentx
brew install agentx
```

---

## 🖥️ Terminal Experience

AgentX Code launches with high-contrast Vivid Yellow and Cyan ANSI terminal art:

```text
AGENTX CODE
 █████╗  ██████╗ ███████╗███╗   ██╗████████╗██╗  ██╗   ██████╗ ██████╗ ██████╗ ███████╗
██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝╚██╗██╔╝  ██╔════╝██╔═══██╗██╔══██╗██╔════╝
███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║    ╚███╔╝   ██║     ██║   ██║██║  ██║█████╗  
██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║    ██╔██╗   ██║     ██║   ██║██║  ██║██╔══╝  
██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ██╔╝ ██╗  ╚██████╗╚██████╔╝██████╔╝███████╗
╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝   ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
```

---

## 🧠 First-Class Local AI Runtime

AgentX Code comes with hardware-aware local model discovery and profiling out of the box:

```bash
# Scan system for local model servers (Ollama, LM Studio, Jan, LocalAI)
agentx local --scan

# Inspect hardware capacity (CPU, RAM, GPU, VRAM)
agentx local --hardware

# View tiered recommendations (Fast, Balanced, Quality) tailored to your specs
agentx local --recommend
```

Supported Local Providers:
- **Ollama** (`http://127.0.0.1:11434`)
- **LM Studio** (`http://127.0.0.1:1234`)
- **Jan** (`http://127.0.0.1:1337`)
- **llama.cpp** (`http://127.0.0.1:8080`)
- **LocalAI** (`http://127.0.0.1:8080`)
- **GPT4All** (`http://127.0.0.1:4891`)

---

## 🌐 Supported Cloud Providers

AgentX Code connects directly to all premier AI model APIs with your own credentials:
- **Anthropic** (Claude 3.5 Sonnet, Claude 3 Opus, Claude 3.5 Haiku)
- **OpenAI** (GPT-4o, GPT-4o Mini, o1, o3-mini)
- **Google Gemini** (Gemini 2.0 Flash, Gemini 1.5 Pro)
- **Groq**, **DeepInfra**, **Together AI**, **OpenRouter**, **Mistral**, **Cerebras**, **xAI**

---

## 💻 VS Code Extension

AgentX Code provides a companion VS Code extension packaged as `agentx-vscode.vsix`. Download it directly from any GitHub Release:
1. Download `agentx-vscode.vsix` from [Releases](https://github.com/SohailKhan0525/agentxcode/releases)
2. In VS Code, run: `Extensions: Install from VSIX...`

---

## 📄 License & Credits

AgentX Code is licensed under the [MIT License](LICENSE).  
Copyright (c) 2026 Sohail Khan.  
Based on and acknowledging the open-source foundations of OpenCode. AgentX Code is an independent, autonomous fork maintained at [github.com/SohailKhan0525/agentxcode](https://github.com/SohailKhan0525/agentxcode).
