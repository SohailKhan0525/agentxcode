# AgentX Code — Complete Transformation Prompt

# Tool: Antigravity CLI

# Base: opencode clone already in working directory

# Reference: Clone Kilocode separately to study and copy from

# Target: github.com/SohailKhan0525/agentxcode (new repo)

# Display name: AgentX Code

# Binary command: agentx

# Config folder: .agentxcode

# Repo name: agentxcode

# npm package name: @agent-qofeno/agentx-cli (DO NOT CHANGE — already published)

# Version: 3.0.0 everywhere

# Logo: agentx_icon.png (provided) — use PNG everywhere except TUI

# TUI brand: AGENTX CODE in yellow color text since TUI cannot render PNG

---

## ABSOLUTE RULES — READ FIRST, NEVER VIOLATE

These rules apply to every single decision, every file, every line you touch throughout this entire session. There are no exceptions.

Never write a TODO comment. Never write a FIXME comment. Never write a placeholder comment of any kind. Never write a comment that says implement this later or add your logic here or fill in real code here. Never write a stub function whose body is empty or whose body only describes what it should do instead of actually doing it. Never write lorem ipsum. Never write dummy data, fake data, mock data, or sample data in any file that is part of the actual product. Never write a function that returns a hardcoded fake value where a real value should be computed or fetched. Never write an integration that looks connected but does not actually communicate with the real service. Never hardcode any API key, token, secret, or credential in any source file. Never produce anything that could fairly be described as a demo, example, prototype, or minimum viable implementation when a complete production-quality implementation is what real users need.

Never guess. This is the most important rule of all. If you do not know something for certain, you must research it using your available tools, study the reference repositories, or ask the user. Never assume a file exists without verifying. Never assume a folder has a particular structure without reading it. Never assume what a workflow does without reading every line of it. Never assume what environment variables a workflow needs without finding and reading every reference to them. Never assume what packages are installed without reading the relevant package.json files. Research before acting. Read before changing. Verify before claiming something is done.

Every feature you implement must work correctly when installed by a real user on a real machine. The standard for this project is what a real developer shipping a real product would consider done, not what a prototype or demo would consider done.

---

## PHASE ZERO — INSTALL SKILLS, TOOLS, AND MCP SERVERS

Before doing anything else, set up everything that will make your work better, faster, and more reliable throughout this session.

### Install Skills from skills.sh

Install the following skills using the npx skills add command. Read the SKILL.md for each skill immediately after installing it and apply its guidance throughout the session.

Install writing-plans from obra/superpowers. You must write a plan before starting any complex phase of this transformation. Planning before acting consistently produces better results.

Install executing-plans from obra/superpowers. Plans must be followed through completely and systematically without skipping steps.

Install systematic-debugging from obra/superpowers. You will encounter TypeScript errors, broken imports, workflow failures, and other issues. Diagnose them methodically using this skill rather than guessing at fixes.

Install verification-before-completion from obra/superpowers. Nothing is done until it is actually verified to work correctly. Use this skill at the end of every phase.

Install subagent-driven-development from obra/superpowers. This transformation is complex enough that breaking it into focused parallel workstreams produces better results.

Install find-skills from vercel-labs/agent-skills. Use this throughout the session to discover additional relevant skills as new subtasks arise.

Install dispatching-parallel-agents from obra/superpowers. Use parallel agents where appropriate to speed up reading and analysis tasks.

Install finishing-a-development-branch from obra/superpowers. Use this when preparing the final commit.

Also read and apply every skill that is already installed in the .agents/skills directory. Run npx skills list to see all installed skills and read every one of them.

### Install and Configure MCP Servers

Research what MCP servers are available that would help with this project. Then install and configure every MCP server that is genuinely useful for the work ahead. Do not install MCP servers blindly without understanding what they do. Read the documentation for each one before installing it.

MCP servers you should definitely research and install if they are available and useful include the GitHub MCP server for reading the Kilocode repository, creating the new agentxcode repository, managing releases, and uploading release assets. Include the filesystem MCP server if it provides capabilities beyond what you already have for file operations. Include any MCP server that helps with npm publishing, with binary compilation verification, or with workflow validation.

After reading the entire codebase in Phase Two, revisit this step and install any additional MCP servers that would help with specific implementation tasks you discovered. Research what is available. Install what is genuinely useful. Document what each installed MCP server does and where in the session you plan to use it.

---

## PHASE ONE — CLONE AND STUDY KILOCODE

Clone the Kilocode repository from github.com/Kilo-Org/kilocode into a separate directory alongside your working directory. This is a fork of opencode that has already done a transformation similar to what you are about to do for AgentX Code. Study it deeply to understand exactly how to approach each part of this transformation correctly.

Read every single file in the Kilocode repository. Do not skip any file. Do not skim any file. Read every line of every file.

As you read Kilocode, focus especially on understanding the following things in depth.

Understand completely how Kilocode builds standalone binary executables for every supported platform. Find the exact workflow files that handle binary compilation. Read every line of every binary build workflow. Understand the exact bun build command configuration they use to produce self-contained executables. Understand every compilation target they produce and what the resulting binary is named for each target. Understand how they handle Windows x64, Windows ARM64, macOS x64 Intel, macOS ARM64 Apple Silicon, Linux x64, Linux ARM64, Linux x64 with musl for Alpine Linux and Docker containers, Linux ARM64 with musl, and the baseline variants of x64 builds for older CPUs without modern instruction set support. Understand how they package Windows binaries into zip archives and macOS and Linux binaries into tar.gz archives. Understand how they name each archive file and what naming convention they follow. Understand how they create the GitHub release and attach every binary archive as a release asset.

Understand how Kilocode handles the VS Code extension build and packaging. Find where the vsix file is produced and how it gets attached to the GitHub release.

Understand what changes Kilocode made to the opencode provider system. Understand what providers they kept and what they removed or changed.

Understand how Kilocode renamed the binary command, the configuration folder, and all user-facing identity strings. Understand what folder name they use for user configuration.

Understand how Kilocode's install script works and what it does.

Understand the complete structure of their GitHub Actions workflows and how they are organized.

After studying everything in Kilocode, write a detailed summary of every specific thing you plan to copy or adapt from Kilocode for the AgentX Code transformation. Be specific about which files you are copying, which you are adapting, and what changes you are making to each one.

---

## PHASE TWO — READ THE ENTIRE OPENCODE REPOSITORY

Now read the entire opencode repository that is in your working directory. Read every single file in every single folder without any exceptions. Do not skip any file. Do not skim any file. Read every line.

As you read, build a complete and accurate understanding of the following.

Understand the complete structure of the packages folder and what each package does. Understand the dependency relationships between packages. Know which packages are required for the CLI to function and which are optional or auxiliary.

Understand how the TUI is rendered. Know exactly what library powers the terminal user interface, how it handles colors and text styling, what its limitations are, and how it handles the startup screen where branding appears.

Understand how the agent loop works from start to finish. Know how user input is received, how it is sent to the AI provider, how tool calls are made, how results are returned, and how the output is rendered.

Understand how the provider system works. Know exactly how providers are defined, how they are registered in the provider registry, how the user selects a provider, how API requests are made through providers, and how provider-specific configuration is stored. Find every file related to the OpenCode Zen provider and the OpenCode Go provider.

Understand how sessions work, how configuration is stored and loaded, how the permission system works, and how the MCP integration works.

Understand the VS Code extension completely. Read every file in the sdks folder. Know how the extension communicates with the CLI and what it does.

Read the infra folder completely. Understand precisely what cloud services it deploys and whether those services are needed for AgentX Code or whether they are specific to opencode's own hosted product.

Read the nix folder completely. Understand whether Nix is integrated into the build or release pipeline or whether it is only an optional development environment tool.

Read the artifacts folder. Understand what it contains.

Read every GitHub Actions workflow file completely. For every workflow, understand what triggers it, what it does step by step, what secrets it references by name, what permissions it requires, and what artifacts it produces.

Read every script in the script folder. Understand what each one does.

Read the patches folder. Understand what each patch does.

Read every markdown file including every translated README. Count how many translated READMEs exist and list them.

Read the root-level configuration files including package.json, turbo.json, bunfig.toml, tsconfig.json, and every other root-level file.

After reading everything, produce a complete written inventory of the entire repository before proceeding.

---

## PHASE THREE — STOP AND ASK FOR SECRETS

After reading everything in both repositories, compile a complete and exhaustive list of every secret, environment variable, API key, token, credential, signing certificate, or other sensitive configuration value that is referenced anywhere in the entire codebase. Search every workflow file, every script, every configuration file, and every source file. List every environment variable name you find referenced anywhere.

For each item on the list, describe clearly what it is, what it is for, exactly which files reference it, and how the user can obtain or configure it.

Also ask the user to confirm whether the following secrets are already configured in the GitHub secrets of the new agentxcode repository: NPM_TOKEN for publishing to the npm registry, HOMEBREW_TAP_TOKEN for updating the Homebrew formula in the tap repository, JSR_TOKEN for publishing to JSR, and GITHUB_TOKEN which is automatic. Ask the user to confirm each one individually even if they think they are already set up.

Stop completely after presenting this list. Do not proceed to Phase Four until the user has responded and confirmed the secret situation.

---

## PHASE FOUR — CREATE THE AGENTXCODE REPOSITORY AND RULES FILE

Create a new GitHub repository named agentxcode under the SohailKhan0525 account. Set it to public. Set the description to a clear professional description of AgentX Code as an open source AI coding agent. Set the repository topics to include ai, cli, agent, coding, typescript, terminal, bun, agentx, and agentxcode.

After creating the repository, initialize the working directory as a git repository pointing to this new remote. Do not push yet.

Create a root-level AGENTS.md file that establishes the rules for any AI agent working on this repository in the future. This file must be thorough, clear, and genuinely useful. It must cover the following areas completely.

The AGENTS.md must describe what AgentX Code is, what it does, and who it is for. It must describe the architecture of the codebase including what each package does and how they relate to each other. It must describe the build system and how to run builds, tests, and the development version. It must describe the release process including how binary releases work and how npm publishing works.

It must establish coding standards including TypeScript strict mode requirements, import conventions, error handling patterns, and logging practices. It must establish the quality rules that apply to all code: no placeholder comments, no TODO comments, no stub functions, no fake data, no hardcoded credentials, no incomplete implementations.

It must describe how to add a new AI provider, how to add a new tool, and how to extend the MCP integration. It must describe the binary release targets and what platforms are supported.

It must list what skills from skills.sh are useful for working on this project and instruct any agent to install them before starting work. It must list what MCP servers are configured and how to use them.

It must describe the brand identity including the logo assets, the color scheme of yellow and black, the binary command name agentx, the configuration folder name .agentxcode, and the display name AgentX Code.

It must describe what must never be done, including modifying the npm package name, removing providers without explicit user instruction, changing the version numbers without going through the release process, and committing secrets to the repository.

---

## PHASE FIVE — REMOVE WHAT IS NOT NEEDED

Now make decisions about every folder and file based on what you actually read. Never remove anything based on assumptions. Only remove something after confirming you understand what it does and that AgentX Code does not need it.

Remove the infra folder if and only if after reading every file inside it you confirmed it exists solely to deploy opencode's own hosted cloud services that AgentX Code does not provide. If infra contains anything AgentX Code needs, keep it and update it. Remove the sst.config.ts and sst-env.d.ts files at the root level only if you are removing the infra folder.

Remove the nix folder and the flake.nix and flake.lock files at the root level if and only if after reading them you confirmed they are not integrated into the build or release pipeline in any way that is needed. If Nix is only an optional development environment tool, remove it.

Remove the artifacts folder if it contains only opencode-branded media assets serving no purpose for AgentX Code.

Remove the STATS.md file because it tracks opencode's own growth statistics.

Remove the screenshot PNG file that shows the opencode terminal UI. It will be replaced.

Remove the root-level install shell script that references opencode.ai. It will be replaced with a new one.

Remove any GitHub Actions workflow files that build or package desktop GUI applications using Electron, Tauri, or similar frameworks. AgentX Code is a terminal CLI tool that produces terminal binaries only.

After removing files, run the build to confirm nothing broke. Fix any broken imports before continuing.

---

## PHASE SIX — COPY AND ADAPT FROM KILOCODE

Based on your detailed study of Kilocode in Phase One, copy the specific files from the Kilocode repository that AgentX Code needs and that are better in Kilocode than in opencode.

The most important things to copy from Kilocode are the binary build workflow files. Copy every workflow file related to building standalone binary executables for all platforms. After copying each workflow file, adapt it carefully to use the AgentX Code binary name agentx, the correct repository SohailKhan0525/agentxcode, the correct package name, and all other AgentX Code specific values. Do not copy workflow files blindly without adapting every reference inside them.

Copy the binary packaging scripts if Kilocode has separate scripts for creating the zip and tar.gz archives. Adapt them to use the agentx naming convention.

Copy the install shell script from Kilocode if it is better than opencode's original. Adapt it to install AgentX Code from the SohailKhan0525/agentxcode releases page.

Copy any other workflow improvements or configuration improvements from Kilocode that make the project better. For each thing you copy, explain what it is, why it is better than what opencode has, and what adaptations you made.

Do not copy anything from Kilocode that would conflict with the opencode base you are using. Do not copy their provider removals or additions since you are handling providers separately. Do not copy their branding or naming since AgentX Code has its own identity.

---

## PHASE SEVEN — RENAME AND REBRAND EVERYTHING USER-FACING

Rename and rebrand every user-facing string throughout the entire codebase. Focus on what users actually see. Internal code identifiers and folder names that users never see should only be changed if the change is clearly safe and does not risk breaking anything.

The product name that users see must become AgentX Code everywhere it appears in text that users read including the UI, documentation, error messages, help text, and all markdown files.

The CLI binary command name must change from opencode to agentx everywhere it appears including the bin field in the relevant package.json, all documentation, all installation instructions, all shell scripts, and all workflow files.

The configuration folder that AgentX Code creates in user home directories must change from .opencode to .agentxcode everywhere in the source code that references it.

Every URL pointing to opencode.ai must become agentx.js.org.

Every reference to anomalyco in URLs and author fields must become SohailKhan0525.

Every reference to the GitHub URL anomalyco/opencode must become SohailKhan0525/agentxcode.

Every package.json version field in the entire repository must be set to 3.0.0. This includes the root package.json and every package.json inside every subfolder throughout the entire packages directory without exception.

The npm package name must remain exactly as it currently is. The user has explicitly confirmed that @agent-qofeno/agentx-cli must not be changed because it is already published under that name.

After all renaming, run a comprehensive search across the entire repository for any remaining occurrences of opencode in user-facing contexts, anomalyco, and opencode.ai. Fix every remaining occurrence. Search again to confirm zero remain in user-facing contexts.

---

## PHASE EIGHT — BRAND ASSETS AND VISUAL IDENTITY

### Logo PNG

The user has provided the AgentX Code logo as a PNG file named agentx_icon.png. The logo shows a rectangular design with a yellow outer border and black inner background. On the left side there is a pixel art character wearing a hard hat and sunglasses in yellow and black. On the right side the text AGENTX CODE appears in a large yellow pixel art font against the black background.

Use this PNG file everywhere that a logo image is appropriate. This includes the README file, the VS Code extension manifest icon, any documentation pages, and any other location in the repository where an image logo is displayed.

Add the PNG file to the repository in the correct location. Ensure it is correctly referenced from every location that uses a logo image.

### TUI Branding

The terminal user interface cannot render PNG images. For the TUI startup screen, use colored text to represent the AgentX Code brand. Display the text AGENTX CODE in bright yellow color since the TUI supports ANSI color codes. The yellow must match the yellow in the logo image which is a bright vivid yellow. Style it prominently so it serves as a clear brand identity in the terminal startup experience. Study how the current opencode TUI handles the startup branding and replace it with the AgentX Code yellow text branding in the same position and with the same visual weight.

Additionally, add the two ASCII art blocks provided by the user. The first block spells AGENTX using colored ANSI art with escape code 96 for cyan color as specified earlier. The second block spells CODE in plain ASCII art. Display these together as part of the startup experience.

### Replace Opencode Images

Find every image file in the repository that shows opencode branding. The screenshot-uk.png file at the root must be replaced with a new image showing the AgentX Code terminal. Create a new terminal screenshot that shows what AgentX Code looks like when running with the correct brand identity. Create this as an SVG file that looks professional. Every other opencode logo SVG file in any package must be replaced with the AgentX Code PNG logo or an SVG representation of it.

---

## PHASE NINE — REMOVE OPENCODE ZEN AND OPENCODE GO PROVIDERS

Remove the OpenCode Zen provider and the OpenCode Go provider completely from the codebase. These are proprietary providers specific to opencode that have no place in AgentX Code.

Find every single file that defines, imports, exports, registers, references, tests, documents, or depends on either of these two providers. For each file you find, remove all code related to these providers while leaving all code related to every other provider completely intact and working. Remove their entries from the provider registry. Remove their model definitions, pricing configurations, capability objects. Remove their authentication logic. Remove any UI elements presenting them to users. Remove any tests specific to them. Remove any documentation describing them. Remove any environment variable references used only by them.

After removing both providers, verify the provider selection interface still works perfectly with zero gaps and zero errors. Every remaining provider must work exactly as before.

---

## PHASE TEN — IMPLEMENT LOCAL MODEL SUPPORT COMPLETELY

Implement full local model support as a first-class provider in the existing provider system. Before writing a single line of implementation, research thoroughly how local model providers like Ollama, LM Studio, Jan, GPT4All, llama.cpp, and LocalAI expose their APIs. Read the official documentation for each provider. Understand exactly what HTTP endpoints each one exposes, what the request and response formats are, and how to list available models, download new models, and send inference requests. Use your web browsing and research tools to find this information. Do not implement anything based on assumptions about how these APIs work.

After researching each provider thoroughly, implement the local model feature. Everything about the local model experience happens inside the existing terminal chat interface. There are no separate dialogs, no popup windows, and no disruption to the existing chat experience.

When a user selects local models as their provider, detect which local AI providers are installed and running in parallel with individual timeouts per provider. Check Ollama at its known endpoint, LM Studio at its known endpoint, Jan at its known endpoint, GPT4All at its known endpoint, llama.cpp server mode at its known endpoint, and LocalAI at its known endpoint. Also check for installed binaries and applications on the file system using the correct platform-specific paths for Windows, macOS, and Linux.

If providers are running with models available, fetch the real list of models from each provider using their actual API. Show the user accurate information including model names and available metadata. Let the user select which model to use.

If a provider is installed but not running, tell the user clearly with accurate platform-specific instructions for starting it.

If no providers are found, ask conversationally whether the user wants help setting up a local model.

If the user wants setup help, detect their hardware accurately. Detect the operating system, CPU model and core count, total RAM and available RAM in gigabytes, GPU model name and VRAM in gigabytes if present. On Apple Silicon, correctly recognize unified memory. On Windows, use the correct Windows mechanisms. On Linux, use available tools gracefully handling missing information.

Based on detected hardware, generate accurate model recommendations in tiers. Fast tier for modest hardware. Balanced tier for mid-range hardware. Quality tier for capable hardware. Every recommended model must be real, actually available, and have accurate hardware requirements. Never recommend a model that will not run on the detected hardware.

Handle model download automatically. For Ollama use ollama pull. For other providers use their appropriate mechanism. Show real download progress. Verify availability after download. Handle all errors gracefully with clear recovery paths.

Register the selected local model as the active provider using the same interface all other providers use. Show accurate status in the UI. Handle disconnection gracefully.

---

## PHASE ELEVEN — BUILD THE BINARY RELEASE PIPELINE

Using what you learned from studying Kilocode in Phase One and from the files you copied in Phase Six, build a complete binary release pipeline for AgentX Code. This is how users who want a native binary without installing Node.js will get AgentX Code.

Implement GitHub Actions workflows that compile AgentX Code into standalone self-contained executable binaries for every supported platform using bun build with the compile flag and cross-compilation targets. The complete list of targets is Windows x64, Windows ARM64, macOS x64 Intel, macOS ARM64 Apple Silicon, Linux x64, Linux ARM64, Linux x64 musl for Alpine Linux and Docker, Linux ARM64 musl, Linux x64 baseline for older CPUs, and Linux x64 baseline musl.

Package each compiled binary appropriately. Windows binaries go into zip archives. macOS and Linux binaries go into tar.gz archives. Name each archive following the convention agentx-platform-architecture.zip or agentx-platform-architecture.tar.gz. For example agentx-windows-x64.zip, agentx-darwin-arm64.tar.gz, agentx-linux-x64.tar.gz, agentx-linux-x64-musl.tar.gz, agentx-linux-x64-baseline.tar.gz and so on for all targets.

The release workflow must trigger when a version tag is pushed. It must compile all targets, package all binaries, create a GitHub release with the tag as the title and automatically generated or well-formatted release notes, upload all binary archives as release assets, and also attach the VS Code extension vsix file as an additional release asset.

Verify that this pipeline actually works by testing the compilation locally where possible and by ensuring the workflow syntax is valid.

---

## PHASE TWELVE — UPDATE PUBLISHING WORKFLOWS

Update the npm publish workflow to include provenance attestation. The job must have id-token write permission and the npm publish command must include the provenance flag. This gives every published package a cryptographic proof of its build origin so users can verify where the package came from.

Add a JSR publish step alongside the npm publish. Research the correct jsr.json configuration for this package and create it accurately.

Add a GitHub Packages publish step under the SohailKhan0525 scope.

Update the Homebrew tap workflow to update the formula in github.com/SohailKhan0525/homebrew-agentx when a new release is created. The formula must install agentx from the npm package with the correct SHA256 hash computed from the published tarball.

Create a cross-platform test workflow that runs on every push and pull request. Build on Ubuntu, Windows, and macOS with Node 18 and Node 20. Verify the agentx command starts correctly on each platform.

For every workflow that references a secret, add a clear validation step at the start that checks whether the secret is configured and fails with a helpful error message explaining what is missing if it is not.

---

## PHASE THIRTEEN — UPDATE ALL DOCUMENTATION

Update every markdown file in the entire repository. Not one markdown file may be left with opencode branding, anomalyco references, opencode.ai URLs, or opencode Discord links.

Rewrite the root README.md completely. Include the AgentX Code logo PNG prominently. Show the TUI startup screen with yellow AGENTX CODE text. Include accurate installation instructions for npm global install, Homebrew, JSR, GitHub Packages, and manual binary download from GitHub Releases. Accurately list all AI providers available after removing OpenCode Zen and OpenCode Go. Describe local model support. Link to agentx.js.org for documentation. Include accurate badges. Include credit to opencode as required by the MIT license while clearly stating AgentX Code is separate. Include a terminal screenshot.

Update all translated README files to match the new English README content with updated translations. Every opencode reference in every translated README must be replaced.

Update AGENTS.md which you created in Phase Four with any additional information discovered during the implementation. Update CONTRIBUTING.md with the correct repository URL and accurate setup instructions. Update SECURITY.md to direct reports to github.com/SohailKhan0525/agentxcode. Update every markdown file in every package folder.

---

## PHASE FOURTEEN — UPDATE THE VS CODE EXTENSION

Read every file in the VS Code extension in the sdks folder carefully. Update the extension manifest with the display name AgentX Code, the description, the AgentX Code PNG logo as the icon, the correct repository URL, and the correct homepage URL. Update all user-facing strings to say AgentX Code. Update all opencode references in the source code. Verify the extension functions correctly with the AgentX Code CLI after all renamings. Package it as a vsix file in the release workflow. It will not be published to the VS Code Marketplace automatically since users install it manually from the GitHub release.

---

## PHASE FIFTEEN — CREATE THE INSTALL SCRIPT

Create a new root-level install shell script for AgentX Code. The script must detect the user's operating system and architecture accurately. It must download the correct binary archive for the detected platform from the GitHub releases page of SohailKhan0525/agentxcode. It must verify the download was successful. It must extract the binary from the archive. It must install it to the appropriate location. It must make the binary executable on Unix systems. It must confirm installation succeeded and tell the user how to run it. It must work correctly on macOS and Linux with clear informative error messages when something goes wrong.

---

## PHASE SIXTEEN — BUILD, FIX, AND VERIFY EVERYTHING

Apply the verification-before-completion skill here. After completing all phases, build the entire project and fix every error until it builds completely successfully. Zero TypeScript compilation errors. Zero missing module errors. Zero broken imports. Zero failed build scripts.

After a successful build verify the following things one by one. The agentx command starts the terminal interface correctly. The TUI shows AGENTX CODE in bright yellow. The provider selection shows the correct list of providers without OpenCode Zen and OpenCode Go. Local model detection runs without errors. The version shows as 3.0.0. The config folder is created with the name .agentxcode. Every remaining provider that worked before still works. All GitHub Actions workflow files have valid YAML syntax and correct logic. The logo PNG is committed to the repository and referenced correctly from the README.

---

## PHASE SEVENTEEN — FINAL COMMIT AND PUSH

Apply the finishing-a-development-branch skill here. Stage all files. Create a single comprehensive commit message that accurately describes the complete transformation. Push to github.com/SohailKhan0525/agentxcode.

Monitor all triggered GitHub Actions workflows and report their status to the user. Fix any failures. After all checks pass, guide the user through pushing the first version tag to trigger the binary release workflow. Confirm all binary assets are attached to the GitHub release correctly.

Present the user with a complete final summary including every change made, everything removed, everything added, the status of all workflows, the repository URL, the first release URL if created, and every manual step the user still needs to take.

---

## IMPORTANT NOTES FOR ANTIGRAVITY CLI

You are running inside Antigravity CLI which has access to web browsing, file operations, terminal commands, the skills system, and MCP servers. Use every tool actively throughout this session.

When you need to understand something about Kilocode or any other library or API, use your web browsing tools to research it. Do not guess about how any API works. Read the official documentation.

When you encounter a TypeScript error or a workflow failure, use systematic-debugging to diagnose it methodically. Do not randomly try fixes. Identify the root cause first.

When starting any complex phase, use writing-plans to plan it before acting. When you think a phase is complete, use verification-before-completion to verify it.

Use subagent-driven-development to parallelize reading and analysis tasks where possible. Use dispatching-parallel-agents to read multiple packages or multiple workflow files simultaneously.

Use find-skills throughout the session. When you encounter a new type of task, check whether there is a relevant skill available that would help you do it better.

Use MCP servers wherever they genuinely help. Use the GitHub MCP server for repository operations. Use any other MCP server where it provides a real capability advantage.

Never stop work and wait for the user except when you genuinely need information only the user can provide, such as secrets confirmation in Phase Three or decisions about ambiguous situations. For everything else, use your research tools to find the answer.
