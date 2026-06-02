# syntax=docker/dockerfile:1
# Build from monorepo root:
#   docker build -f dashboard/Dockerfile -t morehealth-dashboard .
#   fly deploy

FROM node:24-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY dashboard/package.json dashboard/
COPY lib/api-zod/package.json lib/api-zod/
COPY lib/db/package.json lib/db/

RUN pnpm install --frozen-lockfile --ignore-scripts --filter @workspace/dashboard...

FROM deps AS build
COPY tsconfig.base.json ./
COPY dashboard dashboard
COPY lib/api-zod lib/api-zod
COPY lib/db lib/db
COPY docs docs

ENV NODE_ENV=production
RUN pnpm --filter @workspace/dashboard run build

FROM node:24-bookworm-slim AS runner
WORKDIR /app/dashboard

ENV NODE_ENV=production
ENV PORT=8080

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nodejs

COPY --from=build --chown=nodejs:nodejs /app/node_modules /app/node_modules
COPY --from=build --chown=nodejs:nodejs /app/dashboard/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/dashboard/dist ./dist

USER nodejs

EXPOSE 8080

CMD ["./node_modules/.bin/remix-serve", "./dist/server/index.js"]
