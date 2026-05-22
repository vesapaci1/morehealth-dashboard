# MoreHealth Partner Dashboard — API notes

Companion to **`docs/api/openapi.yaml`** (OpenAPI **v1.0.0**). The spec is the source of truth for the partner dashboard contract; this file explains design intent and how it maps to the Remix UI.

---

## Spec status

| File | Role |
|------|------|
| `docs/api/openapi.yaml` | **Source of truth** — production v1 aggregate API |
| `lib/api-spec/openapi.yaml` | **Out of sync** — still only `GET /healthz`; align with `docs/api` before Orval regen |
| `lib/api-spec/orval.config.ts` | Points at `lib/api-spec/openapi.yaml` today |

---

## Refactor summary (v0.1.0 → v1.0.0)

### Endpoint reduction: 48 → 24

The first contract mirrored individual UI widgets (KPI row, each chart, wallet chip, notification badge, etc.). **v1.0.0** cuts that to **24 operations** (23 partner-domain + `GET /healthz`) by grouping reads per page or shell context.

### Widget-based → domain-based aggregates

| Before | After |
|--------|--------|
| Many small GETs per card/chart | One GET per route or shell |
| Duplicate wallet/profile/period data across endpoints | Single sources in `overview`, `dashboard`, etc. |
| Earnings split across 9+ paths | `summary` + `history` |
| Storefront split across 4 paths | One `GET /partner/storefront` |

**Benefits:** simpler mental model, fewer round-trips, no conflicting copies of wallet balance or unread counts, easier **Remix loaders** (one loader ↔ one aggregate), and smaller **Orval** surface (fewer hooks, clearer types per page).

---

## Key merged endpoints

| Endpoint | Replaces (v0.1.0) | Purpose |
|----------|-------------------|---------|
| `GET /partner/overview` | `wallet/summary`, `dashboard/summary`, `notifications/summary` | Sidebar/header shell: profile, wallet, periods, hero metrics, unread count |
| `GET /partner/dashboard` | `dashboard/kpis`, `sales-trend`, `earnings-trend`, `volume`, `activity` | Full `/dashboard` page |
| `GET /partner/orders` | `orders` + `orders/summary` | Summary cards + paginated list (`export` stays separate for CSV) |
| `GET /partner/earnings/summary` | `earnings/current`, `trajectory`, `records`, `leaderboard`, `payview-url` | Earnings page hero and charts |
| `GET /partner/earnings/history` | `earnings/statements`, `…/{id}`, `…/fapiao`, `…/performance-report` | Weekly statements with optional documents |
| `GET /partner/storefront` | `storefront`, `…/metrics`, `…/top-products`, `…/qr` | Full `/storefront` page |
| `GET /partner/notifications` | `notifications`, `…/summary`, `…/preferences` (read) | Feed + unread + prefs; writes unchanged (`PATCH`, `POST mark-all-read`, `PUT preferences`) |

**Kept separate (not merged):**

- `GET /partner/me` — lightweight identity when overview is not needed
- `GET /partner/orders/export` — CSV response type
- `/auth/*`, `/activation/*` — unchanged shape
- `GET/PATCH /partner/settings/profile` — avatar upload via multipart on PATCH (removed standalone `…/avatar` POST)

---

## Removed from the contract

Endpoints dropped as **sandbox-only**, **UI placeholders**, or **unused in production**:

- `GET /partner/search` — header search not wired
- `GET /partner/subscriptions`, `GET /partner/subscriptions/summary` — sandbox mock; `/subscriptions` redirects in Remix
- `GET /partner/orders/{orderId}` — no order detail page in v1
- All other granular paths absorbed into aggregates above (see `openapi.yaml` description / v0.1.0 git history for full list)

External links (Shopify shop/enroll) remain out of scope.

---

## UI ↔ API today

| Area | Finding |
|------|---------|
| Remix loaders / actions | **None** — mocks only |
| Live HTTP from frontend | **None** for partner routes |
| Data | Inline constants; `sidebar.mock.ts` for shell |
| `api-server` | `GET /api/healthz` only |

### Remix route → v1 endpoint

| Route | Primary API |
|-------|-------------|
| Shell (authenticated) | `GET /partner/overview` |
| `/login` | `POST /auth/*` |
| `/activate` | `/activation/{token}*` |
| `/dashboard` | `GET /partner/dashboard` |
| `/orders` | `GET /partner/orders`, `GET /partner/orders/export` |
| `/earnings` | `GET /partner/earnings/summary`, `GET /partner/earnings/history` |
| `/storefront` | `GET /partner/storefront` |
| `/notifications` | `GET /partner/notifications` + write endpoints |
| `/settings` | `GET/PATCH /partner/settings/profile` |
| `/subscriptions` | Redirect — **no API** |

---

## Conventions (unchanged)

- Base: `/api/v1` for partner routes; `/api` for `healthz`
- Auth: Bearer JWT on partner routes; public `auth` + `activation`
- Money: decimal CNY (`MoneyAmount`); UI uses `¥`
- Dates: ISO 8601; optional `*Display` / `*Zh` for UI
- Pagination: `page` / `pageSize` (orders default page size 5)
- Errors: RFC 9457 `application/problem+json`

---

## Wiring production data (next steps)

1. Copy or symlink `docs/api/openapi.yaml` → `lib/api-spec/openapi.yaml` (or point Orval at `docs/api`).
2. Regenerate `lib/api-client-react` via Orval.
3. Add one Remix **loader** per route calling the matching aggregate GET.
4. Use `GET /partner/earnings/history?statementId=&include=documents` for fapiao / performance report dialogs.

---

## Source file index

| Domain | UI files (`artifacts/more-health`) |
|--------|----------------------------------|
| Routes | `app/routes/*.tsx` |
| Dashboard | `.../Dashboard.tsx` |
| Orders | `.../Orders.tsx` |
| Earnings | `.../Earnings.tsx`, `FapiaoDialog.tsx`, `PerformanceReportDialog.tsx` |
| Storefront | `.../Storefront.tsx` |
| Notifications | `.../Notifications.tsx` |
| Settings | `.../Settings.tsx` |
| Auth / activation | `.../Login.tsx`, `.../ActivateAccount.tsx` |
| Shell | `.../_shared/sidebar.mock.ts`, `Sidebar.tsx`, `TopHeader.tsx` |
