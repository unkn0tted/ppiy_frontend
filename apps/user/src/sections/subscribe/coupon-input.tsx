"use client";

import { Input } from "@workspace/ui/components/input";
import type React from "react";
import { useTranslation } from "react-i18next";

interface CouponInputProps {
  coupon?: string;
  onChange: (value: string) => void;
}

const CouponInput: React.FC<CouponInputProps> = ({ coupon, onChange }) => {
  const { t } = useTranslation("subscribe");

  return (
    <>
      <div className="font-semibold">{t("coupon", "Coupon")}</div>
      <Input
        className="h-12 rounded-[1.15rem] border-foreground/10 bg-background/70 px-4 shadow-none transition-colors focus-visible:border-foreground/40 focus-visible:ring-0"
        onChange={(e) => onChange(e.target.value.trim())}
        placeholder={t("enterCoupon", "Enter Coupon")}
        value={coupon}
      />
    </>
  );
};

export default CouponInput;
