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
    { icon: User, label: t("settings.nav.profile"), active: true },
    { icon: MapPin, label: t("settings.nav.addresses"), active: false },
    { icon: Shield, label: t("settings.nav.security"), active: false },
    { icon: History, label: t("settings.nav.accountRecords"), active: false },
    { icon: Network, label: t("settings.nav.placement"), active: false },
    { icon: Globe, label: t("settings.nav.language"), active: false },
  ];

  return (
    <AppLayout activeId="settings">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold tracking-tight">{t("settings.title")}</h1>
          <p className="text-muted-foreground text-sm">
            {t("settings.subtitle")}
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
              <h2 className="text-xl font-semibold">{t("settings.profile.title")}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t("settings.profile.subtitle")}
              </p>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-8">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border-2 border-background shadow-sm ring-1 ring-border">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">MB</AvatarFallback>
                  <AvatarImage src="/images/matt-baros.jpeg" />
                </Avatar>
                <div>
                  <Button variant="outline" className="shadow-sm rounded-xl mb-2">{t("settings.profile.uploadPhoto")}</Button>
                  <p className="text-xs text-muted-foreground">{t("settings.profile.photoHint")}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("settings.profile.firstName")}</Label>
                  <Input id="firstName" defaultValue="Matt" className="bg-secondary/30 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("settings.profile.lastName")}</Label>
                  <Input id="lastName" defaultValue="Baros" className="bg-secondary/30 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("settings.profile.emailAddress")}</Label>
                  <Input id="email" type="email" defaultValue="matt.baros@example.com" className="bg-secondary/30 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("settings.profile.phoneNumber")}</Label>
                  <Input id="phone" type="tel" defaultValue="+86 138 0000 0000" className="bg-secondary/30 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">{t("settings.profile.dateOfBirth")}</Label>
                  <Input id="dob" type="date" defaultValue="1990-05-15" className="bg-secondary/30 rounded-xl text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lang">{t("settings.profile.preferredLanguage")}</Label>
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
                <Button variant="ghost" className="rounded-xl">{t("common.cancel")}</Button>
                <Button className="rounded-xl shadow-sm px-8">{t("common.saveChanges")}</Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
}
