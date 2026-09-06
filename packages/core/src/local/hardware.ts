import os from "os"
import childProcess from "child_process"
import type { HardwareProfile, HardwareTier, ModelRecommendation } from "./types"

export async function detectHardware(): Promise<HardwareProfile> {
  const platform = process.platform
  const osType: "windows" | "darwin" | "linux" =
    platform === "win32" ? "windows" : platform === "darwin" ? "darwin" : "linux"

  const cpus = os.cpus()
  const cpuModel = cpus[0]?.model || "Unknown CPU"
  const cpuCores = cpus.length || 1

  const totalRamGb = Math.round((os.totalmem() / 1024 ** 3) * 10) / 10
  const freeRamGb = Math.round((os.freemem() / 1024 ** 3) * 10) / 10

  const isAppleSilicon = osType === "darwin" && (process.arch === "arm64" || cpuModel.toLowerCase().includes("apple"))

  let gpuModel: string | undefined
  let vramGb: number | undefined

  if (isAppleSilicon) {
    gpuModel = `Apple Unified GPU (${cpuModel})`
    vramGb = totalRamGb // Unified memory on Apple Silicon
  } else if (osType === "windows") {
    try {
      const psCmd = "Get-CimInstance Win32_VideoController | Select-Object Name, AdapterRAM | ConvertTo-Json -Compress"
      const res = childProcess.spawnSync("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", psCmd], {
        encoding: "utf8",
        timeout: 3000,
        windowsHide: true,
      })
      if (res.status === 0 && res.stdout) {
        const parsed = JSON.parse(res.stdout)
        const gpus = Array.isArray(parsed) ? parsed : [parsed]
        // Pick the GPU with the highest AdapterRAM (discrete GPU over integrated)
        const primary = gpus.sort((a: any, b: any) => (b.AdapterRAM || 0) - (a.AdapterRAM || 0))[0]
        if (primary && primary.Name) {
          gpuModel = primary.Name
          if (primary.AdapterRAM && primary.AdapterRAM > 0) {
            vramGb = Math.round((primary.AdapterRAM / 1024 ** 3) * 10) / 10
          }
        }
      }
    } catch {
      // ignore
    }

    // Fallback to nvidia-smi if AdapterRAM query was inconclusive or 32-bit clamped
    if (!vramGb || vramGb <= 4) {
      try {
        const nvidia = childProcess.spawnSync(
          "nvidia-smi",
          ["--query-gpu=name,memory.total", "--format=csv,noheader,nounits"],
          { encoding: "utf8", timeout: 2000, windowsHide: true },
        )
        if (nvidia.status === 0 && nvidia.stdout) {
          const firstLine = nvidia.stdout.trim().split("\n")[0]
          if (firstLine) {
            const [name, memMb] = firstLine.split(",").map((s) => s.trim())
            if (name) gpuModel = name
            if (memMb) vramGb = Math.round((Number.parseFloat(memMb) / 1024) * 10) / 10
          }
        }
      } catch {
        // ignore
      }
    }
  } else if (osType === "linux") {
    try {
      const nvidia = childProcess.spawnSync(
        "nvidia-smi",
        ["--query-gpu=name,memory.total", "--format=csv,noheader,nounits"],
        { encoding: "utf8", timeout: 2000 },
      )
      if (nvidia.status === 0 && nvidia.stdout) {
        const firstLine = nvidia.stdout.trim().split("\n")[0]
        if (firstLine) {
          const [name, memMb] = firstLine.split(",").map((s) => s.trim())
          if (name) gpuModel = name
          if (memMb) vramGb = Math.round((Number.parseFloat(memMb) / 1024) * 10) / 10
        }
      }
    } catch {
      // ignore
    }
  }

  const effectiveVramGb = isAppleSilicon ? totalRamGb : vramGb && vramGb > 0 ? vramGb : Math.min(totalRamGb * 0.5, 8)

  let recommendedTier: HardwareTier = "fast"
  if (effectiveVramGb >= 14 || totalRamGb >= 28) {
    recommendedTier = "quality"
  } else if (effectiveVramGb >= 7 || totalRamGb >= 14) {
    recommendedTier = "balanced"
  }

  return {
    os: osType,
    cpuModel,
    cpuCores,
    totalRamGb,
    freeRamGb,
    gpuModel,
    vramGb,
    isAppleSilicon,
    effectiveVramGb,
    recommendedTier,
  }
}

export const MODEL_CATALOG: ModelRecommendation[] = [
  // Fast Tier (<8GB RAM)
  {
    tier: "fast",
    name: "Qwen 2.5 Coder 1.5B",
    id: "qwen2.5-coder:1.5b",
    ollamaTag: "qwen2.5-coder:1.5b",
    sizeGb: 1.0,
    minRamGb: 3,
    parameters: "1.5B",
    quantization: "Q4_K_M",
    description: "Ultra-fast lightweight coding model, runs comfortably on any CPU or laptop.",
  },
  {
    tier: "fast",
    name: "Llama 3.2 3B",
    id: "llama3.2:3b",
    ollamaTag: "llama3.2:3b",
    sizeGb: 2.0,
    minRamGb: 4,
    parameters: "3.2B",
    quantization: "Q4_K_M",
    description: "Compact multi-lingual reasoning model with minimal memory footprint.",
  },
  {
    tier: "fast",
    name: "DeepSeek Coder 1.3B",
    id: "deepseek-coder:1.3b",
    ollamaTag: "deepseek-coder:1.3b",
    sizeGb: 0.8,
    minRamGb: 2,
    parameters: "1.3B",
    quantization: "Q4_K_M",
    description: "Agile code assistant designed for instant auto-complete and simple edits.",
  },

  // Balanced Tier (8GB - 16GB RAM)
  {
    tier: "balanced",
    name: "Qwen 2.5 Coder 7B",
    id: "qwen2.5-coder:7b",
    ollamaTag: "qwen2.5-coder:7b",
    sizeGb: 4.7,
    minRamGb: 8,
    minVramGb: 6,
    parameters: "7.6B",
    quantization: "Q4_K_M",
    description: "Exceptional code generation, debugging, and multi-file reasoning capabilities.",
  },
  {
    tier: "balanced",
    name: "DeepSeek Coder 6.7B",
    id: "deepseek-coder:6.7b",
    ollamaTag: "deepseek-coder:6.7b",
    sizeGb: 4.0,
    minRamGb: 8,
    minVramGb: 6,
    parameters: "6.7B",
    quantization: "Q4_K_M",
    description: "Battle-tested code model with strong fill-in-the-middle syntax handling.",
  },
  {
    tier: "balanced",
    name: "Llama 3.1 8B",
    id: "llama3.1:8b",
    ollamaTag: "llama3.1:8b",
    sizeGb: 4.9,
    minRamGb: 8,
    minVramGb: 6,
    parameters: "8.0B",
    quantization: "Q4_K_M",
    description: "Frontier open-weights generalist with 128k context and robust tool calling.",
  },

  // Quality Tier (>=16GB RAM/VRAM)
  {
    tier: "quality",
    name: "DeepSeek Coder V2 16B",
    id: "deepseek-coder-v2:16b",
    ollamaTag: "deepseek-coder-v2:16b",
    sizeGb: 8.9,
    minRamGb: 16,
    minVramGb: 12,
    parameters: "16B (MoE)",
    quantization: "Q4_K_M",
    description: "Mixture-of-Experts architecture matching proprietary commercial models on code benchmarks.",
  },
  {
    tier: "quality",
    name: "Qwen 2.5 Coder 14B",
    id: "qwen2.5-coder:14b",
    ollamaTag: "qwen2.5-coder:14b",
    sizeGb: 9.0,
    minRamGb: 16,
    minVramGb: 12,
    parameters: "14.7B",
    quantization: "Q4_K_M",
    description: "Superior code reasoning, architectural design, and complex refactoring abilities.",
  },
  {
    tier: "quality",
    name: "Codestral 22B",
    id: "codestral:22b",
    ollamaTag: "codestral:22b",
    sizeGb: 12.5,
    minRamGb: 16,
    minVramGb: 14,
    parameters: "22B",
    quantization: "Q4_K_M",
    description: "Mistral AI's flagship 80+ language coding model with 32k native context window.",
  },
]

export function getRecommendationsForHardware(hw: HardwareProfile): ModelRecommendation[] {
  // Never recommend a model that cannot run on the detected hardware
  return MODEL_CATALOG.filter((m) => {
    if (m.minRamGb > hw.totalRamGb + 1) return false
    if (m.minVramGb && !hw.isAppleSilicon && hw.vramGb && hw.vramGb < m.minVramGb) {
      // If discrete VRAM is insufficient, only allow if system RAM has plenty of headroom for offload
      if (hw.totalRamGb < m.minRamGb * 1.5) return false
    }
    return true
  })
}
