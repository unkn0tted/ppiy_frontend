import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";

export function Hero() {
  const { t } = useTranslation("main");
  const { common, user } = useGlobalStore();
  const { site } = common;
  const notes = [
    {
      index: "01",
      title: t("users", "Users"),
      description: t("users_description", "Trusted by users worldwide"),
    },
    {
      index: "02",
      title: t("servers", "Servers"),
      description: t(
        "servers_description",
        "High-performance servers globally"
      ),
    },
    {
      index: "03",
      title: t("locations", "Locations"),
      description: t("locations_description", "Available in multiple regions"),
    },
  ];

  return (
    <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:pt-8">
      <motion.div
        className="weidu-panel px-6 py-8 md:px-10 md:py-12 xl:px-12 xl:py-14"
        initial={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.25 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="weidu-kicker">Weidu Monochrome</div>
        <div className="weidu-rule mt-6 max-w-24" />

        <div className="mt-10 max-w-4xl">
          <h1 className="font-semibold text-5xl leading-[0.88] md:text-7xl xl:text-[5.8rem]">
            {site.site_name}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground leading-8 md:text-lg">
            {site.site_desc ||
              t(
                "global_map_description",
                "Explore seamless global connectivity. Choose network services that suit your needs and stay connected anytime, anywhere."
              )}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="rounded-full bg-foreground px-6 py-6 text-background hover:bg-foreground/92"
            size="lg"
          >
            <Link to={user ? "/dashboard" : "/auth"}>
              {t("started", "Get Started")}
            </Link>
          </Button>
          <Button
            asChild
            className="rounded-full border border-border bg-transparent px-6 py-6 hover:bg-foreground hover:text-background"
            size="lg"
            variant="outline"
          >
            <a href="#plans">
              {t("product_showcase_title", "Choose Your Package")}
            </a>
          </Button>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {notes.map((item) => (
            <article
              className="rounded-[1.35rem] border border-border/75 bg-background/70 px-4 py-5"
              key={item.index}
            >
              <div className="font-medium text-[0.7rem] text-muted-foreground uppercase tracking-[0.32em]">
                {item.index}
              </div>
              <h2 className="mt-4 font-semibold text-2xl">{item.title}</h2>
              <p className="mt-2 text-muted-foreground text-sm leading-6">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-6">
        <motion.article
          className="weidu-panel-ink px-6 py-8 md:px-8 md:py-10"
          initial={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="font-medium text-[0.68rem] text-background/55 uppercase tracking-[0.36em]">
            Quiet Statement
          </div>
          <p className="mt-10 max-w-md font-semibold text-3xl leading-tight md:text-4xl">
            Layout stripped back to essentials, with pricing and access left
            fully readable.
          </p>
          <div className="mt-12 space-y-4">
            {[
              "Minimal by default",
              "Readable purchase flow",
              "Monochrome visual language",
            ].map((item) => (
              <div
                className="flex items-center justify-between border-white/12 border-t pt-4"
                key={item}
              >
                <span className="font-medium text-background/65 text-sm uppercase tracking-[0.24em]">
                  {item}
                </span>
                <span className="size-2 rounded-full bg-background/75" />
              </div>
            ))}
          </div>
        </motion.article>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <article className="weidu-panel p-6">
            <div className="weidu-kicker">Brand Direction</div>
            <p className="mt-6 text-base text-muted-foreground leading-7">
              {t(
                "product_showcase_description",
                "Let us help you select the package that best suits you and enjoy exploring it."
              )}
            </p>
          </article>
          <article className="weidu-panel p-6">
            <div className="weidu-kicker">Immediate Route</div>
            <p className="mt-6 text-base text-muted-foreground leading-7">
              {user
                ? t("mySubscriptions", "My Subscriptions")
                : t("purchaseSubscription", "Purchase Subscription")}
            </p>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
