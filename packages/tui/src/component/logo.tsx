import { RGBA, TextAttributes } from "@opentui/core"
import { For, type JSX } from "solid-js"
import { useTheme } from "../context/theme"
import { logo, asciiAgentX, asciiCode } from "../logo"

export function Logo() {
  const { theme } = useTheme()
  const yellow = RGBA.fromHex("#FFE600")
  const cyan = RGBA.fromHex("#00E5FF")
  const bg = RGBA.fromHex("#121212")

  const renderLine = (line: string): JSX.Element[] => {
    return Array.from(line).map((char) => {
      if (char === "█") {
        return (
          <text fg={yellow} bg={yellow} selectable={false}>
            █
          </text>
        )
      }
      if (char === "▀") {
        return (
          <text fg={yellow} bg={bg} selectable={false}>
            ▀
          </text>
        )
      }
      if (char === "▄") {
        return (
          <text fg={bg} bg={yellow} selectable={false}>
            ▄
          </text>
        )
      }
      return (
        <text fg={bg} bg={bg} selectable={false}>
          {" "}
        </text>
      )
    })
  }

  return (
    <box alignItems="center">
      <box>
        <For each={logo.left}>
          {(line, index) => (
            <box flexDirection="row">
              <box flexDirection="row">{renderLine(line)}</box>
              <box flexDirection="row">{renderLine(logo.right[index()])}</box>
            </box>
          )}
        </For>
      </box>
      <box height={1} />
      <box flexDirection="row" alignItems="center">
        <box flexDirection="column">
          <For each={asciiAgentX}>
            {(line) => (
              <text fg={cyan} attributes={TextAttributes.BOLD} selectable={false}>
                {line}
              </text>
            )}
          </For>
        </box>
        <box width={1} />
        <box flexDirection="column">
          <For each={asciiCode}>
            {(line) => (
              <text fg={yellow} attributes={TextAttributes.BOLD} selectable={false}>
                {line}
              </text>
            )}
          </For>
        </box>
      </box>
      <box height={1} />
      <text fg={yellow} attributes={TextAttributes.BOLD} selectable={false}>
        AGENTX CODE
      </text>
    </box>
  )
}
