import React, { useState, useEffect, isValidElement, cloneElement } from "react";
import { useLocation } from "@remix-run/react";
import { Sidebar, type SidebarProps } from "./Sidebar";
import { TopHeader } from "./TopHeader";

type AppLayoutProps = {
  children: React.ReactNode;
  activeKey?: SidebarProps["activeKey"];
  /** @deprecated Use activeKey */
  activeId?: SidebarProps["activeKey"];
  sidebar?: React.ReactElement<SidebarProps>;
};

export function AppLayout({ children, activeKey, activeId, sidebar }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation().pathname;
  const resolvedActiveKey = activeKey ?? activeId ?? "dashboard";

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  const sidebarNode = sidebar && isValidElement(sidebar)
    ? cloneElement(sidebar, {
        mobileOpen,
        onClose: () => setMobileOpen(false),
      })
    : (
      <Sidebar
        activeKey={resolvedActiveKey}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    );

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans">
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          aria-hidden="true"
        />
      )}
      {sidebarNode}
      <div className="flex-1 md:ml-[248px] flex flex-col min-h-screen min-w-0">
        <TopHeader onOpenMenu={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden">
          <div className="max-w-[1280px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
