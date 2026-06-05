import "./_group.css";
import React, { useMemo, useState } from "react";
import { useNavigate, useLoaderData } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  User,
  Package,
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  Sparkles,
  Globe,
} from "lucide-react";
import { BrandLogo } from "./_shared/BrandLogo";
import { useLang } from "@/lib/i18n";

type Order = {
  customerId: string;
  orderId: string;
  sku: string;
  sponsor: string;
  timestamp: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postal: string;
  country: string;
};

type LoaderData = { order: Order };

function strengthScore(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (pw.length >= 12) s++;
  return Math.min(s, 4);
}

const STRENGTH_TONE = [
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-primary",
];

export function ActivateAccount() {
  const { order: ORDER } = useLoaderData<LoaderData>();
  const { lang, toggle, t } = useLang();
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const score = useMemo(() => strengthScore(pw), [pw]);
  const matches = pw.length > 0 && pw === pw2;
  const ruleLen = pw.length >= 8;
  const ruleUp = /[A-Z]/.test(pw);
  const ruleNum = /[0-9]/.test(pw);

  const STRENGTH_LABEL = [
    t("activate.password.strength.tooWeak"),
    t("activate.password.strength.weak"),
    t("activate.password.strength.fair"),
    t("activate.password.strength.strong"),
    t("activate.password.strength.excellent"),
  ];

  return (
    <div className="min-h-screen font-sans bg-background">
      <header className="h-16 border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <BrandLogo variant="dark" className="h-7" />
          <div className="flex items-center gap-5 text-sm">
            <span className="hidden md:inline text-muted-foreground">
              {t("activate.header.needHelp")}{" "}
              <a href="#" className="text-foreground font-medium hover:underline">
                {t("activate.header.contactSupport")}
              </a>
            </span>
            <button
              onClick={toggle}
              className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5"
            >
              <Globe className="w-4 h-4" />
              <span className={lang === "en" ? "text-foreground font-semibold" : ""}>EN</span>
              <span className="text-muted-foreground/60">/</span>
              <span className={lang === "zh" ? "text-foreground font-semibold" : ""}>中</span>
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/3 to-transparent pointer-events-none" />
        <div className="absolute -top-32 -right-24 w-[480px] h-[480px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-12 relative">
          <div className="flex items-center gap-2 mb-5">
            <Badge className="bg-primary/10 text-primary border-0 rounded-full font-semibold tracking-wide px-3 py-1 text-[11px] uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> {t("activate.badge.orderConfirmed")}
            </Badge>
            <Badge variant="outline" className="rounded-full border-border/60 text-muted-foreground font-medium text-[11px]">
              {ORDER.orderId}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.05]">
            {t("activate.hero.welcome", { name: ORDER.firstName })}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-3 font-medium">
            {t("activate.hero.subtitle")}
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm">
            <Step n={1} label={t("activate.steps.purchase")} done />
            <Connector done />
            <Step n={2} label={t("activate.steps.activate")} active />
            <Connector />
            <Step n={3} label={t("activate.steps.dashboard")} />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl border-border/50 bg-card shadow-sm overflow-hidden">
              <div className="px-6 py-5 flex items-center justify-between border-b border-border/50">
                <div>
                  <h2 className="font-display font-semibold text-base text-foreground">{t("activate.verifiedInfo.title")}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{t("activate.verifiedInfo.subtitle")}</p>
                </div>
                <button className="text-xs font-medium text-primary hover:underline">{t("common.edit")}</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
                <Field icon={<User className="w-4 h-4" />} label={t("activate.verifiedInfo.fullName")} value={`${ORDER.firstName} ${ORDER.lastName}`} />
                <Field icon={<Mail className="w-4 h-4" />} label={t("common.email")} value={ORDER.email} verifiedLabel={t("activate.verifiedInfo.verified")} verified />
                <Field icon={<Phone className="w-4 h-4" />} label={t("common.phone")} value={ORDER.phone} verifiedLabel={t("activate.verifiedInfo.verified")} verified />
                <Field icon={<MapPin className="w-4 h-4" />} label={t("activate.verifiedInfo.shippingAddress")} value={`${ORDER.address1}, ${ORDER.city} ${ORDER.postal}`} />
              </div>

              <div className="px-6 py-4 bg-secondary/30 border-t border-border/50 flex items-center gap-3 text-xs">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span className="text-muted-foreground">{t("activate.verifiedInfo.securityNote")}</span>
              </div>
            </Card>

            <Card className="rounded-2xl border-border/50 bg-card shadow-sm">
              <div className="px-6 py-5 border-b border-border/50">
                <h2 className="font-display font-semibold text-base text-foreground">{t("activate.password.title")}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{t("activate.password.subtitle")}</p>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="pw" className="text-sm font-medium">{t("common.password")}</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="pw"
                      type={show ? "text" : "password"}
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      placeholder={t("activate.password.minCharsPlaceholder")}
                      className="h-12 pl-10 pr-11 bg-card border-border/60 focus:border-primary shadow-sm rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="flex gap-1.5">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            i < score ? STRENGTH_TONE[score] : "bg-border/60"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">{t("activate.password.strength.label")}</span>
                      <span className="font-semibold text-foreground">
                        {pw.length === 0 ? "—" : STRENGTH_LABEL[score]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pw2" className="text-sm font-medium">{t("activate.password.confirmPassword")}</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="pw2"
                      type={show ? "text" : "password"}
                      value={pw2}
                      onChange={(e) => setPw2(e.target.value)}
                      placeholder={t("activate.password.reenterPlaceholder")}
                      className={`h-12 pl-10 pr-11 bg-card shadow-sm rounded-xl ${
                        pw2.length === 0
                          ? "border-border/60 focus:border-primary"
                          : matches
                          ? "border-primary/60 focus:border-primary"
                          : "border-rose-400/60 focus:border-rose-500"
                      }`}
                    />
                    {pw2.length > 0 && matches && (
                      <CheckCircle2 className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-primary" />
                    )}
                  </div>
                  {pw2.length > 0 && !matches && (
                    <p className="text-[11px] text-rose-500">{t("activate.password.mismatch")}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <Rule ok={ruleLen} label={t("activate.password.rules.minChars")} />
                  <Rule ok={ruleUp} label={t("activate.password.rules.uppercase")} recommended recommendedLabel={t("common.recommended")} />
                  <Rule ok={ruleNum} label={t("activate.password.rules.number")} recommended recommendedLabel={t("common.recommended")} />
                </div>

                <Button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="w-full h-12 text-base font-semibold rounded-xl mt-2 shadow-sm flex items-center justify-center gap-2"
                  disabled={!matches || score < 2}
                >
                  {t("activate.password.createAccount")} <ArrowRight className="w-4 h-4" />
                </Button>

                <p className="text-[11px] text-muted-foreground text-center pt-1">
                  {t("activate.terms.prefix")}{" "}
                  <a href="#" className="text-foreground hover:underline">{t("activate.terms.partnerAgreement")}</a>{" "}
                  {t("common.and")}{" "}
                  <a href="#" className="text-foreground hover:underline">{t("activate.terms.privacyPolicy")}</a>
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-2xl border-border/50 bg-card shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-border/50 flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-display font-semibold text-sm text-foreground">{t("activate.enrollment.title")}</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-secondary/60 border border-border/50 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{t("activate.enrollment.productName")}</p>
                  </div>
                </div>
                <div className="space-y-2.5 text-xs">
                  <Row label={t("activate.enrollment.orderLabel")} value={ORDER.orderId} mono />
                  <Row label={t("activate.enrollment.sku")} value={ORDER.sku} mono />
                  <Row label={t("activate.enrollment.placed")} value={ORDER.timestamp} />
                  <Row label={t("activate.enrollment.sponsor")} value={ORDER.sponsor} />
                </div>
                <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t("activate.enrollment.totalPaid")}</span>
                  <span className="text-lg font-display font-bold tabular-nums">¥1,888.00</span>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border-primary/20 bg-gradient-to-br from-primary/8 via-primary/3 to-transparent shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-display font-semibold text-foreground">{t("activate.security.title")}</p>
                  <p className="text-[11px] text-muted-foreground">{t("activate.security.subtitle")}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {lang === "zh" ? (
                  <>本激活链接将在 <span className="font-semibold text-foreground">24 小时</span> 后失效，且仅可使用一次。我们采用银行级加密保护你的账户。</>
                ) : (
                  <>This activation link expires in <span className="font-semibold text-foreground">24 hours</span> and can only be used once. We use bank-grade encryption to protect your account.</>
                )}
              </p>
            </Card>

            <div className="text-center text-[11px] text-muted-foreground">
              {t("activate.footer.alreadyActivated")}{" "}
              <a href="#" className="text-foreground font-medium hover:underline">{t("activate.footer.signIn")}</a>
              {" · "}
              <a href="#" className="text-foreground font-medium hover:underline">{t("activate.footer.resetPassword")}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Step({ n, label, active, done }: { n: number; label: string; active?: boolean; done?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
          done
            ? "bg-primary text-primary-foreground"
            : active
            ? "bg-foreground text-background ring-4 ring-foreground/10"
            : "bg-secondary text-muted-foreground border border-border/60"
        }`}
      >
        {done ? <CheckCircle2 className="w-4 h-4" /> : n}
      </div>
      <p className={`text-sm font-medium ${active || done ? "text-foreground" : "text-muted-foreground"}`}>{label}</p>
    </div>
  );
}

function Connector({ done }: { done?: boolean }) {
  return <div className={`hidden sm:block flex-none w-10 h-px ${done ? "bg-primary" : "bg-border"}`} />;
}

function Field({
  icon,
  label,
  value,
  verified,
  verifiedLabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  verified?: boolean;
  verifiedLabel?: string;
}) {
  return (
    <div className="px-5 py-3.5 flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</span>
          {verified && verifiedLabel && (
            <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">{verifiedLabel}</span>
          )}
        </div>
        <p className="text-sm font-medium text-foreground mt-0.5 truncate">{value}</p>
      </div>
    </div>
  );
}

function Rule({ ok, label, recommended, recommendedLabel }: { ok: boolean; label: string; recommended?: boolean; recommendedLabel?: string }) {
  return (
    <div className={`flex items-center gap-1.5 text-[11px] ${ok ? "text-primary" : "text-muted-foreground"}`}>
      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${ok ? "bg-primary border-primary" : "border-border"}`}>
        {ok && <CheckCircle2 className="w-2.5 h-2.5 text-primary-foreground" />}
      </div>
      {label}
      {recommended && !ok && recommendedLabel && <span className="text-[10px] opacity-60">({recommendedLabel})</span>}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium text-foreground truncate ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
