# syntax=docker/dockerfile:1

##### 1. deps — install dependencies only (cached layer) #####
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

##### 2. builder — build the Next.js app #####
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# DATABASE_URL isn't needed at build time (lib/db.ts lazily creates the
# pool on first query), but Next still wants the var present to avoid
# noisy warnings during the static/route analysis pass.
ENV DATABASE_URL="postgresql://placeholder:placeholder@placeholder:5432/placeholder"
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

##### 3. runner — minimal production image #####
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Standalone server output (includes only the files needed to run)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Uploaded thumbnails need to land on a writable, persistent path —
# mount a volume at /app/public/uploads (see docker-compose.yml).
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public/uploads

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
