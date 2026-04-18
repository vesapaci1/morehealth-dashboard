import React from "react";
import { Link, useLocation } from "wouter";
import { BrandLogo } from "./BrandLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLang } from "@/lib/i18n";
import {
  LayoutDashboard,
  ShoppingBag,
  UserPlus,
  Store,
  Wallet,
  Repeat,
  LineChart,
  BarChart3,
  ShoppingBasket,
  Users,
  Bell,
  Settings,
  LifeBuoy,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, en: "Dashboard", zh: "仪表盘", id: "dashboard", path: "/dashboard" },
  { icon: ShoppingBag, en: "Shop", zh: "商城", id: "shop", path: "https://morehealth-3.myshopify.com/collections/all", external: true },
  { icon: UserPlus, en: "Enroll", zh: "邀请伙伴", id: "enroll", path: "https://morehealth-3.myshopify.com/pages/enrollment", external: true },
  { icon: Store, en: "Storefront", zh: "我的店铺", id: "storefront", path: "/storefront" },
  { icon: Wallet, en: "Wallet", zh: "钱包", id: "wallet", path: "/earnings" },
  { icon: Repeat, en: "Subscriptions", zh: "订阅", id: "subscriptions", path: "/subscriptions" },
  { icon: LineChart, en: "Earnings", zh: "收入", id: "earnings", path: "/earnings" },
  { icon: BarChart3, en: "Analytics", zh: "数据分析", id: "analytics", path: "/analytics" },
  { icon: ShoppingBasket, en: "Orders", zh: "订单", id: "orders", path: "/orders" },
  { icon: Users, en: "Team Builder", zh: "团队队列", id: "team", path: "/team" },
  { icon: Bell, en: "Notifications", zh: "通知", id: "notifications", path: "/notifications", badge: 3 },
  { icon: Settings, en: "Settings", zh: "设置", id: "settings", path: "/settings" },
] as const;

export function Sidebar({ activeId, mobileOpen = false, onClose }: { activeId?: string; mobileOpen?: boolean; onClose?: () => void }) {
  const [location] = useLocation();
  const { t } = useLang();
  return (
    <div
      className={`w-[248px] h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 md:translate-x-0 md:z-20 ${
        mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      <div className="p-6 flex items-center justify-between">
        <BrandLogo />
        <button
          onClick={onClose}
          className="md:hidden text-muted-foreground hover:text-foreground p-1 -mr-1"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 mb-6">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50">
          <Avatar className="w-10 h-10 border border-background">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">MB</AvatarFallback>
            <AvatarImage src="/images/matt-baros.jpeg" />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Matt Baros</span>
            <span className="text-xs text-muted-foreground">{t("Elite Influencer", "精英影响者")}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-6 space-y-1 scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const isActive = !("external" in item && item.external) && (activeId
            ? item.id === activeId
            : location === item.path || (location === "/" && item.id === "dashboard"));
          const Icon = item.icon;
          const className = `w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            isActive
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`;
          const inner = (
            <>
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "opacity-100" : "opacity-70"}`} />
                <span>{t(item.en, item.zh)}</span>
              </div>
              {"badge" in item && item.badge ? (
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                    isActive ? "bg-white/20 text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </>
          );
          if ("external" in item && item.external) {
            return (
              <a key={item.id} href={item.path} target="_blank" rel="noopener noreferrer" className={className}>
                {inner}
              </a>
            );
          }
          return (
            <Link key={item.id} href={item.path} className={className}>
              {inner}
            </Link>
          );
        })}
      </div>

      <div className="px-3 pt-2 pb-3 mt-auto border-t border-border">
        <Link
          href="/support"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            location === "/support"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <LifeBuoy className="w-4 h-4 opacity-70" />
          <span>{t("Support", "客服支持")}</span>
        </Link>
      </div>

      <div className="px-4 pb-4">
        <Link href="/earnings" className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-4 rounded-xl shadow-sm flex flex-col gap-1 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <span className="text-xs opacity-80 font-medium">{t("Wallet Balance", "钱包余额")}</span>
          <span className="text-xl font-bold display-num tabular-nums tracking-tight">¥12,480.00</span>
        </Link>
      </div>
    </div>
  );
}
