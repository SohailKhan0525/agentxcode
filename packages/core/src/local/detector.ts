import fs from "fs"
import path from "path"
import os from "os"

export interface LocalProviderStatus {
  id: string
  name: string
  endpoint: string
  isRunning: boolean
  isInstalled: boolean
  models: string[]
  startInstructions: string
}

const PROVIDERS = [
  {
    id: "ollama",
    name: "Ollama",
    endpoint: "http://127.0.0.1:11434",
    apiModelsPath: "/api/tags",
    parseModels: (json: any): string[] => {
      return Array.isArray(json?.models) ? json.models.map((m: any) => m.name || m.model).filter(Boolean) : []
    },
    binaryPaths: {
      win32: [
        path.join(process.env.LOCALAPPDATA || "", "Programs", "Ollama", "ollama.exe"),
        "C:\\Program Files\\Ollama\\ollama.exe",
      ],
      darwin: ["/usr/local/bin/ollama", "/opt/homebrew/bin/ollama", "/Applications/Ollama.app"],
      linux: ["/usr/local/bin/ollama", "/usr/bin/ollama"],
    },
    startInstructions: "Run `ollama serve` or open the Ollama desktop app",
  },
  {
    id: "lmstudio",
    name: "LM Studio",
    endpoint: "http://127.0.0.1:1234",
    apiModelsPath: "/v1/models",
    parseModels: (json: any): string[] => {
      return Array.isArray(json?.data) ? json.data.map((m: any) => m.id).filter(Boolean) : []
    },
    binaryPaths: {
      win32: [
        path.join(process.env.LOCALAPPDATA || "", "Programs", "LM Studio", "LM Studio.exe"),
        path.join(process.env.PROGRAMFILES || "", "LM Studio", "LM Studio.exe"),
      ],
      darwin: ["/Applications/LM Studio.app"],
      linux: ["~/.local/bin/lm-studio"],
    },
    startInstructions: "Start the LM Studio local server from the Developer tab in LM Studio",
  },
  {
    id: "jan",
    name: "Jan",
    endpoint: "http://127.0.0.1:1337",
    apiModelsPath: "/v1/models",
    parseModels: (json: any): string[] => {
      return Array.isArray(json?.data) ? json.data.map((m: any) => m.id).filter(Boolean) : []
    },
    binaryPaths: {
      win32: [
        path.join(process.env.LOCALAPPDATA || "", "Programs", "Jan", "Jan.exe"),
        path.join(process.env.PROGRAMFILES || "", "Jan", "Jan.exe"),
      ],
      darwin: ["/Applications/Jan.app"],
      linux: ["/usr/bin/jan"],
    },
    startInstructions: "Open Jan and enable the local API server under Settings -> Local Server",
  },
  {
    id: "llamacpp",
    name: "llama.cpp",
    endpoint: "http://127.0.0.1:8080",
    apiModelsPath: "/v1/models",
    parseModels: (json: any): string[] => {
      return Array.isArray(json?.data) ? json.data.map((m: any) => m.id).filter(Boolean) : []
    },
    binaryPaths: {
      win32: [],
      darwin: ["/opt/homebrew/bin/llama-server"],
      linux: ["/usr/local/bin/llama-server"],
    },
    startInstructions: "Run `llama-server -m <model.gguf> --port 8080`",
  },
  {
    id: "localai",
    name: "LocalAI",
    endpoint: "http://127.0.0.1:8080",
    apiModelsPath: "/v1/models",
    parseModels: (json: any): string[] => {
      return Array.isArray(json?.data) ? json.data.map((m: any) => m.id).filter(Boolean) : []
    },
    binaryPaths: {
      win32: [],
      darwin: [],
      linux: ["/usr/local/bin/local-ai"],
    },
    startInstructions: "Run LocalAI via container: `docker run -p 8080:8080 localai/localai`",
  },
]

export async function detectLocalProviders(): Promise<LocalProviderStatus[]> {
  const currentPlatform = os.platform() as "win32" | "darwin" | "linux"

  const checks = PROVIDERS.map(async (provider) => {
    let isRunning = false
    let isInstalled = false
    let models: string[] = []

    // Check if installed on disk
    const paths = provider.binaryPaths[currentPlatform] || []
    for (const p of paths) {
      const resolved = p.startsWith("~") ? path.join(os.homedir(), p.slice(1)) : p
      if (fs.existsSync(resolved)) {
        isInstalled = true
        break
      }
    }

    // Ping endpoint with a strict 1.5s timeout
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 1500)
      const res = await fetch(`${provider.endpoint}${provider.apiModelsPath}`, {
        signal: controller.signal,
      })
      clearTimeout(timer)

      if (res.ok) {
        isRunning = true
        const data = await res.json()
        models = provider.parseModels(data)
      }
    } catch {
      // Offline or timed out
    }

    return {
      id: provider.id,
      name: provider.name,
      endpoint: provider.endpoint,
      isRunning,
      isInstalled,
      models,
      startInstructions: provider.startInstructions,
    }
  })

  return Promise.all(checks)
}
