function isEnabled(value: unknown): boolean {
  return value === true || value === 1 || value === "1" || value === "true";
}

export function isSubscribeVisible(subscribe?: { show?: unknown } | null) {
  return isEnabled(subscribe?.show);
}

export function isSubscribeSellable(subscribe?: { sell?: unknown } | null) {
  return isEnabled(subscribe?.sell);
}

export function isSubscribePurchasable(
  subscribe?: { sell?: unknown; show?: unknown } | null
) {
  return isSubscribeVisible(subscribe) && isSubscribeSellable(subscribe);
}
