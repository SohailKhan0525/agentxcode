import type { HardwareProfile } from "./hardware"

export interface ModelRecommendation {
  id: string
  name: string
  tier: "fast" | "balanced" | "quality"
  sizeGb: number
  minRamGb: number
  minVramGb?: number
  description: string
  ollamaCommand: string
}

export const CATALOG: ModelRecommendation[] = [
  // Fast Tier
  {
    id: "qwen2.5-coder:1.5b",
    name: "Qwen 2.5 Coder 1.5B",
    tier: "fast",
    sizeGb: 1.0,
    minRamGb: 4,
    description: "Ultra-fast lightweight coding model for low-spec laptops and quick completions.",
    ollamaCommand: "ollama run qwen2.5-coder:1.5b",
  },
  {
    id: "llama3.2:3b",
    name: "Llama 3.2 3B",
    tier: "fast",
    sizeGb: 2.0,
    minRamGb: 6,
    description: "Fast general-purpose assistant model with low latency and memory usage.",
    ollamaCommand: "ollama run llama3.2:3b",
  },

  // Balanced Tier
  {
    id: "qwen2.5-coder:7b",
    name: "Qwen 2.5 Coder 7B",
    tier: "balanced",
    sizeGb: 4.7,
    minRamGb: 8,
    minVramGb: 6,
    description: "State-of-the-art coding intelligence in the 7B category with code editing and reasoning.",
    ollamaCommand: "ollama run qwen2.5-coder:7b",
  },
  {
    id: "deepseek-coder-v2:16b",
    name: "DeepSeek Coder V2 Lite 16B",
    tier: "balanced",
    sizeGb: 8.9,
    minRamGb: 12,
    minVramGb: 8,
    description: "High-capability coding model with strong multi-language reasoning.",
    ollamaCommand: "ollama run deepseek-coder-v2:16b",
  },

  // Quality Tier
  {
    id: "qwen2.5-coder:14b",
    name: "Qwen 2.5 Coder 14B",
    tier: "quality",
    sizeGb: 9.0,
    minRamGb: 16,
    minVramGb: 10,
    description: "Near frontier-level coding performance for complex architectures and refactors.",
    ollamaCommand: "ollama run qwen2.5-coder:14b",
  },
  {
    id: "deepseek-r1:14b",
    name: "DeepSeek R1 14B (Reasoning)",
    tier: "quality",
    sizeGb: 9.0,
    minRamGb: 16,
    minVramGb: 10,
    description: "Reasoning and chain-of-thought model for complex algorithmic challenges.",
    ollamaCommand: "ollama run deepseek-r1:14b",
  },
]

export function getRecommendedModels(hardware: HardwareProfile): {
  fast: ModelRecommendation[]
  balanced: ModelRecommendation[]
  quality: ModelRecommendation[]
} {
  const effectiveMemoryGb = hardware.isAppleSilicon
    ? hardware.totalRamGb
    : (hardware.gpuVramGb && hardware.gpuVramGb > 0 ? hardware.gpuVramGb : hardware.totalRamGb * 0.7)

  const fits = (m: ModelRecommendation) => {
    if (hardware.isAppleSilicon) {
      return hardware.totalRamGb >= m.minRamGb
    }
    if (hardware.gpuVramGb && hardware.gpuVramGb > 0 && m.minVramGb) {
      return hardware.gpuVramGb >= m.minVramGb
    }
    return hardware.totalRamGb >= m.minRamGb
  }

  return {
    fast: CATALOG.filter((m) => m.tier === "fast" && fits(m)),
    balanced: CATALOG.filter((m) => m.tier === "balanced" && fits(m)),
    quality: CATALOG.filter((m) => m.tier === "quality" && fits(m)),
  }
}
