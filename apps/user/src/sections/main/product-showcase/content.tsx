import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
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
      id="plans"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1 }}
    >
      <div className="mb-10 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div className="space-y-5">
          <div className="weidu-kicker">Pricing Layout</div>
          <div className="weidu-rule max-w-24" />
          <h2 className="font-semibold text-4xl leading-tight lg:text-[3.4rem]">
            {t("product_showcase_title", "Choose Your Package")}
          </h2>
        </div>
        <p className="max-w-2xl text-base text-muted-foreground leading-8 lg:justify-self-end">
          {t(
            "product_showcase_description",
            "Let us help you select the package that best suits you and enjoy exploring it."
          )}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        {subscriptionData?.map((item, index) => {
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

          const isFeatured = index === 0 && subscriptionData.length > 1;

          return (
            <motion.div
              className={cn(
                "lg:col-span-4",
                isFeatured && "lg:col-span-5 lg:row-span-2"
              )}
              initial={{ opacity: 0, y: 28 }}
              key={item.id}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.5 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card
                className={cn(
                  "weidu-panel flex h-full flex-col gap-0 overflow-hidden rounded-[1.9rem] border py-0",
                  isFeatured && "border-foreground/20 bg-card"
                )}
              >
                <CardHeader className="border-border/70 border-b px-6 py-6 lg:px-8 lg:py-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.36em]">
                        {`Plan ${String(index + 1).padStart(2, "0")}`}
                      </div>
                      <h3 className="mt-4 font-semibold text-3xl leading-none">
                        {item.name}
                      </h3>
                    </div>
                    {isFeatured && (
                      <div className="rounded-full border border-border bg-background px-3 py-1 font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.28em]">
                        Featured
                      </div>
                    )}
                  </div>
                  {description && (
                    <p className="mt-5 max-w-xl text-muted-foreground text-sm leading-7">
                      {description}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-8 px-6 py-6 lg:px-8 lg:py-8">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <div className="font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.34em]">
                        Pricing
                      </div>
                      <div className="mt-3 font-semibold text-4xl leading-none sm:text-5xl">
                        <Display type="currency" value={displayPrice} />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.34em]">
                        Cycle
                      </div>
                      <div className="mt-3 text-muted-foreground text-sm uppercase tracking-[0.2em]">
                        {displayQuantity === 1
                          ? unitTime
                          : `${displayQuantity} ${unitTime}`}
                      </div>
                    </div>
                  </div>

                  {features?.length > 0 && (
                    <ul className="grid gap-3 border-border/70 border-t pt-6 text-sm">
                      {features.map(
                        (
                          feature: {
                            type: string;
                            icon: string;
                            label: ReactNode;
                          },
                          featureIndex: Key
                        ) => (
                          <li
                            className={cn("flex items-center gap-2 leading-6", {
                              "text-muted-foreground line-through":
                                feature.type === "destructive",
                            })}
                            key={featureIndex}
                          >
                            {feature.icon && (
                              <Icon
                                className={cn("size-4 text-foreground", {
                                  "text-foreground": feature.type === "success",
                                  "text-muted-foreground":
                                    feature.type === "destructive",
                                })}
                                icon={feature.icon}
                              />
                            )}
                            {feature.label}
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  <div className="rounded-[1.35rem] border border-border/70 bg-background/70 p-4">
                    <SubscribeDetail
                      subscribe={{
                        ...item,
                        name: undefined,
                      }}
                    />
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="px-6 pt-6 pb-6 lg:px-8 lg:pb-8">
                  <Button
                    asChild
                    className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    <Link
                      search={user ? undefined : { id: item.id }}
                      to={user ? "/subscribe" : "/purchasing"}
                    >
                      {t("subscribe", "Subscribe")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
