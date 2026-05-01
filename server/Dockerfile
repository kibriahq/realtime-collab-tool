# Base image
FROM node:20-alpine

# Enable pnpm
RUN corepack enable

# Working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy rest of the code
COPY . .

# Build TypeScript
RUN pnpm build

# Expose port
EXPOSE 4000

# Run app
CMD ["pnpm", "start"]