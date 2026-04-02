import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Stats() {
  const { t } = useTranslation("main");

  const list = [
    {
      description: t(
        "signalGlobalDesc",
        "在统一的视觉秩序里展示多区域服务的可达性。"
      ),
      name: t("signalGlobalTitle", "全球覆盖"),
    },
    {
      description: t(
        "signalAccessDesc",
        "让首页入口与方案区之间保持最短路径，减少不必要的层级跳转。"
      ),
      name: t("signalAccessTitle", "直接入口"),
    },
    {
      description: t(
        "signalPricingDesc",
        "价格、周期与核心限制保持直接可读，不需要额外点击。"
      ),
      name: t("signalPricingTitle", "清晰定价"),
    },
  ];

  return (
    <motion.section
      className="grid gap-4 xl:grid-cols-3"
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.35 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {list.map((item, index) => (
        <motion.article
          className="weidu-signal-card px-6 py-6 md:px-7 md:py-7"
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
          <div className="flex items-center justify-between gap-4">
            <div className="weidu-landing-kicker">
              {t("signalEyebrow", "信号")}
            </div>
            <div className="font-medium text-muted-foreground text-sm uppercase tracking-[0.16em]">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <h2 className="mt-8 font-semibold text-2xl leading-tight md:text-[2rem]">
            {item.name}
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground text-sm leading-7">
            {item.description}
          </p>
        </motion.article>
      ))}
    </motion.section>
  );
}
