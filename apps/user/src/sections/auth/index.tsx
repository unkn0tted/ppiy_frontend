"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "@tanstack/react-router";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Icon } from "@workspace/ui/composed/icon";
import { LanguageSwitch } from "@workspace/ui/composed/language-switch";
import { ThemeSwitch } from "@workspace/ui/composed/theme-switch";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";
import EmailAuthForm from "./email/auth-form";
import { OAuthMethods } from "./oauth-methods";
import PhoneAuthForm from "./phone/auth-form";

export default function Main() {
  const { t } = useTranslation("auth");
  const { t: tMain } = useTranslation("main");
  const { common } = useGlobalStore();
  const { site, auth } = common;
  const features = [
    {
      icon: "uil:users-alt",
      title: tMain("users", "Users"),
      description: tMain("users_description", "Trusted by users worldwide"),
    },
    {
      icon: "uil:server",
      title: tMain("servers", "Servers"),
      description: tMain(
        "servers_description",
        "High-performance servers globally"
      ),
    },
    {
      icon: "uil:map-marker",
      title: tMain("locations", "Locations"),
      description: tMain(
        "locations_description",
        "Available in multiple regions"
      ),
    },
  ];

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
    <main className="rose-form relative min-h-screen overflow-hidden px-4 py-5 sm:px-6 sm:py-8">
      <div className="rose-grid opacity-35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/12 via-primary/5 to-transparent" />
      <div className="-left-16 pointer-events-none absolute bottom-0 h-72 w-72 rounded-full bg-rose-300/18 blur-3xl dark:bg-rose-400/10" />
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.section
          className="rose-shell hidden flex-col justify-between p-8 lg:flex xl:p-10"
          initial={{ opacity: 0, y: 26 }}
          transition={{ duration: 0.45 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div>
            <Link className="group inline-flex items-center gap-3" to="/">
              {site.site_logo && (
                <img
                  alt="logo"
                  className="rounded-2xl ring-1 ring-primary/18 transition-all duration-300 group-hover:scale-105 group-hover:ring-primary/35"
                  height={44}
                  src={site.site_logo}
                  width={44}
                />
              )}
              <span className="font-display text-2xl">
                <span className="rose-section-title">{site.site_name}</span>
              </span>
            </Link>
            <span className="rose-pill mt-10">
              {t("verifyAccount", "Verify Your Account")}
            </span>
            <h1 className="mt-6 max-w-xl font-display text-5xl leading-[0.95] tracking-[-0.04em]">
              <span className="rose-section-title">{site.site_name}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground leading-8">
              {site.site_desc ||
                t("verifyAccountDesc", "Please login or register to continue")}
            </p>
          </div>
          <div className="rose-panel mt-8 overflow-hidden p-4">
            <DotLottieReact
              autoplay
              className="mx-auto w-full max-w-[30rem]"
              loop
              src="./assets/lotties/login.json"
            />
          </div>
          <div className="mt-8 grid gap-3 xl:grid-cols-3">
            {features.map((item) => (
              <div className="rose-panel p-4" key={item.title}>
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon className="size-5" icon={item.icon} />
                </div>
                <p className="mt-5 font-semibold">{item.title}</p>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="rose-shell flex items-center p-4 sm:p-6 lg:p-8"
          initial={{ opacity: 0, y: 26 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mx-auto w-full max-w-[30rem]">
            <div className="rose-panel p-6 sm:p-8">
              <Link
                className="group inline-flex items-center gap-3 lg:hidden"
                to="/"
              >
                {site.site_logo && (
                  <img
                    alt="logo"
                    className="rounded-2xl ring-1 ring-primary/18 transition-all duration-300 group-hover:scale-105 group-hover:ring-primary/35"
                    height={40}
                    src={site.site_logo}
                    width={40}
                  />
                )}
                <span className="font-display text-xl">
                  <span className="rose-section-title">{site.site_name}</span>
                </span>
              </Link>
              <span className="rose-pill mt-6">
                {t("verifyAccount", "Verify Your Account")}
              </span>
              <h1 className="mt-5 font-display text-4xl leading-[0.98] tracking-[-0.04em] sm:text-[2.9rem]">
                <span className="rose-section-title">{site.site_name}</span>
              </h1>
              <div className="mt-4 text-muted-foreground text-sm leading-7 sm:text-base">
                {t("verifyAccountDesc", "Please login or register to continue")}
              </div>
              <div className="mt-8">
                {AUTH_METHODS.length === 1
                  ? AUTH_METHODS[0]?.children
                  : AUTH_METHODS[0] && (
                      <Tabs
                        className="gap-4"
                        defaultValue={AUTH_METHODS[0].key}
                      >
                        <TabsList className="flex w-full *:flex-1">
                          {AUTH_METHODS.map((item) => (
                            <TabsTrigger key={item.key} value={item.key}>
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
              </div>
              <div className="mt-8 border-primary/10 border-t pt-6 dark:border-white/10">
                <OAuthMethods />
              </div>
              <div className="mt-8 flex flex-col gap-4 border-primary/10 border-t pt-5 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                <div className="app-quick-actions flex items-center gap-1 rounded-full border border-primary/10 bg-white/60 p-1 shadow-[0_18px_34px_-28px_oklch(0.64_0.16_11_/0.45)] dark:border-white/8 dark:bg-white/5">
                  <LanguageSwitch />
                  <ThemeSwitch />
                </div>
                <div className="flex flex-wrap gap-3 font-medium text-muted-foreground">
                  <Link
                    className="transition-colors hover:text-primary"
                    to="/tos"
                  >
                    {t("tos", "Terms of Service")}
                  </Link>
                  <Link
                    className="transition-colors hover:text-primary"
                    to="/privacy-policy"
                  >
                    {t("privacyPolicy", "Privacy Policy")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
