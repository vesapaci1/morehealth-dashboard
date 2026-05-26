# syntax=docker/dockerfile:1
# Build from monorepo root (see fly.toml build-context).
# Example: docker build -f artifacts/api-server/Dockerfile .

FROM node:24-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY artifacts/api-server/package.json artifacts/api-server/
COPY lib/api-zod/package.json lib/api-zod/
COPY lib/db/package.json lib/db/

# Skip root preinstall (pnpm-only guard); Docker always uses pnpm via corepack.
RUN pnpm install --frozen-lockfile --ignore-scripts --filter @workspace/api-server...

FROM deps AS build
COPY artifacts/api-server artifacts/api-server
COPY lib/api-zod lib/api-zod
COPY lib/db lib/db

ENV NODE_ENV=production
RUN pnpm --filter @workspace/api-server run build

FROM node:24-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nodejs

COPY --from=build --chown=nodejs:nodejs /app/artifacts/api-server/dist ./dist

USER nodejs

EXPOSE 8080

CMD ["node", "--enable-source-maps", "dist/index.mjs"]
