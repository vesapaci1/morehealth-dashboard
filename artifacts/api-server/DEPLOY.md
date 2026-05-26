# Deploying api-server to Fly.io

## Prerequisites

- [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/) installed and logged in (`fly auth login`)

## Deploy (monorepo)

This app must build with the **monorepo root** as the Docker context (for `pnpm-workspace.yaml`, `lib/*`, etc.).

**From repo root (recommended):**

```bash
fly deploy --config artifacts/api-server/fly.toml
```

**From `artifacts/api-server`:**

```bash
pnpm run deploy
```

That runs `fly deploy ../..` with paths relative to the repo root.

Do **not** run plain `fly deploy` inside `artifacts/api-server` only — the context will be too small and `COPY lib/...` will fail.

## Production start command

Container CMD:

```bash
node --enable-source-maps dist/index.mjs
```

Locally:

```bash
PORT=8080 HOST=0.0.0.0 NODE_ENV=production pnpm run start:prod
```

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | **Yes** | — | HTTP port. Fly sets this from `internal_port` (8080). |
| `HOST` | No | `0.0.0.0` | Bind address (must be `0.0.0.0` on Fly). |
| `NODE_ENV` | No | `production` | Set in `fly.toml`. |
| `LOG_LEVEL` | No | `info` | Pino log level. |
| `DATABASE_URL` | No* | — | Required only if you import `@workspace/db`. |

```bash
fly secrets set DATABASE_URL='postgres://...'
```

## Health check

`GET /api/healthz` — configured in `fly.toml`.

## Docker / `.dockerignore`

- **Build context:** monorepo root
- **Dockerfile:** `artifacts/api-server/Dockerfile` (paths like `COPY lib/...` are from repo root)
- **`.dockerignore`:** repo root — excludes `artifacts/more-health` and `artifacts/mockup-sandbox`, **not** `lib/` or `artifacts/api-server`

## Useful commands

```bash
fly status
fly logs
fly open /api/healthz
fly secrets list
```
