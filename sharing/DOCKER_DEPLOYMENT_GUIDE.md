# Docker Deployment Guide - NoSaintz Website

## Overview
This guide explains how to use Docker to containerize and deploy your full-stack React + Spring Boot application for testing from any device on the network.

## What's Included

✅ **docker-compose.yml** - Orchestrates all services
✅ **backend/Dockerfile** - Multi-stage build for Spring Boot
✅ **frontend/Dockerfile** - Multi-stage build for React + Vite
✅ Pre-configured networking and health checks

---

## Prerequisites

### Install Docker Desktop
- **macOS**: https://www.docker.com/products/docker-desktop
- **Windows**: https://www.docker.com/products/docker-desktop
- **Linux**: `sudo apt-get install docker.io docker-compose`

### Verify Installation
```bash
docker --version
docker-compose --version
```

---

## Quick Start (5 minutes)

### 1. Build and Start All Services
```bash
cd Dev_N/React
docker-compose up --build
```

This command will:
- ✅ Build the PostgreSQL database container
- ✅ Build the Spring Boot backend container
- ✅ Build the React frontend container
- ✅ Start all services and connect them

### 2. Wait for Services to Be Ready
Look for these messages in the terminal:
```
nosaintz_db       | database system is ready to accept connections
nosaintz_backend  | Started ReactApp2Application in X seconds
nosaintz_frontend | ⫸  accepting connections on port 9090
```

### 3. Access Your Application
**From your Mac:**
```
http://localhost:9090
```

**From another device on the same network:**
```
http://YOUR_MAC_IP:9090
```

Get your Mac IP:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

---

## Detailed Setup Steps

### Step 1: Prepare the Project
```bash
cd Dev_N/React

# Ensure all files are in place
ls -la docker-compose.yml
ls -la backend/Dockerfile
ls -la frontend/Dockerfile
```

### Step 2: Build Docker Images
```bash
# Build all images defined in docker-compose.yml
docker-compose build

# This will:
# - Download base images (alpine, eclipse-temurin, node)
# - Build backend JAR file
# - Build frontend dist files
# - Create optimized runtime containers
```

### Step 3: Start Services
```bash
# Start all services in the background
docker-compose up -d

# Or start in foreground to see logs (Ctrl+C to stop)
docker-compose up
```

### Step 4: Check Service Status
```bash
# View running containers
docker-compose ps

# Expected output:
# NAME                  STATUS
# nosaintz_db          Up (healthy)
# nosaintz_backend     Up (healthy)
# nosaintz_frontend    Up (healthy)
```

### Step 5: View Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

---

## Sharing the Link for Remote Testing

### Method 1: Same Network (Easiest)
```bash
# 1. Get your Mac IP
ifconfig | grep "inet " | grep -v 127.0.0.1
# Example: 192.168.1.100

# 2. Share this URL with the tester
http://192.168.1.100:9090

# 3. Keep Docker running
# docker-compose logs -f
```

### Method 2: Using Ngrok (Remote Access)
```bash
# 1. Install ngrok
brew install ngrok

# 2. Authenticate with ngrok
ngrok config add-authtoken YOUR_TOKEN

# 3. Create tunnel to port 9090 (in a new terminal)
ngrok http 9090

# 4. Share the HTTPS URL provided by ngrok
# Example: https://abc123-xyz.ngrok.io

# Keep both docker-compose and ngrok running
```

### Method 3: Using LocalTunnel (Free Alternative)
```bash
# 1. Install localtunnel
npm install -g localtunnel

# 2. Create tunnel (in a new terminal)
lt --port 9090

# 3. Share the generated URL
# Keep both services running
```

---

## Understanding the Architecture

```
┌─────────────────────────────────────────────────────┐
│         Docker Network: nosaintz_network             │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  Frontend    │  │  Backend     │  │ PostgreSQL│ │
│  │  (Node)      │  │  (Java/Maven)│  │ (Port 5432)
│  │  Port 9090   │  │  Port 8080   │  │           │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│       ↓                   ↓                ↑         │
│       └──────────────────┴────────────────┘         │
│                                                       │
└─────────────────────────────────────────────────────┘
         ↓
    External Network
   (http://IP:9090)
```

### Service Details

**PostgreSQL (postgres:15-alpine)**
- Container Name: `nosaintz_db`
- Internal Port: 5432
- External Port: 5433
- Credentials: postgres / N1i9k9e9#!database
- Database: nosaintz
- Persistent Volume: `postgres_data`

**Spring Boot Backend**
- Container Name: `nosaintz_backend`
- Internal Port: 8080
- External Port: 8080
- Build: Multi-stage (Maven build + Java runtime)
- Health Check: API endpoint `/api/beats`

**React Frontend**
- Container Name: `nosaintz_frontend`
- Internal Port: 9090
- External Port: 9090
- Build: Multi-stage (Node build + serve runtime)
- Health Check: Root endpoint `/`

---

## Common Commands

### View Logs
```bash
docker-compose logs -f                # All services
docker-compose logs -f backend        # Specific service
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Stop Services
```bash
docker-compose stop                   # Stop all containers
docker-compose stop backend           # Stop specific service
```

### Start Services
```bash
docker-compose start                  # Start stopped containers
docker-compose restart                # Restart all services
```

### Remove Everything
```bash
docker-compose down                   # Stop and remove containers
docker-compose down -v                # Remove containers + volumes (data loss!)
docker system prune                   # Clean up unused Docker resources
```

### Rebuild Specific Service
```bash
docker-compose build --no-cache backend
docker-compose up -d backend
```

### Connect to Running Container
```bash
# PostgreSQL CLI
docker-compose exec postgres psql -U postgres -d nosaintz

# Backend logs
docker-compose exec backend sh

# Frontend container
docker-compose exec frontend sh
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find what's using the port
lsof -i :9090
lsof -i :8080
lsof -i :5433

# Kill the process
kill -9 PID

# Or change the port in docker-compose.yml
# Example: "9091:9090" instead of "9090:9090"
```

### Database Connection Failed
```bash
# Check PostgreSQL health
docker-compose ps postgres

# View database logs
docker-compose logs postgres

# Recreate database
docker-compose down -v
docker-compose up --build
```

### Backend Health Check Failing
```bash
# View backend logs
docker-compose logs backend

# The backend needs time to start (30-60 seconds)
# Wait for: "Started ReactApp2Application in X seconds"

# Manually check if backend is responding
curl http://localhost:8080/api/beats
```

### Frontend Not Loading
```bash
# Check if frontend is built
docker-compose logs frontend

# Look for: "⫸  accepting connections on port 9090"

# Rebuild frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### CORS Errors
```bash
# The docker-compose.yml includes CORS configuration:
# APP_CORS_ALLOWED_ORIGINS: "http://localhost:9090,http://localhost:3000,http://frontend:9090"

# If you still get CORS errors:
# 1. Check backend logs: docker-compose logs backend
# 2. Add your testing URL to APP_CORS_ALLOWED_ORIGINS
# 3. Restart backend: docker-compose restart backend
```

### Can't Connect from Another Device
```bash
# 1. Ensure both devices are on the same network
# 2. Get your Mac IP: ifconfig | grep "inet " | grep -v 127.0.0.1
# 3. Try: http://YOUR_MAC_IP:9090
# 4. Check firewall: System Preferences > Security & Privacy > Firewall
# 5. If needed, disable firewall or add port exceptions
```

---

## Environment Variables

### Backend (Spring Boot)
Set in `docker-compose.yml` under `backend > environment:`

```properties
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/nosaintz
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=N1i9k9e9#!database
SPRING_JPA_HIBERNATE_DDL_AUTO=create
SERVER_PORT=8080
APP_CORS_ALLOWED_ORIGINS=...
```

### Frontend (React/Vite)
Set in `docker-compose.yml` under `frontend > environment:`

```env
VITE_API_URL=http://backend:8080
```

These are automatically passed to the frontend build process.

---

## Performance Notes

**First Build** (~3-5 minutes)
- Downloads base images
- Compiles Java code with Maven
- Installs Node dependencies
- Builds React application

**Subsequent Builds** (~30-60 seconds)
- Docker layers are cached
- Only changed layers are rebuilt

**Runtime Performance**
- Container startup: ~30-60 seconds total
- Frontend access: ~1-2 seconds after `docker-compose up`
- Database ready: Check health check status

---

## For Production Deployment

This setup is designed for **development and testing**. For production:

1. **Use specific versions**: Pin image versions (not `latest`)
2. **Secrets management**: Use Docker secrets or environment variable files
3. **Reverse proxy**: Add Nginx for SSL/TLS
4. **Monitoring**: Add health checks and logging (ELK stack, Prometheus)
5. **Registry**: Push images to Docker Hub or private registry
6. **Orchestration**: Use Kubernetes or Docker Swarm for scaling
7. **CI/CD**: Integrate with GitHub Actions, GitLab CI, etc.

---

## Quick Reference

```bash
# Start
cd Dev_N/React && docker-compose up --build

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Status
docker-compose ps

# Rebuild one service
docker-compose build --no-cache backend

# Clean everything
docker-compose down -v && docker system prune -a
```

---

## Support & Issues

If you encounter issues:

1. Check logs: `docker-compose logs -f`
2. Verify prerequisites: `docker --version && docker-compose --version`
3. Ensure ports are free: `lsof -i :9090`
4. Rebuild from scratch: `docker-compose down -v && docker-compose up --build`

Good luck! 🚀
