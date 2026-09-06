# AgentX Code — Complete Transformation Prompt

# Tool: Antigravity CLI (agy) — Google's official terminal agent

# Source: Fresh clone of anomalyco/opencode into working directory

# Target: github.com/SohailKhan0525/agentxcode (new repo to create)

# Reference: Study github.com/Kilo-Org/kilocode for binary release pattern

# Display name: AgentX Code

# CLI command: agentx

# npm package name: @agent-qofeno/agentx-cli (DO NOT CHANGE)

# Version: 3.0.0 everywhere

# Config folder: .agentx (was .opencode)

---

## STEP ZERO — INSTALL SKILLS BEFORE ANYTHING ELSE

This is Antigravity CLI which uses the skills.sh open standard for agent skills. Skills live in the .agents/skills/ folder for this project and globally in ~/.gemini/antigravity-cli/skills/. Install every skill listed below before doing anything else in this prompt. After installing each skill, read its SKILL.md file completely and apply its guidance throughout the entire session.

Install the following skills using the npx skills add command with the antigravity-cli agent flag so they are available in this Antigravity CLI session. Install each one separately and confirm it installed correctly before moving to the next one.

Install writing-plans from obra/superpowers because every phase of this transformation must be planned before being executed and planning before acting consistently produces better results.

Install executing-plans from obra/superpowers because plans must be followed through completely and systematically without skipping steps.

Install systematic-debugging from obra/superpowers because you will encounter TypeScript errors, broken imports, and workflow issues during this transformation and you need to diagnose them methodically rather than guessing at fixes.

Install verification-before-completion from obra/superpowers because nothing in this transformation is done until it is actually verified to be working correctly.

Install subagent-driven-development from obra/superpowers because this project is complex enough that decomposing it into focused parallel workstreams will produce better results than working sequentially through everything.

Install find-skills from vercel-labs/agent-skills because you should discover and install additional relevant skills throughout the session as new subtasks arise.

Install the frontend-ui-ux-wizard skill that is already installed locally because the visual branding work including the SVG logo and terminal screenshots requires applying UI and UX expertise.

Install the ui-ux-pro-max skill that is already installed locally for the same reason.

Install the terminal-ui skill that is already installed locally because significant portions of this work involve the terminal user interface of AgentX Code.

After installing all skills and reading all their SKILL.md files, confirm which skills are now active and what guidance each one provides before proceeding to Step One.

---

## ABSOLUTE RULES — MEMORIZE THESE AND NEVER VIOLATE THEM

These rules apply to every single decision, every single file, every single line you touch throughout this entire session. There are no exceptions under any circumstances.

You must never write a TODO comment anywhere in any file. You must never write a FIXME comment. You must never write a placeholder comment of any kind. You must never write a comment that says something like implement this later or fill in real logic here or add your code here. You must never write a stub function that does nothing. You must never write a stub function whose body only contains a comment describing what it should eventually do. You must never write lorem ipsum text. You must never write dummy data. You must never write fake data. You must never write mock data in any file that is part of the actual product. You must never write a function that returns a hardcoded fake value where a real value should be computed or fetched from a real source. You must never write an integration that looks like it connects to a service but does not actually communicate with the real service. You must never hardcode any API key, token, secret, or credential in any source file. You must never produce anything that could fairly be described as a demo, example, prototype, or minimum viable implementation when a complete production-quality implementation is what this prompt requires.

You must never guess. This is the most important rule. If you do not know something for certain, you must research it or ask. You must never assume a file exists without verifying. You must never assume a folder has a particular structure without reading it. You must never assume what a workflow does without reading every line of it. You must never assume what environment variables a workflow needs without reading every file that references them. You must never assume what packages are installed without reading package.json files. You must never assume what TypeScript types exist without reading the type definitions. Research before acting. Read before changing. Verify before claiming something is done.

---

## STEP ONE — READ AND STUDY KILOCODE COMPLETELY

Before reading the opencode repository you have cloned, you must first study the Kilocode repository at github.com/Kilo-Org/kilocode. Kilocode is a fork of opencode and has already done much of the same transformation work you are about to do. Studying it will give you the clearest possible model for how to approach this transformation correctly.

Using the web browser tool or any other research tool available to you in Antigravity CLI, read the Kilocode repository thoroughly. Read its README file to understand what it does and how it presents itself. Read its package.json files to understand its structure. Read its GitHub Actions workflow files to understand exactly how it builds standalone binary releases for every platform. Pay very close attention to how it uses bun build with the compile flag to produce self-contained executable files. Understand the exact list of compilation targets it uses. Understand the naming convention it uses for each binary archive. Understand how it packages Windows binaries into zip files and Linux and macOS binaries into tar.gz files. Understand how it handles baseline variants for older CPUs and musl variants for Alpine Linux. Understand how it creates the GitHub release and attaches all binary assets to it. Understand how it handles the VS Code extension packaging alongside the binary releases.

Read Kilocode's provider system to understand what changes they made from opencode's provider system. Read how they renamed the binary and the config folder. Read how they updated their installation script. Read everything you can about the differences between Kilocode and opencode.

Do not proceed to Step Two until you have read and understood the Kilocode repository thoroughly. Write a summary of what you learned from Kilocode before moving on.

---

## STEP TWO — READ THE ENTIRE REPOSITORY COMPLETELY

Now read the opencode repository that is in your working directory. Read every single file in every single folder without any exceptions. Do not skip files. Do not skim files. Read every line of every file to build a complete understanding of the codebase.

As you read, compile a thorough written understanding of the following things. Understand the complete packages folder structure and what each package does, what it imports from other packages, and what depends on it. Understand the complete build pipeline from source to distributable artifacts. Understand how the TUI is rendered and what library powers it. Understand how the agent loop processes user input and produces AI output with tool calls. Understand how providers are defined, registered, and used. Understand specifically how the OpenCode Zen provider works and where all its code lives so you can remove it completely. Understand specifically how the OpenCode Go provider works and where all its code lives so you can remove it completely. Understand how sessions, configuration, and permissions work. Understand how the MCP integration works. Understand the VS Code extension structure and how it connects to the CLI.

Read the infra folder and understand precisely what cloud services it deploys, whether those services are needed for AgentX Code, and whether removing it would break anything else. Read the nix folder and understand whether it is integrated into the build or release pipeline or whether it is only an optional development environment tool. Read the artifacts folder and understand what it contains. Read every workflow file in the dot github folder and list every secret each one references. Read every script in the script folder. Read the patches folder and understand each patch. Read the specs folder. Read every single markdown file including all the translated READMEs.

After reading everything, produce a complete written inventory of the entire repository structure before proceeding to Step Three.

---

## STEP THREE — STOP AND ASK FOR SECRETS

After reading everything, compile a complete list of every secret, environment variable, API key, token, credential, certificate, or sensitive configuration value that this codebase needs anywhere in the entire repository. Search every workflow file, every script file, every configuration file, every source file, and every documentation file for references to secrets or environment variables.

For each item on the list, explain what it is, what it is for, which specific files reference it, and how the user can obtain it. Be specific and accurate. Do not invent secrets that you did not actually find in the files.

Stop completely after presenting this list. Present it clearly and organized. Ask the user to confirm which secrets they have already configured in their GitHub repository secrets and which ones need attention. Do not proceed to Step Four until the user has responded.

---

## STEP FOUR — CREATE THE NEW GITHUB REPOSITORY

Create a new GitHub repository named agentxcode under the SohailKhan0525 account. Use the GitHub CLI or GitHub API to create it. The repository must be public. Set the description to a clear, accurate, and professional description of AgentX Code as an open source AI coding agent. Set the repository topics to include ai, cli, agent, coding, typescript, terminal, bun, and agentx. Configure the working directory to use this new repository as its git remote. Do not push anything yet. The push happens in the final step.

---

## STEP FIVE — REMOVE WHAT IS NOT NEEDED

Now that you have read and understood the entire repository, remove files and folders that are not needed for AgentX Code. For every removal decision, base it on what you actually read in the files. Never remove something based on an assumption about what it does. Only remove something after you have read it and confirmed it serves no purpose in AgentX Code.

Remove the infra folder if and only if you confirmed after reading every file inside it that it exists solely to deploy opencode's own cloud services which AgentX Code does not need. If the infra folder contains anything that AgentX Code genuinely uses, do not remove it. Remove the sst.config.ts and sst-env.d.ts files at the root level only if you are removing the infra folder and confirmed these files are only related to the infra folder's purpose.

Remove the nix folder and the flake.nix and flake.lock files at the root level if and only if you confirmed after reading them that they are not integrated into the build or release pipeline in any way that AgentX Code needs. If Nix is only used as an optional development environment setup tool that is not required for building or releasing the product, remove it. If it is actually needed for something, keep it.

Remove the artifacts folder if and only if it contains only opencode-branded media assets that serve no purpose for AgentX Code.

Remove the STATS.md file because it tracks opencode's growth statistics and is specific to opencode as a product. AgentX Code has its own separate history.

Remove the screenshot-uk.png file because it shows the opencode terminal UI. It will be replaced with a new AgentX Code branded image.

Remove the root-level install shell script that references opencode.ai because it installs opencode from opencode's distribution channel. It will be replaced with a new install script for AgentX Code.

Do not remove any package from the packages folder without first confirming it serves no purpose at all for AgentX Code. Do not remove any source file without understanding every import relationship it participates in. After removing files, run the build to confirm nothing is broken. Fix any broken imports or dependencies before proceeding.

---

## STEP SIX — RENAME AND REBRAND EVERYTHING USER-FACING

This step renames and rebrands everything that users actually see. The goal is that no user of AgentX Code ever encounters the word opencode or the name anomalyco in any user-facing context. Internal code identifiers and folder names that users never see should only be changed if the change is clearly safe and does not risk breaking anything.

The product name that users see everywhere must become AgentX Code. Every string in the UI, in documentation, in installation instructions, in help text, in error messages, in the README, and in every markdown file must say AgentX Code or AgentX where appropriate instead of opencode or OpenCode.

The CLI binary command name that users type in their terminal must change from opencode to agentx everywhere it appears. This includes the bin field in the relevant package.json file, all documentation, all installation instructions, all shell scripts, and all workflow files that reference the command.

The configuration folder that AgentX Code creates in users home directories must change from .opencode to .agentx. Find every place in the source code where the configuration folder name is referenced and update it. Verify the change is complete by searching for the string opencode in a configuration folder path context.

Every URL that currently points to opencode.ai must be updated to point to agentx.js.org instead.

Every reference to anomalyco in URLs or author fields must be replaced with SohailKhan0525.

Every reference to the GitHub URL anomalyco/opencode must be replaced with SohailKhan0525/agentxcode.

Every package.json in the repository must have its version field updated to 3.0.0. This applies to the root package.json and to every package.json inside every subfolder throughout the entire packages directory. Every single one must be 3.0.0.

The npm package name in the main CLI package.json must stay exactly as it is. Do not change it under any circumstances. The user has explicitly confirmed this.

After making all renaming changes, run a comprehensive search across the entire repository for any remaining occurrences of opencode, anomalyco, and opencode.ai that exist in user-facing contexts. Fix every remaining occurrence. Then search again to confirm zero remain in user-facing contexts.

---

## STEP SEVEN — CREATE THE AGENTX CODE BRAND ASSETS

The user has provided a pixel art brand logo image. The logo shows a rectangular design with a yellow outer border and black inner background. On the left side there is a pixel art character wearing a hard hat and sunglasses rendered in yellow pixels against the black background. On the right side the text AGENTX CODE appears in a large pixel art font rendered in yellow pixels against the black background. The entire composition is contained within a rectangular border with a yellow outer frame and black inner area.

You must recreate this exact logo as a precise SVG file. Use your visual analysis tools to study the provided image carefully. Recreate it using SVG rect elements positioned to simulate the pixel art style with exact precision. The SVG must look visually identical to the provided image. Do not approximate. Do not simplify. Reproduce it exactly as it appears, pixel row by pixel row. The SVG must look excellent when displayed at various sizes. It must work well in both light and dark backgrounds. Commit this SVG file to the repository as the primary brand asset and reference it from the README and from every location in the repository where a logo file is currently used.

Replace every existing opencode logo SVG file in any package with this new AgentX Code SVG logo.

Create a new terminal screenshot image that shows what AgentX Code looks like when running. This image must show a terminal window with the AgentX Code ASCII art at the top alongside the pixel art logo representation, the correct brand colors, and a representative view of the terminal interface. Create this as an SVG that looks professional and matches the quality level of the original opencode screenshot it replaces.

The ASCII art for the startup screen must be implemented in the TUI. The first ASCII art block displays the word AGENTX using colored ANSI art with escape code 96 for cyan coloring with the specific character art that spells AGENTX in large block letters. The second block displays the word CODE in the plain ASCII art style that was specified. These two blocks together form the complete AgentX Code brand identity in the terminal startup screen. They must replace whatever ASCII art currently shows the opencode logo and must be positioned and styled exactly as the current startup art is positioned, just with the new AgentX Code content.

---

## STEP EIGHT — REMOVE OPENCODE ZEN AND OPENCODE GO PROVIDERS

Remove the OpenCode Zen provider and the OpenCode Go provider completely and cleanly from the codebase. These are proprietary providers specific to opencode that do not belong in AgentX Code.

Find every file that defines, imports, exports, registers, references, tests, documents, or depends on either of these two providers. For each file, remove all code related to these providers while leaving all code related to every other provider completely intact. Remove their entries from the provider registry or wherever providers are listed and registered. Remove their model definitions, pricing configurations, capability objects, and any other configuration specific to them. Remove their authentication logic. Remove any UI elements that present them to users. Remove any tests specific to them. Remove any documentation that describes them. Remove any environment variable references used only by them.

After removing both providers, verify that the provider selection interface still works correctly with zero gaps, zero errors, and zero broken state. All remaining providers must work exactly as before.

---

## STEP NINE — IMPLEMENT LOCAL MODEL SUPPORT COMPLETELY

Implement full local model support as a first-class provider in the existing provider system. Everything about the local model experience happens inside the existing terminal chat interface. There are no separate dialogs, no popup windows, no modal screens, and no disruption to the existing chat experience.

When a user selects local models as their provider, the system must immediately begin detecting which local AI providers are installed and running on their machine. Detection must run in parallel for all supported providers simultaneously, with individual timeouts per provider so that one slow or unresponsive provider does not block the others. The providers to detect are Ollama, LM Studio, Jan, GPT4All, llama.cpp when running in server mode, and LocalAI. For each provider, detection must check whether the provider's known local HTTP API endpoint is reachable and responding, and where possible must also check whether the provider's binary or application file exists on the file system using the correct platform-specific paths.

If providers are running with models available, fetch the real list of models from each running provider using their actual API endpoints. Show the user the provider names, model names, and available metadata such as parameter count, quantization level, size in gigabytes, or context window length. Let the user select which model to use.

If a provider is installed but not running, tell the user clearly and provide accurate platform-specific instructions for starting it. Instructions for Windows must be specific to Windows. Instructions for macOS must be specific to macOS. Instructions for Linux must be specific to Linux.

If no providers are found at all, ask the user conversationally through the chat interface whether they want help setting up a local model.

If the user wants to set up a local model, detect their hardware. Detect the operating system, CPU model and core count, total RAM and available RAM, GPU model and VRAM if present. On Apple Silicon, recognize unified memory and treat total system memory as effective VRAM. On Windows, use the correct Windows mechanisms for GPU and VRAM detection. On Linux, use the available tools while handling gracefully the cases where some information cannot be gathered.

Based on detected hardware, generate accurate model recommendations organized into tiers. A fast tier for models that run on modest hardware. A balanced tier for mid-range hardware. A quality tier for capable hardware. Every recommended model must actually be available through the supported local provider mechanisms and its stated hardware requirements must be accurate. Never recommend a model that will not run on the detected hardware.

Handle model download and installation automatically when the user selects an unavailable model. For Ollama use the ollama pull command. For other providers use their appropriate installation mechanism. Show real-time download progress. Verify the model is available after download before proceeding. Handle errors gracefully with clear recovery paths at every step.

Register the selected local model as the active provider using the same interface all other providers use. Show its status in the UI accurately. Handle disconnection gracefully with recovery instructions.

---

## STEP TEN — BUILD THE BINARY RELEASE PIPELINE

Study what you learned from reading Kilocode and implement the same binary release approach for AgentX Code. This is how AgentX Code gets distributed to users who want a native binary without installing Node.js.

Create a GitHub Actions workflow that compiles AgentX Code into standalone self-contained executable binaries for every supported platform using bun build with the compile flag and cross-compilation targets. The binaries must be produced for Windows x64, Windows ARM64, macOS x64 Intel, macOS ARM64 Apple Silicon, Linux x64, Linux ARM64, Linux x64 musl for Alpine Linux and Docker, Linux ARM64 musl, and baseline variants of the x64 targets for older CPUs without modern instruction set support.

Package each compiled binary appropriately. Windows binaries go into zip archives. macOS and Linux binaries go into tar.gz archives. Name each archive using a consistent convention that includes agentx, the platform, and the architecture. For example agentx-windows-x64.zip, agentx-darwin-arm64.tar.gz, agentx-linux-x64.tar.gz, agentx-linux-x64-musl.tar.gz, agentx-linux-x64-baseline.tar.gz, and so on for all targets.

The release workflow must trigger when a version tag is pushed. It must compile all targets, package all binaries, create a GitHub release with the tag as the title, upload all binary archives as release assets, and also attach the VS Code extension vsix file as an additional release asset.

---

## STEP ELEVEN — UPDATE THE PUBLISHING WORKFLOWS

Update the npm publish workflow to include provenance attestation on every publish. Provenance requires the workflow job to have id-token write permission and the npm publish command must include the provenance flag. Implement this correctly so every published package has cryptographic proof of its build origin.

Add a JSR publish step alongside the npm publish. Create the correct jsr.json configuration for the package with accurate name, version, and module export fields.

Add a GitHub Packages publish step that publishes under the SohailKhan0525 scope.

Update the Homebrew tap workflow to update the formula in the github.com/SohailKhan0525/homebrew-agentx repository when a new release is created. The formula must install the agentx binary from the npm package with the correct SHA256 hash.

Create a cross-platform test workflow that runs on every push and pull request. It must build the project on Ubuntu, Windows, and macOS with Node 18 and Node 20. It must verify the agentx command starts correctly on each platform.

Remove any workflows that build or release desktop GUI applications using Electron, Tauri, or similar frameworks. AgentX Code is a terminal CLI and produces terminal binaries only, not desktop GUI applications.

If any workflow references a secret that is not yet confirmed as configured, add a clear check at the start of that workflow that stops with a helpful error message explaining which secret is missing and how to obtain it.

---

## STEP TWELVE — UPDATE ALL DOCUMENTATION

Update every markdown file in the entire repository. Not a single markdown file may be left with opencode branding, anomalyco references, opencode.ai URLs, or opencode Discord links.

Rewrite the root README.md completely. It must prominently feature the AgentX Code SVG pixel art logo. It must show the ASCII art startup screen. It must include accurate installation instructions for every supported method: npm global install, Homebrew, JSR, GitHub Packages, and manual binary download from GitHub Releases. It must not include installation methods that AgentX Code does not support. It must accurately list all AI providers available after removing OpenCode Zen and OpenCode Go. It must describe local model support. It must link to agentx.js.org for documentation. It must include accurate npm badge, GitHub release badge, and license badge. It must include credit to opencode as required by the MIT license while clearly stating AgentX Code is a separate product. It must include a terminal screenshot showing AgentX Code running.

Update all translated README files to match the new English README content with their respective translations updated accordingly. Every opencode reference in every translated README must be replaced.

Update AGENTS.md to accurately reflect the agents in AgentX Code. Update CONTEXT.md to describe the AgentX Code codebase accurately. Update CONTRIBUTING.md with correct repository URL and setup instructions. Update SECURITY.md to direct reports to github.com/SohailKhan0525/agentxcode. Update every markdown file in every package folder.

---

## STEP THIRTEEN — UPDATE THE VS CODE EXTENSION

Read every file in the VS Code extension in the sdks folder. Update the extension manifest with the display name AgentX Code, the description, the AgentX Code pixel art SVG logo as the icon, the correct repository URL, and the correct homepage URL. Update all user-facing strings to use AgentX Code instead of opencode. Update all opencode references in the extension source code. Verify the extension still functions correctly with the AgentX Code CLI. Package it as a vsix file in the release workflow. Do not publish it to the VS Code Marketplace automatically since users will install it manually from the GitHub release.

---

## STEP FOURTEEN — REPLACE THE INSTALL SCRIPT

Create a new root-level install shell script that installs AgentX Code. The script must detect the user's operating system and architecture, download the correct binary from the GitHub releases page of SohailKhan0525/agentxcode, verify the download integrity, extract it to the correct location, make the binary executable, and confirm installation succeeded. The script must work correctly on macOS and Linux with clear error messages when something goes wrong.

---

## STEP FIFTEEN — BUILD AND VERIFY EVERYTHING

After completing all steps, build the entire project and fix every error until it builds completely and successfully. Zero TypeScript errors. Zero missing module errors. Zero broken imports. Zero failed build scripts. No warnings that indicate real problems.

After a successful build verify the following. Running agentx starts the terminal interface correctly. The AgentX Code ASCII art and pixel art logo appear correctly in the startup screen. The provider selection shows the correct list without OpenCode Zen and OpenCode Go. Local model detection runs without errors. The version shows as 3.0.0. The config folder is created with the name dot agentx. Every remaining provider that worked before still works. All GitHub Actions workflow files have valid YAML syntax and correct logic.

---

## STEP SIXTEEN — COMMIT AND PUSH

Stage all changes. Create a comprehensive commit message describing the complete transformation. Push to github.com/SohailKhan0525/agentxcode. Monitor all triggered GitHub Actions workflows and report their status. Fix any workflow failures. After everything passes, guide the user through pushing the first version tag to trigger the binary release workflow. Confirm all binary assets are attached to the GitHub release.

Present the user with a complete summary when done including what was changed, what was removed, what was added, the status of all workflows, the new repository URL, the first release URL, and any remaining manual steps.

---

## IMPORTANT NOTES FOR ANTIGRAVITY CLI

You are running in Antigravity CLI which has access to web browsing, file operations, terminal commands, and the skills system. Use all available tools actively. When you need to understand something about Kilocode, browse their repository. When you encounter a TypeScript error, use systematic-debugging to diagnose it properly. When you are about to start a complex phase, use writing-plans to plan it first. When you think a phase is complete, use verification-before-completion to actually verify it before marking it done. Never guess. Always research. Always verify. Always ask when uncertain.
