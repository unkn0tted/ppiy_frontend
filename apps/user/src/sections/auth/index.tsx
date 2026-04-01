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
      <div className="container flex min-h-screen items-center justify-center py-6 xl:py-8">
        <section className="weidu-panel flex min-h-[760px] w-full max-w-[960px] flex-col px-6 py-8 md:px-10 md:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-border/70 border-b pb-6">
            <Link className="flex items-center gap-3" to="/">
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
              <div className="font-semibold text-xl">{site.site_name}</div>
            </Link>

            <div className="flex items-center gap-5">
              <LanguageSwitch />
              <ThemeSwitch />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center py-8">
            <div className="w-full max-w-[560px]">
              <div className="mb-10 text-center">
                <h2 className="font-semibold text-3xl text-[#111827] leading-tight md:text-4xl">
                  {t("verifyAccount", "Verify Your Account")}
                </h2>
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

          <div className="border-border/70 border-t pt-6 font-medium text-muted-foreground text-sm">
            <div className="flex gap-2">
              <Link to="/tos">{t("tos", "Terms of Service")}</Link>
              <span className="text-foreground/25">|</span>
              <Link to="/privacy-policy">
                {t("privacyPolicy", "Privacy Policy")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
