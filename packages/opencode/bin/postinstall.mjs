#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import os from "node:os"
import childProcess from "node:child_process"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const scriptDir = path.dirname(__filename)
const packageDir = path.resolve(scriptDir, "..")

// In monorepo development, skip binary download
if (
  fs.existsSync(path.join(packageDir, "src", "index.ts")) &&
  fs.existsSync(path.join(packageDir, "..", "core"))
) {
  process.exit(0)
}

const isWin = os.platform() === "win32"
const exeExt = isWin ? ".exe" : ""
const targetBinary = path.join(scriptDir, "agentx" + exeExt)

if (fs.existsSync(targetBinary)) {
  process.exit(0)
}

const platformMap = {
  darwin: "darwin",
  linux: "linux",
  win32: "windows",
}

const archMap = {
  x64: "x64",
  arm64: "arm64",
}

const platform = platformMap[os.platform()]
const arch = archMap[os.arch()]

if (!platform || !arch) {
  // Unsupported combination, skip gracefully
  process.exit(0)
}

const releaseTag = "v3.0.1"
const archiveExt = isWin ? ".zip" : ".tar.gz"
const archiveName = `agentx-${platform}-${arch}${archiveExt}`
const downloadUrl = `https://github.com/SohailKhan0525/agentxcode/releases/download/${releaseTag}/${archiveName}`

async function downloadAndExtract() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "agentx-install-"))
  const archivePath = path.join(tempDir, archiveName)

  try {
    const res = await fetch(downloadUrl, { redirect: "follow" })
    if (!res.ok) {
      return
    }

    const arrayBuffer = await res.arrayBuffer()
    fs.writeFileSync(archivePath, Buffer.from(arrayBuffer))

    // Extract archive using tar (available on Windows, Linux, and macOS)
    const tarResult = childProcess.spawnSync("tar", ["-xf", archivePath, "-C", tempDir], {
      windowsHide: true,
      stdio: "ignore",
    })

    const extractedBinary = path.join(tempDir, "agentx" + exeExt)
    if (fs.existsSync(extractedBinary)) {
      try {
        fs.copyFileSync(extractedBinary, targetBinary)
        if (!isWin) {
          fs.chmodSync(targetBinary, 0o755)
        }
      } catch {
        // ignore copy errors
      }
    }
  } catch {
    // Network or extraction failure during install shouldn't break npm install
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true })
    } catch {
      // ignore cleanup errors
    }
  }
}

try {
  await downloadAndExtract()
} catch {
  // Always exit 0 so npm install never fails
}
process.exit(0)
