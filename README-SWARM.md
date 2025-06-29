# Book Database Application - Docker Swarm Deployment

This repository contains the Docker Swarm configuration for deploying the Book Database application, which consists of a Spring Boot backend and a React frontend, both hosted on GitHub.

## Overview

The application is deployed as a Docker Swarm stack with the following services:

- **Database**: MariaDB 10.11 for data storage
- **Backend**: Spring Boot application (cloned from GitHub)
- **Frontend**: React application (cloned from GitHub)
- **Nginx**: Reverse proxy and load balancer

## Prerequisites

- Docker Engine with Swarm mode already initialized
- At least 2GB of available RAM
- At least 10GB of available disk space
- Git access to the backend and frontend repositories

## Quick Start

### 1. Configure Repository URLs

Set the environment variables for your GitHub repositories:

```bash
export BACKEND_REPO="https://github.com/DimitarRachev/BookDatabase"
export FRONTEND_REPO="https://github.com/DimitarRachev/BookDatabaseFE"
export BACKEND_BRANCH="master"
export FRONTEND_BRANCH="master"
```

### 2. Deploy the Application

```bash
# Make scripts executable
chmod +x deploy-swarm.sh cleanup.sh

# Deploy the stack
./deploy-swarm.sh deploy
```

### 3. Access the Application

- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **Health Check**: http://localhost/health

## Configuration Files

### Docker Compose Swarm Configuration

- `docker-compose.swarm.yml` - Main stack configuration
- `Dockerfile.backend` - Backend container build
- `Dockerfile.frontend` - Frontend container build
- `nginx.swarm.conf` - Nginx reverse proxy configuration

### Deployment Scripts

- `deploy-swarm.sh` - Main deployment script
- `cleanup.sh` - Cleanup script for removing temporary files

## Service Architecture

### Database Service
- **Image**: MariaDB 10.11
- **Replicas**: 1 (manager node only)
- **Storage**: Persistent volume
- **Health Check**: MySQL ping
- **Secrets**: Database credentials

### Backend Service
- **Build**: Multi-stage Maven build
- **Replicas**: 2 (worker nodes)
- **Health Check**: Spring Boot Actuator
- **Dependencies**: Database service
- **Resources**: 1GB memory, 0.5 CPU

### Frontend Service
- **Build**: Multi-stage Node.js build
- **Replicas**: 3 (worker nodes)
- **Health Check**: HTTP endpoint
- **Dependencies**: Backend service
- **Resources**: 512MB memory, 0.25 CPU

### Nginx Service
- **Image**: Nginx Alpine
- **Replicas**: 2 (manager nodes)
- **Ports**: 80, 443
- **Health Check**: HTTP endpoint
- **Load Balancing**: Round-robin

## Deployment Commands

### Deploy Stack
```bash
./deploy-swarm.sh deploy
```

### Check Status
```bash
./deploy-swarm.sh status
```

### View Logs
```bash
./deploy-swarm.sh logs
```

### Remove Stack
```bash
./deploy-swarm.sh remove
```

### Update Stack
```bash
./deploy-swarm.sh update
```

### Scale Services
```bash
./deploy-swarm.sh scale
```

## Scaling

The application supports horizontal scaling:

```bash
# Scale backend to 5 replicas
docker service scale book-database_backend=5

# Scale frontend to 10 replicas
docker service scale book-database_frontend=10

# Scale nginx to 3 replicas
docker service scale book-database_nginx=3
```

## Monitoring

### Service Status
```bash
# List all services
docker service ls

# Inspect specific service
docker service inspect book-database_backend

# View service logs
docker service logs book-database_backend
```

### Resource Usage
```bash
# View node resources
docker node ls
docker node inspect <node-id>

# View service resource usage
docker stats
```

## Security

### Secrets Management
The application uses Docker secrets for sensitive data:

- `db_root_password` - Database root password
- `db_name` - Database name
- `db_user` - Database user
- `db_password` - Database password

### Network Security
- Overlay network for inter-service communication
- Nginx reverse proxy with rate limiting
- Security headers configured

## Troubleshooting

### Common Issues

1. **Service fails to start**
   ```bash
   # Check service logs
   docker service logs book-database_backend
   
   # Check service status
   docker service ps book-database_backend
   ```

2. **Database connection issues**
   ```bash
   # Check database service
   docker service logs book-database_database
   
   # Test database connectivity
   docker exec -it $(docker ps -q -f name=book-database_database) mysql -u bookuser -p
   ```

3. **Build failures**
   ```bash
   # Check build logs
   docker service logs book-database_backend --since 10m
   
   # Verify repository access
   git ls-remote $BACKEND_REPO
   ```

### Health Checks

All services include health checks:

- **Database**: MySQL ping every 30s
- **Backend**: HTTP health endpoint every 30s
- **Frontend**: HTTP endpoint every 30s
- **Nginx**: HTTP health endpoint every 30s

## Cleanup

### Remove Application
```bash
# Remove the entire stack
./deploy-swarm.sh remove

# Clean up Docker resources
./cleanup.sh docker
```

### Complete Cleanup
```bash
# Remove everything including temporary files
./cleanup.sh all
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BACKEND_REPO` | `https://github.com/your-username/BookDatabase.git` | Backend repository URL |
| `FRONTEND_REPO` | `https://github.com/your-username/BookDatabaseFE.git` | Frontend repository URL |
| `BACKEND_BRANCH` | `main` | Backend branch to deploy |
| `FRONTEND_BRANCH` | `main` | Frontend branch to deploy |

## Production Considerations

### SSL/TLS
To enable HTTPS:

1. Add SSL certificates to `./ssl/` directory
2. Uncomment HTTPS configuration in `nginx.swarm.conf`
3. Update nginx service to mount SSL certificates

### Backup Strategy
```bash
# Backup database
docker exec -it $(docker ps -q -f name=book-database_database) \
  mysqldump -u root -p book_database > backup.sql

# Backup volumes
docker run --rm -v book-database_db_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/db_backup.tar.gz -C /data .
```

### High Availability
- Deploy across multiple nodes
- Use external database for production
- Configure proper monitoring and alerting
- Set up automated backups

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review service logs
3. Verify configuration files
4. Test individual components

## License

This project is licensed under the MIT License. 