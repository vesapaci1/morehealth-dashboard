#!/usr/bin/env sh
set -eu
# Monorepo root as Docker build context (fly.toml build-context is ignored by flyctl 0.4.x).
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
exec fly deploy --config artifacts/api-server/fly.toml "$@"
