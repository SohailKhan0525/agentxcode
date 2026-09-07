#!/usr/bin/env bun
import { $ } from "bun"
import pkg from "../package.json"
import { Script } from "@opencode-ai/script"
import { fileURLToPath } from "url"

const dir = fileURLToPath(new URL("..", import.meta.url))
process.chdir(dir)

async function published(name: string, version: string) {
  return (await $`npm view ${name}@${version} version`.nothrow()).exitCode === 0
}

async function publish(dir: string, name: string, version: string) {
  // GitHub artifact downloads can drop the executable bit, and Docker uses the
  // unpacked dist binaries directly rather than the published tarball.
  if (process.platform !== "win32") await $`chmod -R 755 .`.cwd(dir)
  if (await published(name, version)) {
    console.log(`already published ${name}@${version}`)
    return
  }
  await $`bun pm pack`.cwd(dir)
  const flags = process.env.GITHUB_ACTIONS === "true" ? ["--provenance"] : []
  await $`npm publish *.tgz --access public --tag ${Script.channel} ${flags}`.cwd(dir)
}

const binaries: Record<string, string> = {}
for (const filepath of new Bun.Glob("*/*/package.json").scanSync({ cwd: "./dist" })) {
  const p = await Bun.file(`./dist/${filepath}`).json()
  binaries[p.name] = p.version
}
console.log("binaries", binaries)
const version = Object.values(binaries)[0] || Script.version || pkg.version

await $`mkdir -p ./dist/${pkg.name}`
await $`cp -r ./bin ./dist/${pkg.name}/bin`
await $`cp ./script/postinstall.mjs ./dist/${pkg.name}/postinstall.mjs`
await Bun.file(`./dist/${pkg.name}/LICENSE`).write(await Bun.file("../../LICENSE").text())
await Bun.file(`./dist/${pkg.name}/README.md`).write(await Bun.file("./README.md").text())

await Bun.file(`./dist/${pkg.name}/package.json`).write(
  JSON.stringify(
    {
      name: pkg.name,
      bin: {
        agentx: "./bin/agentx",
        opencode: "./bin/agentx",
      },
      scripts: {
        postinstall: "node ./postinstall.mjs",
      },
      version: version,
      license: pkg.license,
      keywords: ["ai", "cli", "agent", "coding", "typescript", "terminal", "bun", "agentx"],
      os: ["darwin", "linux", "win32"],
      cpu: ["arm64", "x64"],
      optionalDependencies: binaries,
      repository: {
        type: "git",
        url: "https://github.com/SohailKhan0525/agentxcode",
      },
    },
    null,
    2,
  ),
)

for (const [name, ver] of Object.entries(binaries)) {
  await publish(`./dist/${name}`, name, ver)
}
await publish(`./dist/${pkg.name}`, pkg.name, version)

const image = "ghcr.io/sohailkhan0525/agentx"
const platforms = "linux/amd64,linux/arm64"
const tags = [`${image}:${version}`, `${image}:${Script.channel}`]
const tagFlags = tags.flatMap((t) => ["-t", t])

// registries
if (!Script.preview) {
  if (process.env.DOCKER_BUILD === "true") {
    try {
      await $`docker buildx build --platform ${platforms} ${tagFlags} --push .`
    } catch (e) {
      console.warn("Docker build skipped or failed:", e)
    }
  }

  // Calculate SHA values if archives exist
  const arm64Sha = (await Bun.file("./dist/agentx-linux-arm64.tar.gz").exists())
    ? await $`sha256sum ./dist/agentx-linux-arm64.tar.gz | cut -d' ' -f1`.text().then((x) => x.trim())
    : ""
  const x64Sha = (await Bun.file("./dist/agentx-linux-x64.tar.gz").exists())
    ? await $`sha256sum ./dist/agentx-linux-x64.tar.gz | cut -d' ' -f1`.text().then((x) => x.trim())
    : ""
  const macX64Sha = (await Bun.file("./dist/agentx-darwin-x64.tar.gz").exists())
    ? await $`sha256sum ./dist/agentx-darwin-x64.tar.gz | cut -d' ' -f1`.text().then((x) => x.trim())
    : ""
  const macArm64Sha = (await Bun.file("./dist/agentx-darwin-arm64.tar.gz").exists())
    ? await $`sha256sum ./dist/agentx-darwin-arm64.tar.gz | cut -d' ' -f1`.text().then((x) => x.trim())
    : ""

  // Homebrew formula
  const homebrewFormula = [
    "# typed: false",
    "# frozen_string_literal: true",
    "",
    "class Agentx < Formula",
    `  desc "AgentX Code - The autonomous AI coding agent built for the terminal."`,
    `  homepage "https://agentx.js.org"`,
    `  version "${Script.version.split("-")[0]}"`,
    "",
    `  depends_on "ripgrep"`,
    "",
    "  on_macos do",
    "    if Hardware::CPU.intel?",
    `      url "https://github.com/SohailKhan0525/agentxcode/releases/download/v${Script.version}/agentx-darwin-x64.tar.gz"`,
    `      sha256 "${macX64Sha}"`,
    "",
    "      def install",
    '        bin.install "agentx"',
    '        bin.install_symlink bin/"agentx" => "opencode"',
    "      end",
    "    end",
    "    if Hardware::CPU.arm?",
    `      url "https://github.com/SohailKhan0525/agentxcode/releases/download/v${Script.version}/agentx-darwin-arm64.tar.gz"`,
    `      sha256 "${macArm64Sha}"`,
    "",
    "      def install",
    '        bin.install "agentx"',
    '        bin.install_symlink bin/"agentx" => "opencode"',
    "      end",
    "    end",
    "  end",
    "",
    "  on_linux do",
    "    if Hardware::CPU.intel? and Hardware::CPU.is_64_bit?",
    `      url "https://github.com/SohailKhan0525/agentxcode/releases/download/v${Script.version}/agentx-linux-x64.tar.gz"`,
    `      sha256 "${x64Sha}"`,
    "      def install",
    '        bin.install "agentx"',
    '        bin.install_symlink bin/"agentx" => "opencode"',
    "      end",
    "    end",
    "    if Hardware::CPU.arm? and Hardware::CPU.is_64_bit?",
    `      url "https://github.com/SohailKhan0525/agentxcode/releases/download/v${Script.version}/agentx-linux-arm64.tar.gz"`,
    `      sha256 "${arm64Sha}"`,
    "      def install",
    '        bin.install "agentx"',
    '        bin.install_symlink bin/"agentx" => "opencode"',
    "      end",
    "    end",
    "  end",
    "end",
    "",
    "",
  ].join("\n")

  const token = process.env.GITHUB_TOKEN
  if (token) {
    const tap = `https://x-access-token:${token}@github.com/SohailKhan0525/homebrew-agentx.git`
    try {
      await $`rm -rf ./dist/homebrew-agentx`
      await $`git clone ${tap} ./dist/homebrew-agentx`
      await Bun.file("./dist/homebrew-agentx/Formula/agentx.rb").write(homebrewFormula)
      await Bun.file("./dist/homebrew-agentx/agentx.rb").write(homebrewFormula)
      await $`cd ./dist/homebrew-agentx && git add -A`
      if ((await $`cd ./dist/homebrew-agentx && git diff --cached --quiet`.nothrow()).exitCode !== 0) {
        await $`cd ./dist/homebrew-agentx && git commit -m "Update to v${Script.version}"`
        await $`cd ./dist/homebrew-agentx && git push`
      }
    } catch (e) {
      console.warn("Could not update Homebrew tap:", e)
    }
  }
}
