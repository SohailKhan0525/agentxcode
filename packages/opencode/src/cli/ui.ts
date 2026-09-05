import fs from "fs"
import path from "path"
import { EOL } from "os"
import { Schema } from "effect"
import { logo as glyphs } from "./logo"

function tryInlineImage(): string | undefined {
  if (!process.stdout.isTTY && !process.stderr.isTTY) return undefined
  const termProgram = process.env.TERM_PROGRAM
  const term = process.env.TERM
  const isImageTerm =
    termProgram === "iTerm.app" ||
    termProgram === "WezTerm" ||
    process.env.LC_TERMINAL === "iTerm2" ||
    term === "xterm-ghostty" ||
    term === "xterm-kitty" ||
    Boolean(process.env.KITTY_WINDOW_ID) ||
    Boolean(process.env.GHOSTTY_RESOURCES_DIR)

  if (!isImageTerm) return undefined

  const candidatePaths = [
    path.join(process.cwd(), "agentx_code.png"),
    path.resolve(__dirname, "../../../../../agentx_code.png"),
    path.resolve(__dirname, "../../agentx_code.png"),
    path.resolve(__dirname, "agentx_code.png"),
  ]
  const pngPath = candidatePaths.find((p) => {
    try {
      return fs.existsSync(p)
    } catch {
      return false
    }
  })
  if (!pngPath) return undefined

  try {
    const b64 = fs.readFileSync(pngPath).toString("base64")
    return `\x1b]1337;File=inline=1;width=78;preserveAspectRatio=1:${b64}\x07`
  } catch {
    return undefined
  }
}

export class CancelledError extends Schema.TaggedErrorClass<CancelledError>()("UICancelledError", {}) {}

export const Style = {
  TEXT_HIGHLIGHT: "\x1b[96m",
  TEXT_HIGHLIGHT_BOLD: "\x1b[96m\x1b[1m",
  TEXT_DIM: "\x1b[90m",
  TEXT_DIM_BOLD: "\x1b[90m\x1b[1m",
  TEXT_NORMAL: "\x1b[0m",
  TEXT_NORMAL_BOLD: "\x1b[1m",
  TEXT_WARNING: "\x1b[93m",
  TEXT_WARNING_BOLD: "\x1b[93m\x1b[1m",
  TEXT_DANGER: "\x1b[91m",
  TEXT_DANGER_BOLD: "\x1b[91m\x1b[1m",
  TEXT_SUCCESS: "\x1b[92m",
  TEXT_SUCCESS_BOLD: "\x1b[92m\x1b[1m",
  TEXT_INFO: "\x1b[94m",
  TEXT_INFO_BOLD: "\x1b[94m\x1b[1m",
}

export function println(...message: string[]) {
  print(...message)
  process.stderr.write(EOL)
}

export function print(...message: string[]) {
  blank = false
  process.stderr.write(message.join(" "))
}

let blank = false
export function empty() {
  if (blank) return
  println("" + Style.TEXT_NORMAL)
  blank = true
}

export function logo(pad?: string) {
  const inline = tryInlineImage()
  if (inline) {
    return (pad ? pad : "") + inline
  }

  const result: string[] = []
  const reset = "\x1b[0m"
  const yellowFg = "\x1b[38;2;245;251;3m"
  const yellowBg = "\x1b[48;2;245;251;3m"
  const blackFg = "\x1b[38;2;18;18;18m"
  const blackBg = "\x1b[48;2;18;18;18m"

  const draw = (line: string) => {
    let out = ""
    for (const ch of line) {
      if (ch === "█") out += yellowFg + yellowBg + "█" + reset
      else if (ch === "▀") out += yellowFg + blackBg + "▀" + reset
      else if (ch === "▄") out += blackFg + yellowBg + "▄" + reset
      else out += " "
    }
    return out
  }

  glyphs.left.forEach((row, index) => {
    if (pad) result.push(pad)
    result.push(draw(row))
    const other = glyphs.right[index] ?? ""
    result.push(draw(other))
    result.push(EOL)
  })
  return result.join("").trimEnd()
}

export async function input(prompt: string): Promise<string> {
  const readline = require("readline")
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(prompt, (answer: string) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

export function error(message: string) {
  if (message.startsWith("Error: ")) {
    message = message.slice("Error: ".length)
  }
  println(Style.TEXT_DANGER_BOLD + "Error: " + Style.TEXT_NORMAL + message)
}

export function markdown(text: string): string {
  return text
}

export * as UI from "./ui"
