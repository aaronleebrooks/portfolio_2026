# Sync the latest Godot web export into the portfolio and push to GitHub Pages.
# Usage (from site/):
#   npm run update:picross
#   npm run update:picross -- -SkipPush
#   npm run update:picross -- -Source "D:\other\build"

[CmdletBinding()]
param(
  [string]$Source = "C:\Users\pleas\projects\picross_dungeon\build",
  [switch]$SkipPush,
  [string]$Message = "Update Picross Quest web build"
)

$ErrorActionPreference = "Stop"

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$Dest = Join-Path $RepoRoot "public\games\picross-quest"

$Required = @(
  "picross_quest.html",
  "picross_quest.js",
  "picross_quest.wasm",
  "picross_quest.pck",
  "picross_quest.audio.worklet.js",
  "picross_quest.audio.position.worklet.js",
  "picross_quest.png",
  "picross_quest.icon.png",
  "picross_quest.apple-touch-icon.png"
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

Copy-Item -LiteralPath (Join-Path $Source "picross_quest.html") -Destination (Join-Path $Dest "index.html") -Force

foreach ($name in $Required) {
  if ($name -eq "picross_quest.html") { continue }
  Copy-Item -LiteralPath (Join-Path $Source $name) -Destination (Join-Path $Dest $name) -Force
}

Push-Location $RepoRoot
try {
  git add -- "public/games/picross-quest"

  $staged = @(git diff --cached --name-only -- "public/games/picross-quest")
  if ($staged.Count -eq 0) {
    Write-Host "No changes in public/games/picross-quest - nothing to commit."
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
  Write-Host "Live URL: https://a-a-ron.party/games/picross-quest/"
}
finally {
  Pop-Location
}
