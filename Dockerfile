# Stage 1 — build the React frontend
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 — production server (no devDependencies, just the built app)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js .
COPY --from=builder /app/dist ./dist
EXPOSE 6989
CMD ["node", "server.js"]
