import "./_group.css";
import React, { useState, useMemo } from "react";
import { useLoaderData } from "@remix-run/react";
import { AppLayout } from "./_shared/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ShoppingBag,
  Wallet,
  Repeat,
  Trophy,
  Megaphone,
  Settings as SettingsIcon,
  CheckCheck,
  Filter,
  Bell,
  Mail,
  Smartphone,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { formatTimestamp } from "@/lib/dates";

type Category = "order" | "payout" | "subscription" | "milestone" | "announcement";

type Notification = {
  id: string;
  category: Category;
  timestamp: string;
  unread: boolean;
  amount?: string;
  actor?: { initials: string; tone: string };
};

type LoaderData = { notifications: Notification[] };

export function Notifications() {
  const { notifications: initialNotifications } = useLoaderData<LoaderData>();
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<"all" | "unread" | Category>("all");
  const [items, setItems] = useState(initialNotifications);

  const CATEGORY_META: Record<
    Category,
    { label: string; Icon: React.ComponentType<{ className?: string }>; tint: string; ring: string }
  > = useMemo(() => ({
    order:        { label: t("notifications.categories.orders"),        Icon: ShoppingBag, tint: "bg-emerald-50 text-emerald-700", ring: "ring-emerald-200" },
    payout:       { label: t("notifications.categories.payouts"),       Icon: Wallet,      tint: "bg-amber-50 text-amber-700",   ring: "ring-amber-200" },
    subscription: { label: t("notifications.categories.subscriptions"), Icon: Repeat,      tint: "bg-violet-50 text-violet-700", ring: "ring-violet-200" },
    milestone:    { label: t("notifications.categories.milestones"),    Icon: Trophy,      tint: "bg-rose-50 text-rose-700",     ring: "ring-rose-200" },
    announcement: { label: t("notifications.categories.announcements"), Icon: Megaphone,   tint: "bg-sky-50 text-sky-700",       ring: "ring-sky-200" },
  }), [t]);

  const FILTERS: { id: "all" | "unread" | Category; label: string }[] = [
    { id: "all",          label: t("common.all") },
    { id: "unread",       label: t("notifications.filters.unread") },
    { id: "order",        label: t("notifications.categories.orders") },
    { id: "payout",       label: t("notifications.categories.payouts") },
    { id: "subscription", label: t("notifications.categories.subscriptions") },
    { id: "milestone",    label: t("notifications.categories.milestones") },
    { id: "announcement", label: t("notifications.categories.announcements") },
  ];

  type Channel = "push" | "email" | "sms";
  const PREFS: { id: string; label: string; channels: readonly Channel[] }[] = [
    { id: "orders",     label: t("notifications.prefs.newOrders"),            channels: ["push", "email"] },
    { id: "payouts",    label: t("notifications.prefs.payoutsWallet"),        channels: ["push", "email", "sms"] },
    { id: "subs",       label: t("notifications.prefs.subscriptionRenewals"), channels: ["push", "email"] },
    { id: "milestones", label: t("notifications.prefs.milestonesRankUps"),    channels: ["push"] },
    { id: "marketing",  label: t("notifications.prefs.marketingCampaigns"),   channels: ["email"] },
  ];

  const unreadCount = items.filter((n) => n.unread).length;
  const visible = items.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return n.unread;
    return n.category === filter;
  });

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  const toggleRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));

  return (
    <AppLayout activeId="notifications">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center ring-1 ring-primary/20">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold tracking-tight">{t("notifications.title")}</h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {unreadCount > 0 ? (
                  <>
                    <span className="text-foreground font-medium">
                      {t("notifications.unreadCount", { count: unreadCount })}
                    </span>
                    <span className="mx-1.5">·</span>
                    {t("notifications.updatedJustNow")}
                  </>
                ) : (
                  t("notifications.allCaughtUp")
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="rounded-xl h-10 gap-2 bg-card border-border/60">
              <Filter className="w-4 h-4" /> {t("notifications.actions.filters")}
            </Button>
            <Button
              variant="outline"
              className="rounded-xl h-10 gap-2 bg-card border-border/60"
              onClick={markAllRead}
            >
              <CheckCheck className="w-4 h-4" /> {t("notifications.actions.markAllRead")}
            </Button>
            <Button className="rounded-xl h-10 gap-2 shadow-sm">
              <SettingsIcon className="w-4 h-4" /> {t("notifications.actions.settings")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`px-3 h-8 rounded-full text-xs font-medium transition-all border ${
                      active
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card text-muted-foreground border-border/60 hover:text-foreground"
                    }`}
                  >
                    {f.label}
                    {f.id === "unread" && unreadCount > 0 && (
                      <span className={`ml-1.5 ${active ? "opacity-80" : "text-primary"}`}>{unreadCount}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <Card className="shadow-sm border-border/50 rounded-2xl bg-card overflow-hidden">
              <div className="divide-y divide-border/50">
                {visible.length === 0 && (
                  <div className="p-10 text-center text-muted-foreground text-sm">
                    {t("notifications.empty")}
                  </div>
                )}
                {visible.map((n) => {
                  const meta = CATEGORY_META[n.category];
                  const Icon = meta.Icon;
                  return (
                    <button
                      key={n.id}
                      onClick={() => toggleRead(n.id)}
                      className={`w-full text-left p-5 flex items-start gap-4 hover:bg-secondary/30 transition-colors relative ${
                        n.unread ? "bg-primary/[0.03]" : ""
                      }`}
                    >
                      {n.unread && (
                        <span className="absolute left-2 top-7 w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ring-1 ${meta.tint} ${meta.ring}`}
                      >
                        {n.actor ? (
                          <span className="text-sm font-semibold">{n.actor.initials}</span>
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p
                              className={`text-sm leading-snug ${
                                n.unread ? "font-semibold text-foreground" : "font-medium text-foreground/90"
                              }`}
                            >
                              {t(`notifications.items.${n.id}.title`)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {t(`notifications.items.${n.id}.detail`)}
                            </p>
                          </div>
                          {n.amount && (
                            <span
                              className={`text-sm font-semibold tabular-nums shrink-0 ${
                                n.amount.startsWith("+") ? "text-primary" : "text-foreground"
                              }`}
                            >
                              {n.amount}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase tracking-wider font-semibold border-border/60 bg-card text-muted-foreground"
                          >
                            {meta.label}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground">
                            {formatTimestamp(n.timestamp, lang)}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="p-4 border-t border-border/50 flex items-center justify-between bg-secondary/20">
                <span className="text-xs text-muted-foreground">
                  {t("notifications.showing", { visible: visible.length, total: items.length })}
                </span>
                <Button variant="ghost" size="sm" className="text-primary text-xs h-8 hover:bg-primary/10">
                  {t("notifications.loadOlder")}
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm border-border/50 rounded-2xl bg-card p-6 space-y-5">
              <div>
                <h3 className="font-display font-semibold text-base text-foreground">{t("notifications.prefs.title")}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{t("notifications.prefs.subtitle")}</p>
              </div>
              <div className="space-y-4">
                {PREFS.map((p) => (
                  <div key={p.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{p.label}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                        {p.channels.includes("push") && (
                          <span className="inline-flex items-center gap-1">
                            <Bell className="w-3 h-3" /> {t("notifications.channels.push")}
                          </span>
                        )}
                        {p.channels.includes("email") && (
                          <span className="inline-flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {t("notifications.channels.email")}
                          </span>
                        )}
                        {p.channels.includes("sms") && (
                          <span className="inline-flex items-center gap-1">
                            <Smartphone className="w-3 h-3" /> {t("notifications.channels.sms")}
                          </span>
                        )}
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full rounded-xl h-10 bg-card border-border/60">
                {t("notifications.prefs.openSettings")}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
