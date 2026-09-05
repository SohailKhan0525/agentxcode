# AgentX Code Windows PowerShell Installer
# https://agentx.js.org
# Repository: https://github.com/SohailKhan0525/agentxcode

$ErrorActionPreference = "Stop"

$Repo = "SohailKhan0525/agentxcode"
$InstallDir = if ($env:AGENTX_INSTALL_DIR) { $env:AGENTX_INSTALL_DIR } else { "$HOME\.agentx\bin" }

Write-Host @"
`e[96m`e[1m
   /\   /----\  |----\ |\   | ----- \    /     ▄▀▀▀ ▄▀▀█ █▀▀▄ █▀▀▀
  /  \  |    -- |    | | \  |   |    \  /      █    █  █ █  █ █▀▀▀
 /----\ |  ---| |----/ |  \ |   |     \/       ▀▄▄▄ ▀▄▄▀ █▄▄▀ ▀▀▀▀
/      \\-----/ |----/ |   \|   |    /  \
`e[0m
`e[1mInstalling AgentX Code — The autonomous AI coding agent for your terminal...`e[0m
"@

$Arch = if ([System.Environment]::Is64BitOperatingSystem) { "x64" } else { "arm64" }
$ArchiveName = "agentx-windows-$Arch.zip"

$Tag = if ($env:AGENTX_VERSION) { $env:AGENTX_VERSION } else { "v3.0.0" }
$DownloadUrl = "https://github.com/$Repo/releases/download/$Tag/$ArchiveName"

$TempZip = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), $ArchiveName)
$TempExtract = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "agentx-extract")

Write-Host "Downloading $ArchiveName ($Tag)..." -ForegroundColor Cyan
Invoke-WebRequest -Uri $DownloadUrl -OutFile $TempZip -UseBasicParsing

if (Test-Path $TempExtract) { Remove-Item -Path $TempExtract -Recurse -Force }
Expand-Archive -Path $TempZip -DestinationPath $TempExtract -Force

if (-not (Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
}

Copy-Item -Path "$TempExtract\*" -Destination $InstallDir -Recurse -Force
Remove-Item -Path $TempZip -Force -ErrorAction SilentlyContinue
Remove-Item -Path $TempExtract -Recurse -Force -ErrorAction SilentlyContinue

# Add to User PATH if not present
$UserPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($UserPath -notlike "*$InstallDir*") {
    [Environment]::SetEnvironmentVariable("PATH", "$InstallDir;$UserPath", "User")
    Write-Host "Added $InstallDir to user PATH." -ForegroundColor Green
}

Write-Host @"
`e[92m`e[1mAgentX Code installed successfully!`e[0m

To get started, open a new terminal or run:
  `e[96m$InstallDir\agentx.exe`e[0m

Run AgentX Code:
  `e[96magentx`e[0m                Start interactive terminal TUI
  `e[96magentx local --scan`e[0m   Detect local hardware & AI models (Ollama, LM Studio)
  `e[96magentx --help`e[0m         Show full command help
"@