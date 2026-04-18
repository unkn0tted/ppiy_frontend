import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Icon } from "@workspace/ui/composed/icon";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function GlobalMap() {
  const { t } = useTranslation("main");
  const notes = [
    {
      icon: "uil:shuffle",
      title: t("global_map_pillar_network_title", "Routing Rhythm"),
      description: t(
        "global_map_pillar_network_desc",
        "Switching and recovery stay calmer, even through longer sessions."
      ),
    },
    {
      icon: "uil:map-marker",
      title: t("global_map_pillar_coverage_title", "Regional Spread"),
      description: t(
        "global_map_pillar_coverage_desc",
        "Coverage can extend outward without increasing visual noise."
      ),
    },
    {
      icon: "uil:crosshair",
      title: t("global_map_pillar_experience_title", "Interaction Focus"),
      description: t(
        "global_map_pillar_experience_desc",
        "Attention stays on the current task, so browsing feels more composed."
      ),
    },
  ];

  return (
    <motion.section
      className="rose-shell px-6 py-7 sm:px-8 lg:px-10 lg:py-9"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      <div className="rose-grid" />
      <div className="-left-16 pointer-events-none absolute top-14 h-44 w-44 rounded-full bg-primary/16 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-8 h-36 w-36 rounded-full bg-rose-200/24 blur-3xl dark:bg-rose-400/8" />
      <div className="grid items-center gap-10 xl:grid-cols-[0.86fr_1.14fr]">
        <div className="flex flex-col">
          <span className="rose-pill">
            {t("global_map_badge", "Global Network")}
          </span>
          <motion.h2
            className="mt-6 max-w-lg font-display text-3xl leading-tight sm:text-[2.65rem]"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="rose-section-title">
              {t("global_map_itle", "Wider Coverage, Lighter Expression")}
            </span>
          </motion.h2>
          <motion.p
            className="mt-4 max-w-xl text-base text-muted-foreground leading-8 sm:text-lg"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {t(
              "global_map_description",
              "Routing and node selection are handled underneath, while the surface keeps only the information worth noticing."
            )}
          </motion.p>
          <motion.p
            className="mt-6 max-w-md border-primary/16 border-l pl-4 text-foreground/72 text-sm leading-7 sm:text-[0.95rem]"
            initial={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {t(
              "global_map_note",
              "As the underlying range expands, the presentation should become more restrained, not louder."
            )}
          </motion.p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {notes.map((item, index) => (
              <motion.div
                className={`rose-panel min-h-[168px] p-5 sm:p-6 ${
                  index === 2 ? "sm:col-span-2" : ""
                }`}
                initial={{ opacity: 0, y: 18 }}
                key={item.title}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="size-5" icon={item.icon} />
                  </div>
                  <div>
                    <p className="font-semibold text-[1.02rem]">{item.title}</p>
                    <p className="mt-2 max-w-sm text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          animate={{ scale: 1, opacity: 1 }}
          className="relative mx-auto w-full max-w-[44rem] xl:justify-self-end"
          initial={{ scale: 0.94, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.25,
          }}
        >
          <div className="rose-panel p-4 sm:p-5">
            <div className="absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/15" />
            <div className="rounded-[2rem] border border-primary/12 bg-background/72 p-3 sm:p-5 dark:border-white/8 dark:bg-black/10">
              <div className="mb-4 flex items-center justify-between gap-4 border-primary/10 border-b pb-4">
                <div>
                  <p className="font-medium text-[0.72rem] text-muted-foreground uppercase tracking-[0.2em]">
                    {t("global_map_visual_eyebrow", "Routing Surface")}
                  </p>
                  <p className="mt-2 max-w-xs text-foreground/70 text-sm leading-relaxed">
                    {t(
                      "global_map_visual_description",
                      "Complexity stays in the background so the interface can remain quieter in front."
                    )}
                  </p>
                </div>
                <div className="hidden size-11 rounded-full border border-primary/14 bg-white/72 shadow-[0_14px_34px_-26px_oklch(0.64_0.16_11_/0.5)] sm:block dark:bg-white/8" />
              </div>
              <DotLottieReact
                autoplay
                className="w-full scale-[1.18] rounded-2xl"
                loop
                src="./assets/lotties/global-map.json"
              />
            </div>
          </div>
          <div className="rose-panel rose-floating absolute top-6 left-0 hidden max-w-[240px] p-4 sm:block">
            <p className="font-semibold text-sm">
              {t("global_map_floating_left_title", "Routing Order")}
            </p>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              {t(
                "global_map_floating_left_desc",
                "Adjustments stay quieter in the background, without needing attention each time."
              )}
            </p>
          </div>
          <div className="rose-panel rose-floating-delay -bottom-4 absolute right-0 max-w-[240px] p-4">
            <p className="font-semibold text-sm">
              {t("global_map_floating_right_title", "Expanded Range")}
            </p>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              {t(
                "global_map_floating_right_desc",
                "Coverage extends outward while the front-end expression stays concise."
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
