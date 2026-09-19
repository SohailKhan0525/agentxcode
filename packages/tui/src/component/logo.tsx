import { RGBA, TextAttributes } from "@opentui/core"

const brightYellow = RGBA.fromHex("#FFFF00")

export function Logo() {
  return (
    <box flexDirection="row" alignItems="center">
      <text fg={brightYellow} attributes={TextAttributes.BOLD} selectable={false}>
        AGENTX CODE
      </text>
    </box>
  )
}
