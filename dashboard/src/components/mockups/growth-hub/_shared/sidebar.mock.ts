import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ShoppingBag,
  UserPlus,
  Store,
  Wallet,
  Repeat,
  LineChart,
  ShoppingBasket,
  Bell,
  Settings,
} from "lucide-react";

export type SidebarNavKey =
  | "dashboard"
  | "shop"
  | "enroll"
  | "storefront"
  | "wallet"
  | "subscriptions"
  | "earnings"
  | "orders"
  | "notifications"
  | "settings";

export type SidebarUser = {
  name: string;
  role: string;
  avatar: string;
  initials: string;
};

export type SidebarNavItem = {
  key: SidebarNavKey;
  path: string;
  icon: LucideIcon;
  external?: boolean;
  badge?: number;
};

export type SidebarFooter = {
  support: { path: string };
  wallet: { amount: string; path: string };
};

export const SIDEBAR_NAV: SidebarNavItem[] = [
  { key: "dashboard", path: "/dashboard", icon: LayoutDashboard },
  { key: "shop", path: "https://morehealth-3.myshopify.com/collections/all?password=kwik", icon: ShoppingBag, external: true },
  { key: "enroll", path: "https://morehealth-3.myshopify.com/pages/enrollment?password=kwik", icon: UserPlus, external: true },
  { key: "storefront", path: "/storefront", icon: Store },
  { key: "wallet", path: "/earnings", icon: Wallet },
  { key: "subscriptions", path: "/subscriptions", icon: Repeat },
  { key: "earnings", path: "/earnings", icon: LineChart },
  { key: "orders", path: "/orders", icon: ShoppingBasket },
  { key: "notifications", path: "/notifications", icon: Bell, badge: 3 },
  { key: "settings", path: "/settings", icon: Settings },
];
