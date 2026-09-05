declare global {
  const OPENCODE_VERSION: string | undefined
  const OPENCODE_CHANNEL: string | undefined
  const AGENTX_VERSION: string | undefined
  const AGENTX_CHANNEL: string | undefined
}

export const InstallationVersion =
  typeof AGENTX_VERSION === "string"
    ? AGENTX_VERSION
    : typeof OPENCODE_VERSION === "string"
      ? OPENCODE_VERSION
      : (process.env.AGENTX_VERSION ?? process.env.OPENCODE_VERSION ?? "3.0.0")

export const InstallationChannel =
  typeof AGENTX_CHANNEL === "string"
    ? AGENTX_CHANNEL
    : typeof OPENCODE_CHANNEL === "string"
      ? OPENCODE_CHANNEL
      : (process.env.AGENTX_CHANNEL ?? process.env.OPENCODE_CHANNEL ?? "latest")

export const InstallationLocal = InstallationChannel === "local" || InstallationChannel === "dev"
