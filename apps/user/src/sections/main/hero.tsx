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
  const tags = [
    t("hero_tag_speed", "Fast Access"),
    t("hero_tag_design", "Minimal Interface"),
    t("hero_tag_motion", "Fluid Motion"),
  ];

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="rose-shell px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-11"
      initial={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 110, damping: 18 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="rose-grid" />
      <AmbientMist variant="hero" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-l from-primary/12 via-transparent to-transparent lg:block" />
      <div className="-right-16 -top-20 pointer-events-none absolute h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="-bottom-24 -left-8 pointer-events-none absolute h-64 w-64 rounded-full bg-rose-300/16 blur-3xl dark:bg-rose-400/10" />
      <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start"
          initial={{ opacity: 0, y: 32 }}
          transition={{
            type: "spring",
            stiffness: 96,
            damping: 16,
            delay: 0.12,
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="rose-pill">{t("started", "Get Started")}</span>
          <h1 className="mt-6 max-w-3xl font-display text-[2.85rem] leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-[4.6rem]">
            {t("welcome", "Welcome to")}
            <br />
            <span className="rose-section-title">{site.site_name}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground leading-8 sm:text-lg">
            {site.site_desc ||
              t(
                "global_map_description",
                "Explore seamless global connectivity. Choose network services that suit your needs and stay connected anytime, anywhere."
              )}
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {tags.map((item) => (
              <span
                className="rounded-full border border-primary/12 bg-white/70 px-3.5 py-2 font-medium text-foreground/90 text-sm shadow-[0_14px_28px_-26px_oklch(0.64_0.16_11_/0.4)] dark:border-white/8 dark:bg-white/6"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
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
                  {t("product_showcase_title", "Choose Your Package")}
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto w-full max-w-[34rem]"
          initial={{ opacity: 0, y: 36 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 16,
            delay: 0.24,
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="rose-panel p-3 sm:p-4">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/15" />
            <div className="rounded-[1.85rem] border border-primary/12 bg-background/72 p-4 shadow-[inset_0_1px_0_oklch(1_0_0_/0.7)] sm:p-6 dark:border-white/8 dark:bg-black/10">
              <DotLottieReact
                autoplay
                className="w-full scale-[1.04]"
                loop
                src="./assets/lotties/network-security.json"
              />
            </div>
          </div>
          <div className="rose-panel rose-floating absolute top-6 left-0 hidden max-w-[220px] p-4 sm:block">
            <div className="flex items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-5" icon="uil:shield-check" />
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {t("hero_floating_security_title", "Always-on Protection")}
                </p>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                  {t(
                    "hero_floating_security_desc",
                    "Protected routing with steadier switching and cleaner delivery."
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="rose-panel rose-floating-delay -bottom-4 absolute right-0 max-w-[240px] p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-5" icon="uil:map-marker" />
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {t("hero_floating_global_title", "Global Reach")}
                </p>
                <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                  {t(
                    "hero_floating_global_desc",
                    "Built for a wider footprint without making the interface feel busy."
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
