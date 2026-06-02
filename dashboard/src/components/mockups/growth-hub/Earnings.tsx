import "./_group.css";
import React, { useState } from "react";
import { AppLayout } from "./_shared/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, TrendingUp, Award, Trophy, Medal, FileText, BarChart3 } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { useLang } from "@/lib/i18n";
import { FapiaoDialog, type FapiaoData } from "./_shared/FapiaoDialog";
import { PerformanceReportDialog, type PerformanceData } from "./_shared/PerformanceReportDialog";

type WeeklyEarning = {
  date: string;
  dateZh: string;
  weekRange: string;
  weekRangeZh: string;
  gross: number;
  net: number;
  rank: "Gold" | "Silver" | "Bronze";
  fapiao: FapiaoData;
  metrics: PerformanceData;
};

const WEEKLY_EARNINGS: WeeklyEarning[] = [
  {
    date: "Apr 17, 2026",
    dateZh: "2026年4月17日",
    weekRange: "Apr 11 – Apr 17, 2026",
    weekRangeZh: "2026年4月11日 – 4月17日",
    gross: 3456.91,
    net: 3248.50,
    rank: "Gold",
    fapiao: {
      code: "144032500110",
      number: "00498372",
      date: "2026-04-18",
      checkCode: "9 4823 7912 8345 0917",
      taxableAmount: 3064.62,
      taxAmount: 183.88,
      taxRate: 0.06,
      net: 3248.50,
      weekLabel: "2026年4月11日 – 4月17日",
    },
    metrics: {
      weekLabel: "Apr 11 – Apr 17, 2026",
      weekLabelZh: "2026年4月11日 – 4月17日",
      net: 3248.50,
      gross: 3456.91,
      storeViews: 4280,
      uniqueVisitors: 2812,
      avgSession: "2:48",
      reviews: 38,
      rating: 4.8,
      orders: 18,
      conversion: 0.042,
      social: { wechat: 124000, xhs: 86400, douyin: 192000 },
      topContent: [
        { title: "How SomaDerm transformed my morning ritual", titleZh: "SomaDerm 如何改变我的早晨仪式", platform: "wechat", views: 48200, orders: 9, revenue: 1284.40 },
        { title: "30-day Revitalize Eye Cream review", titleZh: "焕颜眼霜 30 天测评", platform: "xhs", views: 32100, orders: 5, revenue: 826.00 },
        { title: "Quick wellness routine before work", titleZh: "上班前的快速健康仪式", platform: "douyin", views: 78400, orders: 4, revenue: 1138.10 },
      ],
      breakdown: { direct: 1846.30, referred: 1280.61, bonus: 330.00 },
      vsLast: 0.184,
    },
  },
  {
    date: "Apr 10, 2026",
    dateZh: "2026年4月10日",
    weekRange: "Apr 4 – Apr 10, 2026",
    weekRangeZh: "2026年4月4日 – 4月10日",
    gross: 2918.09,
    net: 2743.00,
    rank: "Gold",
    fapiao: {
      code: "144032500110",
      number: "00498141",
      date: "2026-04-11",
      checkCode: "8 1730 4612 9982 4413",
      taxableAmount: 2587.74,
      taxAmount: 155.26,
      taxRate: 0.06,
      net: 2743.00,
      weekLabel: "2026年4月4日 – 4月10日",
    },
    metrics: {
      weekLabel: "Apr 4 – Apr 10, 2026",
      weekLabelZh: "2026年4月4日 – 4月10日",
      net: 2743.00,
      gross: 2918.09,
      storeViews: 3680,
      uniqueVisitors: 2410,
      avgSession: "2:32",
      reviews: 31,
      rating: 4.7,
      orders: 15,
      conversion: 0.041,
      social: { wechat: 98000, xhs: 71200, douyin: 154800 },
      topContent: [
        { title: "Why I switched to TRi-M*LT", titleZh: "为什么我换成了 TRi-M*LT", platform: "douyin", views: 62100, orders: 6, revenue: 992.40 },
        { title: "Self-care Sunday haul", titleZh: "周日护理好物分享", platform: "xhs", views: 41800, orders: 4, revenue: 738.20 },
        { title: "Office wellness essentials", titleZh: "办公室必备健康好物", platform: "wechat", views: 36400, orders: 5, revenue: 1012.40 },
      ],
      breakdown: { direct: 1532.10, referred: 1146.99, bonus: 239.00 },
      vsLast: 0.106,
    },
  },
  {
    date: "Apr 03, 2026",
    dateZh: "2026年4月3日",
    weekRange: "Mar 28 – Apr 3, 2026",
    weekRangeZh: "2026年3月28日 – 4月3日",
    gross: 2638.30,
    net: 2480.00,
    rank: "Silver",
    fapiao: {
      code: "144032500110",
      number: "00497908",
      date: "2026-04-04",
      checkCode: "7 0291 6634 5128 8801",
      taxableAmount: 2339.62,
      taxAmount: 140.38,
      taxRate: 0.06,
      net: 2480.00,
      weekLabel: "2026年3月28日 – 4月3日",
    },
    metrics: {
      weekLabel: "Mar 28 – Apr 3, 2026",
      weekLabelZh: "2026年3月28日 – 4月3日",
      net: 2480.00,
      gross: 2638.30,
      storeViews: 3320,
      uniqueVisitors: 2188,
      avgSession: "2:18",
      reviews: 24,
      rating: 4.7,
      orders: 13,
      conversion: 0.039,
      social: { wechat: 84200, xhs: 64100, douyin: 138900 },
      topContent: [
        { title: "Spring wellness reset routine", titleZh: "春季健康重启计划", platform: "xhs", views: 38900, orders: 5, revenue: 942.00 },
        { title: "Rose & Cole unboxing", titleZh: "Rose & Cole 开箱体验", platform: "wechat", views: 28100, orders: 3, revenue: 768.00 },
        { title: "Quick before/after", titleZh: "30 秒前后对比", platform: "douyin", views: 54200, orders: 5, revenue: 770.00 },
      ],
      breakdown: { direct: 1420.00, referred: 990.30, bonus: 228.00 },
      vsLast: 0.234,
    },
  },
  {
    date: "Mar 27, 2026",
    dateZh: "2026年3月27日",
    weekRange: "Mar 21 – Mar 27, 2026",
    weekRangeZh: "2026年3月21日 – 3月27日",
    gross: 2138.30,
    net: 2010.00,
    rank: "Silver",
    fapiao: {
      code: "144032500110",
      number: "00497682",
      date: "2026-03-28",
      checkCode: "6 5104 8217 3360 0094",
      taxableAmount: 1896.23,
      taxAmount: 113.77,
      taxRate: 0.06,
      net: 2010.00,
      weekLabel: "2026年3月21日 – 3月27日",
    },
    metrics: {
      weekLabel: "Mar 21 – Mar 27, 2026",
      weekLabelZh: "2026年3月21日 – 3月27日",
      net: 2010.00,
      gross: 2138.30,
      storeViews: 2914,
      uniqueVisitors: 1942,
      avgSession: "2:11",
      reviews: 19,
      rating: 4.6,
      orders: 11,
      conversion: 0.038,
      social: { wechat: 71800, xhs: 52900, douyin: 118600 },
      topContent: [
        { title: "Morning wellness Q&A", titleZh: "早晨健康答疑", platform: "wechat", views: 24600, orders: 4, revenue: 642.00 },
        { title: "Eye cream before/after", titleZh: "眼霜前后对比", platform: "xhs", views: 31200, orders: 4, revenue: 658.00 },
        { title: "Day in my life", titleZh: "我的一天", platform: "douyin", views: 48100, orders: 3, revenue: 710.00 },
      ],
      breakdown: { direct: 1162.00, referred: 802.30, bonus: 174.00 },
      vsLast: -0.04,
    },
  },
];

const CHART_DATA = [
  { name: 'W1', value: 2010 },
  { name: 'W2', value: 2480 },
  { name: 'W3', value: 2743 },
  { name: 'W4', value: 3248.50 },
];

export function Earnings() {
  const { lang, t } = useLang();
  const [fapiaoOpen, setFapiaoOpen] = useState<WeeklyEarning | null>(null);
  const [reportOpen, setReportOpen] = useState<WeeklyEarning | null>(null);

  const rankLabel = (r: string) => r === "Gold" ? t("Gold", "金牌") : r === "Silver" ? t("Silver", "银牌") : r;

  return (
    <AppLayout activeId="earnings">
      <div className="space-y-6">

        <div className="bg-gradient-to-br from-[#064e3b] via-[#022c1b] to-black rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[320px]">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10 flex flex-col items-center text-center mt-4">
            <span className="text-emerald-100/70 font-medium tracking-wide mb-2 uppercase text-sm">
              {t("This Week Net Paid", "本周净收入")}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tabular-nums tracking-tighter mb-4 break-all">¥3,248.50</h1>
            <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-500/30 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4" />
              {t("+18.4% vs last week", "环比上周 +18.4%")}
            </div>
          </div>

          <div className="relative z-10 flex justify-center mt-12">
            <Button
              onClick={() => setReportOpen(WEEKLY_EARNINGS[0])}
              className="bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl px-8 h-12 font-semibold shadow-lg text-base group"
            >
              {t("View in PayView", "在 PayView 查看")} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-display font-semibold mb-4 text-foreground">{t("Weekly Statements", "每周对账单")}</h2>
            <div className="space-y-4">
              {WEEKLY_EARNINGS.map((week, idx) => (
                <Card key={idx} className="shadow-sm border-border/50 rounded-2xl bg-card hover:shadow-md transition-shadow overflow-hidden">
                  <div className="flex flex-col p-5 gap-5">
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground border border-border/50 shrink-0">
                          {idx === 0 ? <Medal className="w-6 h-6 text-amber-500" /> : <Award className="w-6 h-6" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-base sm:text-lg">
                            {t(`Week of ${week.date}`, `${week.dateZh} 当周`)}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <span className="bg-secondary px-2 py-0.5 rounded">{rankLabel(week.rank)}</span>
                            <span>{t(`Gross: ¥${week.gross.toFixed(2)}`, `毛收入：¥${week.gross.toFixed(2)}`)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-border/50">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{t("Net Paid", "净到账")}</p>
                          <p className="font-bold text-xl tabular-nums text-foreground">¥{week.net.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => setFapiaoOpen(week)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 h-10 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-sm font-semibold transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{t("Fapiao 发票", "查看发票 Fapiao")}</span>
                      </button>
                      <button
                        onClick={() => setReportOpen(week)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 h-10 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 border border-primary/20 text-sm font-semibold transition-colors"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>{t("Performance Report", "绩效报告")}</span>
                      </button>
                      <button
                        className="ml-auto inline-flex items-center justify-center gap-1.5 px-3 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary text-xs font-medium transition-colors"
                      >
                        {t("Statement detail", "对账详情")} <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full h-12 rounded-xl border-border/60 bg-card hover:bg-secondary">
              {t("View Past Statements", "查看历史对账单")}
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm border-border/50 rounded-2xl bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">{t("Earnings Trajectory", "收入走势")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[180px] w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CHART_DATA} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(val) => [`¥${val}`, t("Net", "净额")]}
                        labelStyle={{ color: '#6b7280' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#colorNet)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-amber-500/20 rounded-2xl bg-gradient-to-b from-amber-500/10 to-transparent">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg text-amber-900 dark:text-amber-500">{t("Best Month Ever", "史上最佳月份")}</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-display font-bold tabular-nums text-foreground">¥14,280.00</p>
                  <p className="text-sm font-medium text-amber-600/80">{t("+42% YoY Growth", "同比增长 +42%")}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  {t("April is tracking to be your highest earning month since joining.", "4月有望成为你入驻以来收入最高的月份。")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-secondary border border-border/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg text-foreground">
              {t("You earned more than 72% of active partners this month", "你的收入超过本月 72% 的活跃伙伴")}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t("Keep going — Platinum tier is just a few referrals away.", "再接再厉 — 距离白金等级仅差几位推荐。")}
            </p>
          </div>
          <div className="w-full sm:w-64 h-3 bg-card rounded-full overflow-hidden border border-border/50">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 w-[72%] rounded-full relative">
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
            </div>
          </div>
        </div>
      </div>

      {fapiaoOpen && (
        <FapiaoDialog open={true} onOpenChange={(o) => !o && setFapiaoOpen(null)} data={fapiaoOpen.fapiao} />
      )}
      {reportOpen && (
        <PerformanceReportDialog open={true} onOpenChange={(o) => !o && setReportOpen(null)} data={reportOpen.metrics} />
      )}
    </AppLayout>
  );
}
