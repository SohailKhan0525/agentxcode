import { RGBA } from "@opentui/core"
import { For, type JSX } from "solid-js"
import { useTheme } from "../context/theme"
import { logo } from "../logo"

export function Logo() {
  const { theme } = useTheme()
  const yellow = RGBA.fromHex("#F5FB03")
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
  )
}

