import type { LocalProviderKind } from "./types"

export type ProviderConfig = {
  kind: LocalProviderKind
  name: string
  port: number
  endpoint: string
  v1Endpoint: string
  healthCheckPath: string
  binaryPaths: {
    windows: string[]
    darwin: string[]
    linux: string[]
  }
  startInstructions: {
    windows: string
    darwin: string
    linux: string
  }
}

export const LOCAL_PROVIDERS: ProviderConfig[] = [
  {
    kind: "ollama",
    name: "Ollama",
    port: 11434,
    endpoint: "http://127.0.0.1:11434",
    v1Endpoint: "http://127.0.0.1:11434/v1",
    healthCheckPath: "/api/tags",
    binaryPaths: {
      windows: [
        "ollama.exe",
        `${process.env.LOCALAPPDATA || ""}\\Programs\\Ollama\\ollama.exe`,
        `${process.env.PROGRAMFILES || ""}\\Ollama\\ollama.exe`,
      ],
      darwin: [
        "/usr/local/bin/ollama",
        "/opt/homebrew/bin/ollama",
        "/Applications/Ollama.app/Contents/Resources/ollama",
      ],
      linux: ["/usr/local/bin/ollama", "/usr/bin/ollama"],
    },
    startInstructions: {
      windows: "Run 'ollama serve' in Command Prompt/PowerShell or launch the Ollama desktop app.",
      darwin: "Run 'ollama serve' in Terminal or launch Ollama from Applications.",
      linux: "Run 'systemctl start ollama' or execute 'ollama serve' in your terminal.",
    },
  },
  {
    kind: "lmstudio",
    name: "LM Studio",
    port: 1234,
    endpoint: "http://127.0.0.1:1234",
    v1Endpoint: "http://127.0.0.1:1234/v1",
    healthCheckPath: "/v1/models",
    binaryPaths: {
      windows: [
        `${process.env.LOCALAPPDATA || ""}\\Programs\\LM Studio\\LM Studio.exe`,
        `${process.env.PROGRAMFILES || ""}\\LM Studio\\LM Studio.exe`,
      ],
      darwin: [
        "/Applications/LM Studio.app/Contents/MacOS/LM Studio",
        "~/Applications/LM Studio.app/Contents/MacOS/LM Studio",
      ],
      linux: ["~/.local/bin/lm-studio", "/opt/LM Studio/lm-studio", "/usr/bin/lm-studio"],
    },
    startInstructions: {
      windows: "Open LM Studio from Start Menu, navigate to the Developer/Server tab, and click 'Start Server'.",
      darwin: "Open LM Studio from Applications, go to the Developer tab, and click 'Start Server'.",
      linux: "Launch LM Studio, navigate to the Local Server tab, and start the local API server.",
    },
  },
  {
    kind: "jan",
    name: "Jan",
    port: 1337,
    endpoint: "http://127.0.0.1:1337",
    v1Endpoint: "http://127.0.0.1:1337/v1",
    healthCheckPath: "/v1/models",
    binaryPaths: {
      windows: [
        `${process.env.LOCALAPPDATA || ""}\\Programs\\Jan\\Jan.exe`,
        `${process.env.PROGRAMFILES || ""}\\Jan\\Jan.exe`,
      ],
      darwin: ["/Applications/Jan.app/Contents/MacOS/Jan"],
      linux: ["/usr/bin/jan", "~/.local/bin/jan", "/opt/Jan/jan"],
    },
    startInstructions: {
      windows: "Open Jan -> Settings -> Local API Server, and toggle it ON (port 1337).",
      darwin: "Open Jan -> Settings -> Local API Server, and toggle it ON (port 1337).",
      linux: "Open Jan -> Settings -> Local API Server, and toggle it ON (port 1337).",
    },
  },
  {
    kind: "gpt4all",
    name: "GPT4All",
    port: 4891,
    endpoint: "http://127.0.0.1:4891",
    v1Endpoint: "http://127.0.0.1:4891/v1",
    healthCheckPath: "/v1/models",
    binaryPaths: {
      windows: [`${process.env.PROGRAMFILES || ""}\\GPT4All\\bin\\chat.exe`],
      darwin: ["/Applications/GPT4All.app/Contents/MacOS/chat"],
      linux: ["/usr/bin/gpt4all", "~/.local/bin/gpt4all"],
    },
    startInstructions: {
      windows: "Open GPT4All -> Settings -> Application, and check 'Enable Web Server' (port 4891).",
      darwin: "Open GPT4All -> Settings -> Application, and check 'Enable Web Server' (port 4891).",
      linux: "Open GPT4All -> Settings -> Application, and check 'Enable Web Server' (port 4891).",
    },
  },
  {
    kind: "llamacpp",
    name: "llama.cpp",
    port: 8080,
    endpoint: "http://127.0.0.1:8080",
    v1Endpoint: "http://127.0.0.1:8080/v1",
    healthCheckPath: "/health",
    binaryPaths: {
      windows: ["llama-server.exe", "server.exe"],
      darwin: ["/usr/local/bin/llama-server", "/opt/homebrew/bin/llama-server", "llama-server"],
      linux: ["/usr/local/bin/llama-server", "/usr/bin/llama-server", "llama-server"],
    },
    startInstructions: {
      windows: "Run 'llama-server.exe -m path\\to\\model.gguf --port 8080' in your terminal.",
      darwin: "Run 'llama-server -m /path/to/model.gguf --port 8080' in Terminal.",
      linux: "Run 'llama-server -m /path/to/model.gguf --port 8080' in your shell.",
    },
  },
  {
    kind: "localai",
    name: "LocalAI",
    port: 8080,
    endpoint: "http://127.0.0.1:8080",
    v1Endpoint: "http://127.0.0.1:8080/v1",
    healthCheckPath: "/readyz",
    binaryPaths: {
      windows: ["local-ai.exe"],
      darwin: ["/usr/local/bin/local-ai", "local-ai"],
      linux: ["/usr/local/bin/local-ai", "/usr/bin/local-ai", "local-ai"],
    },
    startInstructions: {
      windows: "Run LocalAI container: 'docker run -p 8080:8080 localai/localai:latest' or execute 'local-ai.exe run'.",
      darwin: "Run LocalAI container: 'docker run -p 8080:8080 localai/localai:latest' or 'local-ai run'.",
      linux: "Run LocalAI via systemd or 'docker run -p 8080:8080 localai/localai:latest'.",
    },
  },
]
