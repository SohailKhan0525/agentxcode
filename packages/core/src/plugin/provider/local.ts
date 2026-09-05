import { Effect } from "effect"
import { define } from "../internal"
import { detectAllLocalProviders } from "../../local/detector"
import { ProviderV2 } from "../../provider"
import { ModelV2 } from "../../model"

export const LocalPlugin = define({
  id: "local",
  effect: Effect.fn(function* (ctx) {
    // Transform catalog with locally running models
    yield* ctx.catalog.transform(
      Effect.fn(function* (catalog) {
        const detection = yield* Effect.promise(() => detectAllLocalProviders())

        for (const running of detection.runningProviders) {
          const providerId = running.kind === "ollama" ? ProviderV2.ID.make("ollama") : ProviderV2.ID.make(`local-${running.kind}`)
          const v1Url = `${running.endpoint}/v1`

          catalog.provider.update(providerId, (provider) => {
            provider.name = running.name
            provider.api = {
              type: "aisdk",
              package: "@ai-sdk/openai-compatible",
              url: v1Url,
            }
            provider.request.headers = {
              "Content-Type": "application/json",
            }
            provider.request.body = {
              apiKey: "not-needed",
            }
          })

          for (const model of running.models) {
            const modelId = ModelV2.ID.make(model.id)
            catalog.model.update(providerId, modelId, (m) => {
              m.name = model.name
              m.api.id = model.id
              m.api = {
                id: model.id,
                type: "aisdk",
                package: "@ai-sdk/openai-compatible",
                url: v1Url,
              }
              m.capabilities = {
                tools: true,
                input: ["text"],
                output: ["text"],
              }
              m.cost = [
                {
                  input: 0,
                  output: 0,
                  cache: { read: 0, write: 0 },
                },
              ]
              m.status = "active"
              m.enabled = true
              m.limit = {
                context: model.contextWindow || 32768,
                output: 8192,
              }
            })
          }
        }
      }),
    )

    // Ensure @ai-sdk/openai-compatible is resolved for local providers
    yield* ctx.aisdk.sdk(
      Effect.fn(function* (evt) {
        if (!evt.package.includes("@ai-sdk/openai-compatible")) return
        if (evt.sdk) return
        const mod = yield* Effect.promise(() => import("@ai-sdk/openai-compatible"))
        evt.sdk = mod.createOpenAICompatible({
          ...evt.options,
          includeUsage: false,
        } as any)
      }),
    )
  }),
})
