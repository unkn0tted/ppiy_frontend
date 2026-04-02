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
      className="scroll-mt-24"
      id="plans"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1 }}
    >
      <div className="weidu-landing-panel px-6 py-8 md:px-8 md:py-9 xl:px-10">
        <div className="weidu-landing-kicker">
          {t("productEyebrow", "定价矩阵")}
        </div>
        <h2 className="mt-4 max-w-4xl font-semibold text-4xl leading-[0.98] lg:text-[3.6rem]">
          {t("product_showcase_title", "选择适合你的接入方案")}
        </h2>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground leading-8">
          {t(
            "product_showcase_description",
            "把重点放在价格、周期和可用能力，不用翻找关键信息。"
          )}
        </p>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-12">
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

          const { features } = parsedDescription;
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
          const visibleFeatures = isFeatured ? features : features.slice(0, 4);

          return (
            <motion.div
              className={cn(
                isFeatured
                  ? "xl:col-span-6"
                  : "md:col-span-6 xl:col-span-3 xl:self-start"
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
                  "weidu-plan-card flex h-full flex-col gap-0 overflow-hidden border py-0",
                  isFeatured && "weidu-plan-card-featured"
                )}
              >
                <CardHeader className="border-border/80 border-b px-6 py-6 lg:px-8 lg:py-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      {isFeatured && (
                        <div className="weidu-plan-badge">
                          {t("featuredPlan", "推荐方案")}
                        </div>
                      )}
                      <h3
                        className={cn(
                          "font-semibold leading-none",
                          isFeatured ? "text-4xl" : "text-3xl"
                        )}
                      >
                        {item.name}
                      </h3>
                    </div>

                    <div className="text-right text-[0.72rem] text-muted-foreground uppercase tracking-[0.2em]">
                      {displayQuantity === 1
                        ? unitTime
                        : `${displayQuantity} ${unitTime}`}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-8 px-6 py-6 lg:px-8 lg:py-8">
                  <div className="border-border/80 border-b pb-6">
                    <div
                      className={cn(
                        "font-semibold leading-none",
                        isFeatured ? "text-6xl sm:text-7xl" : "text-5xl"
                      )}
                    >
                      <Display type="currency" value={displayPrice} />
                    </div>
                    <p className="mt-3 max-w-sm text-muted-foreground text-sm leading-7">
                      {t(
                        "planSupportCopy",
                        "把价格、周期和服务细节压缩到一次浏览里，不增加噪音。"
                      )}
                    </p>
                  </div>

                  {visibleFeatures.length > 0 ? (
                    <ul
                      className={cn(
                        "grid gap-3 text-sm",
                        isFeatured && "sm:grid-cols-2"
                      )}
                    >
                      {visibleFeatures.map(
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
                  ) : (
                    <p className="text-muted-foreground text-sm leading-7">
                      {t(
                        "planEmptyFeatureCopy",
                        "即使没有自定义特性列表，流量、速率和设备限制也会在下方保持可见。"
                      )}
                    </p>
                  )}

                  {!isFeatured && features.length > visibleFeatures.length && (
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
                      {t("moreFeatures", "还有 {{count}} 项", {
                        count: features.length - visibleFeatures.length,
                      })}
                    </p>
                  )}

                  <div className="rounded-[1.35rem] border border-border/80 bg-white/72 p-4">
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
                    className={cn(
                      "w-full",
                      isFeatured
                        ? "weidu-landing-button-primary"
                        : "weidu-landing-button-secondary"
                    )}
                    size="lg"
                    variant="ghost"
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
