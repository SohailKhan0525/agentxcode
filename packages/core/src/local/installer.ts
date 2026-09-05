import childProcess from "child_process"
import { LOCAL_PROVIDERS } from "./endpoints"

export type PullProgress = {
  status: string
  total?: number
  completed?: number
  percent?: number
}

export type PullCallback = (progress: PullProgress) => void

export async function pullOllamaModel(modelTag: string, onProgress?: PullCallback): Promise<{ success: boolean; error?: string }> {
  const ollamaConfig = LOCAL_PROVIDERS.find((p) => p.kind === "ollama")
  const endpoint = ollamaConfig?.endpoint || "http://127.0.0.1:11434"

  // First try the native HTTP streaming API
  try {
    const res = await fetch(`${endpoint}/api/pull`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: modelTag, stream: true }),
    })

    if (res.ok && res.body) {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (!line.trim()) continue
          try {
            const data = JSON.parse(line)
            const total = data.total
            const completed = data.completed
            const percent = total && completed ? Math.round((completed / total) * 100) : undefined
            onProgress?.({
              status: data.status || "Downloading...",
              total,
              completed,
              percent,
            })
            if (data.status === "success") {
              return { success: true }
            }
          } catch {
            // ignore partial JSON parse
          }
        }
      }
      return { success: true }
    }
  } catch {
    // Fall back to CLI execution
  }

  // Fallback: execute 'ollama pull' via child_process
  return new Promise((resolve) => {
    const child = childProcess.spawn("ollama", ["pull", modelTag], {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    })

    let lastError = ""

    child.stdout.on("data", (chunk: Buffer) => {
      const text = chunk.toString("utf8")
      onProgress?.({ status: text.trim() })
    })

    child.stderr.on("data", (chunk: Buffer) => {
      const text = chunk.toString("utf8")
      lastError += text
      onProgress?.({ status: text.trim() })
    })

    child.on("error", (err) => {
      resolve({
        success: false,
        error: `Could not start ollama CLI: ${err.message}. Please ensure Ollama is installed and running.`,
      })
    })

    child.on("close", (code) => {
      if (code === 0) {
        resolve({ success: true })
      } else {
        resolve({
          success: false,
          error: lastError || `Ollama process exited with code ${code}`,
        })
      }
    })
  })
}
