# Multi-stage build for React frontend
# Stage 1: Build
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Runtime with Vite preview server
FROM node:20-alpine

WORKDIR /app

# Install serve to run the built app (or use vite preview)
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 9090

# Health check
HEALTHCHECK --interval=15s --timeout=5s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:9090/ || exit 1

# Serve the built app on port 9090
CMD ["serve", "-s", "dist", "-l", "9090"]
