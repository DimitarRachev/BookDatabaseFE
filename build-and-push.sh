#!/bin/bash

# Configuration
DOCKER_USERNAME="your-dockerhub-username"
VERSION="latest"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Docker image build and push process...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Check if user is logged in to Docker Hub
if ! docker info | grep -q "Username"; then
    echo -e "${YELLOW}⚠️  You are not logged in to Docker Hub. Please run: docker login${NC}"
    exit 1
fi

# Build and push Frontend image
echo -e "${GREEN}📦 Building Frontend image...${NC}"
docker build -f Dockerfile.frontend -t ${DOCKER_USERNAME}/book-database-frontend:${VERSION} .
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend image built successfully${NC}"
    echo -e "${GREEN}📤 Pushing Frontend image to Docker Hub...${NC}"
    docker push ${DOCKER_USERNAME}/book-database-frontend:${VERSION}
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend image pushed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to push Frontend image${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Failed to build Frontend image${NC}"
    exit 1
fi

# Build and push Nginx image
echo -e "${GREEN}📦 Building Nginx image...${NC}"
docker build -f Dockerfile.nginx -t ${DOCKER_USERNAME}/book-database-nginx:${VERSION} .
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx image built successfully${NC}"
    echo -e "${GREEN}📤 Pushing Nginx image to Docker Hub...${NC}"
    docker push ${DOCKER_USERNAME}/book-database-nginx:${VERSION}
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Nginx image pushed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to push Nginx image${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Failed to build Nginx image${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 All images built and pushed successfully!${NC}"
echo -e "${YELLOW}📝 Note: Backend image should be built from your Spring Boot project${NC}"
echo -e "${YELLOW}📝 Update your docker-compose files to use: ${DOCKER_USERNAME}/book-database-frontend:${VERSION}${NC}"
echo -e "${YELLOW}📝 Update your docker-compose files to use: ${DOCKER_USERNAME}/book-database-nginx:${VERSION}${NC}" 