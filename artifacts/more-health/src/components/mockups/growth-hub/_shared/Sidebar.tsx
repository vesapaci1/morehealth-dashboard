import React from "react";
import { Link, useLocation } from "wouter";
import { BrandLogo } from "./BrandLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", zh: "仪表盘", id: "dashboard", path: "/dashboard" },
  { icon: ShoppingBag, label: "Shop", zh: "商城", id: "shop", path: "https://morehealth-3.myshopify.com/collections/all", external: true },
  { icon: UserPlus, label: "Enroll", zh: "邀请伙伴", id: "enroll", path: "https://morehealth-3.myshopify.com/pages/enrollment", external: true },
  { icon: Store, label: "Storefront", zh: "我的店铺", id: "storefront", path: "/storefront" },
  { icon: Wallet, label: "Wallet", zh: "钱包", id: "wallet", path: "/earnings" },
  { icon: Repeat, label: "Subscriptions", zh: "订阅", id: "subscriptions", path: "/subscriptions" },
  { icon: LineChart, label: "Earnings", zh: "收入", id: "earnings", path: "/earnings" },
  { icon: BarChart3, label: "Analytics", zh: "数据分析", id: "analytics", path: "/analytics" },
  { icon: ShoppingBasket, label: "Orders", zh: "订单", id: "orders", path: "/orders" },
  { icon: Users, label: "Team Builder", zh: "团队队列", id: "team", path: "/team" },
  { icon: Bell, label: "Notifications", zh: "通知", id: "notifications", path: "/notifications", badge: 3 },
  { icon: Settings, label: "Settings", zh: "设置", id: "settings", path: "/settings" },
];

export function Sidebar({ activeId }: { activeId?: string }) {
  const [location] = useLocation();
  return (
    <div className="w-[248px] h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6">
        <BrandLogo />
      </div>

      <div className="px-4 mb-6">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50">
          <Avatar className="w-10 h-10 border border-background">
            <AvatarFallback className="bg-primary/10 text-primary font-medium">BC</AvatarFallback>
            <AvatarImage src="https://i.pravatar.cc/150?u=brady" />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Brady Chen</span>
            <span className="text-xs text-muted-foreground">Gold Partner</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-6 space-y-1 scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const isActive = !item.external && (activeId
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
                <span>{item.label}</span>
              </div>
              {item.badge ? (
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                    isActive ? "bg-white/20 text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  {item.badge}
                </span>
              ) : (
                <span className={`text-[10px] ${isActive ? "text-primary-foreground/70" : "opacity-0"}`}>
                  {item.zh}
                </span>
              )}
            </>
          );
          if (item.external) {
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
          <span>Support</span>
        </Link>
      </div>

      <div className="px-4 pb-4">
        <Link href="/earnings" className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-4 rounded-xl shadow-sm flex flex-col gap-1 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <span className="text-xs opacity-80 font-medium">Wallet Balance</span>
          <span className="text-xl font-bold display-num tabular-nums tracking-tight">¥12,480.00</span>
        </Link>
      </div>
    </div>
  );
}
