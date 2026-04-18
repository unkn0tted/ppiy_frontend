import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Icon } from "@workspace/ui/composed/icon";
import { cn } from "@workspace/ui/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Display } from "@/components/display";
import { SubscribeDetail } from "@/sections/subscribe/detail";
import { useGlobalStore } from "@/stores/global";

interface ProductShowcaseProps {
  subscriptionData: API.Subscribe[];
}

type ParsedFeature = {
  icon?: string;
  label: ReactNode;
  type?: "default" | "success" | "destructive";
};

type ParsedDescription = {
  description: string;
  features: ParsedFeature[];
};

function parseSubscriptionDescription(value: unknown): ParsedDescription {
  if (typeof value !== "string" || !value.trim()) {
    return { description: "", features: [] };
  }

  try {
    const parsed = JSON.parse(value) as Partial<ParsedDescription>;
    return {
      description:
        typeof parsed.description === "string" ? parsed.description : "",
      features: Array.isArray(parsed.features) ? parsed.features : [],
    };
  } catch {
    return {
      description: value,
      features: [],
    };
  }
}

export function Content({ subscriptionData }: ProductShowcaseProps) {
  const { t } = useTranslation("main");
  const { user } = useGlobalStore();
  const highlightedIndex = (() => {
    const discountedIndex = subscriptionData.findIndex(
      (item) => (item.discount?.length ?? 0) > 0
    );

    return discountedIndex >= 0
      ? discountedIndex
      : Math.min(1, subscriptionData.length - 1);
  })();

  const unitTimeMap: Record<string, string> = {
    Day: t("Day", "Day"),
    Hour: t("Hour", "Hour"),
    Minute: t("Minute", "Minute"),
    Month: t("Month", "Month"),
    NoLimit: t("NoLimit", "No Limit"),
    Year: t("Year", "Year"),
  };

  return (
    <motion.section
      className="rose-shell px-6 py-7 sm:px-8 lg:px-10 lg:py-9"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      <div className="rose-grid" />
      <div className="-left-20 -top-24 pointer-events-none absolute h-64 w-64 rounded-full bg-primary/16 blur-3xl" />
      <div className="pointer-events-none absolute right-8 bottom-8 h-44 w-44 rounded-full bg-rose-200/26 blur-3xl dark:bg-rose-400/10" />
      <div className="mb-9 grid gap-5 xl:grid-cols-[0.76fr_0.24fr] xl:items-end">
        <div>
          <span className="rose-pill">
            {t("product_showcase_badge", "Plan Selection")}
          </span>
          <motion.h2
            className="mt-6 max-w-3xl font-display text-3xl leading-tight sm:text-[2.65rem]"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="rose-section-title">
              {t(
                "product_showcase_title",
                "A few plans shaped around different rhythms of use"
              )}
            </span>
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-base text-muted-foreground leading-8"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {t(
              "product_showcase_description",
              "Selection does not need to feel noisy. When duration, capacity, and price sit together, comparison becomes calmer."
            )}
          </motion.p>
        </div>
        <motion.p
          className="max-w-sm border-primary/16 border-l pl-4 text-foreground/72 text-sm leading-7 xl:justify-self-end xl:border-r xl:border-l-0 xl:pr-4 xl:pl-0 xl:text-right"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {t(
            "product_showcase_note",
            "If a plan is meant for longer use, it should also be easier to read at a glance."
          )}
        </motion.p>
      </div>
      <div className="mx-auto grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {subscriptionData?.map((item, index) => (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 50 }}
            key={item.id}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {(() => {
              const parsedDescription = parseSubscriptionDescription(
                item.description
              );
              const isHighlighted = index === highlightedIndex;

              return (
                <article
                  className={cn(
                    "rose-panel group hover:-translate-y-1 flex h-full flex-col p-6 transition-all duration-300",
                    isHighlighted &&
                      "border-primary/28 bg-linear-to-b from-primary/14 via-white/88 to-white/76 shadow-[0_26px_58px_-42px_oklch(0.64_0.16_11_/0.78)] dark:from-primary/12 dark:via-white/6 dark:to-white/4"
                  )}
                >
                  {isHighlighted && (
                    <span className="absolute top-5 right-5 rounded-full border border-primary/18 bg-primary/10 px-3 py-1 font-semibold text-[0.72rem] text-primary uppercase tracking-[0.14em]">
                      {t("product_showcase_highlight", "Balanced Pick")}
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
                        0{index + 1}
                      </p>
                      <h3 className="mt-3 font-display text-2xl leading-none sm:text-[2rem]">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                  {parsedDescription.description && (
                    <p className="mt-5 max-w-sm text-foreground/72 text-sm leading-7">
                      {parsedDescription.description}
                    </p>
                  )}
                  {parsedDescription.features.length > 0 && (
                    <div className="mt-6 rounded-[1.35rem] border border-primary/10 bg-white/56 p-4 dark:bg-white/4">
                      <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]">
                        {t("product_showcase_feature_label", "Included")}
                      </p>
                      <ul className="mt-4 flex flex-col gap-3 text-sm">
                        {parsedDescription.features.map((feature, key) => (
                          <li
                            className={cn("flex items-center gap-3", {
                              "text-muted-foreground line-through":
                                feature.type === "destructive",
                            })}
                            key={key}
                          >
                            {feature.icon ? (
                              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Icon
                                  className={cn("size-4", {
                                    "text-green-500":
                                      feature.type === "success",
                                    "text-destructive":
                                      feature.type === "destructive",
                                  })}
                                  icon={feature.icon}
                                />
                              </div>
                            ) : (
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/45" />
                            )}
                            <span className="leading-6">{feature.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-4 rounded-[1.35rem] border border-primary/10 bg-white/44 p-4 dark:bg-white/3">
                    <SubscribeDetail
                      subscribe={{
                        ...item,
                        name: undefined,
                      }}
                      title={t("product_showcase_detail_label", "Core Details")}
                    />
                  </div>
                  <div className="mt-6 h-px bg-gradient-to-r from-primary/12 via-primary/34 to-transparent" />
                  <div className="mt-6 flex flex-col gap-5">
                    {(() => {
                      const hasDiscount =
                        item.discount && item.discount.length > 0;
                      const shouldShowOriginal =
                        item.show_original_price !== false;

                      const displayPrice =
                        shouldShowOriginal || !hasDiscount
                          ? item.unit_price
                          : Math.round(
                              item.unit_price *
                                (item.discount?.[0]?.quantity ?? 1) *
                                ((item.discount?.[0]?.discount ?? 100) / 100)
                            );

                      const displayQuantity =
                        shouldShowOriginal || !hasDiscount
                          ? 1
                          : (item.discount?.[0]?.quantity ?? 1);

                      const unitTime =
                        unitTimeMap[item.unit_time!] ||
                        t(item.unit_time || "Month", item.unit_time || "Month");

                      return (
                        <motion.div
                          animate={{ opacity: 1 }}
                          className="space-y-2"
                          initial={{ opacity: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
                            {t(
                              "product_showcase_price_label",
                              "Reference Price"
                            )}
                          </p>
                          <h2 className="font-display text-3xl leading-none sm:text-[2.2rem]">
                            <Display type="currency" value={displayPrice} />
                            <span className="font-medium text-base text-foreground/75">
                              {displayQuantity === 1
                                ? `/${unitTime}`
                                : `/${displayQuantity} ${unitTime}`}
                            </span>
                          </h2>
                        </motion.div>
                      );
                    })()}
                    <motion.div className="mt-auto">
                      <Button
                        asChild
                        className={cn(
                          "w-full rounded-[1.15rem] font-semibold shadow-lg",
                          isHighlighted
                            ? "shadow-primary/15"
                            : "border-primary/14 bg-white/68 text-foreground hover:bg-white/90 dark:bg-white/6 dark:hover:bg-white/10"
                        )}
                        variant={isHighlighted ? "default" : "outline"}
                      >
                        <Link
                          search={user ? undefined : { id: item.id }}
                          to={user ? "/subscribe" : "/purchasing"}
                        >
                          {t("product_showcase_action", "View Plan")}
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </article>
              );
            })()}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
