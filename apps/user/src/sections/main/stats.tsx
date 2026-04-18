import { Icon } from "@workspace/ui/composed/icon";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Stats() {
  const { t } = useTranslation("main");

  const list = [
    {
      name: t("users", "Users"),
      description: t(
        "stats_users_description",
        "Steady use usually comes from choices that remain dependable over time."
      ),
      icon: "uil:users-alt",
    },
    {
      name: t("servers", "Servers"),
      description: t(
        "stats_servers_description",
        "Infrastructure stays behind the curtain, but it sets the pace of the whole experience."
      ),
      icon: "uil:server",
    },
    {
      name: t("locations", "Locations"),
      description: t(
        "stats_locations_description",
        "Coverage can extend outward without making usage feel more complicated."
      ),
      icon: "uil:map-marker",
    },
  ];

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="rose-shell z-10 px-6 py-7 sm:px-8 lg:px-10 lg:py-9"
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="rose-grid" />
      <div className="-right-16 pointer-events-none absolute top-8 h-40 w-40 rounded-full bg-primary/16 blur-3xl" />
      <div className="grid gap-8 xl:grid-cols-[0.33fr_0.67fr] xl:items-end">
        <div className="flex flex-col">
          <span className="rose-pill">
            {t("stats_badge", "Service Outline")}
          </span>
          <motion.h2
            className="mt-6 max-w-md font-display text-3xl leading-tight sm:text-[2.5rem]"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="rose-section-title">
              {t(
                "stats_title",
                "Keep scale in the background, leave the experience in front."
              )}
            </span>
          </motion.h2>
          <motion.p
            className="mt-4 max-w-md text-base text-muted-foreground leading-8"
            initial={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {t(
              "stats_description",
              "Users, servers, and locations do not need louder claims. They need quiet structure."
            )}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {list.map((item, index) => (
            <motion.article
              className="rose-panel group hover:-translate-y-1 flex min-h-[216px] flex-col p-6 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.92 }}
              key={item.name}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.8 }}
              whileHover={{ y: -4 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-12 items-center justify-center rounded-[1.1rem] bg-primary/12 text-primary">
                  <Icon className="size-5" icon={item.icon} />
                </div>
                <span className="pointer-events-none font-display text-5xl text-primary/8">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-8 font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-[1.85rem] leading-none">
                {item.name}
              </h3>
              <p className="mt-4 max-w-xs text-foreground/72 text-sm leading-7">
                {item.description}
              </p>
              <div className="mt-auto pt-8">
                <div className="h-px bg-gradient-to-r from-primary/18 via-primary/28 to-transparent" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
