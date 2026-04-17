import "./_group.css";
import React from "react";
import { AppLayout } from "./_shared/AppLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Download, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useLang } from "@/lib/i18n";

const ORDERS = [
  { id: "ORD-902-18X", customer: "Lei Wang 王磊", product: "SomaDerm Transdermal Gel", date: "Oct 24, 2023", amount: "¥1,224.00", commission: "¥244.80", status: "Delivered", tracking: "SF1029384756" },
  { id: "ORD-902-17X", customer: "Jing Chen 陈静", product: "Revitalize Eye Cream", date: "Oct 23, 2023", amount: "¥560.00", commission: "¥112.00", status: "Shipped", tracking: "SF1029384755" },
  { id: "ORD-902-16X", customer: "Wei Zhang 张伟", product: "Rose & Cole Luxe Set", date: "Oct 22, 2023", amount: "¥3,384.00", commission: "¥676.80", status: "Paid", tracking: "Pending" },
  { id: "ORD-902-15X", customer: "Li Li 李丽", product: "TRi-M*LT Liquid Shot", date: "Oct 20, 2023", amount: "¥828.00", commission: "¥165.60", status: "Delivered", tracking: "SF1029384751" },
  { id: "ORD-902-14X", customer: "Hua Liu 刘华", product: "SomaDerm Transdermal Gel", date: "Oct 19, 2023", amount: "¥1,224.00", commission: "¥244.80", status: "Delivered", tracking: "SF1029384749" },
];

export function Orders() {
  const { t } = useLang();
  const statusLabel = (s: string) =>
    s === "Delivered" ? t("Delivered", "已送达") :
    s === "Shipped" ? t("Shipped", "已发货") :
    s === "Paid" ? t("Paid", "已付款") : s;
  const trackingLabel = (tk: string) => tk === "Pending" ? t("Pending", "待发货") : tk;

  return (
    <AppLayout activeId="orders">
      <div className="space-y-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight">{t("Orders", "订单")}</h1>
            <p className="text-muted-foreground text-sm">
              {t("Manage and track your customer and personal orders.", "管理并追踪你的客户订单与个人订单。")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 shadow-sm bg-card hover:bg-secondary rounded-xl">
              <Download className="w-4 h-4" /> {t("Export CSV", "导出 CSV")}
            </Button>
            <Button className="gap-2 shadow-sm rounded-xl bg-primary text-primary-foreground">
              {t("New Order", "新建订单")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm border-border/50 rounded-2xl bg-card">
            <div className="p-5 flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">{t("Orders this month", "本月订单")}</span>
              <span className="text-3xl font-bold display-num tabular-nums tracking-tight">128</span>
            </div>
          </Card>
          <Card className="shadow-sm border-border/50 rounded-2xl bg-card">
            <div className="p-5 flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">{t("Commission earned", "已赚佣金")}</span>
              <span className="text-3xl font-bold display-num tabular-nums tracking-tight">¥14,280</span>
            </div>
          </Card>
          <Card className="shadow-sm border-border/50 rounded-2xl bg-card">
            <div className="p-5 flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">{t("Avg order value", "平均订单金额")}</span>
              <span className="text-3xl font-bold display-num tabular-nums tracking-tight">¥624</span>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="bg-secondary/50 border border-border/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto justify-start">
            <TabsTrigger value="personal" className="rounded-lg text-sm px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">{t("My Orders", "我的订单")}</TabsTrigger>
            <TabsTrigger value="customer" className="rounded-lg text-sm px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">{t("Customer Orders", "客户订单")}</TabsTrigger>
            <TabsTrigger value="subscription" className="rounded-lg text-sm px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">{t("Subscription Orders", "订阅订单")}</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="mt-6 space-y-4">

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input placeholder={t("Search by order ID, customer name...", "按订单号或客户姓名搜索…")} className="pl-9 bg-card border-border/60 rounded-xl" />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto gap-2 bg-card rounded-xl border-border/60">
                  <Filter className="w-4 h-4" /> {t("Filters", "筛选")}
                </Button>
              </div>
            </div>

            <Card className="shadow-sm border-border/50 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground bg-secondary/30 uppercase">
                    <tr>
                      <th className="px-6 py-4 font-semibold">{t("Order ID", "订单号")}</th>
                      <th className="px-6 py-4 font-semibold">{t("Customer", "客户")}</th>
                      <th className="px-6 py-4 font-semibold">{t("Product", "产品")}</th>
                      <th className="px-6 py-4 font-semibold text-right">{t("Amount", "金额")}</th>
                      <th className="px-6 py-4 font-semibold text-right">{t("Commission", "佣金")}</th>
                      <th className="px-6 py-4 font-semibold">{t("Date", "日期")}</th>
                      <th className="px-6 py-4 font-semibold">{t("Status", "状态")}</th>
                      <th className="px-6 py-4 font-semibold">{t("Tracking", "物流")}</th>
                      <th className="px-6 py-4 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {ORDERS.map((order) => (
                      <tr key={order.id} className="hover:bg-secondary/20 transition-colors group">
                        <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap font-mono text-xs">{order.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6 border border-border">
                              <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{order.customer.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="whitespace-nowrap">{order.customer}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="whitespace-nowrap" title={order.product}>{order.product}</span>
                        </td>
                        <td className="px-6 py-4 text-right tabular-nums font-medium">{order.amount}</td>
                        <td className="px-6 py-4 text-right tabular-nums font-semibold text-primary">{order.commission}</td>
                        <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{order.date}</td>
                        <td className="px-6 py-4">
                          <Badge variant={
                            order.status === "Delivered" ? "default" :
                            order.status === "Shipped" ? "secondary" :
                            "outline"
                          } className={`
                            ${order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""}
                            ${order.status === "Shipped" ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" : ""}
                            ${order.status === "Paid" ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-transparent" : ""}
                          `}>
                            {statusLabel(order.status)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{trackingLabel(order.tracking)}</td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-border/50 flex items-center justify-between bg-secondary/10">
                <span className="text-sm text-muted-foreground">{t("Showing 1 to 5 of 128 orders", "显示 128 个订单中的第 1 – 5 个")}</span>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg bg-card" disabled>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg bg-card">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

          </TabsContent>
        </Tabs>

      </div>
    </AppLayout>
  );
}
