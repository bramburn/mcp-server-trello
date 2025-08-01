FROM node:20-alpine AS builder
LABEL org.opencontainers.image.source=https://github.com/delorenj/mcp-server-trello

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory to /app
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies)
RUN SKIP_PREPARE=true pnpm install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Build TypeScript
RUN pnpm run build

# Use a smaller Node.js runtime for production
FROM node:20-alpine AS release

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory to /app
WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install only production dependencies without running scripts
RUN SKIP_PREPARE=true pnpm install --prod --frozen-lockfile --ignore-scripts

# The environment variables should be passed at runtime, not baked into the image
# They can be provided via docker run -e or docker compose environment section
ENV NODE_ENV=production

# Run the MCP server
CMD ["node", "build/index.js"]
