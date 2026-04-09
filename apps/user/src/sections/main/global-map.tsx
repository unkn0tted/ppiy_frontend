import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Icon } from "@workspace/ui/composed/icon";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function GlobalMap() {
  const { t } = useTranslation("main");
  const pillars = [
    {
      icon: "uil:radar",
      title: t("global_map_pillar_network_title", "Smart Routing"),
      description: t(
        "global_map_pillar_network_desc",
        "High-availability routing tuned for smoother global delivery."
      ),
    },
    {
      icon: "uil:map-marker",
      title: t("global_map_pillar_coverage_title", "Regional Coverage"),
      description: t(
        "global_map_pillar_coverage_desc",
        "Multi-region access with a cleaner, more focused experience."
      ),
    },
    {
      icon: "uil:users-alt",
      title: t("global_map_pillar_experience_title", "Smooth Experience"),
      description: t(
        "global_map_pillar_experience_desc",
        "Designed to stay intuitive while handling a broader footprint."
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
      <div className="grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <span className="rose-pill">
            {t("global_map_badge", "Global Network")}
          </span>
          <motion.h2
            className="mt-6 text-3xl leading-tight sm:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="rose-section-title">
              {t("global_map_itle", "Global Connection, Easy and Worry-free")}
            </span>
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-muted-foreground leading-relaxed sm:text-lg"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {t(
              "global_map_description",
              "Explore seamless global connectivity. Choose network services that suit your needs and stay connected anytime, anywhere."
            )}
          </motion.p>
          <div className="mt-7 grid gap-3">
            {pillars.map((item, index) => (
              <motion.div
                className="rose-panel p-4"
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
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
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
          className="relative mx-auto w-full max-w-[42rem]"
          initial={{ scale: 0.94, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.25,
          }}
        >
          <div className="rose-panel p-3 sm:p-4">
            <div className="rounded-[1.8rem] border border-primary/12 bg-background/72 p-2 sm:p-4 dark:border-white/8 dark:bg-black/10">
              <DotLottieReact
                autoplay
                className="w-full scale-[1.28] rounded-2xl"
                loop
                src="./assets/lotties/global-map.json"
              />
            </div>
          </div>
          <div className="rose-panel rose-floating absolute top-6 left-0 hidden max-w-[220px] p-4 sm:block">
            <p className="font-semibold text-sm">
              {t("global_map_floating_left_title", "Stable Routing")}
            </p>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              {t(
                "global_map_floating_left_desc",
                "Balanced routes that feel steadier during longer sessions."
              )}
            </p>
          </div>
          <div className="rose-panel rose-floating-delay -bottom-3 absolute right-0 max-w-[220px] p-4">
            <p className="font-semibold text-sm">
              {t("global_map_floating_right_title", "Wider Reach")}
            </p>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              {t(
                "global_map_floating_right_desc",
                "A broader footprint without crowding the interface."
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
