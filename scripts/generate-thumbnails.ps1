<#
  Generates card thumbnails for challenges that don't have one yet.

  It opens each challenge in headless Microsoft Edge and saves a screenshot to
  public/assets/images/thumbnails/<slug>.png

  Usage (start the dev server first with `npm run dev`):
    powershell -ExecutionPolicy Bypass -File scripts/generate-thumbnails.ps1
    powershell -ExecutionPolicy Bypass -File scripts/generate-thumbnails.ps1 -Force   # redo all
    powershell -ExecutionPolicy Bypass -File scripts/generate-thumbnails.ps1 -Slug tip-calculator-app -Force
#>

param(
  [string]$BaseUrl = "http://localhost:5173",
  [string]$Slug = "",
  [switch]$Force
)

$edgePaths = @(
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)
$edge = $edgePaths | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $edge) {
  Write-Host "Microsoft Edge was not found. Install it or edit `$edgePaths in this script." -ForegroundColor Red
  exit 1
}

$root = Split-Path -Parent $PSScriptRoot
$solutionsDir = Join-Path $root "public\solutions"
$thumbnailsDir = Join-Path $root "public\assets\images\thumbnails"
New-Item -ItemType Directory -Force -Path $thumbnailsDir | Out-Null

$folders = Get-ChildItem -Path $solutionsDir -Directory
if ($Slug) { $folders = $folders | Where-Object { $_.Name -eq $Slug } }

foreach ($folder in $folders) {
  $name = $folder.Name
  $output = Join-Path $thumbnailsDir "$name.png"

  if ((Test-Path $output) -and -not $Force) {
    Write-Host "Skipping $name (thumbnail already exists)" -ForegroundColor DarkGray
    continue
  }

  Write-Host "Capturing $name ..." -ForegroundColor Cyan

  # A throw-away profile folder lets this run even while Edge is already open.
  $profileDir = Join-Path $env:TEMP "thumbnail-profile-$name"

  & $edge `
    --headless=new `
    --disable-gpu `
    --hide-scrollbars `
    --force-device-scale-factor=1 `
    --window-size=1280,800 `
    --virtual-time-budget=4000 `
    --user-data-dir="$profileDir" `
    --screenshot="$output" `
    "$BaseUrl/solutions/$name/" | Out-Null

  Remove-Item -Path $profileDir -Recurse -Force -ErrorAction SilentlyContinue

  if (Test-Path $output) {
    Write-Host "  Saved $output" -ForegroundColor Green
  } else {
    Write-Host "  Failed to capture $name" -ForegroundColor Red
  }
}
