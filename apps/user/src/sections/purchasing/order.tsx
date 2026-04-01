"use client";

import { useQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { Icon } from "@workspace/ui/composed/icon";
import { cn } from "@workspace/ui/lib/utils";
import {
  purchaseCheckout,
  queryPurchaseOrder,
} from "@workspace/ui/services/user/portal";
import { formatDate } from "@workspace/ui/utils/formatting";
import { useCountDown } from "ahooks";
import { addMinutes, format } from "date-fns";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Display } from "@/components/display";
import { SubscribeBilling } from "@/sections/subscribe/billing";
import { SubscribeDetail } from "@/sections/subscribe/detail";
import StripePayment from "@/sections/user/payment/stripe";
import { useGlobalStore } from "@/stores/global";
import { setAuthorization } from "@/utils/common";

export default function Order() {
  const { t } = useTranslation("order");
  const { getUserInfo } = useGlobalStore();
  const [orderNo, setOrderNo] = useState<string>();
  const [enabled, setEnabled] = useState<boolean>(false);
  const search = useSearch({ from: "/(main)/purchasing/order/" });

  const { data } = useQuery({
    enabled,
    queryKey: ["queryPurchaseOrder", orderNo],
    queryFn: async () => {
      if (!orderNo) return;
      const params = localStorage.getItem(orderNo);
      const authParams = params ? JSON.parse(params) : {};
      const { data } = await queryPurchaseOrder({
        order_no: orderNo,
        ...authParams,
      });
      if (data?.data?.status !== 1) {
        setEnabled(false);
        if (data?.data?.token) {
          setAuthorization(data?.data?.token);
          await new Promise((resolve) => setTimeout(resolve, 100));
          await getUserInfo();
        }
      }
      return data?.data;
    },
    refetchInterval: 3000,
  });

  const { data: payment } = useQuery({
    enabled: !!orderNo && data?.status === 1,
    queryKey: ["purchaseCheckout", orderNo],
    queryFn: async () => {
      const { data } = await purchaseCheckout({
        orderNo: orderNo || "",
        returnUrl: window.location.href,
      });
      if (data.data?.type === "url" && data.data?.checkout_url) {
        window.open(data.data.checkout_url, "_blank");
      }
      return data?.data;
    },
  });

  useEffect(() => {
    if (search.order_no) {
      setOrderNo(search.order_no);
      setEnabled(true);
    }
  }, [search]);

  const [countDown, formattedRes] = useCountDown({
    targetDate:
      data &&
      format(addMinutes(data?.created_at, 15), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
  });

  const { hours, minutes, seconds } = formattedRes;

  const countdownDisplay =
    countDown > 0 ? (
      <>
        {hours.toString().length === 1 ? `0${hours}` : hours} :{" "}
        {minutes.toString().length === 1 ? `0${minutes}` : minutes} :{" "}
        {seconds.toString().length === 1 ? `0${seconds}` : seconds}
      </>
    ) : (
      t("timeExpired", "Time Expired")
    );

  const isWaiting = data?.status === 1;
  const isSuccess = data?.status !== undefined && [2, 5].includes(data.status);
  const isClosed = data?.status !== undefined && [3, 4].includes(data.status);

  return (
    <main className="container space-y-6 py-8 md:space-y-8 md:py-10">
      <section className="weidu-panel grid gap-6 px-6 py-8 md:grid-cols-[minmax(0,1.2fr)_18rem] md:px-8">
        <div>
          <h1 className="font-semibold text-3xl tracking-[-0.05em] md:text-5xl">
            {t("orderStatus", "Order Status")}
          </h1>
        </div>
        <div className="rounded-[1.6rem] border border-foreground/10 bg-secondary/90 px-5 py-6 text-foreground">
          <p className="font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.34em]">
            {t("referenceLabel", "Reference")}
          </p>
          <p className="mt-4 break-all font-medium text-lg">
            {data?.order_no || orderNo || "--"}
          </p>
          <p className="mt-3 text-muted-foreground text-sm leading-6">
            {data?.created_at
              ? `${t("createdAt", "Created At")}: ${formatDate(data.created_at)}`
              : t("waitingForInitialization", "Waiting for initialization")}
          </p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="weidu-panel px-6 py-6 md:px-8 md:py-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-5 border-foreground/10 border-b pb-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <h2 className="font-semibold text-2xl tracking-[-0.05em]">
                  {t("orderNumber", "Order Number")}
                </h2>
                <p className="break-all text-muted-foreground leading-7">
                  {data?.order_no || orderNo || "--"}
                </p>
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-[1.2rem] border border-foreground/10 bg-background/65 px-4 py-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                    {t("paymentMethod", "Payment Method")}
                  </p>
                  <div className="mt-3">
                    <Badge
                      className="rounded-full border border-foreground/10 bg-background px-3 py-1 text-foreground"
                      variant="secondary"
                    >
                      {data?.payment?.name || data?.payment?.platform || "--"}
                    </Badge>
                  </div>
                </div>
                <div className="rounded-[1.2rem] border border-foreground/10 bg-background/65 px-4 py-4">
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                    {t("totalLabel", "Total")}
                  </p>
                  <p className="mt-3 font-semibold text-2xl tracking-[-0.04em]">
                    <Display type="currency" value={data?.amount} />
                  </p>
                </div>
              </div>
            </div>

            {data?.status && [1, 2, 5].includes(data.status) && (
              <>
                <SubscribeDetail
                  subscribe={{
                    ...data?.subscribe,
                    quantity: data?.quantity,
                  }}
                />
                <Separator />
              </>
            )}

            {data?.status === 3 && (
              <>
                <div className="space-y-4">
                  <div className="font-semibold">
                    {t("resetTraffic", "Reset Traffic")}
                  </div>
                  <div className="rounded-[1.25rem] border border-foreground/10 bg-background/65 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">
                        {t("resetPrice", "Reset Price")}
                      </span>
                      <span className="font-medium">
                        <Display type="currency" value={data.amount} />
                      </span>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {data?.status === 4 && (
              <>
                <div className="space-y-4">
                  <div className="font-semibold">
                    {t("balanceRecharge", "Balance Recharge")}
                  </div>
                  <div className="rounded-[1.25rem] border border-foreground/10 bg-background/65 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">
                        {t("rechargeAmount", "Recharge Amount")}
                      </span>
                      <span className="font-medium">
                        <Display type="currency" value={data.amount} />
                      </span>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            <SubscribeBilling
              order={{
                ...data,
                unit_price: data?.subscribe?.unit_price,
                show_original_price: data?.subscribe?.show_original_price,
              }}
            />
          </div>
        </section>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <section className="weidu-panel overflow-hidden p-0">
            <div className="bg-primary px-6 py-5 text-primary-foreground">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex size-11 items-center justify-center rounded-full border border-primary-foreground/12 bg-primary-foreground/8",
                      {
                        "bg-background text-foreground": isSuccess,
                      }
                    )}
                  >
                    <Icon
                      className="size-6"
                      icon={
                        isSuccess
                          ? "mdi:check"
                          : isClosed
                            ? "mdi:close"
                            : "mdi:clock-outline"
                      }
                    />
                  </span>
                  <div>
                    <h2 className="font-semibold text-2xl tracking-[-0.05em]">
                      {isSuccess
                        ? t("paymentSuccess", "Payment Successful")
                        : isClosed
                          ? t("orderClosed", "Order Closed")
                          : t("waitingForPayment", "Waiting for Payment")}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 px-6 py-6">
              {isSuccess && (
                <div className="space-y-5 text-center">
                  <div className="rounded-[1.35rem] border border-foreground/10 bg-background/65 px-4 py-6">
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                      {t("orderNumber", "Order Number")}
                    </p>
                    <p className="mt-3 break-all font-medium leading-7">
                      {data?.order_no}
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button asChild className="h-12 rounded-full">
                      <Link to="/dashboard">
                        {t("subscribeNow", "Subscribe Now")}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="h-12 rounded-full"
                      variant="outline"
                    >
                      <Link to="/document">
                        {t("viewDocument", "View Document")}
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {isWaiting && payment?.type === "url" && (
                <div className="space-y-5 text-center">
                  <div className="rounded-[1.35rem] border border-foreground/10 bg-background/65 px-4 py-6">
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                      {t("remainingTime", "Remaining Time")}
                    </p>
                    <p className="mt-3 font-semibold text-3xl tracking-[-0.05em]">
                      {countdownDisplay}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Button
                      className="h-12 rounded-full"
                      onClick={() => {
                        if (payment?.checkout_url) {
                          window.location.href = payment.checkout_url;
                        }
                      }}
                    >
                      {t("goToPayment", "Go to Payment")}
                    </Button>
                    <Button
                      asChild
                      className="h-12 rounded-full"
                      variant="outline"
                    >
                      <Link search={{ id: 0 }} to="/">
                        {t("productList", "Product List")}
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {isWaiting && payment?.type === "qr" && (
                <div className="space-y-5 text-center">
                  <div className="rounded-[1.35rem] border border-foreground/10 bg-background/65 px-4 py-6">
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                      {t("remainingTime", "Remaining Time")}
                    </p>
                    <p className="mt-3 font-semibold text-3xl tracking-[-0.05em]">
                      {countdownDisplay}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="rounded-[1.35rem] border border-foreground/10 bg-background p-5">
                      <QRCodeCanvas
                        imageSettings={{
                          src: "./assets/payment/alipay_f2f.svg",
                          width: 24,
                          height: 24,
                          excavate: true,
                        }}
                        size={208}
                        value={payment?.checkout_url || ""}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button asChild className="h-12 rounded-full">
                      <Link to="/subscribe">
                        {t("productList", "Product List")}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="h-12 rounded-full"
                      variant="outline"
                    >
                      <Link to="/order">{t("orderList", "Order List")}</Link>
                    </Button>
                  </div>
                </div>
              )}

              {isWaiting && payment?.type === "stripe" && (
                <div className="space-y-5">
                  <div className="rounded-[1.35rem] border border-foreground/10 bg-background/65 px-4 py-6 text-center">
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                      {t("remainingTime", "Remaining Time")}
                    </p>
                    <p className="mt-3 font-semibold text-3xl tracking-[-0.05em]">
                      {countdownDisplay}
                    </p>
                  </div>
                  {payment.stripe && <StripePayment {...payment.stripe} />}
                </div>
              )}

              {isClosed && (
                <div className="space-y-5 text-center">
                  <div className="rounded-[1.35rem] border border-foreground/10 bg-background/65 px-4 py-6">
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                      {t("status", "Status")}
                    </p>
                    <p className="mt-3 font-medium">
                      {t("orderClosed", "Order Closed")}
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button asChild className="h-12 rounded-full">
                      <Link to="/subscribe">
                        {t("productList", "Product List")}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="h-12 rounded-full"
                      variant="outline"
                    >
                      <Link to="/order">{t("orderList", "Order List")}</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
