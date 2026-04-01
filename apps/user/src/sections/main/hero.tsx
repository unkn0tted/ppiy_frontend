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

  const scrollToPlans = () => {
    document.getElementById("plans")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)] xl:items-stretch xl:pt-8">
      <motion.div
        className="weidu-panel h-full px-6 py-8 md:px-10 md:py-12 xl:px-12 xl:py-14"
        initial={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.25 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h1 className="max-w-4xl font-semibold text-5xl leading-[0.88] md:text-7xl xl:text-[5.8rem]">
          {site.site_name}
        </h1>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="rounded-full bg-primary px-6 py-6 text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            <Link to={user ? "/dashboard" : "/auth"}>
              {t("started", "Get Started")}
            </Link>
          </Button>
          <Button
            className="rounded-full border border-border bg-transparent px-6 py-6 hover:bg-secondary"
            onClick={scrollToPlans}
            size="lg"
            type="button"
            variant="outline"
          >
            {t("product_showcase_title", "Choose Your Package")}
          </Button>
        </div>
      </motion.div>
      <GlobalMap />
    </section>
  );
}
