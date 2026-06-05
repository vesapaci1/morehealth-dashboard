import "./_group.css";
import React from "react";
import { useNavigate } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, ArrowRight } from "lucide-react";
import { BrandLogo } from "./_shared/BrandLogo";
import { useLang } from "@/lib/i18n";

export function Login() {
  const navigate = useNavigate();
  const { lang, toggle, t } = useLang();
  const goDashboard = (e?: React.FormEvent) => { e?.preventDefault(); navigate("/dashboard"); };
  return (
    <div className="min-h-screen flex font-sans bg-background">
      {/* Left Panel */}
      <div className="hidden lg:flex w-[45%] relative overflow-hidden bg-primary text-primary-foreground flex-col justify-between p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#045c38] to-[#022c1b] opacity-90" />
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#22d3ee]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <BrandLogo variant="light" className="h-9" />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-display font-semibold leading-[1.05] mb-5 tracking-tight">
            {lang === "zh" ? (
              <>经营你的事业，<br />从此简单优雅。</>
            ) : (
              <>Your business,<br />beautifully run.</>
            )}
          </h1>
          <p className="text-lg text-primary-foreground/80 font-medium mb-12">
            {t("login.hero.tagline")}
          </p>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 mt-12">
            <p className="text-lg leading-relaxed mb-4">
              {t("login.hero.testimonial")}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20" />
              <div>
                <p className="font-semibold text-sm">Lisa Wang</p>
                <p className="text-xs text-primary-foreground/70">{t("login.hero.testimonialRole")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-background relative">
        <div className="absolute top-8 right-8 flex items-center gap-4">
          <button
            onClick={toggle}
            className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className={lang === "en" ? "text-foreground font-semibold" : ""}>EN</span>
            <span className="text-muted-foreground/60">/</span>
            <span className={lang === "zh" ? "text-foreground font-semibold" : ""}>中</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <div className="w-full max-w-sm">
            <div className="mb-10">
              <h2 className="text-3xl font-display font-bold tracking-tight mb-2 text-foreground">
                {t("login.form.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("login.form.subtitle")}
              </p>
            </div>

            <form className="space-y-5" onSubmit={goDashboard}>
              <div className="space-y-2">
                <Label htmlFor="identifier">{t("login.form.identifier")}</Label>
                <Input
                  id="identifier"
                  placeholder={t("login.form.identifierPlaceholder")}
                  className="h-12 bg-card border-border/60 focus:border-primary shadow-sm rounded-xl px-4"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("common.password")}</Label>
                  <a href="#" className="text-sm font-medium text-primary hover:underline">
                    {t("login.form.forgot")}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 bg-card border-border/60 focus:border-primary shadow-sm rounded-xl px-4"
                />
              </div>

              <Button className="w-full h-12 text-base font-semibold rounded-xl mt-6 shadow-sm flex items-center justify-center gap-2">
                {t("login.form.signIn")} <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">{t("common.or")}</span>
                </div>
              </div>

              <Button onClick={() => goDashboard()} variant="outline" className="w-full h-12 mt-6 rounded-xl font-medium shadow-sm bg-card hover:bg-secondary">
                {t("login.form.smsLogin")}
              </Button>
            </div>

            <p className="mt-10 text-center text-sm text-muted-foreground">
              {t("login.form.newUser")}{" "}
              <a href="/activate" className="font-semibold text-foreground hover:underline">
                {t("login.form.becomePartner")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
