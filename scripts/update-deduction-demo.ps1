# Sync the latest Godot web export into the portfolio and push to GitHub Pages.
# Usage (from site/):
#   npm run update:deduction
#   npm run update:deduction -- -SkipPush
#   npm run update:deduction -- -Source "D:\other\build\web"

[CmdletBinding()]
param(
  [string]$Source = "C:\Users\pleas\projects\detective-game\build\web",
  [switch]$SkipPush,
  [string]$Message = "Update Deduction demo web build"
)

$ErrorActionPreference = "Stop"

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$Dest = Join-Path $RepoRoot "public\deduction_demo"

$Required = @(
  "index.html",
  "index.js",
  "index.wasm",
  "index.pck",
  "index.audio.worklet.js",
  "index.audio.position.worklet.js",
  "index.png",
  "index.icon.png",
  "index.apple-touch-icon.png"
)

if (-not (Test-Path -LiteralPath $Source)) {
  throw "Godot build folder not found: $Source"
}

foreach ($name in $Required) {
  $path = Join-Path $Source $name
  if (-not (Test-Path -LiteralPath $path)) {
    throw "Missing required web export file: $path"
  }
}

New-Item -ItemType Directory -Force -Path $Dest | Out-Null

Write-Host "Copying web build from:"
Write-Host "  $Source"
Write-Host "to:"
Write-Host "  $Dest"

foreach ($name in $Required) {
  Copy-Item -LiteralPath (Join-Path $Source $name) -Destination (Join-Path $Dest $name) -Force
}

Push-Location $RepoRoot
try {
  git add -- "public/deduction_demo"

  $staged = @(git diff --cached --name-only -- "public/deduction_demo")
  if ($staged.Count -eq 0) {
    Write-Host "No changes in public/deduction_demo - nothing to commit."
    exit 0
  }

  Write-Host "Staged:"
  $staged | ForEach-Object { Write-Host "  $_" }

  git commit -m "$Message"
  if ($LASTEXITCODE -ne 0) {
    throw "git commit failed (exit $LASTEXITCODE)"
  }

  if ($SkipPush) {
    Write-Host "Committed locally. Skipped push (-SkipPush)."
    exit 0
  }

  git push
  if ($LASTEXITCODE -ne 0) {
    throw "git push failed (exit $LASTEXITCODE)"
  }

  Write-Host "Pushed. GitHub Pages will redeploy from main."
  Write-Host "Live URL: https://a-a-ron.party/deduction_demo/"
}
finally {
  Pop-Location
}
