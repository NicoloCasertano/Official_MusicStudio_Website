#!/bin/bash

echo "🔨 Rebuilding and Deploying React + Spring Boot Application"
echo "============================================================"
echo ""

# Navigate to React app
cd react-app-2

echo "📦 Step 1: Building React frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ React build failed!"
    exit 1
fi
echo "✅ React build successful"
echo ""

# Copy to Spring Boot static folder
echo "📋 Step 2: Copying build to Spring Boot static folder..."
cp -r dist/* ../demo/src/main/resources/static/
if [ $? -ne 0 ]; then
    echo "❌ Copy failed!"
    exit 1
fi
echo "✅ Files copied successfully"
echo ""

# Navigate to Spring Boot app
cd ../demo

echo "🔧 Step 3: Building Spring Boot application..."
./mvnw clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Spring Boot build failed!"
    exit 1
fi
echo "✅ Spring Boot build successful"
echo ""

echo "🎯 Stopping any existing instance on port 5713..."
lsof -ti:5713 | xargs kill -9 2>/dev/null
sleep 2
echo ""

echo "🚀 Step 4: Starting unified application..."
echo ""
echo "============================================================"
echo "🌐 Application will be available at: http://localhost:5713"
echo "============================================================"
echo ""

./mvnw spring-boot:run
