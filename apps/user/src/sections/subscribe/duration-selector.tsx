"use client";

import { Badge } from "@workspace/ui/components/badge";
import { Label } from "@workspace/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import type React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

interface DurationSelectorProps {
  quantity: number;
  unitTime?: string;
  discounts?: Array<{ quantity: number; discount: number }>;
  onChange: (value: number) => void;
  showOriginalPrice?: boolean;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({
  quantity,
  unitTime = "Month",
  discounts = [],
  onChange,
  showOriginalPrice = true,
}) => {
  const { t } = useTranslation("subscribe");
  const handleChange = useCallback(
    (value: string) => {
      onChange(Number(value));
    },
    [onChange]
  );

  const DurationOption: React.FC<{ value: string; label: string }> = ({
    value,
    label,
  }) => (
    <div className="relative">
      <RadioGroupItem className="peer sr-only" id={value} value={value} />
      <Label
        className="relative flex h-full min-h-20 flex-col items-center justify-center gap-2 rounded-[1.35rem] border border-foreground/10 bg-background/70 p-4 text-center text-popover-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-foreground/[0.03] peer-data-[state=checked]:border-primary/60 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
        htmlFor={value}
      >
        {label}
      </Label>
    </div>
  );

  const currentDiscount = discounts?.find(
    (item) => item.quantity === quantity
  )?.discount;
  const discountPercentage = currentDiscount ? 100 - currentDiscount : 0;

  return (
    <>
      <div className="font-semibold">
        {t("purchaseDuration", "Purchase Duration")}
      </div>
      <RadioGroup
        className="flex flex-wrap gap-3"
        onValueChange={handleChange}
        value={String(quantity)}
      >
        {showOriginalPrice && unitTime !== "Minute" && (
          <DurationOption label={`1 / ${t(unitTime)}`} value="1" />
        )}
        {discounts?.map((item) => (
          <DurationOption
            key={item.quantity}
            label={`${item.quantity} / ${t(unitTime)}`}
            value={String(item.quantity)}
          />
        ))}
      </RadioGroup>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">
          {t("discountInfo", "Discount Info")}:
        </span>
        {discountPercentage > 0 ? (
          <Badge
            className="h-7 rounded-full border border-primary/20 bg-primary px-3 text-primary-foreground text-sm"
            variant="secondary"
          >
            -{discountPercentage.toFixed(2)}% {t("discount", "Discount")}
          </Badge>
        ) : (
          <span className="h-6 text-muted-foreground text-sm">--</span>
        )}
      </div>
    </>
  );
};

export default DurationSelector;
