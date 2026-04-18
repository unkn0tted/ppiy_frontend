import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Icon } from "@workspace/ui/composed/icon";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AmbientMist } from "@/components/ambient-mist";
import { useGlobalStore } from "@/stores/global";

export function Hero() {
  const { t } = useTranslation("main");
  const { common, user } = useGlobalStore();
  const { site } = common;
  const heroCaption =
    site.site_desc?.trim() ||
    t("hero_caption", "Designed for longer sessions with a quieter surface.");

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="rose-shell px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-12"
      initial={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 110, damping: 18 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="rose-grid" />
      <AmbientMist variant="hero" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-l from-primary/12 via-transparent to-transparent lg:block" />
      <div className="-right-16 -top-20 pointer-events-none absolute h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="-bottom-24 -left-8 pointer-events-none absolute h-64 w-64 rounded-full bg-rose-300/16 blur-3xl dark:bg-rose-400/10" />
      <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start lg:pl-1"
          initial={{ opacity: 0, y: 32 }}
          transition={{
            type: "spring",
            stiffness: 96,
            damping: 16,
            delay: 0.12,
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="rose-pill">
            {t("hero_badge", "Quiet Connectivity")}
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-[2.9rem] leading-[0.92] tracking-[-0.05em] sm:text-6xl lg:text-[4.9rem]">
            {t("welcome", "Welcome to")}
            <br />
            <span className="rose-section-title">{site.site_name}</span>
          </h1>
          <div className="mt-6 flex items-center gap-3 text-muted-foreground text-sm">
            <span className="h-px w-10 bg-primary/24" />
            <span>{heroCaption}</span>
          </div>
          <p className="mt-7 max-w-xl text-base text-foreground/78 leading-8 sm:text-lg">
            {t(
              "hero_description",
              "Designed for longer sessions by keeping complex routing underneath and only the necessary content on the surface."
            )}
          </p>
          <p className="mt-5 max-w-lg text-muted-foreground text-sm leading-7 sm:text-[0.95rem]">
            {t(
              "hero_supporting_copy",
              "When the interface steps back a little, focus can stay with the task at hand."
            )}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-12 rounded-full px-6 font-semibold shadow-lg shadow-primary/20"
            >
              <Link to={user ? "/dashboard" : "/auth"}>
                {t("started", "Get Started")}
              </Link>
            </Button>
            {!user && (
              <Button
                asChild
                className="h-12 rounded-full border-primary/14 bg-white/70 px-6 font-semibold text-foreground hover:bg-white/95 dark:bg-white/6 dark:hover:bg-white/10"
                variant="outline"
              >
                <Link to="/purchasing">
                  {t("product_showcase_action", "View Plan")}
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto w-full max-w-[36rem] lg:justify-self-end"
          initial={{ opacity: 0, y: 36 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 16,
            delay: 0.24,
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="rose-panel p-4 sm:p-5">
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/15" />
            <div className="rounded-[2rem] border border-primary/12 bg-background/72 p-4 shadow-[inset_0_1px_0_oklch(1_0_0_/0.7)] sm:p-6 dark:border-white/8 dark:bg-black/10">
              <div className="mb-4 flex items-center justify-between gap-4 border-primary/10 border-b pb-4">
                <div>
                  <p className="font-medium text-[0.72rem] text-muted-foreground uppercase tracking-[0.2em]">
                    {t("hero_visual_eyebrow", "Interface Tone")}
                  </p>
                  <p className="mt-2 max-w-xs text-foreground/70 text-sm leading-relaxed">
                    {t(
                      "hero_visual_description",
                      "A quieter visual layer that keeps the foreground focused on what matters."
                    )}
                  </p>
                </div>
                <div className="hidden size-11 rounded-full border border-primary/14 bg-white/72 shadow-[0_14px_34px_-26px_oklch(0.64_0.16_11_/0.5)] sm:block dark:bg-white/8" />
              </div>
              <DotLottieReact
                autoplay
                className="w-full scale-[1.03]"
                loop
                src="./assets/lotties/network-security.json"
              />
            </div>
          </div>
          <div className="rose-panel rose-floating -left-2 absolute top-6 hidden max-w-[240px] p-4 sm:block">
            <div className="flex items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-5" icon="uil:shield-check" />
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {t("hero_floating_security_title", "Steady Routing")}
                </p>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                  {t(
                    "hero_floating_security_desc",
                    "Smoother switching so longer sessions feel less interrupted."
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="rose-panel rose-floating-delay -bottom-5 absolute right-0 max-w-[250px] p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-5" icon="uil:apps" />
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {t("hero_floating_global_title", "Measured Interface")}
                </p>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                  {t(
                    "hero_floating_global_desc",
                    "Information is kept lighter so the current action stays in view."
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
