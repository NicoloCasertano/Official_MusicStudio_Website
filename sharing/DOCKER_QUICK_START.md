# Docker Quick Start - NoSaintz Website

## ⚡ One Command to Rule Them All

```bash
cd Dev_N/React && docker-compose up --build
```

That's it! Your entire application will start in Docker.

---

## 📋 What Gets Created

- **PostgreSQL Database** on port 5433
- **Spring Boot Backend** on port 8080
- **React Frontend** on port 9090
- **Shared Network** connecting all services

---

## 🎯 Access Your App

### Locally (Your Mac)
```
http://localhost:9090
```

### From Another Device (Same WiFi)
```
http://YOUR_MAC_IP:9090
```

**To get your Mac IP:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Example: `http://192.168.1.100:9090`

---

## 🔍 Check Status

```bash
# Are all services running?
docker-compose ps

# View logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
```

---

## 🛑 Stop Everything

```bash
# Stop containers (data is saved)
docker-compose stop

# Remove containers (data is saved)
docker-compose down

# Remove everything including database
docker-compose down -v
```

---

## 📱 Share for Testing

### Same Network (Easiest)
1. Start Docker: `docker-compose up --build`
2. Get your IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
3. Send tester: `http://YOUR_IP:9090`
4. Keep Docker running

### Remote Access (Ngrok)
```bash
# Terminal 1: Start Docker
cd Dev_N/React && docker-compose up --build

# Terminal 2: Create tunnel
brew install ngrok
ngrok http 9090

# Share the HTTPS URL from ngrok
```

---

## ✅ Before Sharing - Checklist

- [ ] Docker Desktop is installed and running
- [ ] You're in the `Dev_N/React` directory
- [ ] You ran `docker-compose up --build`
- [ ] All services show "Up" in `docker-compose ps`
- [ ] You can access `http://localhost:9090`
- [ ] You have your Mac IP address

---

## 🚨 Common Issues

### Port Already in Use
```bash
lsof -i :9090
kill -9 PID
```

### Backend Won't Start
```bash
docker-compose logs backend
# Wait 30-60 seconds for Java to start
```

### Database Connection Error
```bash
docker-compose down -v
docker-compose up --build
```

### Can't Access from Another Device
1. Both devices on same WiFi? ✓
2. Getting correct IP? `ifconfig | grep "inet " | grep -v 127.0.0.1`
3. Firewall blocking? Check System Preferences > Security & Privacy

---

## 📚 Full Documentation

For detailed information, see:
- **DOCKER_DEPLOYMENT_GUIDE.md** - Complete setup guide
- **REMOTE_TESTING_GUIDE.md** - Remote testing options

---

## 🎬 Step by Step

### First Time Setup
```bash
# 1. Navigate to project
cd Dev_N/React

# 2. Start everything (will take 3-5 minutes first time)
docker-compose up --build

# 3. Wait for messages:
#    "nosaintz_db ... database system is ready"
#    "nosaintz_backend ... Started ReactApp2Application"
#    "nosaintz_frontend ... accepting connections on port 9090"

# 4. Open http://localhost:9090 in your browser
```

### Subsequent Runs
```bash
# Just run this (will take 30-60 seconds)
cd Dev_N/React && docker-compose up

# If you made code changes, rebuild:
docker-compose up --build
```

### Stop and Clean Up
```bash
# Ctrl+C in the terminal running docker-compose

# Or in another terminal:
docker-compose stop
```

---

## 🔐 Security Notes

- Database credentials are in `docker-compose.yml` (for dev only)
- For production, use Docker Secrets or environment variable files
- Don't expose the Ngrok link publicly in real projects
- Change default credentials before production deployment

---

## 💡 Pro Tips

1. **Background Mode**: Run `docker-compose up -d` to start in background
2. **View Logs Later**: Use `docker-compose logs -f` anytime
3. **Rebuild One Service**: `docker-compose build --no-cache backend`
4. **Hot Reload**: For development, mount volumes (see full guide)
5. **Database Access**: 
   ```bash
   docker-compose exec postgres psql -U postgres -d nosaintz
   ```

---

## 🆘 Need Help?

```bash
# See all available commands
docker-compose help

# Detailed status
docker-compose ps -a

# Full system info
docker system df

# Clean up unused resources
docker system prune
```

---

**Ready? Run this:**
```bash
cd Dev_N/React && docker-compose up --build
```

Then open http://localhost:9090 in your browser! 🎉
