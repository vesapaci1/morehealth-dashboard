import React from "react";
import { Link } from "wouter";
import { Search, Globe, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLang } from "@/lib/i18n";

export function TopHeader() {
  const { lang, toggle, t } = useLang();
  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="w-96 relative">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder={t("Search orders, partners, products...", "搜索订单、伙伴、产品…")}
          className="w-full pl-9 pr-4 py-2 bg-secondary/50 border border-border/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggle}
          aria-label="Toggle language"
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span>
            <span className={lang === "en" ? "text-foreground font-semibold" : ""}>EN</span>
            <span className="mx-1 text-muted-foreground/60">/</span>
            <span className={lang === "zh" ? "text-foreground font-semibold" : ""}>中</span>
          </span>
        </button>

        <Link href="/notifications" className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border-2 border-card" />
        </Link>

        <div className="h-5 w-px bg-border mx-2" />

        <Link href="/settings" className="block">
          <Avatar className="w-8 h-8 cursor-pointer border border-border hover:opacity-80 transition-opacity">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">MB</AvatarFallback>
            <AvatarImage src="/images/matt-baros.jpeg" />
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
