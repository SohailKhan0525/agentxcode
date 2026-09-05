import fs from "fs"
import childProcess from "child_process"
import { LOCAL_PROVIDERS, type ProviderConfig } from "./endpoints"
import { detectHardware, getRecommendationsForHardware } from "./hardware"
import type { DetectionResult, LocalModelInfo, LocalProviderStatus } from "./types"

const TIMEOUT_MS = 2000

function formatBytes(bytes?: number): string | undefined {
  if (!bytes || bytes <= 0) return undefined
  const gb = bytes / (1024 ** 3)
  if (gb >= 1) return `${gb.toFixed(1)} GB`
  const mb = bytes / (1024 ** 2)
  return `${mb.toFixed(0)} MB`
}

async function checkEndpoint(url: string, timeoutMs: number): Promise<Response | null> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
    clearTimeout(id)
    return res
  } catch {
    clearTimeout(id)
    return null
  }
}

function checkInstalled(config: ProviderConfig): boolean {
  const platform = process.platform === "win32" ? "windows" : process.platform === "darwin" ? "darwin" : "linux"
  const paths = config.binaryPaths[platform] || []

  for (const p of paths) {
    if (p.includes("/") || p.includes("\\")) {
      try {
        if (fs.existsSync(p)) return true
      } catch {
        // ignore
      }
    } else {
      // Look up in PATH
      try {
        const cmd = process.platform === "win32" ? "where.exe" : "which"
        const res = childProcess.spawnSync(cmd, [p], { timeout: 1000, windowsHide: true })
        if (res.status === 0) return true
      } catch {
        // ignore
      }
    }
  }
  return false
}

async function inspectOllama(config: ProviderConfig): Promise<{ running: boolean; models: LocalModelInfo[] }> {
  const res = await checkEndpoint(`${config.endpoint}/api/tags`, TIMEOUT_MS)
  if (!res || !res.ok) return { running: false, models: [] }

  try {
    const data = (await res.json()) as any
    const rawModels = Array.isArray(data?.models) ? data.models : []
    const models: LocalModelInfo[] = rawModels.map((m: any) => ({
      id: m.name || m.model,
      name: m.name || m.model,
      provider: "ollama",
      sizeBytes: m.size,
      sizeFormatted: formatBytes(m.size),
      parameterCount: m.details?.parameter_size,
      quantization: m.details?.quantization_level,
      family: m.details?.family,
    }))
    return { running: true, models }
  } catch {
    return { running: true, models: [] }
  }
}

async function inspectOpenAICompatible(
  config: ProviderConfig,
): Promise<{ running: boolean; models: LocalModelInfo[] }> {
  const res = await checkEndpoint(`${config.endpoint}/v1/models`, TIMEOUT_MS)
  if (!res || !res.ok) return { running: false, models: [] }

  try {
    const data = (await res.json()) as any
    const rawModels = Array.isArray(data?.data) ? data.data : Array.isArray(data?.models) ? data.models : []
    const models: LocalModelInfo[] = rawModels.map((m: any) => {
      const id = typeof m === "string" ? m : m.id || m.name
      return {
        id,
        name: m.name || id,
        provider: config.kind,
        parameterCount: m.parameter_count || m.parameters,
        quantization: m.quantization || m.quant,
        contextWindow: m.context_length || m.max_context_length,
      }
    })
    return { running: true, models }
  } catch {
    return { running: true, models: [] }
  }
}

export async function detectProvider(config: ProviderConfig): Promise<LocalProviderStatus> {
  const installed = checkInstalled(config)

  let inspectResult: { running: boolean; models: LocalModelInfo[] }
  if (config.kind === "ollama") {
    inspectResult = await inspectOllama(config)
  } else {
    inspectResult = await inspectOpenAICompatible(config)
  }

  return {
    kind: config.kind,
    name: config.name,
    running: inspectResult.running,
    installed,
    port: config.port,
    endpoint: config.endpoint,
    startCommand: config.startInstructions,
    models: inspectResult.models,
  }
}

export async function detectAllLocalProviders(): Promise<DetectionResult> {
  const [providerStatuses, hardware] = await Promise.all([
    Promise.all(LOCAL_PROVIDERS.map((cfg) => detectProvider(cfg))),
    detectHardware(),
  ])

  const runningProviders = providerStatuses.filter((p) => p.running)
  const totalModels = runningProviders.flatMap((p) => p.models)
  const recommendations = getRecommendationsForHardware(hardware)

  return {
    providers: providerStatuses,
    runningProviders,
    totalModels,
    hardware,
    recommendations,
  }
}
