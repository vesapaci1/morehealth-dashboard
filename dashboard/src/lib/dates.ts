import type { Lang } from "./i18n";

// Parse a date-only ISO string at UTC noon to avoid day-boundary shifts.
function utcNoon(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00Z`);
}

/** "Mon" / "周一" — short weekday from a date-only ISO string. */
export function formatDayShort(isoDate: string, lang: Lang): string {
  return utcNoon(isoDate).toLocaleDateString(
    lang === "zh" ? "zh-CN" : "en-US",
    { weekday: "short", timeZone: "UTC" },
  );
}

/** "Apr 11 – Apr 17, 2026" / "2026年4月11日 – 4月17日" */
export function formatWeekRange(startDate: string, endDate: string, lang: Lang): string {
  const s = utcNoon(startDate);
  const e = utcNoon(endDate);
  if (lang === "zh") {
    const yr = e.getUTCFullYear();
    const zhDay = (d: Date) => `${d.getUTCMonth() + 1}月${d.getUTCDate()}日`;
    return `${yr}年${zhDay(s)} – ${zhDay(e)}`;
  }
  const enShort = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  return `${enShort(s)} – ${enShort(e)}, ${e.getUTCFullYear()}`;
}

/** "Apr 17, 2026" / "2026年4月17日" */
export function formatDate(isoDate: string, lang: Lang): string {
  const d = utcNoon(isoDate);
  if (lang === "zh") {
    return `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`;
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** "Apr 17 · 2:14 PM" / "4月17日 14:14" from a full ISO timestamp. */
export function formatTimestamp(isoString: string, lang: Lang): string {
  return new Date(isoString).toLocaleString(
    lang === "zh" ? "zh-CN" : "en-US",
    { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Shanghai" },
  );
}
