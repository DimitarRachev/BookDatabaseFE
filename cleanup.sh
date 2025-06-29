#!/bin/bash

# Cleanup Script for Docker Swarm Deployment
# This script removes temporary files and Docker resources after deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to clean Docker system
clean_docker_system() {
    print_status "Cleaning Docker system..."
    
    # Remove unused containers
    docker container prune -f
    print_success "Removed unused containers"
    
    # Remove unused images
    docker image prune -a -f
    print_success "Removed unused images"
    
    # Remove unused networks
    docker network prune -f
    print_success "Removed unused networks"
    
    # Remove unused volumes
    docker volume prune -f
    print_success "Removed unused volumes"
    
    # Remove build cache
    docker builder prune -a -f
    print_success "Removed build cache"
}

# Function to clean temporary files
clean_temp_files() {
    print_status "Cleaning temporary files..."
    
    # Remove temporary directories
    if [ -d "/tmp/book-database" ]; then
        rm -rf /tmp/book-database
        print_success "Removed /tmp/book-database"
    fi
    
    # Remove temporary Docker files
    if [ -d ".docker" ]; then
        rm -rf .docker
        print_success "Removed .docker directory"
    fi
    
    # Remove temporary build files
    find . -name "*.tmp" -delete 2>/dev/null || true
    find . -name "*.log" -delete 2>/dev/null || true
    print_success "Removed temporary files"
}

# Function to clean node_modules and build artifacts
clean_build_artifacts() {
    print_status "Cleaning build artifacts..."
    
    # Remove node_modules directories
    find . -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
    print_success "Removed node_modules directories"
    
    # Remove build directories
    find . -name "build" -type d -exec rm -rf {} + 2>/dev/null || true
    find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true
    print_success "Removed build directories"
    
    # Remove target directories (Maven)
    find . -name "target" -type d -exec rm -rf {} + 2>/dev/null || true
    print_success "Removed target directories"
}

# Function to clean Git repositories
clean_git_repos() {
    print_status "Cleaning Git repositories..."
    
    # Remove cloned repositories
    if [ -d "BookDatabase" ]; then
        rm -rf BookDatabase
        print_success "Removed BookDatabase repository"
    fi
    
    if [ -d "BookDatabaseFE" ]; then
        rm -rf BookDatabaseFE
        print_success "Removed BookDatabaseFE repository"
    fi
    
    # Remove any other cloned repos
    find . -name ".git" -type d -exec rm -rf {} + 2>/dev/null || true
    print_success "Removed Git repositories"
}

# Function to clean Docker Compose files (keep only swarm version)
clean_compose_files() {
    print_status "Cleaning Docker Compose files..."
    
    # Keep only the swarm version
    if [ -f "docker-compose.yml" ]; then
        mv docker-compose.yml docker-compose.yml.backup
        print_warning "Backed up docker-compose.yml to docker-compose.yml.backup"
    fi
    
    if [ -f "docker-compose.dev.yml" ]; then
        rm docker-compose.dev.yml
        print_success "Removed docker-compose.dev.yml"
    fi
    
    if [ -f "docker-compose.test.yml" ]; then
        rm docker-compose.test.yml
        print_success "Removed docker-compose.test.yml"
    fi
    
    if [ -f "docker-compose.backend.yml" ]; then
        rm docker-compose.backend.yml
        print_success "Removed docker-compose.backend.yml"
    fi
    
    if [ -f "docker-compose.override.yml" ]; then
        rm docker-compose.override.yml
        print_success "Removed docker-compose.override.yml"
    fi
}

# Function to clean Dockerfiles (keep only swarm versions)
clean_dockerfiles() {
    print_status "Cleaning Dockerfiles..."
    
    # Keep only the swarm versions
    if [ -f "Dockerfile" ]; then
        mv Dockerfile Dockerfile.backup
        print_warning "Backed up Dockerfile to Dockerfile.backup"
    fi
    
    if [ -f "Dockerfile.dev" ]; then
        rm Dockerfile.dev
        print_success "Removed Dockerfile.dev"
    fi
}

# Function to clean nginx configurations (keep only swarm version)
clean_nginx_configs() {
    print_status "Cleaning nginx configurations..."
    
    # Keep only the swarm version
    if [ -f "nginx.conf" ]; then
        mv nginx.conf nginx.conf.backup
        print_warning "Backed up nginx.conf to nginx.conf.backup"
    fi
    
    if [ -f "nginx-production.conf" ]; then
        rm nginx-production.conf
        print_success "Removed nginx-production.conf"
    fi
}

# Function to clean deployment scripts (keep only swarm version)
clean_deployment_scripts() {
    print_status "Cleaning deployment scripts..."
    
    # Keep only the swarm version
    if [ -f "deploy.sh" ]; then
        mv deploy.sh deploy.sh.backup
        print_warning "Backed up deploy.sh to deploy.sh.backup"
    fi
}

# Function to show disk usage before and after cleanup
show_disk_usage() {
    print_status "Disk usage before cleanup:"
    df -h .
    
    print_status "Starting cleanup process..."
    
    clean_docker_system
    clean_temp_files
    clean_build_artifacts
    clean_git_repos
    clean_compose_files
    clean_dockerfiles
    clean_nginx_configs
    clean_deployment_scripts
    
    print_status "Disk usage after cleanup:"
    df -h .
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  all        - Clean everything (default)"
    echo "  docker     - Clean Docker system only"
    echo "  temp       - Clean temporary files only"
    echo "  build      - Clean build artifacts only"
    echo "  git        - Clean Git repositories only"
    echo "  compose    - Clean Docker Compose files only"
    echo "  dockerfile - Clean Dockerfiles only"
    echo "  nginx      - Clean nginx configurations only"
    echo "  scripts    - Clean deployment scripts only"
    echo "  help       - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 all"
    echo "  $0 docker"
    echo "  $0 temp"
}

# Main script logic
case "${1:-all}" in
    all)
        show_disk_usage
        print_success "Complete cleanup finished!"
        ;;
    docker)
        clean_docker_system
        print_success "Docker system cleanup finished!"
        ;;
    temp)
        clean_temp_files
        print_success "Temporary files cleanup finished!"
        ;;
    build)
        clean_build_artifacts
        print_success "Build artifacts cleanup finished!"
        ;;
    git)
        clean_git_repos
        print_success "Git repositories cleanup finished!"
        ;;
    compose)
        clean_compose_files
        print_success "Docker Compose files cleanup finished!"
        ;;
    dockerfile)
        clean_dockerfiles
        print_success "Dockerfiles cleanup finished!"
        ;;
    nginx)
        clean_nginx_configs
        print_success "Nginx configurations cleanup finished!"
        ;;
    scripts)
        clean_deployment_scripts
        print_success "Deployment scripts cleanup finished!"
        ;;
    help|--help|-h)
        show_usage
        ;;
    *)
        print_error "Unknown command: $1"
        show_usage
        exit 1
        ;;
esac 