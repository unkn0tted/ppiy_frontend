import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";

export function ClosingStatement() {
  const { t } = useTranslation("main");
  const { user } = useGlobalStore();

  const scrollToPlans = () => {
    document.getElementById("plans")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.section
      className="weidu-landing-panel px-6 py-8 md:px-8 md:py-10 xl:px-10"
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)] lg:items-end">
        <div className="space-y-5">
          <div className="weidu-landing-kicker">
            {t("closingEyebrow", "最终信号")}
          </div>
          <h2 className="max-w-3xl font-semibold text-4xl leading-[0.96] md:text-5xl xl:text-[4.2rem]">
            {t("closingTitle", "让入口到动作之间的路径，更直接一点。")}
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground leading-8 md:text-lg">
            {t(
              "closingLead",
              "从进入首页到完成方案选择，流程保持克制，关键信息始终清楚可见。"
            )}
          </p>
        </div>

        <div className="space-y-5">
          <div className="weidu-rule" />
          <p className="text-muted-foreground text-sm leading-7">
            {t(
              "closingNote",
              "如果你已经准备好了，可以直接进入账号入口，或者再确认一次套餐信息。"
            )}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
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
        </div>
      </div>
    </motion.section>
  );
}
