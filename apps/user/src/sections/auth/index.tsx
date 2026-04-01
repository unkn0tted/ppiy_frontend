"use client";

import { Link } from "@tanstack/react-router";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { LanguageSwitch } from "@workspace/ui/composed/language-switch";
import { ThemeSwitch } from "@workspace/ui/composed/theme-switch";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";
import EmailAuthForm from "./email/auth-form";
import { OAuthMethods } from "./oauth-methods";
import PhoneAuthForm from "./phone/auth-form";

export default function Main() {
  const { t } = useTranslation("auth");
  const { common } = useGlobalStore();
  const { site, auth } = common;

  const AUTH_METHODS = [
    {
      key: "email",
      enabled: auth.email.enable,
      children: <EmailAuthForm />,
    },
    {
      key: "mobile",
      enabled: auth.mobile.enable,
      children: <PhoneAuthForm />,
    },
  ].filter((method) => method.enabled);

  return (
    <main className="min-h-screen">
      <div className="container grid min-h-screen gap-6 py-6 xl:grid-cols-[0.92fr_1.08fr] xl:py-8">
        <section className="weidu-panel-ink hidden xl:flex xl:flex-col xl:justify-between xl:px-10 xl:py-12">
          <div>
            <div className="font-medium text-[0.68rem] text-background/55 uppercase tracking-[0.36em]">
              Access Portal
            </div>
            <div className="mt-8">
              <Link className="flex items-center gap-4" to="/">
                <div className="flex size-12 items-center justify-center rounded-full border border-white/12 bg-white/8">
                  {site.site_logo ? (
                    <img
                      alt="logo"
                      className="size-8 rounded-full object-cover"
                      height={32}
                      src={site.site_logo}
                      width={32}
                    />
                  ) : (
                    <span className="text-[0.65rem] uppercase tracking-[0.28em]">
                      wd
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-[0.68rem] text-background/55 uppercase tracking-[0.32em]">
                    Weidu Edition
                  </div>
                  <div className="font-semibold text-2xl">{site.site_name}</div>
                </div>
              </Link>
            </div>
            <h1 className="mt-16 max-w-lg font-semibold text-5xl leading-[0.92]">
              {t("verifyAccount", "Verify Your Account")}
            </h1>
            <p className="mt-6 max-w-lg text-background/72 text-base leading-8">
              {site.site_desc ||
                t("verifyAccountDesc", "Please login or register to continue")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              t("methods.email", "Email"),
              t("methods.mobile", "Mobile"),
              t("tos", "Terms of Service"),
            ].map((item, index) => (
              <div
                className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4"
                key={item}
              >
                <div className="font-medium text-[0.66rem] text-background/50 uppercase tracking-[0.3em]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-5 font-medium text-sm uppercase tracking-[0.24em]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="weidu-panel flex flex-col px-6 py-8 md:px-10 md:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-border/70 border-b pb-6">
            <Link className="flex items-center gap-3 xl:hidden" to="/">
              <div className="flex size-11 items-center justify-center rounded-full border border-border bg-background">
                {site.site_logo ? (
                  <img
                    alt="logo"
                    className="size-7 rounded-full object-cover"
                    height={28}
                    src={site.site_logo}
                    width={28}
                  />
                ) : (
                  <span className="text-[0.62rem] uppercase tracking-[0.28em]">
                    wd
                  </span>
                )}
              </div>
              <div>
                <div className="weidu-kicker">Weidu Edition</div>
                <div className="font-semibold text-xl">{site.site_name}</div>
              </div>
            </Link>

            <div className="flex items-center gap-5">
              <LanguageSwitch />
              <ThemeSwitch />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center py-8">
            <div className="w-full max-w-xl">
              <div className="mb-10">
                <div className="weidu-kicker">Account Gate</div>
                <h2 className="mt-4 font-semibold text-3xl leading-tight md:text-4xl">
                  {t("verifyAccount", "Verify Your Account")}
                </h2>
                <p className="mt-4 max-w-lg text-base text-muted-foreground leading-8">
                  {t(
                    "verifyAccountDesc",
                    "Please login or register to continue"
                  )}
                </p>
              </div>

              {AUTH_METHODS.length === 1
                ? AUTH_METHODS[0]?.children
                : AUTH_METHODS[0] && (
                    <Tabs defaultValue={AUTH_METHODS[0].key}>
                      <TabsList className="mb-6 flex w-full rounded-full border border-border bg-background p-1 *:flex-1">
                        {AUTH_METHODS.map((item) => (
                          <TabsTrigger
                            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            key={item.key}
                            value={item.key}
                          >
                            {t(`methods.${item.key}`)}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {AUTH_METHODS.map((item) => (
                        <TabsContent key={item.key} value={item.key}>
                          {item.children}
                        </TabsContent>
                      ))}
                    </Tabs>
                  )}

              <div className="pt-8">
                <OAuthMethods />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-border/70 border-t pt-6 font-medium text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <Link to="/tos">{t("tos", "Terms of Service")}</Link>
              <span className="text-foreground/25">|</span>
              <Link to="/privacy-policy">
                {t("privacyPolicy", "Privacy Policy")}
              </Link>
            </div>
            <div className="text-[0.7rem] uppercase tracking-[0.3em]">
              Monochrome access flow
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
