# -------- Stage 1: Builder --------
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install deps
RUN npm install

# Copy source
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm run build


# -------- Stage 2: Runtime --------
FROM node:20-alpine

WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled output
COPY --from=builder /app/dist ./dist

# Optional: support for TS path aliases at runtime
RUN npm install tsconfig-paths

# Expose the port (change if your API listens on another)
EXPOSE 3000

# Start the server
CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]