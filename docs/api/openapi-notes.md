# MoreHealth Partner Dashboard — API contract requirements

Analysis of `artifacts/more-health` (production Remix app) for OpenAPI documentation. **No backend APIs were implemented**; this document is the contract blueprint for `docs/api/openapi.yaml`.

## Codebase findings (data layer today)

| Area | Finding |
|------|---------|
| Remix loaders / actions | **None** on any route |
| `fetch` / `customFetch` / React Query | Only `GET /api/healthz` (scaffold); dashboard pages do not call APIs |
| Data sources | Inline constants in route components; `sidebar.mock.ts` for shell |
| URL state | Orders page syncs filters to query string client-side only |
| Redirect-only routes | `/subscriptions`, `/analytics`, `/team`, `/shop`, `/enroll`, `/support` |
| Subscriptions UI | Implemented in `artifacts/mockup-sandbox` only; **not** mounted in `more-health` (route redirects to `/dashboard`) |

**Proposed API base:** `/api/v1` (extend existing `/api` server pattern). All partner endpoints assume **Bearer session** unless noted (activation uses one-time token).

**Cross-cutting response conventions**

- `currency`: `CNY` (UI uses `¥`)
- Money: `number` with 2 decimal places (OpenAPI `format: double` or integer minor units — **decide one**; UI uses decimals)
- Periods: ISO 8601 date or `periodStart` / `periodEnd` pairs
- Localized strings: UI holds EN/ZH pairs today; API can return `locale` query + single string, or `title` + `titleZh` — **see questions**

---

## Route inventory

| Route | Component | Data source |
|-------|-----------|-------------|
| `/` | Redirect → `/login` | — |
| `/login` | `Login.tsx` | Form only (mock navigate) |
| `/activate` | `ActivateAccount.tsx` | `ORDER` constant |
| `/dashboard` | `Dashboard.tsx` | Inline arrays + literals |
| `/orders` | `Orders.tsx` | `ORDERS` + summary literals |
| `/earnings` | `Earnings.tsx` | `WEEKLY_EARNINGS`, `CHART_DATA`, literals |
| `/storefront` | `Storefront.tsx` | Inline product list + KPI literals |
| `/notifications` | `Notifications.tsx` | `NOTIFICATIONS`, `PREFS` |
| `/settings` | `Settings.tsx` | Form `defaultValue`s |
| `/subscriptions` | Redirect → `/dashboard` | Mock exists in sandbox only |
| `/analytics`, `/team`, `/shop`, `/enroll` | Redirect | — |
| `/support` | Redirect → `/settings` | — |

**Shared shell:** `AppLayout` → `Sidebar` (`sidebar.mock.ts`), `TopHeader` (static notification dot).

---

## 1. Partner session & shell context

Used on every authenticated page (sidebar, header, dashboard hero).

| # | Page / feature | Current source | UI fields | Proposed endpoint | Query params | Response schema (required fields) |
|---|----------------|----------------|-----------|-------------------|--------------|-----------------------------------|
| 1.1 | Sidebar user card | `sidebar.mock.ts` → `SIDEBAR_USER` | `name`, `role` (EN/ZH), `avatar` URL, `initials` | `GET /partner/me` | `locale` (optional) | `PartnerProfile`: `id`, `displayName`, `tier` (`code`, `label`), `avatarUrl`, `initials` |
| 1.2 | Sidebar wallet chip | `SIDEBAR_FOOTER.wallet` | `amount` (¥12,480.00) | `GET /partner/wallet/summary` | — | `WalletSummary`: `balance`, `currency` |
| 1.3 | Sidebar notification badge | `SIDEBAR_NAV` badge on notifications | `badge` count (3) | `GET /partner/notifications/summary` | — | `NotificationSummary`: `unreadCount` |
| 1.4 | Dashboard hero welcome | `Dashboard.tsx` literals | `displayName` ("Matt"), `tier` badge, `periodLabel`, `comparePeriodLabel` | `GET /partner/dashboard/summary` | `period` (e.g. `current_week`), `comparePeriod` | `DashboardSummary`: `partner` (subset of profile), `period`, `comparePeriod`, `walletBalance`, `weeklyEarnings`, `ordersGenerated` |
| 1.5 | Top header global search | `TopHeader.tsx` | Placeholder only; no results | `GET /partner/search` | `q`, `limit`, `types[]` (`order`, `partner`, `product`) | `SearchResults`: discriminated union by type — **scope TBD** |

**Unclear / questions**

- Is sidebar wallet balance identical to dashboard hero `walletBalance`? Same endpoint vs derived?
- Tier taxonomy: `Elite Influencer`, `Platinum`, ranks on earnings — single `tier` enum or separate `influencerRank` vs `earningsRank`?

---

## 2. Dashboard (`/dashboard`)

| # | Page / feature | Current source | UI fields | Proposed endpoint | Query params | Response schema |
|---|----------------|----------------|-----------|-------------------|--------------|-----------------|
| 2.1 | KPI row (4 tiles) | `Dashboard.tsx` literals + `Kpi` | `totalOrders`, `referredOrders`, `personalOrders`, `repeatCustomers` (%), each `delta` %, sparkline `number[]` | `GET /partner/dashboard/kpis` | `period`, `comparePeriod` | `DashboardKpis`: array of `{ key, value, deltaPercent, trend: up\|down, sparkline: number[] }` |
| 2.2 | Sales trend chart | `SALES_DATA` | `name` (bucket label), `value` (sales amount) | `GET /partner/dashboard/sales-trend` | `days` ∈ {7,30,90} | `TimeSeries`: `{ points: [{ label, value, periodStart?, periodEnd? }] }` |
| 2.3 | Earnings growth chart | `EARNINGS_DATA` | weekly buckets, `value` | `GET /partner/dashboard/earnings-trend` | `weeks` (default 4) | `TimeSeries` (same shape) |
| 2.4 | Volume / MLM legs | literals in Volume card | `totalVolume`, `deltaPercent`, `leftLeg` { amount, percentOfTotal, isPayLeg }, `rightLeg` { amount, percentOfTotal, isCarryOver }, `carryOverNextWeek` | `GET /partner/dashboard/volume` | `period` (e.g. `current_week`) | `VolumeSummary`: `total`, `deltaPercent`, `leftLeg`, `rightLeg`, `carryOverAmount` |
| 2.5 | Recent activity feed | `ACTIVITY_FEED` | `id`, `type` (purchase \| subscription \| payout), `text`, `amount?`, `time`, `avatar` (initials) | `GET /partner/dashboard/activity` | `limit` (default 10) | `ActivityItem[]`: `id`, `type`, `title`, `subtitle?`, `amount?`, `occurredAt`, `actorInitials?` |

**Unclear / questions**

- Activity `type` enum vs notifications `category` — align schemas?
- Sparkline granularity: daily points for selected `period`?
- Volume leg rules (`Pay Leg`, `Carry Over`) — backend business logic must define which leg is pay leg.

---

## 3. Orders (`/orders`)

| # | Page / feature | Current source | UI fields | Proposed endpoint | Query params | Response schema |
|---|----------------|----------------|-----------|-------------------|--------------|-----------------|
| 3.1 | Summary cards | literals | `ordersThisMonth`, `commissionEarned`, `avgOrderValue` | `GET /partner/orders/summary` | `month` (YYYY-MM, default current) | `OrdersSummary`: three metrics + `currency` |
| 3.2 | Order list | `ORDERS` + client filter | `id`, `customer`, `product`, `amount`, `commission`, `date`, `status`, `tracking`, `tab` | `GET /partner/orders` | `tab` = `my-orders` \| `customer-orders` \| `subscription-orders`, `status`, `search`, `page`, `pageSize` | `PaginatedOrders`: `items[]`, `total`, `page`, `pageSize` |
| 3.3 | Order row status | `OrderStatus` type | `delivered`, `shipped`, `paid`, `pending` | (enum on 3.2) | — | `status` enum |
| 3.4 | Export CSV | button (no handler) | — | `GET /partner/orders/export` | same filters as 3.2 | `text/csv` stream |
| 3.5 | New order | button (no handler) | — | **Out of scope?** or `POST` to commerce | — | TBD |

**Order item schema (`Order`)**

```yaml
id: string          # e.g. ORD-902-18X
customerName: string
productName: string
amount: number
commission: number
orderedAt: string   # date
status: enum
trackingNumber: string | null  # "Pending" when unshipped
orderType: enum     # maps to tab filter
```

**Unclear / questions**

- Tab semantics: personal vs customer vs subscription — backend order types or attribution flags?
- Customer PII in list: full name vs masked?
- Row actions menu (`MoreHorizontal`) — detail endpoint `GET /partner/orders/{orderId}`?

---

## 4. Earnings & wallet (`/earnings`, sidebar wallet)

| # | Page / feature | Current source | UI fields | Proposed endpoint | Query params | Response schema |
|---|----------------|----------------|-----------|-------------------|--------------|-----------------|
| 4.1 | Current week hero | literals + `WEEKLY_EARNINGS[0]` | `netPaid`, `vsLastWeek` % | `GET /partner/earnings/current` | — | `CurrentEarnings`: `netPaid`, `deltaPercent`, `week` (range), `rank` |
| 4.2 | Weekly statements list | `WEEKLY_EARNINGS` | `date`, `weekRange`, `gross`, `net`, `rank` | `GET /partner/earnings/statements` | `page`, `pageSize`, `from`, `to` | `PaginatedStatements` |
| 4.3 | Earnings trajectory chart | `CHART_DATA` | `name`, `value` (net per week) | `GET /partner/earnings/trajectory` | `weeks` (default 4) | `TimeSeries` |
| 4.4 | Best month card | literals | `amount`, `yoyGrowthPercent`, narrative | `GET /partner/earnings/records` | — | `EarningsRecord`: `bestMonthAmount`, `yoyGrowthPercent`, `projectionCopy?` |
| 4.5 | Partner percentile banner | literals | `percentile` (72%), progress width | `GET /partner/earnings/leaderboard` | `period=current_month` | `LeaderboardPosition`: `percentile`, `nextTierHint?` |
| 4.6 | Fapiao (invoice) dialog | `FapiaoData` per week | `code`, `number`, `date`, `checkCode`, `taxableAmount`, `taxAmount`, `taxRate`, `net`, `weekLabel` + static buyer/seller | `GET /partner/earnings/statements/{statementId}/fapiao` | — | `Fapiao`: invoice fields + `buyer`, `seller` (or PDF URL only) |
| 4.7 | Performance report dialog | `PerformanceData` in `metrics` | See §4.7.1 | `GET /partner/earnings/statements/{statementId}/performance-report` | — | `PerformanceReport` |
| 4.8 | PayView deep link | button | external navigation | `GET /partner/earnings/payview-url` | `statementId?` | `{ url }` |
| 4.9 | View past statements | button | pagination | Covered by 4.2 | cursor/`page` | — |

**4.7.1 Performance report schema (`PerformanceData`)**

```yaml
weekLabel: string
net: number
gross: number
storeViews: integer
uniqueVisitors: integer
avgSessionSeconds: integer   # UI shows "2:48" — parse/format TBD
reviews: integer
rating: number
orders: integer
conversion: number           # 0.042 = 4.2%
social:
  wechat: integer
  xhs: integer
  douyin: integer
topContent:
  - title: string
    platform: wechat | xhs | douyin
    views: integer
    orders: integer
    revenue: number
breakdown:
  direct: number
  referred: number
  bonus: number
vsLast: number               # fractional delta, e.g. 0.184
```

**Unclear / questions**

- Fapiao buyer/seller blocks are hardcoded in UI — legal entities from API or PDF-only delivery?
- `rank`: Gold/Silver/Bronze — tied to statement week or partner tier?
- Withholding tax always 6%?
- Statement `id` vs week range as resource key?

---

## 5. Storefront (`/storefront`)

| # | Page / feature | Current source | UI fields | Proposed endpoint | Query params | Response schema |
|---|----------------|----------------|-----------|-------------------|--------------|-----------------|
| 5.1 | Store identity | literals | `slug` (brady), `url`, `live` status | `GET /partner/storefront` | — | `Storefront`: `slug`, `publicUrl`, `status`, `qrCodePayload` (or client builds from URL) |
| 5.2 | Period comparison chip | literals | current vs prior week labels | `GET /partner/storefront/metrics` | `period`, `comparePeriod` | `StorefrontMetrics` with period metadata |
| 5.3 | KPI row | literals | `storeVisits`, `conversionRate`, `storeRevenue`, `directCommissions` + deltas | same as 5.2 or `GET .../kpis` | four metrics + `deltaPercent` each |
| 5.4 | Best products | inline array | `name`, `units`, `revenue`, `thumb` URL | `GET /partner/storefront/top-products` | `period`, `limit` | `TopProduct[]`: `productId`, `name`, `imageUrl`, `unitsSold`, `revenue` |
| 5.5 | Copy link / open store | buttons | uses `publicUrl` | (5.1) | — | — |
| 5.6 | Download QR | button | QR from URL | `GET /partner/storefront/qr` | `format=png\|svg` | binary or `{ imageUrl }` |
| 5.7 | Quick share | buttons | WeChat / XHS / Douyin — no API wired | Optional `GET /partner/storefront/share-templates` | `platform` | **TBD** marketing assets |

**Unclear / questions**

- Storefront URL pattern: `{base}/{slug}` confirmed?
- Product images: CDN paths from catalog service?

---

## 6. Notifications (`/notifications`)

| # | Page / feature | Current source | UI fields | Proposed endpoint | Query params | Response schema |
|---|----------------|----------------|-----------|-------------------|--------------|-----------------|
| 6.1 | Notification feed | `NOTIFICATIONS` | `id`, `category`, `title*`, `detail*`, `time*`, `unread`, `amount?`, `actor?` { initials, tone } | `GET /partner/notifications` | `filter` = all \| unread \| category, `page`, `pageSize` | `PaginatedNotifications` |
| 6.2 | Mark read / toggle | local state | per-item unread | `PATCH /partner/notifications/{id}` | body: `{ read: boolean }` | `Notification` |
| 6.3 | Mark all read | button | — | `POST /partner/notifications/mark-all-read` | — | `{ updatedCount }` |
| 6.4 | Load older | button | pagination | (6.1) | `cursor` or `page` | — |
| 6.5 | Delivery preferences | `PREFS` + `Switch` | pref `id`, `label`, channels push/email/sms | `GET /partner/notifications/preferences` | — | `NotificationPreference[]` |
| 6.6 | Update preferences | switches (no save) | channel toggles per category | `PUT /partner/notifications/preferences` | body: preference array | same as 6.5 |

**Category enum:** `order` | `payout` | `subscription` | `milestone` | `announcement`

**Unclear / questions**

- Is `actor.tone` a UI concern only (derive from category)?
- SMS channel availability per region?
- Real-time push vs poll — WebSocket not in UI today.

---

## 7. Settings (`/settings`)

Only **Profile** sub-nav is built; others are placeholders.

| # | Page / feature | Current source | UI fields | Proposed endpoint | Query params | Response schema |
|---|----------------|----------------|-----------|-------------------|--------------|-----------------|
| 7.1 | Profile read | form defaults | `firstName`, `lastName`, `email`, `phone`, `dateOfBirth`, `preferredLanguage`, `avatarUrl` | `GET /partner/settings/profile` | — | `PartnerProfileSettings` |
| 7.2 | Profile update | Save button (no handler) | same fields | `PATCH /partner/settings/profile` | body fields | updated profile |
| 7.3 | Avatar upload | button | image file | `POST /partner/settings/profile/avatar` | `multipart/form-data` | `{ avatarUrl }` |
| 7.4 | Addresses | sub-nav only | — | `GET/POST/PATCH/DELETE /partner/settings/addresses` | — | **TBD** (not in UI) |
| 7.5 | Security | sub-nav only | password, 2FA | `POST /partner/settings/security/...` | — | **TBD** |
| 7.6 | Account records | sub-nav only | — | `GET /partner/settings/account-records` | — | **TBD** |
| 7.7 | Placement (team) | sub-nav only | — | `GET /partner/settings/placement` | — | **TBD** |
| 7.8 | Language | client `useLang` | `en` \| `zh` | Include in 7.2 or `PATCH /partner/settings/locale` | — | `{ locale }` |

**Unclear / questions**

- Language: client-only today — persist on partner record?
- Placement / MLM tree — relationship to dashboard volume legs?

---

## 8. Authentication (`/login`)

| # | Page / feature | Current source | UI fields | Proposed endpoint | Request / query | Response schema |
|---|----------------|----------------|-----------|-------------------|-----------------|-----------------|
| 8.1 | Email/password login | form → navigate | `identifier`, `password` | `POST /auth/login` | `{ identifier, password }` | `{ accessToken, refreshToken?, partner: PartnerProfile }` + Set-Cookie option |
| 8.2 | SMS login | button | phone flow | `POST /auth/otp/request`, `POST /auth/otp/verify` | phone, code | same as 8.1 |
| 8.3 | Forgot password | link | — | `POST /auth/password-reset/request` | email or phone | `{ sent: true }` |
| 8.4 | Session / logout | — | — | `POST /auth/logout`, `GET /auth/session` | — | session shape |

**Unclear / questions**

- Cookie-based (web) vs bearer (mobile) — `customFetch` supports bearer via `setAuthTokenGetter`.
- Identifier: single field for email **or** phone — validation rules?

---

## 9. Account activation (`/activate`)

| # | Page / feature | Current source | UI fields | Proposed endpoint | Request / query | Response schema |
|---|----------------|----------------|-----------|-------------------|-----------------|-----------------|
| 9.1 | Load enrollment | `ORDER` constant | `customerId`, `orderId`, `sku`, `sponsor`, `timestamp`, name, email, phone, address, `totalPaid` | `GET /activation/{token}` | token in path | `ActivationEnrollment` |
| 9.2 | Edit verified info | button (no handler) | profile/address fields | `PATCH /activation/{token}` | mutable fields | updated enrollment |
| 9.3 | Create account | password form | `password`, `confirmPassword` | `POST /activation/{token}/complete` | `{ password }` | `{ accessToken, partner }` |
| 9.4 | Activation meta | copy | 24h expiry, one-time | (9.1) | — | `expiresAt`, `usedAt` |

**Unclear / questions**

- Token delivery channel (email/SMS) out of scope for dashboard UI?
- Sponsor display format: string vs structured `{ name, partnerId }`?

---

## 10. Subscriptions (planned — sandbox only)

Route `/subscriptions` redirects in `more-health`; contract still implied by nav + notifications + mockup.

| # | Page / feature | Current source | UI fields | Proposed endpoint | Query params | Response schema |
|---|----------------|----------------|-----------|-------------------|--------------|-----------------|
| 10.1 | Summary | sandbox literals | `activeCount`, `estimatedMrr` | `GET /partner/subscriptions/summary` | — | `SubscriptionSummary` |
| 10.2 | Subscription cards | `SUBSCRIPTIONS` | `id`, `product`, `frequency`, `nextShipDate`, `amount`, `paymentMethod`, `shippingCity`, `status`, `image` | `GET /partner/subscriptions` | `status`, `page` | `PaginatedSubscriptions` |
| 10.3 | Actions | dropdown | edit products, address, payment, skip, pause/resume, cancel | `POST /partner/subscriptions/{id}/...` | per action | **TBD** action responses |

**Status enum:** `Active` | `Paused` (UI) — normalize to lowercase in API.

---

## 11. External / non-API integrations (document only)

| Feature | Current behavior | OpenAPI note |
|---------|------------------|--------------|
| Shop | External Shopify URL in `SIDEBAR_NAV` | Not partner API; deep link only |
| Enroll | External Shopify enrollment page | Not partner API |
| PayView | "View in PayView" on earnings | Partner API may return redirect URL only |
| Global search | UI only | §1.5 — confirm scope before spec |

---

## Suggested OpenAPI path groups (for `openapi.yaml`)

```text
/healthz                          # exists
/auth/login
/auth/otp/request
/auth/otp/verify
/auth/logout
/auth/session
/activation/{token}
/activation/{token}/complete
/partner/me
/partner/wallet/summary
/partner/dashboard/summary
/partner/dashboard/kpis
/partner/dashboard/sales-trend
/partner/dashboard/earnings-trend
/partner/dashboard/volume
/partner/dashboard/activity
/partner/orders
/partner/orders/summary
/partner/orders/export
/partner/orders/{orderId}
/partner/earnings/current
/partner/earnings/statements
/partner/earnings/statements/{statementId}/fapiao
/partner/earnings/statements/{statementId}/performance-report
/partner/earnings/trajectory
/partner/earnings/records
/partner/earnings/leaderboard
/partner/earnings/payview-url
/partner/storefront
/partner/storefront/metrics
/partner/storefront/top-products
/partner/storefront/qr
/partner/notifications
/partner/notifications/summary
/partner/notifications/mark-all-read
/partner/notifications/{notificationId}
/partner/notifications/preferences
/partner/settings/profile
/partner/settings/profile/avatar
/partner/subscriptions
/partner/subscriptions/summary
/partner/search
```

---

## Global open questions (product / backend)

1. **Aggregate vs granular dashboard APIs** — One `GET /partner/dashboard` vs multiple endpoints (matches current UI sections)?
2. **i18n strategy** — Query `?locale=zh`, `Accept-Language`, or bilingual fields (`title` + `titleZh`) as in mocks?
3. **Money representation** — Decimal number vs integer **fen** in JSON?
4. **Pagination standard** — Offset (`page`/`pageSize`) vs cursor; Orders UI uses page in URL.
5. **Idempotency** — Payout notifications reference `PV-2026-04-17-9012`; formalize external reference IDs?
6. **Role-based access** — Single partner role or admin overrides?
7. **Subscriptions route** — Wire sandbox component and spec now, or defer paths until product confirms?
8. **Analytics / Team pages** — Redirect today; any committed metrics for v1?
9. **Error model** — RFC 9457 `application/problem+json` (already accepted in `customFetch`) — define standard problem types.
10. **Webhooks vs poll** — Orders/notifications: real-time needs?

---

## Remix integration notes (future, not in scope)

When wiring production data:

- Prefer Remix `loader` per route calling generated client from `lib/api-client-react`.
- Orders: hydrate loader from `GET /partner/orders` using URL searchParams (`tab`, `search`, `status`, `page`).
- Keep activation and auth routes public (no session cookie).
- Regenerate client after `openapi.yaml` changes: `lib/api-spec/orval.config.ts` → `customFetch`.

---

## Source file index

| Domain | Primary files |
|--------|----------------|
| Routes | `artifacts/more-health/app/routes/*.tsx` |
| Dashboard | `.../Dashboard.tsx` |
| Orders | `.../Orders.tsx` |
| Earnings | `.../Earnings.tsx`, `FapiaoDialog.tsx`, `PerformanceReportDialog.tsx` |
| Storefront | `.../Storefront.tsx` |
| Notifications | `.../Notifications.tsx` |
| Settings | `.../Settings.tsx` |
| Auth | `.../Login.tsx`, `.../ActivateAccount.tsx` |
| Shell | `.../_shared/sidebar.mock.ts`, `Sidebar.tsx`, `TopHeader.tsx` |
| Subscriptions (mock) | `artifacts/mockup-sandbox/.../Subscriptions.tsx` |
| API scaffold | `lib/api-spec/openapi.yaml`, `artifacts/api-server/src/routes/health.ts` |
