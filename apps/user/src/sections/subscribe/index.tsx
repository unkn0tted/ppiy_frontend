"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import Empty from "@workspace/ui/composed/empty";
import { Icon } from "@workspace/ui/composed/icon";
import { cn } from "@workspace/ui/lib/utils";
import { querySubscribeList } from "@workspace/ui/services/user/subscribe";
import type { TFunction } from "i18next";
import { type CSSProperties, useState } from "react";
import { useTranslation } from "react-i18next";
import { Display } from "@/components/display";
import Purchase from "./purchase";

type ParsedFeature = {
  icon: string;
  label: string;
  type: "default" | "success" | "destructive";
};

type ParsedDescription = {
  description: string;
  features: ParsedFeature[];
};

type PlanTheme = {
  accent: string;
  accentDeep: string;
  accentSoft: string;
  shadow: string;
  icon: string;
};

const PLAN_THEMES: PlanTheme[] = [
  {
    accent: "oklch(0.72 0.18 12)",
    accentDeep: "oklch(0.63 0.17 6)",
    accentSoft: "oklch(0.89 0.1 12 / 0.38)",
    shadow: "oklch(0.68 0.18 11 / 0.42)",
    icon: "lucide:zap",
  },
  {
    accent: "oklch(0.73 0.16 338)",
    accentDeep: "oklch(0.64 0.15 331)",
    accentSoft: "oklch(0.88 0.09 338 / 0.34)",
    shadow: "oklch(0.66 0.16 336 / 0.4)",
    icon: "lucide:radar",
  },
  {
    accent: "oklch(0.78 0.14 42)",
    accentDeep: "oklch(0.69 0.14 31)",
    accentSoft: "oklch(0.92 0.09 40 / 0.36)",
    shadow: "oklch(0.72 0.13 34 / 0.42)",
    icon: "lucide:sparkles",
  },
  {
    accent: "oklch(0.73 0.15 200)",
    accentDeep: "oklch(0.64 0.13 215)",
    accentSoft: "oklch(0.88 0.08 205 / 0.34)",
    shadow: "oklch(0.66 0.12 210 / 0.38)",
    icon: "lucide:server",
  },
  {
    accent: "oklch(0.74 0.15 155)",
    accentDeep: "oklch(0.64 0.13 162)",
    accentSoft: "oklch(0.88 0.08 156 / 0.34)",
    shadow: "oklch(0.66 0.12 160 / 0.38)",
    icon: "lucide:rocket",
  },
];

function normalizeFeatureType(type?: string): ParsedFeature["type"] {
  if (type === "success" || type === "destructive") {
    return type;
  }

  return "default";
}

function normalizeFeature(feature: unknown): ParsedFeature | null {
  if (!feature || typeof feature !== "object") {
    return null;
  }

  const partialFeature = feature as Partial<ParsedFeature>;
  const label =
    typeof partialFeature.label === "string" ? partialFeature.label : "";

  if (!label) {
    return null;
  }

  return {
    icon: typeof partialFeature.icon === "string" ? partialFeature.icon : "",
    label,
    type: normalizeFeatureType(partialFeature.type),
  };
}

function parseDescription(rawDescription?: string): ParsedDescription {
  if (!rawDescription) {
    return { description: "", features: [] };
  }

  try {
    const parsed = JSON.parse(rawDescription) as Partial<ParsedDescription>;

    return {
      description:
        typeof parsed.description === "string" ? parsed.description : "",
      features: Array.isArray(parsed.features)
        ? parsed.features
            .map(normalizeFeature)
            .filter((feature): feature is ParsedFeature => Boolean(feature))
        : [],
    };
  } catch {
    return {
      description: rawDescription,
      features: [],
    };
  }
}

function getPricing(subscribe: API.Subscribe) {
  const primaryDiscount = subscribe.discount?.[0];
  const bundleQuantity = Math.max(primaryDiscount?.quantity ?? 1, 1);
  const bundleTotal = primaryDiscount
    ? Math.round(
        subscribe.unit_price *
          bundleQuantity *
          ((primaryDiscount.discount ?? 100) / 100)
      )
    : undefined;
  const shouldShowOriginal = subscribe.show_original_price !== false;

  return {
    bundleOriginalPrice: primaryDiscount
      ? subscribe.unit_price * bundleQuantity
      : undefined,
    bundleQuantity,
    bundleTotal,
    discountPercent: primaryDiscount
      ? Math.max(0, 100 - (primaryDiscount.discount ?? 100))
      : 0,
    displayPrice:
      shouldShowOriginal || bundleTotal === undefined
        ? subscribe.unit_price
        : bundleTotal,
    displayQuantity:
      shouldShowOriginal || primaryDiscount === undefined ? 1 : bundleQuantity,
    hasDiscount: Boolean(primaryDiscount),
    primaryDiscount,
    shouldShowOriginal,
  };
}

export default function Subscribe() {
  const { t, i18n } = useTranslation("subscribe");
  const unitTimeMap: Record<string, string> = {
    Day: t("Day", "Day"),
    Hour: t("Hour", "Hour"),
    Minute: t("Minute", "Minute"),
    Month: t("Month", "Month"),
    NoLimit: t("NoLimit", "No Limit"),
    Year: t("Year", "Year"),
  };
  const locale = i18n.language;
  const [subscribe, setSubscribe] = useState<API.Subscribe>();

  const { data } = useQuery({
    queryKey: ["querySubscribeList", locale],
    queryFn: async () => {
      const { data } = await querySubscribeList({ language: locale });
      return data.data?.list || [];
    },
  });

  const filteredData = data?.filter((item) => item.show) ?? [];
  const startingPrice =
    filteredData.length > 0
      ? Math.min(...filteredData.map((item) => item.unit_price))
      : undefined;

  return (
    <>
      <div className="space-y-6">
        <section className="rose-shell subscribe-hero px-6 py-6 sm:px-7 sm:py-7">
          <div className="subscribe-hero__beam" />
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rose-pill">
                  <span className="size-2 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]" />
                  {t("buySubscription", "Buy Subscription")}
                </span>
                {filteredData.length > 0 && (
                  <span className="rose-pill border-transparent bg-primary/6 text-foreground/72 dark:bg-white/6">
                    {t("showcase.livePlans", "{{count}} live plans", {
                      count: filteredData.length,
                    })}
                  </span>
                )}
              </div>
              <div className="space-y-3">
                <h1 className="rose-section-title font-display text-3xl leading-none sm:text-4xl">
                  {t("showcase.title", "Pick your next high-speed lane")}
                </h1>
                <p className="max-w-2xl text-muted-foreground text-sm leading-7 sm:text-base">
                  {t(
                    "showcase.subtitle",
                    "Sharper hierarchy, richer motion, and pricing that reads at a glance."
                  )}
                </p>
              </div>
            </div>
            {startingPrice !== undefined && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="subscribe-hero__metric">
                  <span className="subscribe-hero__metric-label">
                    {t("showcase.metricPlans", "Plans")}
                  </span>
                  <strong className="font-display text-3xl tracking-[-0.04em]">
                    {filteredData.length}
                  </strong>
                </div>
                <div className="subscribe-hero__metric">
                  <span className="subscribe-hero__metric-label">
                    {t("showcase.metricStart", "Starting at")}
                  </span>
                  <strong className="font-display text-2xl tracking-[-0.04em] sm:text-3xl">
                    <Display type="currency" value={startingPrice} />
                  </strong>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredData.map((item, index) => (
            <CardPlan
              index={index}
              item={item}
              key={item.id}
              onPurchase={setSubscribe}
              t={t}
              unitTimeMap={unitTimeMap}
            />
          ))}
        </div>
        {filteredData.length === 0 && <Empty />}
      </div>
      <Purchase setSubscribe={setSubscribe} subscribe={subscribe} />
    </>
  );
}

interface CardPlanProps {
  index: number;
  item: API.Subscribe;
  onPurchase: (subscribe: API.Subscribe) => void;
  t: TFunction<"subscribe">;
  unitTimeMap: Record<string, string>;
}

function CardPlan({
  index,
  item,
  onPurchase,
  t,
  unitTimeMap,
}: Readonly<CardPlanProps>) {
  const theme = PLAN_THEMES[index % PLAN_THEMES.length] ?? PLAN_THEMES[0]!;
  const { description, features } = parseDescription(item.description);
  const {
    bundleOriginalPrice,
    bundleQuantity,
    bundleTotal,
    discountPercent,
    displayPrice,
    displayQuantity,
    hasDiscount,
    shouldShowOriginal,
  } = getPricing(item);
  const unitTime =
    unitTimeMap[item.unit_time!] ||
    t(item.unit_time || "Month", item.unit_time || "Month");
  const hasHighlights = Boolean(description || features.length);
  const showHeaderDescription = Boolean(description && features.length > 0);
  const cardStyle = {
    "--plan-accent": theme.accent,
    "--plan-accent-deep": theme.accentDeep,
    "--plan-accent-soft": theme.accentSoft,
    "--plan-shadow": theme.shadow,
    animationDelay: `${index * 90}ms`,
  } as CSSProperties;

  return (
    <Card
      className="subscribe-card fade-in-0 slide-in-from-bottom-6 h-full animate-in gap-0 border-0 bg-transparent py-0 shadow-none duration-700"
      style={cardStyle}
    >
      <div className="subscribe-card__grid" />

      <CardHeader className="px-6 pt-6 pb-0">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="subscribe-card__badge">
                #{String(index + 1).padStart(2, "0")}
              </span>
              {discountPercent > 0 && (
                <span className="subscribe-card__badge subscribe-card__badge--discount">
                  -{discountPercent}%
                </span>
              )}
              {hasDiscount && bundleQuantity > 1 && (
                <span className="subscribe-card__badge">
                  {t("showcase.bundle", "{{quantity}} {{unit}} bundle", {
                    quantity: bundleQuantity,
                    unit: unitTime,
                  })}
                </span>
              )}
            </div>
            <div className="space-y-2.5">
              <h2 className="font-display text-[1.9rem] text-foreground leading-none tracking-[-0.05em]">
                {item.name}
              </h2>
              {showHeaderDescription && (
                <p className="max-w-[30ch] text-foreground/72 text-sm leading-7">
                  {description}
                </p>
              )}
            </div>
          </div>
          <div className="subscribe-card__icon-shell">
            <Icon className="size-6" icon={theme.icon} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5 px-6 py-6">
        {hasHighlights && (
          <section className="rose-panel p-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-semibold text-[0.68rem] text-foreground/46 uppercase tracking-[0.3em]">
                {t("showcase.highlights", "Highlights")}
              </span>
              <span
                className="h-px flex-1 opacity-45"
                style={{
                  background:
                    "linear-gradient(90deg, var(--plan-accent), transparent)",
                }}
              />
            </div>
            <div className="space-y-2.5">
              {features.length > 0 ? (
                <ul className="space-y-2.5">
                  {features.map((feature, index) => (
                    <li
                      className={cn("subscribe-card__feature", {
                        "subscribe-card__feature--destructive":
                          feature.type === "destructive",
                        "subscribe-card__feature--success":
                          feature.type === "success",
                      })}
                      key={`${item.id}-${index}-${feature.label}`}
                    >
                      {feature.icon && (
                        <span className="subscribe-card__feature-icon">
                          <Icon className="size-4" icon={feature.icon} />
                        </span>
                      )}
                      <span className="subscribe-card__feature-label">
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-foreground/72 text-sm leading-7">
                  {description}
                </p>
              )}
            </div>
          </section>
        )}

        <div className="grid gap-3">
          <div className="subscribe-card__detail-row">
            <span className="subscribe-card__detail-label">
              {t("detail.availableTraffic", "Available Traffic")}
            </span>
            <span className="subscribe-card__detail-value">
              <Display type="traffic" unlimited value={item.traffic} />
            </span>
          </div>
          <div className="subscribe-card__detail-row">
            <span className="subscribe-card__detail-label">
              {t("detail.connectionSpeed", "Connection Speed")}
            </span>
            <span className="subscribe-card__detail-value">
              <Display type="trafficSpeed" unlimited value={item.speed_limit} />
            </span>
          </div>
          <div className="subscribe-card__detail-row">
            <span className="subscribe-card__detail-label">
              {t("detail.connectedDevices", "Connected Devices")}
            </span>
            <span className="subscribe-card__detail-value">
              <Display type="number" unlimited value={item.device_limit} />
            </span>
          </div>
        </div>
      </CardContent>

      <div className="px-6">
        <Separator
          className="opacity-35"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--plan-accent), transparent)",
          }}
        />
      </div>

      <CardFooter className="flex-col items-stretch gap-4 px-6 pt-5 pb-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2.5">
            <span className="font-semibold text-[0.68rem] text-foreground/46 uppercase tracking-[0.3em]">
              {t("showcase.instantAccess", "Instant Access")}
            </span>
            <div className="flex items-end gap-2">
              <span className="font-display font-semibold text-4xl text-foreground tracking-[-0.06em] sm:text-[2.9rem]">
                <Display type="currency" value={displayPrice} />
              </span>
              <span className="pb-1 font-medium text-muted-foreground text-sm">
                {displayQuantity === 1
                  ? `/${unitTime}`
                  : `/${displayQuantity} ${unitTime}`}
              </span>
            </div>
            {hasDiscount && shouldShowOriginal && bundleTotal !== undefined && (
              <p className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                {bundleOriginalPrice !== undefined && (
                  <span className="line-through">
                    <Display type="currency" value={bundleOriginalPrice} />
                  </span>
                )}
                <span>
                  <Display type="currency" value={bundleTotal} />
                </span>
              </p>
            )}
          </div>
          <div className="subscribe-card__price-orb hidden sm:flex">
            <Icon className="size-7" icon={theme.icon} />
          </div>
        </div>

        <Button
          className="subscribe-card__button !bg-transparent hover:!bg-transparent"
          onClick={() => {
            onPurchase(item);
          }}
        >
          <span className="relative z-10">
            {t("showcase.instantAccess", "Instant Access")}
          </span>
          <Icon className="relative z-10 size-5" icon="lucide:arrow-up-right" />
        </Button>
      </CardFooter>
    </Card>
  );
}
