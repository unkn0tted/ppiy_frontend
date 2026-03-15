import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Icon } from "@workspace/ui/composed/icon";
import { cn } from "@workspace/ui/lib/utils";
import { motion } from "framer-motion";
import type { Key, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Display } from "@/components/display";
import { SubscribeDetail } from "@/sections/subscribe/detail";
import { useGlobalStore } from "@/stores/global";

interface ProductShowcaseProps {
  subscriptionData: API.Subscribe[];
}

export function Content({ subscriptionData }: ProductShowcaseProps) {
  const { t } = useTranslation("main");
  const { user } = useGlobalStore();

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
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <motion.h2
          className="max-w-2xl text-3xl leading-tight sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="rose-section-title">
            {t("product_showcase_title", "Choose Your Package")}
          </span>
        </motion.h2>
        <motion.p
          className="max-w-2xl text-base text-muted-foreground leading-relaxed lg:max-w-xl lg:text-right"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {t(
            "product_showcase_description",
            "Let us help you select the package that best suits you and enjoy exploring it."
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
            <article
              className={cn(
                "rose-panel group hover:-translate-y-1 flex h-full flex-col p-5 transition-all duration-300",
                index === 1 &&
                  "border-primary/30 bg-linear-to-b from-primary/14 via-white/88 to-white/78 dark:from-primary/12 dark:via-white/6 dark:to-white/4"
              )}
            >
              {index === 1 && (
                <span className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground text-xs uppercase tracking-[0.12em]">
                  {t("subscribe", "Subscribe")}
                </span>
              )}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{item.name}</h3>
                </div>
              </div>
              <div className="mt-5 flex flex-grow flex-col gap-4 text-sm">
                <ul className="flex flex-grow flex-col gap-3">
                  {(() => {
                    let parsedDescription: {
                      description: string;
                      features: Array<{
                        icon: string;
                        label: ReactNode;
                        type: "default" | "success" | "destructive";
                      }>;
                    };
                    try {
                      parsedDescription = JSON.parse(item.description);
                    } catch {
                      parsedDescription = { description: "", features: [] };
                    }

                    const { description, features } = parsedDescription;
                    return (
                      <>
                        {description && (
                          <li className="text-muted-foreground">
                            {description}
                          </li>
                        )}
                        {features?.map(
                          (
                            feature: {
                              type: string;
                              icon: string;
                              label: ReactNode;
                            },
                            index: Key
                          ) => (
                            <li
                              className={cn("flex items-center gap-2", {
                                "text-muted-foreground line-through":
                                  feature.type === "destructive",
                              })}
                              key={index}
                            >
                              {feature.icon && (
                                <Icon
                                  className={cn("size-5 text-primary", {
                                    "text-green-500":
                                      feature.type === "success",
                                    "text-destructive":
                                      feature.type === "destructive",
                                  })}
                                  icon={feature.icon}
                                />
                              )}
                              {feature.label}
                            </li>
                          )
                        )}
                      </>
                    );
                  })()}
                </ul>
                <SubscribeDetail
                  subscribe={{
                    ...item,
                    name: undefined,
                  }}
                />
              </div>
              <div className="mt-6 h-px bg-gradient-to-r from-primary/10 via-primary/35 to-transparent" />
              <div className="mt-6 flex flex-col gap-4">
                {(() => {
                  const hasDiscount = item.discount && item.discount.length > 0;
                  const shouldShowOriginal = item.show_original_price !== false;

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
                      className="space-y-1"
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.16em]">
                        {item.discount?.length
                          ? t("started", "Get Started")
                          : t("subscribe", "Subscribe")}
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
                    className="w-full rounded-[1.15rem] font-semibold tracking-wide shadow-lg shadow-primary/15"
                  >
                    <Link
                      search={user ? undefined : { id: item.id }}
                      to={user ? "/subscribe" : "/purchasing"}
                    >
                      {t("subscribe", "Subscribe")}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
