export type LocalProviderKind = "ollama" | "lmstudio" | "jan" | "gpt4all" | "llamacpp" | "localai"

export type LocalModelInfo = {
  id: string
  name: string
  provider: LocalProviderKind
  sizeBytes?: number
  sizeFormatted?: string
  parameterCount?: string
  quantization?: string
  contextWindow?: number
  family?: string
}

export type LocalProviderStatus = {
  kind: LocalProviderKind
  name: string
  running: boolean
  installed: boolean
  port: number
  endpoint: string
  startCommand: {
    windows: string
    darwin: string
    linux: string
  }
  models: LocalModelInfo[]
  error?: string
}

export type HardwareTier = "fast" | "balanced" | "quality"

export type HardwareProfile = {
  os: "windows" | "darwin" | "linux"
  cpuModel: string
  cpuCores: number
  totalRamGb: number
  freeRamGb: number
  gpuModel?: string
  vramGb?: number
  isAppleSilicon: boolean
  effectiveVramGb: number
  recommendedTier: HardwareTier
}

export type ModelRecommendation = {
  tier: HardwareTier
  name: string
  id: string
  ollamaTag: string
  sizeGb: number
  minRamGb: number
  minVramGb?: number
  description: string
  parameters: string
  quantization: string
}

export type DetectionResult = {
  providers: LocalProviderStatus[]
  runningProviders: LocalProviderStatus[]
  totalModels: LocalModelInfo[]
  hardware: HardwareProfile
  recommendations: ModelRecommendation[]
}
