import { Icon } from "@workspace/ui/composed/icon";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Stats() {
  const { t } = useTranslation("main");

  const list = [
    {
      name: t("users", "Users"),
      description: t("users_description", "Trusted by users worldwide"),
      icon: "uil:users-alt",
    },
    {
      name: t("servers", "Servers"),
      description: t(
        "servers_description",
        "High-performance servers globally"
      ),
      icon: "uil:server",
    },
    {
      name: t("locations", "Locations"),
      description: t("locations_description", "Available in multiple regions"),
      icon: "uil:map-marker",
    },
  ];
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="z-10 grid w-full grid-cols-1 gap-4 md:grid-cols-3"
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {list.map((item, index) => (
        <motion.div
          className="rose-panel group hover:-translate-y-1 min-h-[182px] p-5 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          key={item.name}
          transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.8 }}
          whileHover={{ y: -4 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <span className="pointer-events-none absolute top-4 right-5 font-display text-6xl text-primary/8">
            0{index + 1}
          </span>
          <div>
            <div className="flex size-12 items-center justify-center rounded-[1.1rem] bg-primary/12 text-primary">
              <Icon className="size-5" icon={item.icon} />
            </div>
            <p className="mt-6 font-medium text-muted-foreground text-xs uppercase tracking-[0.15em]">
              0{index + 1}
            </p>
            <h3 className="mt-3 text-2xl">{item.name}</h3>
            <p className="mt-3 max-w-xs text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
