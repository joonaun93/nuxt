# ── build stage ──────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# leverage npm ci for reproducible deps
COPY package*.json ./
RUN npm ci

# copy sources & build
COPY . .
RUN npm run build  # outputs to .output/

# ── runtime stage ────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# copy only the built output & prod deps
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules

ENV NITRO_PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]