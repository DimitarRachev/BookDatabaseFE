#!/bin/bash

# Quick Start Script for Book Database Application
# This script provides a simple way to deploy the application

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Book Database Application - Quick Start${NC}"
echo "=============================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Docker Swarm is active
if ! docker info | grep -q "Swarm: active"; then
    echo "Error: Docker Swarm is not active. Please initialize Docker Swarm first."
    echo "Run: docker swarm init"
    exit 1
fi

echo -e "${GREEN}✓ Docker Swarm is active${NC}"
echo ""

# Set default repository URLs if not provided
if [ -z "$BACKEND_REPO" ]; then
    echo "Please set your backend repository URL:"
    echo "export BACKEND_REPO=\"https://github.com/your-username/BookDatabase.git\""
    echo ""
    read -p "Enter backend repository URL: " BACKEND_REPO
    export BACKEND_REPO
fi

if [ -z "$FRONTEND_REPO" ]; then
    echo "Please set your frontend repository URL:"
    echo "export FRONTEND_REPO=\"https://github.com/your-username/BookDatabaseFE.git\""
    echo ""
    read -p "Enter frontend repository URL: " FRONTEND_REPO
    export FRONTEND_REPO
fi

echo ""
echo -e "${BLUE}Deploying application with:${NC}"
echo "Backend: $BACKEND_REPO"
echo "Frontend: $FRONTEND_REPO"
echo ""

# Make scripts executable
chmod +x deploy-swarm.sh cleanup.sh

# Deploy the application
echo -e "${BLUE}Starting deployment...${NC}"
./deploy-swarm.sh deploy

echo ""
echo -e "${GREEN}Deployment completed!${NC}"
echo ""
echo "Application URLs:"
echo "- Frontend: http://localhost"
echo "- Backend API: http://localhost/api"
echo "- Health Check: http://localhost/health"
echo ""
echo "Useful commands:"
echo "- Check status: ./deploy-swarm.sh status"
echo "- View logs: ./deploy-swarm.sh logs"
echo "- Remove stack: ./deploy-swarm.sh remove"
echo "- Clean up: ./cleanup.sh" 