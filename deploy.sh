#!/bin/bash

# Book Database Application Deployment Script
# This script builds and deploys the frontend and backend separately

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_COMPOSE_FILE="docker-compose.yml"
BACKEND_COMPOSE_FILE="docker-compose.backend.yml"
PROJECT_NAME="book-database"
FRONTEND_DIR="."
BACKEND_DIR="../BookDatabase"

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

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_success "Docker is running"
}

# Function to check if Docker Compose is available
check_docker_compose() {
    if ! docker compose version > /dev/null 2>&1; then
        print_error "Docker Compose is not available. Please install Docker Compose and try again."
        exit 1
    fi
    print_success "Docker Compose is available"
}

# Function to deploy backend and database
deploy_backend() {
    print_status "Deploying backend and database..."
    
    # Stop existing backend containers
    print_status "Stopping existing backend containers..."
    docker compose -f $BACKEND_COMPOSE_FILE down --remove-orphans
    
    # Build and start backend services
    print_status "Building and starting backend services..."
    docker compose -f $BACKEND_COMPOSE_FILE up --build -d
    
    # Wait for services to be healthy
    print_status "Waiting for backend services to be healthy..."
    sleep 30
    
    # Check backend service health
    check_backend_health
    
    print_success "Backend deployment completed!"
    print_status "Backend API is available at: http://localhost:8080"
    print_status "Database is available at: localhost:3306"
}

# Function to deploy frontend only
deploy_frontend() {
    print_status "Deploying frontend..."
    
    # Stop existing frontend containers
    print_status "Stopping existing frontend containers..."
    docker compose -f $FRONTEND_COMPOSE_FILE down --remove-orphans
    
    # Build and start frontend service
    print_status "Building and starting frontend service..."
    docker compose -f $FRONTEND_COMPOSE_FILE up --build -d
    
    # Wait for frontend to be healthy
    print_status "Waiting for frontend to be healthy..."
    sleep 15
    
    # Check frontend health
    check_frontend_health
    
    print_success "Frontend deployment completed!"
    print_status "Frontend is available at: http://localhost:3000"
}

# Function to deploy full stack (backend + frontend)
deploy_full_stack() {
    print_status "Deploying full stack..."
    
    # Deploy backend first
    deploy_backend
    
    # Deploy frontend
    deploy_frontend
    
    print_success "Full stack deployment completed!"
    print_status "Frontend is available at: http://localhost:3000"
    print_status "Backend API is available at: http://localhost:8080"
    print_status "Database is available at: localhost:3306"
}

# Function to check backend health
check_backend_health() {
    print_status "Checking backend service health..."
    
    # Check database
    if docker compose -f $BACKEND_COMPOSE_FILE exec -T database mysqladmin ping -h localhost -u root -prootpassword > /dev/null 2>&1; then
        print_success "Database is healthy"
    else
        print_warning "Database health check failed"
    fi
    
    # Check backend
    if curl -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
        print_success "Backend is healthy"
    else
        print_warning "Backend health check failed"
    fi
}

# Function to check frontend health
check_frontend_health() {
    print_status "Checking frontend health..."
    
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_success "Frontend is healthy"
    else
        print_warning "Frontend health check failed"
    fi
}

# Function to show logs
show_logs() {
    local service=${1:-all}
    
    case $service in
        "frontend")
            print_status "Showing frontend logs..."
            docker compose -f $FRONTEND_COMPOSE_FILE logs -f
            ;;
        "backend")
            print_status "Showing backend logs..."
            docker compose -f $BACKEND_COMPOSE_FILE logs -f
            ;;
        "database")
            print_status "Showing database logs..."
            docker compose -f $BACKEND_COMPOSE_FILE logs -f database
            ;;
        *)
            print_status "Showing all logs..."
            echo "=== FRONTEND LOGS ==="
            docker compose -f $FRONTEND_COMPOSE_FILE logs
            echo ""
            echo "=== BACKEND LOGS ==="
            docker compose -f $BACKEND_COMPOSE_FILE logs
            ;;
    esac
}

# Function to stop all services
stop_services() {
    print_status "Stopping all services..."
    docker compose -f $FRONTEND_COMPOSE_FILE down --remove-orphans
    docker compose -f $BACKEND_COMPOSE_FILE down --remove-orphans
    print_success "All services stopped"
}

# Function to clean up everything
cleanup() {
    print_status "Cleaning up all containers, volumes, and images..."
    docker compose -f $FRONTEND_COMPOSE_FILE down --remove-orphans -v
    docker compose -f $BACKEND_COMPOSE_FILE down --remove-orphans -v
    docker system prune -f
    print_success "Cleanup completed"
}

# Function to show help
show_help() {
    echo "Book Database Application Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  full        Deploy full stack (backend + frontend)"
    echo "  backend     Deploy backend and database only"
    echo "  frontend    Deploy frontend only"
    echo "  logs        Show logs (use: logs [frontend|backend|database])"
    echo "  stop        Stop all services"
    echo "  cleanup     Clean up all containers, volumes, and images"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 full           # Deploy complete application"
    echo "  $0 backend        # Deploy only backend and database"
    echo "  $0 frontend       # Deploy only frontend"
    echo "  $0 logs backend   # View backend logs"
    echo "  $0 logs frontend  # View frontend logs"
    echo "  $0 logs database  # View database logs"
}

# Main script logic
main() {
    # Check prerequisites
    check_docker
    check_docker_compose
    
    # Parse command line arguments
    case "${1:-full}" in
        "full")
            deploy_full_stack
            ;;
        "backend")
            deploy_backend
            ;;
        "frontend")
            deploy_frontend
            ;;
        "logs")
            show_logs "$2"
            ;;
        "stop")
            stop_services
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@" 