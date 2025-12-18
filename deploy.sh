#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

echo "[deploy.sh] CI Demo 2 Deployment Starting..."

# Pull latest code from GitHub
echo "[deploy.sh] Pulling latest code..."
git fetch origin
git reset --hard origin/main

# Install dependencies
echo "[deploy.sh] Installing dependencies..."
[ -f package-lock.json ] || npm install
npm ci || npm install

# Restart PM2
echo "[deploy.sh] Restarting PM2..."
pm2 restart ci-demo2 || pm2 start src/server.js --name ci-demo2 --watch=false
pm2 save

echo "[deploy.sh] ✓ Deploy completed successfully!"
echo "[deploy.sh] Server should be running on port 3002"
