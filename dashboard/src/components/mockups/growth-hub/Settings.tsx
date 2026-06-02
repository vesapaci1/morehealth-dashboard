import "./_group.css";
import React from "react";
import { AppLayout } from "./_shared/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, Shield, History, Network, Globe } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Settings() {
  const { lang, setLang, t } = useLang();
  const SUBNAV = [
    { icon: User, label: t("Profile", "个人资料"), active: true },
    { icon: MapPin, label: t("Addresses", "地址簿"), active: false },
    { icon: Shield, label: t("Security", "安全"), active: false },
    { icon: History, label: t("Account Records", "账户记录"), active: false },
    { icon: Network, label: t("Placement", "团队归属"), active: false },
    { icon: Globe, label: t("Language", "语言"), active: false },
  ];

  return (
    <AppLayout activeId="settings">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold tracking-tight">{t("Settings", "设置")}</h1>
          <p className="text-muted-foreground text-sm">
            {t("Manage your account preferences and information.", "管理你的账户偏好与信息。")}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-64 shrink-0 space-y-1">
            {SUBNAV.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <Card className="flex-1 shadow-sm border-border/50 rounded-2xl bg-card">
            <div className="p-6 sm:p-8 border-b border-border/50">
              <h2 className="text-xl font-semibold">{t("Profile Information", "个人资料")}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t("Update your personal details and public profile.", "更新你的个人信息与公开资料。")}
              </p>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-8">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border-2 border-background shadow-sm ring-1 ring-border">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">MB</AvatarFallback>
                  <AvatarImage src="/images/matt-baros.jpeg" />
                </Avatar>
                <div>
                  <Button variant="outline" className="shadow-sm rounded-xl mb-2">{t("Upload new photo", "上传新照片")}</Button>
                  <p className="text-xs text-muted-foreground">{t("Recommended: Square JPG, PNG. Max 2MB.", "建议：方形 JPG、PNG，最大 2MB。")}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("First Name", "名")}</Label>
                  <Input id="firstName" defaultValue="Matt" className="bg-secondary/30 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("Last Name", "姓")}</Label>
                  <Input id="lastName" defaultValue="Baros" className="bg-secondary/30 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("Email Address", "邮箱地址")}</Label>
                  <Input id="email" type="email" defaultValue="matt.baros@example.com" className="bg-secondary/30 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("Phone Number", "手机号")}</Label>
                  <Input id="phone" type="tel" defaultValue="+86 138 0000 0000" className="bg-secondary/30 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">{t("Date of Birth", "出生日期")}</Label>
                  <Input id="dob" type="date" defaultValue="1990-05-15" className="bg-secondary/30 rounded-xl text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lang">{t("Preferred Language", "偏好语言")}</Label>
                  <div className="relative">
                    <select
                      id="lang"
                      value={lang}
                      onChange={(e) => setLang(e.target.value as "en" | "zh")}
                      className="flex h-9 w-full rounded-xl border border-input bg-secondary/30 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none"
                    >
                      <option value="en">English</option>
                      <option value="zh">简体中文</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50 flex justify-end gap-3">
                <Button variant="ghost" className="rounded-xl">{t("Cancel", "取消")}</Button>
                <Button className="rounded-xl shadow-sm px-8">{t("Save Changes", "保存修改")}</Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
}
