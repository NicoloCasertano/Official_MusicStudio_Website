# 🐳 Docker Setup for NoSaintz Website

Welcome! Your website is now fully containerized and ready to share. This file gives you the big picture.

---

## 📖 Documentation Files (Read in This Order)

### 1. **START HERE** 👈 You are reading related docs
- **DOCKER_QUICK_START.md** - 5 minute quick reference
- **SHARING_CHECKLIST.md** - What to do when sharing (step-by-step)

### 2. For Detailed Information
- **DOCKER_DEPLOYMENT_GUIDE.md** - Complete guide with troubleshooting
- **SETUP_COMPLETE.md** - Setup summary and next steps
- **REMOTE_TESTING_GUIDE.md** - Remote testing options

---

## 🚀 Quick Start (60 Seconds)

```bash
# 1. Start Docker
cd Dev_N/React
docker-compose up --build

# 2. Wait for messages about "database ready", "Started ReactApp2Application", "accepting connections"

# 3. Open in browser
http://localhost:9090
```

Done! Your app is running.

---

## 📱 Share with Others

### Same Network
```bash
# Get your IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# Share URL
http://YOUR_IP:9090
```

### Remote (Ngrok)
```bash
# Terminal 2: Create tunnel
brew install ngrok
ngrok http 9090

# Share the HTTPS URL from ngrok
```

**See SHARING_CHECKLIST.md for exact steps at sharing time.**

---

## 📦 What Was Created

```
Dev_N/React/
├── docker-compose.yml              ← Main configuration
├── backend/
│   ├── Dockerfile                  ← Backend container
│   └── .dockerignore
├── frontend/
│   ├── Dockerfile                  ← Frontend container
│   ├── .dockerignore
│   ├── .env                        ← Local dev config
│   └── .env.docker                 ← Docker config
├── start-docker.sh                 ← Helper script
│
├── README_DOCKER.md                ← You are here
├── DOCKER_QUICK_START.md           ← Quick reference
├── DOCKER_DEPLOYMENT_GUIDE.md      ← Complete guide
├── SHARING_CHECKLIST.md            ← Sharing instructions
├── SETUP_COMPLETE.md               ← Setup summary
└── REMOTE_TESTING_GUIDE.md         ← Remote options
```

---

## 🏗️ Architecture

Your application is split into 3 containers:

```
┌─────────────────────────────────────┐
│         Docker on Your Mac          │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │  PostgreSQL (Port 5433)     │   │
│  │  • Database: nosaintz       │   │
│  │  • User: postgres           │   │
│  └─────────────────────────────┘   │
│                ↑                    │
│  ┌─────────────────────────────┐   │
│  │  Spring Boot (Port 8080)    │   │
│  │  • Backend API              │   │
│  │  • Java 17                  │   │
│  └─────────────────────────────┘   │
│                ↑                    │
│  ┌─────────────────────────────┐   │
│  │  React Frontend (Port 9090) │   │
│  │  • Vite Build               │   │
│  │  • Node.js                  │   │
│  └─────────────────────────────┘   │
│                ↑                    │
│          External Browser           │
│      (http://YOUR_IP:9090)         │
│                                     │
└─────────────────────────────────────┘
```

All containers are on the same Docker network and can communicate by name.

---

## ⚙️ Common Commands

```bash
# START
cd Dev_N/React
docker-compose up --build              # Start and show logs
docker-compose up -d                   # Start in background

# CHECK STATUS
docker-compose ps                      # List all services
docker-compose logs -f                 # View all logs
docker-compose logs -f backend         # View specific service

# STOP
docker-compose stop                    # Stop containers
docker-compose down                    # Stop and remove containers

# RESTART
docker-compose restart backend         # Restart one service
docker-compose restart                 # Restart all services

# REBUILD
docker-compose build --no-cache backend
docker-compose up -d backend

# CLEANUP
docker-compose down -v                 # Remove everything
docker system prune                    # Clean up unused resources
```

---

## 📋 Before You Share

- [ ] Docker Desktop installed and running
- [ ] All services are "Up": `docker-compose ps`
- [ ] http://localhost:9090 works locally
- [ ] You have your Mac IP
- [ ] You've read SHARING_CHECKLIST.md

---

## 🔑 Key Points

### ✅ What's Included
- Multi-stage builds (fast, small images)
- Health checks (automatic restart if failed)
- Persistent database volume (data saved between restarts)
- Optimized for development
- Easy to share

### ⚠️ Important
- All services must be running for the app to work
- Your Mac must stay powered on and connected to network
- Database credentials are in code (change for production)
- Same network link works anywhere on your WiFi
- Ngrok link works worldwide but is temporary

### 🔒 Security Notes
- Don't expose this publicly in production
- Don't share database credentials
- Change passwords before production use
- Use proper SSL/TLS certificates in production

---

## 🆘 Quick Troubleshooting

**Port Already in Use:**
```bash
lsof -i :9090
kill -9 PID
```

**Backend Won't Start:**
```bash
docker-compose logs backend
# Wait 60 seconds, Java takes time to start
```

**Database Error:**
```bash
docker-compose down -v
docker-compose up --build
```

**Can't Access from Another Device:**
1. Both on same WiFi?
2. Using correct IP? (`ifconfig | grep "inet " | grep -v 127.0.0.1`)
3. Firewall blocking? (Check System Preferences)

**More help:** See DOCKER_DEPLOYMENT_GUIDE.md

---

## 📚 Full Documentation

| File | Purpose | Read Time |
|------|---------|-----------|
| DOCKER_QUICK_START.md | Quick reference | 5 min |
| SHARING_CHECKLIST.md | Exact sharing steps | 10 min |
| DOCKER_DEPLOYMENT_GUIDE.md | Complete guide | 15 min |
| SETUP_COMPLETE.md | Setup summary | 10 min |
| REMOTE_TESTING_GUIDE.md | Remote options | 10 min |

---

## 🎯 Next Steps

### Immediate (Now)
1. ✅ Read this file (you're doing it!)
2. → Read DOCKER_QUICK_START.md
3. → Run `cd Dev_N/React && docker-compose up --build`
4. → Test at http://localhost:9090

### For Sharing
1. Everything running? ✓
2. → Read SHARING_CHECKLIST.md
3. → Get your IP
4. → Share URL with tester

### For Issues
1. → Check DOCKER_DEPLOYMENT_GUIDE.md
2. → Look for your error in troubleshooting section
3. → Run suggested commands

---

## 📞 Quick Reference

```bash
# One command to start everything
cd Dev_N/React && docker-compose up --build

# Get your Mac IP for sharing
ifconfig | grep "inet " | grep -v 127.0.0.1

# Check if all services are running
docker-compose ps

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

---

## 💡 Pro Tips

1. **First time is slow (3-5 min)** - Builds images
2. **Subsequent runs are fast (30-60 sec)** - Uses cached layers
3. **Keep Docker running** - Tester needs it to access the app
4. **Test locally first** - http://localhost:9090 before sharing
5. **Use same network** - Easier than Ngrok
6. **Monitor logs** - Open another terminal: `docker-compose logs -f`

---

## ✨ You're All Set!

Everything is configured and ready to go.

**Start now:**
```bash
cd Dev_N/React && docker-compose up --build
```

**Then open:**
```
http://localhost:9090
```

Questions? Check the documentation files above.

Happy testing! 🚀

---

**Quick Links:**
- 📖 DOCKER_QUICK_START.md - 5 min overview
- ✅ SHARING_CHECKLIST.md - How to share
- 📚 DOCKER_DEPLOYMENT_GUIDE.md - Complete guide
- 🆘 SETUP_COMPLETE.md - Detailed setup info
