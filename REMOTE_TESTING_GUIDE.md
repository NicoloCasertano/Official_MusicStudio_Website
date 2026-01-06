# Remote Testing Guide - NoSaintz Website

## Project Overview
- **Frontend**: React + Vite (runs on port 9090)
- **Backend**: Spring Boot + Java (runs on port 8080)
- **Database**: PostgreSQL (port 5433)

## Prerequisites for Sharing

### On Your Mac (Host Machine - Where You'll Run the App)

1. **Database Running**
   ```bash
   # Make sure PostgreSQL is running on port 5433
   # You can verify with: lsof -i :5433
   ```

2. **Backend Running**
   ```bash
   cd Dev_N/React/backend
   # Build and run the backend
   mvn clean spring-boot:run
   # Backend will be available at: http://YOUR_MAC_IP:8080
   ```

3. **Frontend Running**
   ```bash
   cd Dev_N/React/frontend
   npm install  # if not already done
   npm run dev
   # Frontend will be available at: http://YOUR_MAC_IP:9090
   ```

### Network Requirements

**Your Mac must be on the same network as the testing device**, or you need to use port forwarding/tunneling.

---

## 3 Methods to Share the Link

### **Method 1: Same Network (Easiest) ✅**

1. **Get your Mac's IP address:**
   ```bash
   # Open Terminal and run:
   ifconfig | grep "inet " | grep -v 127.0.0.1
   # Look for something like: inet 192.168.1.100
   ```

2. **Share this URL with the tester:**
   ```
   http://YOUR_MAC_IP:9090
   ```
   Example: `http://192.168.1.100:9090`

3. **Requirements at the moment of sharing:**
   - Both devices must be on the same WiFi network
   - All three services must be running (PostgreSQL, Backend, Frontend)
   - No firewall blocking port 9090 and 8080

---

### **Method 2: Ngrok (Public Internet Link)**

**Best for: Different networks, remote teams**

1. **Install Ngrok:**
   ```bash
   # Using Homebrew
   brew install ngrok
   ```

2. **Get a free Ngrok account:**
   - Visit https://ngrok.com and sign up
   - Get your auth token from the dashboard

3. **Configure Ngrok:**
   ```bash
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```

4. **Create a tunnel while your app is running:**
   ```bash
   # In a NEW terminal window, run:
   ngrok http 9090
   ```

5. **Share the public URL:**
   - Ngrok will display a URL like: `https://abc123.ngrok.io`
   - Share this URL with the tester
   - **Important:** This link expires when you close ngrok or restart your Mac

6. **Requirements at the moment of sharing:**
   - All three services running (PostgreSQL, Backend, Frontend)
   - Ngrok must be actively running
   - Firewall must allow outbound connections

---

### **Method 3: Docker + Expose Services**

**Best for: Reproducible, easy deployment**

1. **Create a docker-compose.yml in Dev_N/React/:**
   ```yaml
   version: '3.8'
   services:
     postgres:
       image: postgres:15
       environment:
         POSTGRES_DB: nosaintz
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: N1i9k9e9#!database
       ports:
         - "5433:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data

     backend:
       build: ./backend
       ports:
         - "8080:8080"
       depends_on:
         - postgres
       environment:
         SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/nosaintz
         SPRING_DATASOURCE_USERNAME: postgres
         SPRING_DATASOURCE_PASSWORD: N1i9k9e9#!database

     frontend:
       build: ./frontend
       ports:
         - "9090:9090"
       depends_on:
         - backend

   volumes:
     postgres_data:
   ```

2. **Build and run:**
   ```bash
   cd Dev_N/React
   docker-compose up --build
   ```

3. **Share your Mac's IP:**
   ```
   http://YOUR_MAC_IP:9090
   ```

---

## Important Configurations Before Sharing

### 1. **Enable CORS on Backend** ✅ Already Done
   - Your `application.properties` includes:
   ```
   app.cors.allowed-origins=http://localhost:9090,http://localhost:5173,http://localhost:5174
   ```
   - **If using a different IP**, you may need to add it to CORS whitelist

### 2. **Update Backend API Endpoint** (if using external URL)
   - Frontend currently expects backend at: `http://localhost:8080`
   - **For external access**, update `Dev_N/React/frontend/src/services/api.js`:
   ```javascript
   // Change from:
   const API_BASE_URL = 'http://localhost:8080';
   
   // To:
   const API_BASE_URL = `http://${window.location.hostname}:8080`;
   ```

### 3. **Database Connectivity**
   - Backend connects to PostgreSQL at `localhost:5433`
   - Frontend doesn't directly connect to DB (goes through Backend API)
   - **Only the tester's browser needs to reach port 9090**

### 4. **Firewall Settings**
   ```bash
   # On macOS, check if ports are accessible:
   lsof -i :9090  # Frontend
   lsof -i :8080  # Backend
   lsof -i :5433  # Database
   ```

---

## Checklist Before Sharing

### ✅ Prerequisites
- [ ] PostgreSQL running on port 5433
- [ ] Backend (`mvn clean spring-boot:run`) running on port 8080
- [ ] Frontend (`npm run dev`) running on port 9090
- [ ] Get your Mac IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`

### ✅ For Same Network Testing (Method 1)
- [ ] Both devices on same WiFi
- [ ] Share URL: `http://YOUR_MAC_IP:9090`
- [ ] No firewall blocking ports

### ✅ For Ngrok Testing (Method 2)
- [ ] Ngrok installed and authenticated
- [ ] Run: `ngrok http 9090`
- [ ] Share the https URL provided by ngrok
- [ ] Keep ngrok running during testing

### ✅ Network Configuration
- [ ] Check CORS whitelist in `application.properties`
- [ ] If needed, add external IP to CORS allowed-origins
- [ ] Backend API endpoint correctly configured in frontend

---

## Troubleshooting

### "Connection Refused"
- Ensure all 3 services are running
- Check firewall settings
- Verify correct IP address

### "CORS Error"
- Add the external IP to `app.cors.allowed-origins` in `application.properties`
- Restart backend after changes

### "Database Connection Failed"
- PostgreSQL must be running on localhost:5433
- Check credentials: `postgres` / `N1i9k9e9#!database`

### "Port Already in Use"
```bash
# Find what's using the port:
lsof -i :9090

# Kill the process:
kill -9 PID
```

---

## What You Need to Do at Sharing Time

### If Using Same Network (Method 1):
1. Start all services
2. Get your IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
3. Send: `http://YOUR_IP:9090` to the tester
4. **Keep your Mac running and connected to network**

### If Using Ngrok (Method 2):
1. Start all services
2. Run: `ngrok http 9090` in a new terminal
3. Copy the HTTPS URL from ngrok output
4. Send to tester
5. **Keep both your Mac and ngrok running**

### Important Notes:
- 🔒 Keep your Mac on the same network (or connected to VPN if remote)
- ⏱️ The tester must access the link while you're running the services
- 🔌 Don't close terminals or disconnect from network during testing
- 📝 Database credentials are in the code - consider changing them for production
- 🚨 The Ngrok URL is public - anyone with the link can access the app

