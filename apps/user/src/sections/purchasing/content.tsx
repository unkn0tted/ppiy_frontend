"use client";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { EnhancedInput } from "@workspace/ui/composed/enhanced-input";
import { Icon } from "@workspace/ui/composed/icon";
import { cn } from "@workspace/ui/lib/utils";
import { prePurchaseOrder, purchase } from "@workspace/ui/services/user/portal";
import { useDebounce } from "ahooks";
import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Display } from "@/components/display";
import { SubscribeBilling } from "@/sections/subscribe/billing";
import CouponInput from "@/sections/subscribe/coupon-input";
import { SubscribeDetail } from "@/sections/subscribe/detail";
import DurationSelector from "@/sections/subscribe/duration-selector";
import PaymentMethods from "@/sections/subscribe/payment-methods";
import { useGlobalStore } from "@/stores/global";

export default function Content({
  subscription,
}: {
  subscription?: API.Subscribe;
}) {
  const { t } = useTranslation("subscribe");
  const unitTimeMap: Record<string, string> = {
    Day: t("Day", "Day"),
    Hour: t("Hour", "Hour"),
    Minute: t("Minute", "Minute"),
    Month: t("Month", "Month"),
    NoLimit: t("NoLimit", "No Limit"),
    Year: t("Year", "Year"),
  };
  const { common } = useGlobalStore();
  const navigate = useNavigate();
  const [params, setParams] = useState<API.PortalPurchaseRequest>({
    quantity: 1,
    subscribe_id: 0,
    payment: -1,
    coupon: "",
    auth_type: "email",
    identifier: "",
    password: "",
  });
  const [loading, startTransition] = useTransition();
  const [isEmailValid, setIsEmailValid] = useState({
    valid: false,
    message: "",
  });
  const lastSuccessOrderRef = useRef<API.PrePurchaseOrderResponse | undefined>(
    undefined
  );
  const debouncedCoupon = useDebounce(params.coupon, { wait: 400 });
  let parsedDescription: {
    description: string;
    features: Array<{
      icon: string;
      label: string;
      type: "default" | "success" | "destructive";
    }>;
  };

  try {
    parsedDescription = JSON.parse(subscription?.description || "{}");
  } catch {
    parsedDescription = { description: "", features: [] };
  }

  const { data: order } = useQuery({
    enabled: !!subscription?.id && params.payment !== -1,
    queryKey: [
      "prePurchaseOrder",
      subscription?.id,
      debouncedCoupon,
      params.quantity,
      params.payment,
    ],
    queryFn: async () => {
      try {
        const { data } = await prePurchaseOrder(
          {
            ...params,
            coupon: debouncedCoupon,
            subscribe_id: subscription?.id as number,
          } as API.PrePurchaseOrderRequest,
          { skipErrorHandler: true }
        );
        const result = data.data;
        if (result) {
          lastSuccessOrderRef.current = result;
        }
        return result;
      } catch (_error) {
        return lastSuccessOrderRef.current;
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (subscription) {
      setParams((prev) => ({
        ...prev,
        quantity: 1,
        subscribe_id: subscription?.id,
      }));
    }
  }, [subscription]);

  const handleChange = useCallback(
    (field: keyof typeof params, value: string | number) => {
      setParams((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    startTransition(async () => {
      try {
        const { data } = await purchase(params);
        const { order_no } = data.data!;
        if (order_no) {
          localStorage.setItem(
            order_no,
            JSON.stringify({
              auth_type: params.auth_type,
              identifier: params.identifier,
            })
          );
          navigate({ to: "/purchasing/order", search: { order_no } });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [params, navigate]);

  if (!subscription) {
    return (
      <div className="weidu-panel px-6 py-14 text-center">
        {t("subscriptionNotFound", "Subscription not found")}
      </div>
    );
  }

  const { features } = parsedDescription;
  const totalAmount =
    order?.amount ?? order?.price ?? subscription.unit_price ?? 0;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="space-y-6">
        <section className="weidu-panel px-6 py-6 md:px-8 md:py-8">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="space-y-5">
              <h2 className="font-semibold text-2xl tracking-[-0.05em]">
                {t("accessWorkspace", "Account access")}
              </h2>
              <div className="grid gap-3">
                <div className="flex flex-col gap-2">
                  <EnhancedInput
                    className={cn(
                      "h-12 rounded-[1.15rem] border-foreground/10 bg-background/70 px-4 shadow-none focus-visible:border-foreground/40 focus-visible:ring-0",
                      {
                        "border-destructive":
                          !isEmailValid.valid && params.identifier !== "",
                      }
                    )}
                    onValueChange={(value: string) => {
                      const email = value as string;
                      setParams((prev) => ({
                        ...prev,
                        identifier: email,
                      }));
                      const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!reg.test(email)) {
                        setIsEmailValid({
                          valid: false,
                          message: t(
                            "invalidEmail",
                            "Please enter a valid email address"
                          ),
                        });
                      } else if (common.auth.email.enable_domain_suffix) {
                        const domain = email.split("@")[1];
                        const isValid = common.auth.email?.domain_suffix_list
                          .split("\n")
                          .includes(domain || "");
                        if (!isValid) {
                          setIsEmailValid({
                            valid: false,
                            message: t(
                              "emailDomainNotAllowed",
                              "Email domain is not in the whitelist"
                            ),
                          });
                          return;
                        }
                      } else {
                        setIsEmailValid({
                          valid: true,
                          message: "",
                        });
                      }
                    }}
                    placeholder={t("emailPlaceholder", "邮箱地址")}
                    required
                    type="email"
                    value={params.identifier || ""}
                  />
                  <p
                    className={cn("text-muted-foreground text-xs", {
                      "text-destructive":
                        !isEmailValid.valid && params.identifier !== "",
                    })}
                  >
                    {isEmailValid.message ||
                      t("emailRequired", "Please enter your email address.")}
                  </p>
                </div>
                {params.identifier && isEmailValid.valid && (
                  <div className="flex flex-col gap-2">
                    <EnhancedInput
                      className="h-12 rounded-[1.15rem] border-foreground/10 bg-background/70 px-4 shadow-none focus-visible:border-foreground/40 focus-visible:ring-0"
                      onValueChange={(value: string) =>
                        handleChange("password", value)
                      }
                      placeholder={t("passwordPlaceholder", "账户密码")}
                      type="password"
                      value={params.password || ""}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-[1.6rem] border border-foreground/10 bg-secondary/90 px-5 py-6 text-foreground">
              <p className="font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.34em]">
                {t("siteLabel", "Site")}
              </p>
              <p className="mt-4 break-all font-medium text-lg">
                {common.site.site_name}
              </p>
            </div>
          </div>
        </section>

        <section className="weidu-panel px-6 py-6 md:px-8 md:py-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(14rem,0.9fr)]">
            <div className="space-y-5">
              <h2 className="font-semibold text-2xl tracking-[-0.05em]">
                {subscription.name}
              </h2>
              <ul className="grid gap-3 text-sm leading-6 md:grid-cols-2">
                {features?.map((feature, index) => (
                  <li
                    className={cn(
                      "rounded-[1.15rem] border border-foreground/10 bg-background/65 px-4 py-3",
                      {
                        "text-muted-foreground line-through":
                          feature.type === "destructive",
                      }
                    )}
                    key={index}
                  >
                    <div className="flex items-start gap-3">
                      {feature.icon && (
                        <Icon
                          className={cn("mt-0.5 size-5 text-foreground", {
                            "text-primary": feature.type === "success",
                            "text-destructive": feature.type === "destructive",
                          })}
                          icon={feature.icon}
                        />
                      )}
                      <span>{feature.label}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.6rem] border border-foreground/10 bg-background/75 p-5">
              <p className="weidu-kicker">
                {t("specificationLabel", "Specification")}
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-[1.25rem] border border-foreground/10 bg-background px-4 py-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                    {t("durationLabel", "Duration")}
                  </p>
                  <p className="mt-2 font-medium text-lg">
                    {params.quantity} /{" "}
                    {unitTimeMap[subscription.unit_time!] ||
                      subscription.unit_time}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-foreground/10 bg-background px-4 py-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                    {t("trafficLabel", "Traffic")}
                  </p>
                  <p className="mt-2 font-medium text-lg">
                    <Display
                      type="traffic"
                      unlimited
                      value={subscription.traffic}
                    />
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-foreground/10 bg-background px-4 py-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                    {t("speedLabel", "Speed")}
                  </p>
                  <p className="mt-2 font-medium text-lg">
                    <Display
                      type="trafficSpeed"
                      unlimited
                      value={subscription.speed_limit}
                    />
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-foreground/10 bg-background px-4 py-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                    {t("devicesLabel", "Devices")}
                  </p>
                  <p className="mt-2 font-medium text-lg">
                    <Display
                      type="number"
                      unlimited
                      value={subscription.device_limit}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <section className="weidu-panel px-6 py-6">
          <div className="space-y-6">
            <h2 className="font-semibold text-2xl tracking-[-0.05em]">
              {t("buildOrder", "Build your order")}
            </h2>
            <div className="space-y-6">
              <DurationSelector
                discounts={subscription?.discount}
                onChange={(value: number) => handleChange("quantity", value)}
                quantity={params.quantity!}
                unitTime={
                  unitTimeMap[subscription.unit_time!] || subscription.unit_time
                }
              />
              <div className="weidu-rule" />
              <CouponInput
                coupon={params.coupon}
                onChange={(value: string) => handleChange("coupon", value)}
              />
              <div className="weidu-rule" />
              <PaymentMethods
                balance={false}
                onChange={(value: number) => handleChange("payment", value)}
                value={params.payment!}
              />
            </div>
          </div>
        </section>

        <section className="weidu-panel overflow-hidden p-0">
          <div className="bg-primary px-6 py-5 text-primary-foreground">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-semibold text-2xl tracking-[-0.05em]">
                  {t("buyNow", "Buy Now")}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-primary-foreground/60 text-xs uppercase tracking-[0.26em]">
                  {t("totalLabel", "Total")}
                </p>
                <p className="mt-2 font-semibold text-3xl tracking-[-0.05em]">
                  <Display type="currency" value={totalAmount} />
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6 px-6 py-6">
            <SubscribeDetail
              subscribe={{
                ...subscription,
                quantity: params.quantity,
              }}
            />
            <Separator />
            <SubscribeBilling
              order={{
                ...order,
                quantity: params.quantity,
                unit_price: subscription?.unit_price,
                show_original_price: subscription?.show_original_price,
              }}
            />
            <Button
              className="h-14 w-full rounded-full px-6 text-base"
              disabled={
                !isEmailValid.valid ||
                loading ||
                params.payment === -1 ||
                !params.identifier
              }
              onClick={handleSubmit}
              size="lg"
            >
              {loading && <LoaderCircle className="mr-2 animate-spin" />}
              {t("buyNow", "Buy Now")}
            </Button>
          </div>
        </section>
      </aside>
    </div>
  );
}
