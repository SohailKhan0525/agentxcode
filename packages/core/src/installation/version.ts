declare global {
  const OPENCODE_VERSION: string
  const OPENCODE_CHANNEL: string
}

const envVersion =
  (typeof process !== "undefined" && (process.env.AGENTX_VERSION || process.env.OPENCODE_VERSION)) || undefined

const compiledVersion =
  typeof OPENCODE_VERSION === "string" && !OPENCODE_VERSION.startsWith("0.0.0-") ? OPENCODE_VERSION : undefined

export const InstallationVersion = envVersion || compiledVersion || "3.0.4"
export const InstallationChannel = typeof OPENCODE_CHANNEL === "string" ? OPENCODE_CHANNEL : "latest"
export const InstallationLocal =
  typeof OPENCODE_CHANNEL === "string" ? OPENCODE_CHANNEL === "local" : InstallationVersion === "local"

