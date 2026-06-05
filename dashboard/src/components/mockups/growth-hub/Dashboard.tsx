import "./_group.css";
import React, { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { AppLayout } from "./_shared/AppLayout";
import { Kpi } from "./_shared/Kpi";
import { Sparkline } from "./_shared/Sparkline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLang } from "@/lib/i18n";
import { formatDayShort, formatWeekRange, formatTimestamp } from "@/lib/dates";

type SalesDayRaw = { date: string; value: number };
type EarningsWeekRaw = { startDate: string; endDate: string; value: number };
type ActivityItem = {
  id: number;
  type: string;
  amount?: string;
  timestamp: string;
  avatar: string;
};

type CurrentPeriod = { startDate: string; endDate: string; prevStartDate: string; prevEndDate: string };

type LoaderData = {
  salesData: SalesDayRaw[];
  earningsData: EarningsWeekRaw[];
  activityFeed: ActivityItem[];
  currentPeriod: CurrentPeriod;
};

export function Dashboard() {
  const { salesData, earningsData, activityFeed, currentPeriod } = useLoaderData<LoaderData>();
  const [timeRange, setTimeRange] = useState("7");
  const { lang, t } = useLang();

  const SALES_DATA = salesData.map((d) => ({ name: formatDayShort(d.date, lang), value: d.value }));
  const EARNINGS_DATA = earningsData.map((d) => ({ name: formatWeekRange(d.startDate, d.endDate, lang), value: d.value }));

  return (
    <AppLayout activeId="dashboard">
      <div className="space-y-6">

        {/* HERO CARD */}
        <div className="bg-gradient-to-br from-primary via-primary to-[#064e3b] rounded-2xl p-6 sm:p-8 text-primary-foreground shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start gap-6 xl:gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
                {t("dashboard.hero.welcome", { name: "Matt" })}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  {t("dashboard.hero.rank")}
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-foreground/90">
                  <span>{formatWeekRange(currentPeriod.startDate, currentPeriod.endDate, lang)}</span>
                  <span className="text-primary-foreground/60">{t("common.vsPeriod", { range: formatWeekRange(currentPeriod.prevStartDate, currentPeriod.prevEndDate, lang) })}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-black/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 w-full xl:w-auto">
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-primary-foreground/70 text-xs sm:text-sm font-medium whitespace-nowrap">{t("dashboard.hero.walletBalance")}</span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold display-num tabular-nums tracking-tight">¥12,480</span>
              </div>
              <div className="flex flex-col gap-1 min-w-0 sm:border-l sm:border-white/20 sm:pl-6">
                <span className="text-primary-foreground/70 text-xs sm:text-sm font-medium whitespace-nowrap">{t("dashboard.hero.weeklyEarnings")}</span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold display-num tabular-nums tracking-tight">¥3,248</span>
              </div>
              <div className="flex flex-col gap-1 min-w-0 sm:border-l sm:border-white/20 sm:pl-6">
                <span className="text-primary-foreground/70 text-xs sm:text-sm font-medium whitespace-nowrap">{t("dashboard.hero.ordersGenerated")}</span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold display-num tabular-nums tracking-tight">142</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 ROWS OF 4 KPIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi label={t("dashboard.kpi.totalOrders")} value="84" delta="+12.4%" sparkline={<Sparkline color="#10b981" data={[5, 10, 15, 12, 18, 25, 20]}/>} />
          <Kpi label={t("dashboard.kpi.referredOrders")} value="62" delta="+8.2%" sparkline={<Sparkline color="#10b981" data={[3, 5, 8, 12, 15, 10, 14]}/>} />
          <Kpi label={t("dashboard.kpi.personalOrders")} value="22" delta="-2.1%" trend="down" sparkline={<Sparkline color="#ef4444" data={[10, 8, 5, 6, 4, 3, 2]}/>} />
          <Kpi label={t("dashboard.kpi.repeatCustomers")} value="68%" delta="+5.4%" sparkline={<Sparkline color="#10b981" data={[40, 45, 50, 55, 60, 65, 68]}/>} />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-sm rounded-2xl border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">{t("dashboard.charts.salesTrend")}</CardTitle>
              <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg border border-border/50">
                {['7', '30', '90'].map(d => (
                  <button
                    key={d}
                    onClick={() => setTimeRange(d)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeRange === d ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {d} {t("common.days")}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SALES_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dx={-10} tickFormatter={(val) => `¥${val}`} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ color: '#6b7280', marginBottom: '4px' }}
                      itemStyle={{ color: '#111827', fontWeight: 600 }}
                      formatter={(val) => [`¥${val}`, t("dashboard.charts.sales")]}
                    />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">{t("dashboard.charts.earningsGrowth")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={EARNINGS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} interval={0} />
                    <Tooltip
                      cursor={{ fill: '#f3f4f6' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(val) => [`¥${val}`, t("common.earnings")]}
                      labelFormatter={(label) => t("dashboard.charts.weekOf", { label })}
                    />
                    <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm rounded-2xl border-border/50">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-lg font-semibold">{t("dashboard.volume.title")}</CardTitle>
              <span className="text-xs text-muted-foreground">{t("common.thisWeek")}</span>
            </CardHeader>
            <CardContent>
              <div className="text-center pb-5 border-b border-border/50">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{t("dashboard.volume.totalVolume")}</p>
                <p className="text-4xl font-display font-bold tabular-nums tracking-tight mt-1">¥84,620</p>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-2 bg-primary/10 px-2.5 py-0.5 rounded-full">
                  +12.4% {t("common.vsLastWeek")}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5">
                <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{t("dashboard.volume.leftLeg")}</span>
                    <span className="text-[10px] font-semibold text-primary">{t("dashboard.volume.payLeg")}</span>
                  </div>
                  <p className="text-2xl font-display font-bold tabular-nums text-foreground">¥36,180</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">43% {t("dashboard.volume.ofTotal")}</p>
                  <div className="h-1.5 bg-card rounded-full mt-3 overflow-hidden border border-border/50">
                    <div className="h-full bg-primary rounded-full" style={{ width: "43%" }} />
                  </div>
                </div>

                <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{t("dashboard.volume.rightLeg")}</span>
                    <span className="text-[10px] font-semibold text-amber-600">{t("dashboard.volume.carryOver")}</span>
                  </div>
                  <p className="text-2xl font-display font-bold tabular-nums text-foreground">¥48,440</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">57% {t("dashboard.volume.ofTotal")}</p>
                  <div className="h-1.5 bg-card rounded-full mt-3 overflow-hidden border border-border/50">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "57%" }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50 text-xs">
                <span className="text-muted-foreground">{t("dashboard.volume.carryOverToNext")}</span>
                <span className="font-semibold tabular-nums text-foreground">¥12,260</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl border-border/50">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-lg font-semibold">{t("dashboard.activity.title")}</CardTitle>
              <button className="text-sm font-medium text-primary hover:underline">{t("common.viewAll")}</button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activityFeed.map((item) => {
                  const text = t(`dashboard.activity.${item.id}.text`);
                  const amountDisplay = item.amount
                    ? item.type === "purchase"
                      ? `${item.amount} ${t("common.commission")}`
                      : item.amount
                    : "";
                  const time = formatTimestamp(item.timestamp, lang);
                  return (
                    <div key={item.id} className="flex items-start gap-4">
                      <Avatar className="w-10 h-10 border border-border bg-secondary flex items-center justify-center text-sm font-semibold text-muted-foreground">
                        {item.avatar}
                      </Avatar>
                      <div className="flex-1 flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium leading-tight">{text}</p>
                          <span className="text-xs text-muted-foreground">{time}</span>
                        </div>
                        {amountDisplay && (
                          <span className={`text-sm font-semibold tabular-nums ${amountDisplay.includes('+') ? 'text-primary' : 'text-foreground'}`}>
                            {amountDisplay}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
}
