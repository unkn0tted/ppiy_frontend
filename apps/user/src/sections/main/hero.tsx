import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";
import { GlobalMap } from "./global-map";

export function Hero() {
  const { t } = useTranslation("main");
  const { common, user } = useGlobalStore();
  const { site } = common;
  const callouts = [
    {
      code: "01",
      description: t(
        "heroCalloutEntryDesc",
        "关键动作在首屏内保持可见，不把视线带离主路径。"
      ),
      title: t("heroCalloutEntryTitle", "入口有序"),
    },
    {
      code: "02",
      description: t(
        "heroCalloutVisualDesc",
        "只用黑、白、灰三种层级组织页面视觉语言。"
      ),
      title: t("heroCalloutVisualTitle", "黑白系统"),
    },
    {
      code: "03",
      description: t(
        "heroCalloutFlowDesc",
        "从首页到方案区只需要一次滚动，不额外绕路。"
      ),
      title: t("heroCalloutFlowTitle", "流程直接"),
    },
  ];

  const scrollToPlans = () => {
    document.getElementById("plans")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section>
      <motion.section
        className="weidu-landing-panel relative overflow-hidden px-6 py-8 md:px-8 md:py-10 xl:px-10 xl:py-12"
        initial={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.25 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="weidu-landing-hero-glow pointer-events-none absolute inset-0" />

        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)] xl:items-stretch">
          <div className="flex flex-col justify-between gap-8 xl:pr-10">
            <div className="space-y-6">
              <div className="weidu-landing-kicker">
                {t("heroEyebrow", "黑白访问网络")}
              </div>
              <h1 className="max-w-5xl font-semibold text-5xl leading-[0.88] md:text-7xl xl:text-[5.8rem]">
                <span className="block">{site.site_name}</span>
                <span className="mt-4 block text-[0.44em] text-foreground/72 leading-[1.02] md:text-[0.38em]">
                  {t("heroHeadline", "为直接、清晰的访问体验而构建")}
                </span>
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground leading-8 md:text-lg">
                {t(
                  "heroLead",
                  "让页面保持安静，让价格保持清楚，让从落地页到订阅选择的路径更容易跟上。"
                )}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="weidu-landing-button-primary"
                size="lg"
                variant="ghost"
              >
                <Link to={user ? "/dashboard" : "/auth"}>
                  {t("started", "开始使用")}
                </Link>
              </Button>
              <Button
                className="weidu-landing-button-secondary"
                onClick={scrollToPlans}
                size="lg"
                type="button"
                variant="ghost"
              >
                {t("explorePlans", "查看套餐")}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {callouts.map((item, index) => (
                <motion.article
                  className="weidu-callout-card"
                  initial={{ opacity: 0, y: 18 }}
                  key={item.code}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + index * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-muted-foreground text-sm uppercase tracking-[0.16em]">
                      {item.code}
                    </span>
                    <div className="weidu-callout-rule" />
                  </div>
                  <h2 className="mt-5 font-semibold text-xl leading-tight">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground text-sm leading-7">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="border-border/80 border-t pt-8 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-10">
            <GlobalMap />
          </div>
        </div>
      </motion.section>
    </section>
  );
}
