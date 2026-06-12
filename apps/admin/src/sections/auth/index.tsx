"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Icon } from "@workspace/ui/composed/icon";
import { LanguageSwitch } from "@workspace/ui/composed/language-switch";
import { ThemeSwitch } from "@workspace/ui/composed/theme-switch";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";
import EmailAuthForm from "./email/auth-form";

export default function Auth() {
  const { t } = useTranslation("auth");
  const { common, user } = useGlobalStore();
  const { site } = common;

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate({ to: "/dashboard" });
    }
  }, [navigate, user]);

  return (
    <main className="rose-form relative min-h-screen overflow-hidden px-4 py-5 sm:px-6 sm:py-8">
      <div className="rose-grid opacity-35" />
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rose-shell hidden flex-col justify-between p-8 lg:flex xl:p-10">
          <div>
            <Link className="group inline-flex items-center gap-3" to="/">
              <img
                alt="logo"
                className="rounded-md ring-1 ring-primary/18 transition-all duration-200 group-hover:ring-primary/35"
                height={44}
                src={site.site_logo || "/favicon.svg"}
                width={44}
              />
              <span className="font-display text-2xl">
                <span className="rose-section-title">{site.site_name}</span>
              </span>
            </Link>
            <span className="rose-pill mt-10">{t("login.title", "Login")}</span>
            <h1 className="mt-6 max-w-xl font-display text-5xl leading-tight">
              <span className="rose-section-title">{site.site_name}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground leading-8">
              {site.site_desc ||
                t("login.description", "Enter your credentials to continue")}
            </p>
          </div>
          <div className="rose-panel mt-8 p-5">
            <div className="flex items-center justify-between gap-4 border-primary/10 border-b pb-4 dark:border-white/10">
              <div>
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.14em]">
                  Admin
                </p>
                <p className="mt-2 font-semibold text-lg">
                  {t("login.description", "Enter your credentials to continue")}
                </p>
              </div>
              <div className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-5" icon="uil:shield-check" />
              </div>
            </div>
            <div className="mt-5 overflow-hidden rounded-md border border-primary/10 bg-background/62 dark:border-white/8 dark:bg-white/4">
              <DotLottieReact
                autoplay
                className="mx-auto aspect-[4/3] w-full max-w-md"
                loop
                src="./assets/lotties/login.json"
              />
            </div>
          </div>
        </section>

        <section className="rose-shell flex items-center p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[30rem]">
            <div className="rose-panel p-6 sm:p-8">
              <Link
                className="group inline-flex items-center gap-3 lg:hidden"
                to="/"
              >
                <img
                  alt="logo"
                  className="rounded-md ring-1 ring-primary/18 transition-all duration-200 group-hover:ring-primary/35"
                  height={40}
                  src={site.site_logo || "/favicon.svg"}
                  width={40}
                />
                <span className="font-display text-xl">
                  <span className="rose-section-title">{site.site_name}</span>
                </span>
              </Link>
              <span className="rose-pill mt-6">
                {t("login.title", "Login")}
              </span>
              <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
                <span className="rose-section-title">{site.site_name}</span>
              </h1>
              <div className="mt-4 text-muted-foreground text-sm leading-7 sm:text-base">
                {t("login.description", "Enter your credentials to continue")}
              </div>
              <div className="mt-8">
                <EmailAuthForm />
              </div>
              <div className="mt-8 flex items-center justify-between border-primary/10 border-t pt-5 dark:border-white/10">
                <div className="app-quick-actions flex items-center gap-1 rounded-md border border-primary/10 bg-white/60 p-1 dark:border-white/8 dark:bg-white/5">
                  <LanguageSwitch />
                  <ThemeSwitch />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
