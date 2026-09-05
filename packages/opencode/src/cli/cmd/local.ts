import { Effect } from "effect"
import * as prompts from "@clack/prompts"
import { detectAllLocalProviders } from "@opencode-ai/core/local/detector"
import { pullOllamaModel } from "@opencode-ai/core/local/installer"
import { effectCmd } from "../effect-cmd"
import { UI } from "../ui"

export const LocalCommand = effectCmd({
  command: "local",
  describe: "detect, configure, and manage local AI models (Ollama, LM Studio, Jan, LocalAI)",
  builder: (yargs) =>
    yargs
      .option("pull", {
        type: "string",
        describe: "pull an Ollama model by tag (e.g. qwen2.5-coder:7b)",
      })
      .option("scan", {
        type: "boolean",
        describe: "scan local providers and hardware only",
      }),
  handler: Effect.fn("Cli.local")(function* (args) {
    if (args.pull) {
      prompts.intro(UI.Style.TEXT_HIGHLIGHT_BOLD + "AgentX Code — Local Model Installer" + UI.Style.TEXT_NORMAL)
      const spinner = prompts.spinner()
      spinner.start(`Pulling ${args.pull}...`)

      const result = yield* Effect.promise(() =>
        pullOllamaModel(args.pull!, (prog) => {
          if (prog.percent !== undefined) {
            spinner.message(`Downloading ${args.pull} [${prog.percent}%] - ${prog.status}`)
          } else {
            spinner.message(`Pulling ${args.pull} - ${prog.status}`)
          }
        }),
      )

      if (result.success) {
        spinner.stop(`Model ${args.pull} installed successfully!`)
        prompts.outro(UI.Style.TEXT_SUCCESS_BOLD + "Ready to use with AgentX Code." + UI.Style.TEXT_NORMAL)
      } else {
        spinner.stop(`Failed to pull ${args.pull}`)
        prompts.log.error(result.error || "Unknown error occurred.")
        prompts.outro("Model pull failed.")
      }
      return
    }

    prompts.intro(UI.Style.TEXT_HIGHLIGHT_BOLD + "AgentX Code — Local Model Management" + UI.Style.TEXT_NORMAL)
    const spinner = prompts.spinner()
    spinner.start("Scanning local AI providers and hardware...")

    const detection = yield* Effect.promise(() => detectAllLocalProviders())
    spinner.stop("Scan completed.")

    // Hardware Report
    const hw = detection.hardware
    prompts.log.info(
      `${UI.Style.TEXT_NORMAL_BOLD}Hardware Profile:${UI.Style.TEXT_NORMAL} ${hw.cpuModel} (${hw.cpuCores} cores) | ` +
        `RAM: ${hw.totalRamGb} GB (Free: ${hw.freeRamGb} GB) | ` +
        `GPU: ${hw.gpuModel || "Integrated/None"} | ` +
        `Effective VRAM: ${hw.effectiveVramGb} GB | ` +
        `Tier: ${hw.recommendedTier.toUpperCase()}`,
    )

    // Running providers & models
    if (detection.runningProviders.length > 0) {
      prompts.log.success(`${detection.runningProviders.length} local provider(s) active:`)
      for (const p of detection.runningProviders) {
        prompts.log.message(`  ● ${UI.Style.TEXT_NORMAL_BOLD}${p.name}${UI.Style.TEXT_NORMAL} on ${p.endpoint} (${p.models.length} model(s) available)`)
        for (const m of p.models) {
          const details = [m.parameterCount, m.quantization, m.sizeFormatted].filter(Boolean).join(" • ")
          prompts.log.message(`      ↳ ${UI.Style.TEXT_HIGHLIGHT}${m.name}${UI.Style.TEXT_NORMAL} ${details ? `(${details})` : ""}`)
        }
      }
    } else {
      prompts.log.warn("No local AI providers currently running.")
    }

    // Installed but stopped providers
    const stoppedInstalled = detection.providers.filter((p) => p.installed && !p.running)
    if (stoppedInstalled.length > 0) {
      prompts.log.message(`${UI.Style.TEXT_NORMAL_BOLD}Installed providers not running:${UI.Style.TEXT_NORMAL}`)
      const platform = hw.os
      for (const p of stoppedInstalled) {
        prompts.log.message(`  ○ ${p.name} (Port ${p.port})`)
        prompts.log.info(`    How to start: ${p.startCommand[platform]}`)
      }
    }

    // Model Recommendations based on detected hardware
    prompts.log.message("")
    prompts.log.info(`${UI.Style.TEXT_NORMAL_BOLD}Recommended Models for Your Hardware (${hw.recommendedTier.toUpperCase()} Tier):${UI.Style.TEXT_NORMAL}`)
    for (const rec of detection.recommendations) {
      prompts.log.message(`  ★ ${UI.Style.TEXT_HIGHLIGHT_BOLD}${rec.name}${UI.Style.TEXT_NORMAL} [${rec.parameters}, ${rec.quantization}, ~${rec.sizeGb}GB]`)
      prompts.log.message(`    ${rec.description}`)
    }

    if (args.scan) {
      prompts.outro("Scan complete.")
      return
    }

    // Interactive Action
    const ollamaRunning = detection.runningProviders.some((p) => p.kind === "ollama")
    const choices = [
      ...(ollamaRunning
        ? [
            {
              value: "pull_recommended",
              label: "Download a recommended model via Ollama",
              hint: `Tier: ${hw.recommendedTier}`,
            },
          ]
        : []),
      { value: "exit", label: "Exit local model setup" },
    ]

    const action = yield* Effect.promise(() =>
      prompts.select({
        message: "What would you like to do?",
        options: choices,
      }),
    )

    if (prompts.isCancel(action) || action === "exit") {
      prompts.outro("Done.")
      return
    }

    if (action === "pull_recommended") {
      const modelChoices = detection.recommendations.map((r) => ({
        value: r.ollamaTag,
        label: `${r.name} (~${r.sizeGb} GB, ${r.parameters})`,
        hint: r.description,
      }))

      const selectedTag = yield* Effect.promise(() =>
        prompts.select({
          message: "Select a model to download:",
          options: modelChoices,
        }),
      )

      if (!prompts.isCancel(selectedTag) && typeof selectedTag === "string") {
        const pullSpinner = prompts.spinner()
        pullSpinner.start(`Downloading ${selectedTag}...`)

        const result = yield* Effect.promise(() =>
          pullOllamaModel(selectedTag, (prog) => {
            if (prog.percent !== undefined) {
              pullSpinner.message(`Downloading ${selectedTag} [${prog.percent}%] - ${prog.status}`)
            } else {
              pullSpinner.message(`Pulling ${selectedTag} - ${prog.status}`)
            }
          }),
        )

        if (result.success) {
          pullSpinner.stop(`Model ${selectedTag} installed successfully!`)
          prompts.outro(UI.Style.TEXT_SUCCESS_BOLD + `Ready! You can now use ${selectedTag} in AgentX Code.` + UI.Style.TEXT_NORMAL)
        } else {
          pullSpinner.stop(`Failed to download ${selectedTag}`)
          prompts.log.error(result.error || "Unknown download error.")
          prompts.outro("Model installation failed.")
        }
      }
    }
  }),
})
