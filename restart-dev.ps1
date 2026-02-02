# Restart Development Server Script
# This script stops the current dev server and starts a fresh one

Write-Host "🔄 Restarting Development Server..." -ForegroundColor Cyan
Write-Host ""

# Stop all Node processes
Write-Host "⏹️  Stopping current dev server..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Clear terminal
Clear-Host

Write-Host "✅ Previous server stopped" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Starting fresh dev server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Start dev server
npm run dev
