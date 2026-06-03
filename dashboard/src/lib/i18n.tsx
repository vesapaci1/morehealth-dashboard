import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import enMessages from "@/data/locales/en.json";
import zhMessages from "@/data/locales/zh.json";

export type Lang = "en" | "zh";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string, zh?: string) => string;
};

const LangContext = createContext<Ctx | null>(null);

function lookup(messages: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split(".");
  let node: unknown = messages;
  for (const part of parts) {
    if (node == null || typeof node !== "object") return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" ? node : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("mh-lang") as Lang) || "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("mh-lang", lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((l) => (l === "en" ? "zh" : "en")), []);

  const t = useCallback(
    (key: string, zh?: string): string => {
      // Backward-compat: two-argument form t("English", "Chinese") still works unchanged.
      if (zh !== undefined) {
        return lang === "zh" ? zh : key;
      }
      // Key-based form: t("section.key") looks up in the active locale JSON.
      const messages = (lang === "zh" ? zhMessages : enMessages) as Record<string, unknown>;
      return lookup(messages, key) ?? key;
    },
    [lang],
  );

  return <LangContext.Provider value={{ lang, setLang, toggle, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
