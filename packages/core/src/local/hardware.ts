import os from "os"
import childProcess from "child_process"

export interface HardwareProfile {
  platform: string
  arch: string
  cpuModel: string
  cpuCores: number
  totalRamGb: number
  freeRamGb: number
  gpuName?: string
  gpuVramGb?: number
  isAppleSilicon: boolean
}

export async function detectHardware(): Promise<HardwareProfile> {
  const cpus = os.cpus()
  const cpuModel = cpus.at(0)?.model ?? "Unknown CPU"
  const cpuCores = cpus.length
  const totalRamGb = Math.round((os.totalmem() / (1024 * 1024 * 1024)) * 10) / 10
  const freeRamGb = Math.round((os.freemem() / (1024 * 1024 * 1024)) * 10) / 10
  const platform = os.platform()
  const arch = os.arch()
  const isAppleSilicon = platform === "darwin" && arch === "arm64"

  let gpuName: string | undefined
  let gpuVramGb: number | undefined

  if (isAppleSilicon) {
    gpuName = `Apple Silicon Unified (${cpuModel})`
    gpuVramGb = totalRamGb
  } else if (platform === "win32") {
    try {
      const psCommand = `Get-CimInstance Win32_VideoController | Select-Object -First 1 Name, AdapterRAM | ConvertTo-Json`
      const out = childProcess.execSync(`powershell -NoProfile -Command "${psCommand}"`, {
        encoding: "utf8",
        timeout: 3000,
        windowsHide: true,
      })
      const parsed = JSON.parse(out)
      if (parsed.Name) {
        gpuName = String(parsed.Name).trim()
        if (parsed.AdapterRAM && parsed.AdapterRAM > 0) {
          gpuVramGb = Math.round((Number(parsed.AdapterRAM) / (1024 * 1024 * 1024)) * 10) / 10
        }
      }
    } catch {
      // Ignore fallback
    }
  } else if (platform === "linux") {
    try {
      const out = childProcess.execSync("nvidia-smi --query-gpu=name,memory.total --format=csv,noheader,nounits", {
        encoding: "utf8",
        timeout: 2000,
      })
      const lines = out.trim().split("\n")
      const first = lines.at(0)
      if (first) {
        const parts = first.split(",")
        gpuName = parts.at(0)?.trim()
        const mb = Number(parts.at(1)?.trim())
        if (!isNaN(mb)) {
          gpuVramGb = Math.round((mb / 1024) * 10) / 10
        }
      }
    } catch {
      // Ignore if not Nvidia or nvidia-smi not available
    }
  }

  return {
    platform,
    arch,
    cpuModel,
    cpuCores,
    totalRamGb,
    freeRamGb,
    gpuName,
    gpuVramGb,
    isAppleSilicon,
  }
}
