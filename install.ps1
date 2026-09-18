# AgentX Code Windows Installer
# Usage: irm https://raw.githubusercontent.com/SohailKhan0525/agentxcode/main/install.ps1 | iex

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "         AgentX Code Installer          " -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$installDir = "$HOME\.agentxcode\bin"
if (!(Test-Path $installDir)) {
    New-Item -ItemType Directory -Force -Path $installDir | Out-Null
}

$arch = if ([System.Environment]::Is64BitOperatingSystem) {
    if ([System.Runtime.InteropServices.RuntimeInformation]::ProcessArchitecture -eq [System.Runtime.InteropServices.Architecture]::Arm64) {
        "arm64"
    } else {
        "x64"
    }
} else {
    Write-Error "AgentX Code requires a 64-bit operating system."
    exit 1
}

$version = "3.0.1"
try {
    $npmInfo = Invoke-RestMethod -Uri "https://registry.npmjs.org/@agent-qofeno/agentx-cli/latest" -TimeoutSec 5
    if ($npmInfo.version) {
        $version = $npmInfo.version
    }
} catch {
    # fallback to 3.0.1
}

$zipName = "agentx-windows-$arch.zip"
$downloadUrl = "https://github.com/SohailKhan0525/agentxcode/releases/download/v$version/$zipName"
$zipPath = "$env:TEMP\$zipName"

Write-Host "Downloading AgentX Code v$version ($arch)..." -ForegroundColor Cyan
Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath -UseBasicParsing

Write-Host "Extracting to $installDir..." -ForegroundColor Cyan
Expand-Archive -Path $zipPath -DestinationPath $installDir -Force
Remove-Item -Path $zipPath -Force

# Update PATH if needed
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$installDir*") {
    Write-Host "Adding $installDir to User PATH..." -ForegroundColor Cyan
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$installDir", "User")
    $env:PATH = "$env:PATH;$installDir"
}

Write-Host ""
Write-Host "✓ AgentX Code v$version successfully installed to $installDir\agentx.exe" -ForegroundColor Green
Write-Host "Run 'agentx' in any new terminal to start!" -ForegroundColor Yellow
Write-Host ""
