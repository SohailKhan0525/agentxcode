import type { Argv } from "yargs"
import { detectHardware, detectLocalProviders, getRecommendedModels } from "@opencode-ai/core/local"
import { UI } from "../ui"

export const LocalCommand = {
  command: "local",
  describe: "detect, configure, and manage local AI models (Ollama, LM Studio, Jan, LocalAI)",
  builder: (yargs: Argv) =>
    yargs
      .option("scan", {
        type: "boolean",
        describe: "scan system for running and installed local model servers",
        default: false,
      })
      .option("hardware", {
        type: "boolean",
        describe: "print detected hardware profile and capacity",
        default: false,
      })
      .option("recommend", {
        type: "boolean",
        describe: "show tiered model recommendations for your hardware",
        default: false,
      }),
  handler: async (args: { scan?: boolean; hardware?: boolean; recommend?: boolean }) => {
    UI.empty()
    console.log(UI.logo("AGENTX CODE — Local AI Runtime"))
    UI.empty()

    const hw = await detectHardware()

    if (args.hardware || (!args.scan && !args.recommend)) {
      console.log("Hardware Profile:")
      console.log(`  OS / Architecture:  ${hw.platform} (${hw.arch})`)
      console.log(`  CPU:                ${hw.cpuModel} (${hw.cpuCores} cores)`)
      console.log(`  RAM:                ${hw.totalRamGb} GB total (${hw.freeRamGb} GB free)`)
      if (hw.gpuName) {
        console.log(`  GPU:                ${hw.gpuName}${hw.gpuVramGb ? ` (${hw.gpuVramGb} GB VRAM)` : ""}`)
      }
      UI.empty()
    }

    if (args.scan || (!args.hardware && !args.recommend)) {
      console.log("Scanning local AI providers...")
      const providers = await detectLocalProviders()
      let anyRunning = false

      for (const p of providers) {
        if (p.isRunning) {
          anyRunning = true
          console.log(`  ✓ ${p.name} is RUNNING at ${p.endpoint}`)
          if (p.models.length > 0) {
            console.log(`    Models available (${p.models.length}):`)
            for (const m of p.models.slice(0, 5)) {
              console.log(`      - ${m}`)
            }
            if (p.models.length > 5) {
              console.log(`      ... and ${p.models.length - 5} more`)
            }
          } else {
            console.log(`    (No models currently loaded)`)
          }
        } else if (p.isInstalled) {
          console.log(`  ○ ${p.name} is installed but NOT running`)
          console.log(`    → To start: ${p.startInstructions}`)
        }
      }

      if (!anyRunning) {
        console.log("  Notice: No local AI servers currently responding.")
        console.log("  To install Ollama, visit: https://ollama.com")
        console.log("  To install LM Studio, visit: https://lmstudio.ai")
      }
      UI.empty()
    }

    if (args.recommend || (!args.scan && !args.hardware)) {
      const recs = getRecommendedModels(hw)
      console.log("Recommended Local Models for your Machine:")

      console.log("  [Fast Tier - Low Latency]:")
      for (const m of recs.fast) {
        console.log(`    • ${m.name} (${m.sizeGb} GB)`)
        console.log(`      Run: ${m.ollamaCommand}`)
      }

      console.log("  [Balanced Tier - Standard Coding]:")
      for (const m of recs.balanced) {
        console.log(`    • ${m.name} (${m.sizeGb} GB)`)
        console.log(`      Run: ${m.ollamaCommand}`)
      }

      if (recs.quality.length > 0) {
        console.log("  [Quality Tier - High Intelligence]:")
        for (const m of recs.quality) {
          console.log(`    • ${m.name} (${m.sizeGb} GB)`)
          console.log(`      Run: ${m.ollamaCommand}`)
        }
      }
      UI.empty()
    }
  },
}
