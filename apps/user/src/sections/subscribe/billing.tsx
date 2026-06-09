"use client";

import { Separator } from "@workspace/ui/components/separator";
import { useTranslation } from "react-i18next";
import { Display } from "@/components/display";

interface SubscribeBillingProps {
  order?: Partial<
    API.OrderDetail & {
      unit_price: number;
      unit_time: string;
      subscribe_discount: number;
      discount_rules?: API.SubscribeDiscount[];
      show_original_price?: boolean;
    }
  >;
}

export function SubscribeBilling({ order }: Readonly<SubscribeBillingProps>) {
  const { t } = useTranslation("subscribe");
  const quantity = order?.quantity ?? 1;
  const discountRule = order?.discount_rules?.find(
    (item) => item.quantity === quantity
  );
  const estimatedPrice =
    order?.unit_price !== undefined ? order.unit_price * quantity : undefined;
  const estimatedProductDiscount =
    estimatedPrice !== undefined && discountRule
      ? Math.round(estimatedPrice * (1 - (discountRule.discount ?? 100) / 100))
      : 0;
  const price = order?.price ?? estimatedPrice;
  const productDiscount = order?.discount ?? estimatedProductDiscount;
  const couponDiscount = order?.coupon_discount ?? 0;
  const feeAmount = order?.fee_amount ?? 0;
  const giftAmount = order?.gift_amount ?? 0;
  const estimatedAmount =
    price === undefined
      ? undefined
      : Math.max(
          0,
          price - productDiscount - couponDiscount + feeAmount - giftAmount
        );
  const amount = order?.amount ?? estimatedAmount;

  return (
    <>
      <div className="font-semibold">
        {t("billing.billingTitle", "Billing Detail")}
      </div>
      <ul className="grid grid-cols-2 gap-3 *:flex *:items-center *:justify-between lg:grid-cols-1">
        {order?.type && [1, 2].includes(order?.type) && (
          <li>
            <span className="text-muted-foreground">
              {t("billing.duration", "Duration")}
            </span>
            <span>
              {quantity}{" "}
              {t(order?.unit_time || "Month", order?.unit_time || "Month")}
            </span>
          </li>
        )}{" "}
        {order?.show_original_price !== false &&
          order?.type &&
          [1, 2].includes(order?.type) && (
            <li>
              <span className="text-muted-foreground">
                {t("billing.originalPrice", "Original Price (Monthly)")}
              </span>
              <span>
                <Display type="currency" value={order?.unit_price} />
              </span>
            </li>
          )}{" "}
        <li>
          <span className="text-muted-foreground">
            {t("billing.price", "Price")}
          </span>
          <span>
            <Display type="currency" value={price} />
          </span>
        </li>
        <li>
          <span className="text-muted-foreground">
            {t("billing.productDiscount", "Product Discount")}
          </span>
          <span>
            <Display type="currency" value={productDiscount} />
          </span>
        </li>
        <li>
          <span className="text-muted-foreground">
            {t("billing.couponDiscount", "Coupon Discount")}
          </span>
          <span>
            <Display type="currency" value={couponDiscount} />
          </span>
        </li>
        <li>
          <span className="text-muted-foreground">
            {t("billing.fee", "Fee")}
          </span>
          <span>
            <Display type="currency" value={feeAmount} />
          </span>
        </li>
        <li>
          <span className="text-muted-foreground">
            {t("billing.gift", "Gift")}
          </span>
          <span>
            <Display type="currency" value={giftAmount} />
          </span>
        </li>
      </ul>
      <Separator />
      <div className="flex items-center justify-between font-semibold">
        <span className="text-muted-foreground">
          {t("billing.total", "Total")}
        </span>
        <span>
          <Display type="currency" value={amount} />
        </span>
      </div>
    </>
  );
}
