import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Stats() {
  const { t } = useTranslation("main");

  const list = [
    {
      name: t("users", "Users"),
      description: t("users_description", "Trusted by users worldwide"),
    },
    {
      name: t("servers", "Servers"),
      description: t(
        "servers_description",
        "High-performance servers globally"
      ),
    },
    {
      name: t("locations", "Locations"),
      description: t("locations_description", "Available in multiple regions"),
    },
  ];

  return (
    <motion.section
      className="weidu-panel h-full px-6 py-8 lg:px-8 lg:py-10"
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.35 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-6">
        <div className="weidu-kicker">Service Standard</div>
        <div className="weidu-rule max-w-24" />
        <h2 className="max-w-lg font-semibold text-3xl leading-tight lg:text-[2.4rem]">
          Simple blocks, clear hierarchy, and no decorative noise.
        </h2>
      </div>

      <div className="mt-10 space-y-4">
        {list.map((item, index) => (
          <motion.article
            className="grid gap-4 border-border/75 border-t pt-4 md:grid-cols-[auto_1fr]"
            initial={{ opacity: 0, y: 16 }}
            key={item.name}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.45 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="font-medium text-2xl text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="font-semibold text-2xl">{item.name}</h3>
              <p className="mt-2 max-w-xl text-muted-foreground text-sm leading-7">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
