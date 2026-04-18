import "./_group.css";
import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { Kpi } from "./_shared/Kpi";
import { Sparkline } from "./_shared/Sparkline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLang } from "@/lib/i18n";

export function Dashboard() {
  const [timeRange, setTimeRange] = useState("7");
  const { t } = useLang();

  const SALES_DATA = [
    { name: t("Mon", "周一"), value: 4000 },
    { name: t("Tue", "周二"), value: 3000 },
    { name: t("Wed", "周三"), value: 5000 },
    { name: t("Thu", "周四"), value: 2780 },
    { name: t("Fri", "周五"), value: 6890 },
    { name: t("Sat", "周六"), value: 8390 },
    { name: t("Sun", "周日"), value: 10490 },
  ];

  const EARNINGS_DATA = [
    { name: t("Mar 23–29", "3月23–29日"), value: 1200 },
    { name: t("Mar 30–Apr 5", "3月30–4月5日"), value: 1500 },
    { name: t("Apr 6–12", "4月6–12日"), value: 1800 },
    { name: t("Apr 13–19", "4月13–19日"), value: 2200 },
  ];

  const ACTIVITY_FEED = [
    { id: 1, type: 'purchase', text: t("John bought SomaDerm Transdermal Gel", "John 购买了 SomaDerm 透皮凝胶"), amount: t("+¥244.80 commission", "+¥244.80 佣金"), time: t("Today, 2:14 PM · 2h ago", "今天 14:14 · 2 小时前"), avatar: 'J' },
    { id: 2, type: 'subscription', text: t("Lisa subscribed monthly to Revitalize Eye Cream", "Lisa 订阅了焕颜眼霜（月度）"), time: t("Today, 11:02 AM · 5h ago", "今天 11:02 · 5 小时前"), avatar: 'L' },
    { id: 3, type: 'payout', text: t("Wallet payout sent", "钱包打款完成"), amount: '¥3,200', time: t("Yesterday, 6:48 PM", "昨天 18:48"), avatar: 'MH' },
  ];

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
                {t("Welcome back, Matt", "欢迎回来，Matt")}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  {t("Elite Influencer", "精英影响者")}
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-foreground/90">
                  <span>{t("Apr 11 – Apr 17, 2026", "2026年4月11日 – 4月17日")}</span>
                  <span className="text-primary-foreground/60">{t("vs. Apr 4 – Apr 10", "对比 4月4日 – 4月10日")}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-black/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 w-full xl:w-auto">
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-primary-foreground/70 text-xs sm:text-sm font-medium whitespace-nowrap">{t("Wallet Balance", "钱包余额")}</span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold display-num tabular-nums tracking-tight">¥12,480</span>
              </div>
              <div className="flex flex-col gap-1 min-w-0 sm:border-l sm:border-white/20 sm:pl-6">
                <span className="text-primary-foreground/70 text-xs sm:text-sm font-medium whitespace-nowrap">{t("Weekly Earnings", "每周收入")}</span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold display-num tabular-nums tracking-tight">¥3,248</span>
              </div>
              <div className="flex flex-col gap-1 min-w-0 sm:border-l sm:border-white/20 sm:pl-6">
                <span className="text-primary-foreground/70 text-xs sm:text-sm font-medium whitespace-nowrap">{t("Orders Generated", "已产生订单")}</span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold display-num tabular-nums tracking-tight">142</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 ROWS OF 4 KPIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi label={t("Total Orders", "订单总数")} value="84" delta="+12.4%" sparkline={<Sparkline color="#10b981" data={[5, 10, 15, 12, 18, 25, 20]}/>} />
          <Kpi label={t("Referred Orders", "推荐订单")} value="62" delta="+8.2%" sparkline={<Sparkline color="#10b981" data={[3, 5, 8, 12, 15, 10, 14]}/>} />
          <Kpi label={t("Personal Orders", "个人订单")} value="22" delta="-2.1%" trend="down" sparkline={<Sparkline color="#ef4444" data={[10, 8, 5, 6, 4, 3, 2]}/>} />
          <Kpi label={t("Repeat Customers", "复购客户")} value="68%" delta="+5.4%" sparkline={<Sparkline color="#10b981" data={[40, 45, 50, 55, 60, 65, 68]}/>} />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-sm rounded-2xl border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">{t("Sales Trend", "销售趋势")}</CardTitle>
              <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg border border-border/50">
                {['7', '30', '90'].map(d => (
                  <button
                    key={d}
                    onClick={() => setTimeRange(d)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeRange === d ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {d} {t("Days", "天")}
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
                      formatter={(val) => [`¥${val}`, t("Sales", "销售")]}
                    />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">{t("Earnings Growth", "收入增长")}</CardTitle>
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
                      formatter={(val) => [`¥${val}`, t("Earnings", "收入")]}
                      labelFormatter={(label) => t(`Week of ${label}`, `${label} 当周`)}
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
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{t("Traffic Sources", "流量来源")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: t("WeChat", "微信"), value: 45, color: 'bg-emerald-500' },
                { name: t("Xiaohongshu", "小红书"), value: 30, color: 'bg-red-500' },
                { name: t("Douyin", "抖音"), value: 15, color: 'bg-black' },
                { name: t("Direct Link", "直接链接"), value: 10, color: 'bg-gray-400' },
              ].map((item) => (
                <div key={item.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="font-bold tabular-nums">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm rounded-2xl border-border/50">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-lg font-semibold">{t("Recent Activity", "最近动态")}</CardTitle>
              <button className="text-sm font-medium text-primary hover:underline">{t("View All", "查看全部")}</button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {ACTIVITY_FEED.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 border border-border bg-secondary flex items-center justify-center text-sm font-semibold text-muted-foreground">
                      {item.avatar}
                    </Avatar>
                    <div className="flex-1 flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium leading-tight">{item.text}</p>
                        <span className="text-xs text-muted-foreground">{item.time}</span>
                      </div>
                      {item.amount && (
                        <span className={`text-sm font-semibold tabular-nums ${item.amount.includes('+') ? 'text-primary' : 'text-foreground'}`}>
                          {item.amount}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
}
