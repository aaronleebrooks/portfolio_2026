# Sync a Godot web export into the portfolio and push to GitHub Pages.
# Usage (from site/):
#   npm run update:deduction
#   npm run update:deduction -- -SkipPush
#   npm run update:deduction -- -Source "D:\other\build\web"
#   npm run update:deduction-writer
#
# -Name is the folder under public/, and so the path the build is served at.
# It exists because there is more than one build of the same game: the demo
# an employer sees, and the writer preview build, which carries a debug HUD
# and must never land in the demo's slot.

[CmdletBinding()]
param(
  [string]$Source = "C:\Users\pleas\projects\detective-game\build\web",
  [string]$Name = "deduction_demo",
  [switch]$SkipPush,
  [string]$Message = "Update Deduction demo web build"
)

$ErrorActionPreference = "Stop"

if ($Name -notmatch '^[a-z0-9_-]+$') {
  throw "-Name is a URL path segment: lowercase letters, digits, _ and - only. Got '$Name'."
}

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$Dest = Join-Path $RepoRoot (Join-Path "public" $Name)
$TrackedPath = "public/$Name"

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

# $file, not $name: PowerShell variables are case-insensitive, so a loop over
# $name silently overwrites the -Name parameter with the last filename.
foreach ($file in $Required) {
  $path = Join-Path $Source $file
  if (-not (Test-Path -LiteralPath $path)) {
    throw "Missing required web export file: $path"
  }
}

New-Item -ItemType Directory -Force -Path $Dest | Out-Null

Write-Host "Copying web build from:"
Write-Host "  $Source"
Write-Host "to:"
Write-Host "  $Dest"

foreach ($file in $Required) {
  Copy-Item -LiteralPath (Join-Path $Source $file) -Destination (Join-Path $Dest $file) -Force
}

Push-Location $RepoRoot
try {
  git add -- $TrackedPath

  $staged = @(git diff --cached --name-only -- $TrackedPath)
  if ($staged.Count -eq 0) {
    Write-Host "No changes in $TrackedPath - nothing to commit."
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

  Write-Host "Pushed. GitHub Pages will redeploy from main once CI is green."
  Write-Host "Live URL: https://a-a-ron.party/$Name/"
}
finally {
  Pop-Location
}
