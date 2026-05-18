import React from "react";
import { Link, useLocation } from "@remix-run/react";
import { LifeBuoy, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLang } from "@/lib/i18n";
import {
  SIDEBAR_FOOTER,
  SIDEBAR_NAV,
  SIDEBAR_USER,
  type SidebarNavKey,
} from "./sidebar.mock";

export type SidebarProps = {
  activeKey?: SidebarNavKey;
  mobileOpen?: boolean;
  onClose?: () => void;
};

export function Sidebar({ activeKey, mobileOpen = false, onClose }: SidebarProps) {
  const location = useLocation().pathname;
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
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {SIDEBAR_USER.initials}
            </AvatarFallback>
            <AvatarImage src={SIDEBAR_USER.avatar} alt={SIDEBAR_USER.name} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{SIDEBAR_USER.name}</span>
            <span className="text-xs text-muted-foreground">
              {t(SIDEBAR_USER.roleEn, SIDEBAR_USER.roleZh)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-6 space-y-1 scrollbar-hide">
        {SIDEBAR_NAV.map((item) => {
          const isActive = item.external
            ? false
            : activeKey
              ? item.key === activeKey
              : location === item.path || (location === "/" && item.key === "dashboard");
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
                <span>{t(item.labelEn, item.labelZh)}</span>
              </div>
              {item.badge ? (
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

          if (item.external) {
            return (
              <a key={item.key} href={item.path} target="_blank" rel="noopener noreferrer" className={className}>
                {inner}
              </a>
            );
          }

          return (
            <Link key={item.key} to={item.path} className={className}>
              {inner}
            </Link>
          );
        })}
      </div>

      <div className="px-3 pt-2 pb-3 mt-auto border-t border-border">
        <Link
          to={SIDEBAR_FOOTER.support.path}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            location === SIDEBAR_FOOTER.support.path
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <LifeBuoy className="w-4 h-4 opacity-70" />
          <span>{t(SIDEBAR_FOOTER.support.labelEn, SIDEBAR_FOOTER.support.labelZh)}</span>
        </Link>
      </div>

      <div className="px-4 pb-4">
        <Link
          to={SIDEBAR_FOOTER.wallet.path}
          className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-4 rounded-xl shadow-sm flex flex-col gap-1 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <span className="text-xs opacity-80 font-medium">
            {t(SIDEBAR_FOOTER.wallet.labelEn, SIDEBAR_FOOTER.wallet.labelZh)}
          </span>
          <span className="text-xl font-bold display-num tabular-nums tracking-tight">
            {SIDEBAR_FOOTER.wallet.amount}
          </span>
        </Link>
      </div>
    </div>
  );
}
