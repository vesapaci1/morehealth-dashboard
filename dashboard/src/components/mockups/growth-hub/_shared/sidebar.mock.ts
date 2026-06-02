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
  roleEn: string;
  roleZh: string;
  avatar: string;
  initials: string;
};

export type SidebarNavItem = {
  key: SidebarNavKey;
  labelEn: string;
  labelZh: string;
  path: string;
  icon: LucideIcon;
  external?: boolean;
  badge?: number;
};

export type SidebarFooter = {
  support: {
    labelEn: string;
    labelZh: string;
    path: string;
  };
  wallet: {
    labelEn: string;
    labelZh: string;
    amount: string;
    path: string;
  };
};

export const SIDEBAR_USER: SidebarUser = {
  name: "Matt Baros",
  roleEn: "Elite Influencer",
  roleZh: "精英影响者",
  avatar: "/mock/avatar.png",
  initials: "MB",
};

export const SIDEBAR_NAV: SidebarNavItem[] = [
  { key: "dashboard", labelEn: "Dashboard", labelZh: "仪表盘", path: "/dashboard", icon: LayoutDashboard },
  {
    key: "shop",
    labelEn: "Shop",
    labelZh: "商城",
    path: "https://morehealth-3.myshopify.com/collections/all?password=kwik",
    icon: ShoppingBag,
    external: true,
  },
  {
    key: "enroll",
    labelEn: "Enroll",
    labelZh: "邀请伙伴",
    path: "https://morehealth-3.myshopify.com/pages/enrollment?password=kwik",
    icon: UserPlus,
    external: true,
  },
  { key: "storefront", labelEn: "Storefront", labelZh: "我的店铺", path: "/storefront", icon: Store },
  { key: "wallet", labelEn: "Wallet", labelZh: "钱包", path: "/earnings", icon: Wallet },
  { key: "subscriptions", labelEn: "Subscriptions", labelZh: "订阅", path: "/subscriptions", icon: Repeat },
  { key: "earnings", labelEn: "Earnings", labelZh: "收入", path: "/earnings", icon: LineChart },
  { key: "orders", labelEn: "Orders", labelZh: "订单", path: "/orders", icon: ShoppingBasket },
  { key: "notifications", labelEn: "Notifications", labelZh: "通知", path: "/notifications", icon: Bell, badge: 3 },
  { key: "settings", labelEn: "Settings", labelZh: "设置", path: "/settings", icon: Settings },
];

export const SIDEBAR_FOOTER: SidebarFooter = {
  support: {
    labelEn: "Support",
    labelZh: "客服支持",
    path: "/support",
  },
  wallet: {
    labelEn: "Wallet Balance",
    labelZh: "钱包余额",
    amount: "¥12,480.00",
    path: "/earnings",
  },
};
