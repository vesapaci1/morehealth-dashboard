import "./_group.css";
import { useCallback, useMemo } from "react";
import { useNavigate, useSearchParams, useLoaderData } from "@remix-run/react";
import { AppLayout } from "./_shared/AppLayout";
import { Sidebar } from "./_shared/Sidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useLang } from "@/lib/i18n";

type OrdersTab = "my-orders" | "customer-orders" | "subscription-orders";
type OrderStatus = "delivered" | "shipped" | "paid" | "pending";

type Order = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  commission: number;
  date: string;
  status: OrderStatus;
  tracking: string;
  tab: OrdersTab;
};

type LoaderData = { orders: Order[] };

type OrdersUrlState = {
  tab: OrdersTab;
  search: string;
  status: OrderStatus | "";
  page: number;
};

const ORDERS_TABS: OrdersTab[] = ["my-orders", "customer-orders", "subscription-orders"];
const ORDER_STATUSES: OrderStatus[] = ["delivered", "shipped", "paid", "pending"];
const PAGE_SIZE = 5;

function parseOrdersParams(search: string): OrdersUrlState {
  const params = new URLSearchParams(search);
  const tabParam = params.get("tab") ?? "customer-orders";
  const tab = ORDERS_TABS.includes(tabParam as OrdersTab)
    ? (tabParam as OrdersTab)
    : "customer-orders";

  const statusParam = params.get("status") ?? "";
  const status = ORDER_STATUSES.includes(statusParam as OrderStatus)
    ? (statusParam as OrderStatus)
    : "";

  const page = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1);

  return {
    tab,
    search: params.get("search") ?? "",
    status,
    page,
  };
}

function buildOrdersUrl(state: OrdersUrlState): string {
  const params = new URLSearchParams();
  if (state.tab !== "customer-orders") params.set("tab", state.tab);
  if (state.search) params.set("search", state.search);
  if (state.status) params.set("status", state.status);
  if (state.page > 1) params.set("page", String(state.page));
  const qs = params.toString();
  return qs ? `/orders?${qs}` : "/orders";
}

function formatAmount(value: number): string {
  const hasFraction = !Number.isInteger(value);
  return `¥${value.toLocaleString("en-US", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  })}`;
}

function formatOrderDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function useOrdersUrlState() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const state = useMemo(() => parseOrdersParams(queryString), [queryString]);

  const setState = useCallback(
    (updates: Partial<OrdersUrlState>, options?: { resetPage?: boolean }) => {
      const current = parseOrdersParams(searchParams.toString());
      const next: OrdersUrlState = {
        ...current,
        ...updates,
        ...(options?.resetPage ? { page: 1 } : {}),
      };
      navigate(buildOrdersUrl(next));
    },
    [navigate, searchParams],
  );

  return { state, setState };
}

export function Orders() {
  const { orders } = useLoaderData<LoaderData>();
  const { t } = useLang();
  const { state, setState } = useOrdersUrlState();
  const { tab, search, status, page } = state;

  const statusLabel = (s: OrderStatus) =>
    s === "delivered"
      ? t("orders.status.delivered")
      : s === "shipped"
        ? t("orders.status.shipped")
        : s === "paid"
          ? t("orders.status.paid")
          : t("orders.status.pending");

  const trackingLabel = (tk: string) =>
    tk === "Pending" ? t("orders.status.pendingShipment") : tk;

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (order.tab !== tab) return false;
      if (status && order.status !== status) return false;
      if (!query) return true;
      return (
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query)
      );
    });
  }, [orders, search, status, tab]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageOrders = filteredOrders.slice(pageStart, pageStart + PAGE_SIZE);
  const rangeStart = filteredOrders.length === 0 ? 0 : pageStart + 1;
  const rangeEnd = pageStart + pageOrders.length;

  return (
    <AppLayout sidebar={<Sidebar activeKey="orders" />}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight">{t("orders.title")}</h1>
            <p className="text-muted-foreground text-sm">
              {t("orders.subtitle")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 shadow-sm bg-card hover:bg-secondary rounded-xl">
              <Download className="w-4 h-4" /> {t("orders.actions.exportCsv")}
            </Button>
            <Button className="gap-2 shadow-sm rounded-xl bg-primary text-primary-foreground">
              {t("orders.actions.newOrder")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm border-border/50 rounded-2xl bg-card">
            <div className="p-5 flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">{t("orders.kpi.thisMonth")}</span>
              <span className="text-3xl font-bold display-num tabular-nums tracking-tight">128</span>
            </div>
          </Card>
          <Card className="shadow-sm border-border/50 rounded-2xl bg-card">
            <div className="p-5 flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">{t("orders.kpi.commission")}</span>
              <span className="text-3xl font-bold display-num tabular-nums tracking-tight">¥14,280</span>
            </div>
          </Card>
          <Card className="shadow-sm border-border/50 rounded-2xl bg-card">
            <div className="p-5 flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">{t("orders.kpi.avgValue")}</span>
              <span className="text-3xl font-bold display-num tabular-nums tracking-tight">¥624</span>
            </div>
          </Card>
        </div>

        <Tabs
          value={tab}
          onValueChange={(value) => setState({ tab: value as OrdersTab }, { resetPage: true })}
          className="w-full"
        >
          <TabsList className="bg-secondary/50 border border-border/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto justify-start">
            <TabsTrigger value="my-orders" className="rounded-lg text-sm px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              {t("orders.tabs.myOrders")}
            </TabsTrigger>
            <TabsTrigger value="customer-orders" className="rounded-lg text-sm px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              {t("orders.tabs.customerOrders")}
            </TabsTrigger>
            <TabsTrigger value="subscription-orders" className="rounded-lg text-sm px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              {t("orders.tabs.subscriptionOrders")}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={search}
                onChange={(event) => setState({ search: event.target.value }, { resetPage: true })}
                placeholder={t("orders.search.placeholder")}
                className="pl-9 bg-card border-border/60 rounded-xl"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select
                value={status || "all"}
                onValueChange={(value) =>
                  setState({ status: value === "all" ? "" : (value as OrderStatus) }, { resetPage: true })
                }
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-card rounded-xl border-border/60">
                  <SelectValue placeholder={t("orders.filter.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.all")}</SelectItem>
                  <SelectItem value="delivered">{t("orders.status.delivered")}</SelectItem>
                  <SelectItem value="shipped">{t("orders.status.shipped")}</SelectItem>
                  <SelectItem value="paid">{t("orders.status.paid")}</SelectItem>
                  <SelectItem value="pending">{t("orders.status.pending")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="shadow-sm border-border/50 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-secondary/30 uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">{t("orders.table.orderId")}</th>
                    <th className="px-6 py-4 font-semibold">{t("orders.table.customer")}</th>
                    <th className="px-6 py-4 font-semibold">{t("orders.table.product")}</th>
                    <th className="px-6 py-4 font-semibold text-right">{t("orders.table.amount")}</th>
                    <th className="px-6 py-4 font-semibold text-right">{t("orders.table.commission")}</th>
                    <th className="px-6 py-4 font-semibold">{t("orders.table.date")}</th>
                    <th className="px-6 py-4 font-semibold">{t("orders.filter.status")}</th>
                    <th className="px-6 py-4 font-semibold">{t("orders.table.tracking")}</th>
                    <th className="px-6 py-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {pageOrders.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-10 text-center text-muted-foreground">
                        {t("orders.empty.noMatch")}
                      </td>
                    </tr>
                  ) : (
                    pageOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-secondary/20 transition-colors group">
                        <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap font-mono text-xs">
                          {order.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6 border border-border">
                              <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                {order.customer.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="whitespace-nowrap">{order.customer}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="whitespace-nowrap" title={order.product}>
                            {order.product}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right tabular-nums font-medium">{formatAmount(order.amount)}</td>
                        <td className="px-6 py-4 text-right tabular-nums font-semibold text-primary">
                          {formatAmount(order.commission)}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                          {formatOrderDate(order.date)}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              order.status === "delivered"
                                ? "default"
                                : order.status === "shipped"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={`
                            ${order.status === "delivered" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""}
                            ${order.status === "shipped" ? "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" : ""}
                            ${order.status === "paid" ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-transparent" : ""}
                            ${order.status === "pending" ? "bg-secondary text-muted-foreground hover:bg-secondary" : ""}
                          `}
                          >
                            {statusLabel(order.status)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                          {trackingLabel(order.tracking)}
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border/50 flex items-center justify-between bg-secondary/10">
              <span className="text-sm text-muted-foreground">
                {filteredOrders.length === 0
                  ? t("orders.empty.noOrders")
                  : t("orders.pagination.showing", { start: rangeStart, end: rangeEnd, total: filteredOrders.length })}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 rounded-lg bg-card"
                  disabled={currentPage <= 1}
                  onClick={() => setState({ page: currentPage - 1 })}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 rounded-lg bg-card"
                  disabled={currentPage >= totalPages}
                  onClick={() => setState({ page: currentPage + 1 })}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
