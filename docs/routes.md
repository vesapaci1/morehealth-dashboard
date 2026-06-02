# Route verification checklist

Run `pnpm --filter @workspace/dashboard dev` then check each URL below.
For API routes, use `curl` or a browser. For UI routes, open in a browser and confirm the page renders without a white screen or console error.

---

## API routes

| Method | URL | Expected response |
|--------|-----|-------------------|
| GET | `/api/healthz` | `{"status":"ok"}` with `Content-Type: application/json` |
| GET | `/api/openapi.yaml` | Full OpenAPI 3.0.3 YAML spec, `Content-Type: application/yaml` |

```bash
curl http://localhost:5173/api/healthz
# → {"status":"ok"}

curl -I http://localhost:5173/api/openapi.yaml
# → HTTP/1.1 200 OK
# → content-type: application/yaml

curl http://localhost:5173/api/openapi.yaml | head -5
# → openapi: 3.0.3
# → info:
# →   title: MoreHealth Partner Dashboard API
```

---

## UI routes

| URL | Expected behaviour |
|-----|--------------------|
| `/` | Redirects to `/login` |
| `/login` | Login page renders |
| `/dashboard` | Dashboard mockup renders |
| `/earnings` | Earnings mockup renders |
| `/orders` | Orders mockup renders |
| `/notifications` | Notifications mockup renders |
| `/storefront` | Storefront mockup renders |
| `/activate` | Activate account mockup renders |
| `/settings` | Settings mockup renders |
| `/analytics` | Redirects to `/dashboard` |
| `/shop` | Redirects to `/dashboard` |
| `/enroll` | Redirects to `/dashboard` |
| `/subscriptions` | Redirects to `/dashboard` |
| `/team` | Redirects to `/dashboard` |
| `/support` | Redirects to `/settings` |
| `/anything-else` | 404 not-found page renders |

---

## Quick curl smoke test (API only)

```bash
BASE=http://localhost:5173

curl -sf "$BASE/api/healthz" | grep '"ok"' && echo "healthz ✓" || echo "healthz ✗"
curl -sf "$BASE/api/openapi.yaml" | grep "openapi:" && echo "openapi ✓" || echo "openapi ✗"
```

---

## Production (Fly.io)

Replace `http://localhost:5173` with your Fly app URL, e.g. `https://morehealth-dashboard.fly.dev`.

The Fly health check also polls `/api/healthz` every 30 s — confirmed green in the Fly dashboard means the app is up and the route is reachable.
