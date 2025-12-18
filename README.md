# CI Demo 2

Demo application for testing CI/CD pipeline with automated deployment.

## Features

- **Port**: 3002
- **Modern UI**: Gradient background with glassmorphism design
- **Auto Deploy**: Triggered via CI/CD daemon
- **PM2 Managed**: Zero-downtime restarts

## Endpoints

- `GET /` - Main dashboard
- `GET /health` - Health check endpoint
- `GET /api/info` - Server information (JSON)

## Deployment

This app is automatically deployed when you push to GitHub:

```bash
# On server
ci project add
# Follow prompts...
# Project ID: ci-demo2
# Owner: Vcoch27
# Repo: ci-demo2
# Branch: main
# Port: 3002

sudo ci project init ci-demo2
ci trigger ci-demo2
```

## Manual Run

```bash
npm install
npm start
# Visit http://localhost:3002
```

## Architecture

```
GitHub Push
    ↓
Webhook Listener
    ↓
CI Daemon Queue
    ↓
job_wrapper (executes deploy.sh)
    ↓
git pull → npm install → pm2 restart
    ↓
Live on http://18.215.157.172:3002
```

## Tech Stack

- Node.js (vanilla HTTP server)
- PM2 (process manager)
- Pure HTML/CSS/JS (no frameworks)
