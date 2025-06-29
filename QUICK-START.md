# Quick Start Guide

## Prerequisites

- Docker Engine with Swarm mode initialized
- Git access to your backend and frontend repositories

## One-Command Deployment

```bash
# Make scripts executable and run quick start
chmod +x quick-start.sh && ./quick-start.sh
```

The script will:
1. Check if Docker Swarm is active
2. Prompt for your repository URLs
3. Deploy the entire application stack
4. Show you the access URLs

## Manual Deployment

### 1. Set Repository URLs

```bash
export BACKEND_REPO="https://github.com/your-username/BookDatabase.git"
export FRONTEND_REPO="https://github.com/your-username/BookDatabaseFE.git"
```

### 2. Deploy

```bash
chmod +x deploy-swarm.sh
./deploy-swarm.sh deploy
```

### 3. Access Application

- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **Health Check**: http://localhost/health

## Useful Commands

```bash
# Check service status
./deploy-swarm.sh status

# View logs
./deploy-swarm.sh logs

# Remove stack
./deploy-swarm.sh remove

# Clean up resources
./cleanup.sh
```

## Troubleshooting

If you encounter issues:

1. Check if Docker Swarm is active: `docker info | grep Swarm`
2. Verify repository access: `git ls-remote $BACKEND_REPO`
3. Check service logs: `./deploy-swarm.sh logs`
4. Review the full documentation in `README-SWARM.md` 