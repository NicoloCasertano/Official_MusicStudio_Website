# Unified Port Configuration - Single Port Setup (5713)

## ✅ Configuration Complete

Your application now runs **entirely on port 5713** - both frontend and backend unified!

## 🎯 What Changed

### Before (Two Ports):
- **Frontend**: http://localhost:5174 (Vite dev server)
- **Backend**: http://localhost:5713 (Spring Boot)
- Required CORS configuration
- Two separate processes to manage

### After (Single Port):
- **Everything**: http://localhost:5713 (Spring Boot serving React + API)
- No CORS issues
- Single process to manage
- Production-ready configuration

## 🔧 Changes Made

### 1. Frontend API Calls (Calendar.jsx)
```javascript
// Before:
const response = await fetch('http://localhost:5713/api/calendar/book', {...})

// After:
const response = await fetch('/api/calendar/book', {...})
```

### 2. Backend Configuration (WebConfig.java)
Created `WebConfig.java` to serve React static files and handle SPA routing:
- Serves React build from `/static/` directory
- Routes all non-API requests to `index.html` for React Router
- API calls (starting with `/api/`) go to Spring controllers

### 3. Build & Deploy Process
1. Build React: `cd react-app-2 && npm run build`
2. Copy to backend: `cp -r dist/* ../demo/src/main/resources/static/`
3. Build backend: `cd demo && ./mvnw clean package`
4. Run unified app: `./mvnw spring-boot:run`

## 🚀 How to Use

### Start the Application:
```bash
cd mac/Dev_N/React/demo
./mvnw spring-boot:run
```

### Access Points:
- **Main App**: http://localhost:5713
- **Calendar**: http://localhost:5713 (navigate via UI)
- **API Endpoints**: http://localhost:5713/api/*

### Stop the Application:
```bash
# Find and kill the process
lsof -ti:5713 | xargs kill
```

## 📦 Production Deployment

When deploying to production, you only need to:
1. Build the React app
2. Copy build files to `src/main/resources/static/`
3. Package the Spring Boot app: `./mvnw clean package`
4. Deploy the single JAR file: `java -jar target/demo-0.0.1-SNAPSHOT.jar`

The JAR contains everything - frontend + backend!

## ✨ Benefits of Single-Port Setup

### 1. **Simplified Configuration**
- No CORS setup needed
- No proxy configuration
- Single origin for all requests

### 2. **Production-Ready**
- Mimics production environment
- Same setup for dev and prod
- Easier to test

### 3. **Easier Deployment**
- Single artifact to deploy
- One port to manage/expose
- Simpler firewall rules

### 4. **Better Performance**
- No cross-origin overhead
- Direct serving of static files
- Optimized resource loading

### 5. **Simplified Development**
- One process to start/stop
- Single URL to remember
- Less context switching

## 🔄 Development Workflow

### For Frontend Changes:
```bash
# 1. Make your React changes
cd mac/Dev_N/React/react-app-2

# 2. Rebuild
npm run build

# 3. Copy to backend
cp -r dist/* ../demo/src/main/resources/static/

# 4. Restart backend (if running)
# The backend will pick up new static files
```

### For Backend Changes:
```bash
# Backend has hot reload enabled
# Just save your Java files and they'll recompile automatically
```

## 📝 File Structure

```
demo/
├── src/main/resources/
│   ├── static/              # React build files live here
│   │   ├── index.html
│   │   ├── assets/
│   │   │   ├── index-*.js
│   │   │   ├── index-*.css
│   │   │   └── images...
│   │   └── vite.svg
│   ├── application.properties
│   └── ...
└── src/main/java/.../config/
    └── WebConfig.java       # SPA routing configuration
```

## 🎯 Why This Is Better

### Development:
- **Simpler**: One command to start everything
- **Faster**: No CORS preflight requests
- **Cleaner**: No port conflicts

### Production:
- **Standard**: Industry-standard deployment pattern
- **Secure**: All traffic on one port, easier to secure
- **Efficient**: Static files served directly by Spring Boot

### Maintenance:
- **Unified**: One codebase, one build, one deploy
- **Predictable**: Same behavior in all environments
- **Scalable**: Easy to containerize (Docker)

## 🐳 Docker Ready

This setup is perfect for Docker:
```dockerfile
FROM openjdk:17-slim
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 5713
CMD ["java", "-jar", "app.jar"]
```

## 🔍 Troubleshooting

### React Routes Not Working?
- Check that `WebConfig.java` is present
- Verify it returns `index.html` for non-API routes

### API Calls Failing?
- Ensure paths start with `/api/`
- Check Spring Boot console for errors

### Static Files Not Loading?
- Rebuild React: `npm run build`
- Copy to `static/` folder
- Restart Spring Boot

## ✅ Current Status

- ✅ Frontend built and deployed
- ✅ Backend configured to serve frontend
- ✅ API endpoints working
- ✅ Single port (5713) serving everything
- ✅ SPA routing functional
- ✅ No CORS issues
- ✅ Production-ready setup

## 🎉 You're All Set!

Open http://localhost:5713 in your browser and enjoy your unified application!
