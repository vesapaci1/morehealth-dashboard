import "./_group.css";
import React, { useMemo, useState } from "react";
import { useNavigate } from "@remix-run/react";
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

const ORDER = {
  customerId: "SHP-CUST-44219",
  orderId: "#MH-10482",
  sku: "ENROLL-STARTER-KIT",
  sponsor: "Lisa Wang · ID 880214",
  timestamp: "Apr 17, 2026 · 14:08 CST",
  firstName: "Matt",
  lastName: "Barros",
  email: "matt.barros@newulife.com",
  phone: "+86 138 0011 8826",
  address1: "1188 Nanjing West Road, Apt 2204",
  address2: "Jing'an District",
  city: "Shanghai",
  state: "Shanghai",
  postal: "200040",
  country: "China",
};

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
    t("Too weak", "太弱"),
    t("Weak", "较弱"),
    t("Fair", "中等"),
    t("Strong", "较强"),
    t("Excellent", "极强"),
  ];

  return (
    <div className="min-h-screen font-sans bg-background">
      <header className="h-16 border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <BrandLogo variant="dark" className="h-7" />
          <div className="flex items-center gap-5 text-sm">
            <span className="hidden md:inline text-muted-foreground">
              {t("Need help?", "需要帮助？")}{" "}
              <a href="#" className="text-foreground font-medium hover:underline">
                {t("Contact support", "联系客服")}
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
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> {t("Order Confirmed", "订单已确认")}
            </Badge>
            <Badge variant="outline" className="rounded-full border-border/60 text-muted-foreground font-medium text-[11px]">
              {ORDER.orderId}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.05]">
            {t(`Welcome to More Health, ${ORDER.firstName}.`, `欢迎加入 More Health，${ORDER.firstName}。`)}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-3 font-medium">
            {t("Your enrollment is complete. Let's activate your account.", "你的注册已完成，让我们激活你的账户。")}
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm">
            <Step n={1} label={t("Purchase", "购买")} done />
            <Connector done />
            <Step n={2} label={t("Activate", "激活")} active />
            <Connector />
            <Step n={3} label={t("Dashboard", "进入后台")} />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl border-border/50 bg-card shadow-sm overflow-hidden">
              <div className="px-6 py-5 flex items-center justify-between border-b border-border/50">
                <div>
                  <h2 className="font-display font-semibold text-base text-foreground">{t("Verified information", "已验证信息")}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{t("Imported from your order", "已从你的订单同步")}</p>
                </div>
                <button className="text-xs font-medium text-primary hover:underline">{t("Edit", "编辑")}</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
                <Field icon={<User className="w-4 h-4" />} label={t("Full name", "姓名")} value={`${ORDER.firstName} ${ORDER.lastName}`} />
                <Field icon={<Mail className="w-4 h-4" />} label={t("Email", "邮箱")} value={ORDER.email} verifiedLabel={t("Verified", "已验证")} verified />
                <Field icon={<Phone className="w-4 h-4" />} label={t("Phone", "手机号")} value={ORDER.phone} verifiedLabel={t("Verified", "已验证")} verified />
                <Field icon={<MapPin className="w-4 h-4" />} label={t("Shipping address", "收货地址")} value={`${ORDER.address1}, ${ORDER.city} ${ORDER.postal}`} />
              </div>

              <div className="px-6 py-4 bg-secondary/30 border-t border-border/50 flex items-center gap-3 text-xs">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  {t("Securely transferred from your checkout. We'll never share your details.", "所有信息已从结账过程中加密同步，绝不外泄。")}
                </span>
              </div>
            </Card>

            <Card className="rounded-2xl border-border/50 bg-card shadow-sm">
              <div className="px-6 py-5 border-b border-border/50">
                <h2 className="font-display font-semibold text-base text-foreground">{t("Create your password", "设置登录密码")}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{t("Last step before your dashboard", "进入后台前的最后一步")}</p>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="pw" className="text-sm font-medium">{t("Password", "密码")}</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="pw"
                      type={show ? "text" : "password"}
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      placeholder={t("Minimum 8 characters", "至少 8 个字符")}
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
                      <span className="text-muted-foreground">{t("Strength", "强度")}</span>
                      <span className="font-semibold text-foreground">
                        {pw.length === 0 ? "—" : STRENGTH_LABEL[score]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pw2" className="text-sm font-medium">{t("Confirm password", "确认密码")}</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="pw2"
                      type={show ? "text" : "password"}
                      value={pw2}
                      onChange={(e) => setPw2(e.target.value)}
                      placeholder={t("Re-enter password", "再次输入密码")}
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
                    <p className="text-[11px] text-rose-500">{t("Passwords do not match", "两次输入不一致")}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <Rule ok={ruleLen} label={t("8+ characters", "8 个以上字符")} />
                  <Rule ok={ruleUp} label={t("1 uppercase", "1 个大写字母")} recommended recommendedLabel={t("recommended", "推荐")} />
                  <Rule ok={ruleNum} label={t("1 number", "1 个数字")} recommended recommendedLabel={t("recommended", "推荐")} />
                </div>

                <Button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="w-full h-12 text-base font-semibold rounded-xl mt-2 shadow-sm flex items-center justify-center gap-2"
                  disabled={!matches || score < 2}
                >
                  {t("Create my account", "创建我的账户")} <ArrowRight className="w-4 h-4" />
                </Button>

                <p className="text-[11px] text-muted-foreground text-center pt-1">
                  {t("By continuing you agree to the", "继续即表示你同意")}{" "}
                  <a href="#" className="text-foreground hover:underline">{t("Partner Agreement", "合作伙伴协议")}</a>{" "}
                  {t("and", "及")}{" "}
                  <a href="#" className="text-foreground hover:underline">{t("Privacy Policy", "隐私政策")}</a>
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-2xl border-border/50 bg-card shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-border/50 flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-display font-semibold text-sm text-foreground">{t("Your enrollment", "你的注册")}</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-secondary/60 border border-border/50 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{t("Partner Starter Kit", "合作伙伴启动套装")}</p>
                  </div>
                </div>
                <div className="space-y-2.5 text-xs">
                  <Row label={t("Order", "订单")} value={ORDER.orderId} mono />
                  <Row label={t("SKU", "SKU")} value={ORDER.sku} mono />
                  <Row label={t("Placed", "下单时间")} value={ORDER.timestamp} />
                  <Row label={t("Sponsor", "推荐人")} value={ORDER.sponsor} />
                </div>
                <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t("Total paid", "已支付")}</span>
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
                  <p className="text-sm font-display font-semibold text-foreground">{t("Secure activation", "安全激活")}</p>
                  <p className="text-[11px] text-muted-foreground">{t("One-time link", "一次性链接")}</p>
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
              {t("Already activated?", "已激活账户？")}{" "}
              <a href="#" className="text-foreground font-medium hover:underline">{t("Sign in", "登录")}</a>
              {" · "}
              <a href="#" className="text-foreground font-medium hover:underline">{t("Reset password", "重置密码")}</a>
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
    <div className="p-5">
      <div className="flex items-center gap-2 text-muted-foreground mb-1.5">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-[11px] uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
        {verified && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0">
            <CheckCircle2 className="w-3 h-3" /> {verifiedLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function Rule({
  ok,
  label,
  recommended,
  recommendedLabel,
}: {
  ok: boolean;
  label: string;
  recommended?: boolean;
  recommendedLabel?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-[11px] ${
        ok
          ? "border-primary/30 bg-primary/5 text-foreground"
          : "border-border/60 bg-secondary/30 text-muted-foreground"
      }`}
    >
      <CheckCircle2 className={`w-3.5 h-3.5 ${ok ? "text-primary" : "text-muted-foreground/50"}`} />
      <span className="font-medium">{label}</span>
      {recommended && !ok && <span className="ml-auto text-[10px] text-muted-foreground/70">{recommendedLabel}</span>}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-foreground font-medium ${mono ? "font-mono text-[11px]" : ""}`}>{value}</span>
    </div>
  );
}
