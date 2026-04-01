"use client";

import { Button } from "@workspace/ui/components/button";
import { Sidebar, SidebarContent } from "@workspace/ui/components/sidebar";
import { Icon } from "@workspace/ui/composed/icon";
import { isBrowser } from "@workspace/ui/utils/index";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Display } from "@/components/display";
import Recharge from "@/sections/subscribe/recharge";
import { useGlobalStore } from "@/stores/global";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useGlobalStore();
  const { t } = useTranslation("layout");

  return (
    <Sidebar
      className="border-r-0 bg-transparent"
      collapsible="none"
      side="right"
      {...props}
    >
      <SidebarContent className="gap-4 px-0 py-0">
        <div className="weidu-panel px-4 py-5">
          <p className="weidu-kicker">Ledger</p>
          <div className="mt-3 space-y-2">
            <h2 className="font-semibold text-xl tracking-[-0.04em]">
              Account snapshot
            </h2>
            <p className="text-muted-foreground text-sm leading-6">
              Quick balances and your invite code stay pinned here while the
              main workspace handles the heavier tasks.
            </p>
          </div>
        </div>

        <div className="weidu-panel overflow-hidden p-0">
          <div className="flex items-center justify-between bg-foreground px-4 py-4 text-background">
            <span className="font-medium text-sm">
              {t("accountBalance", "Account Balance")}
            </span>
            <Recharge className="p-0" variant="link" />
          </div>
          <div className="px-4 py-5 font-semibold text-3xl tracking-[-0.04em]">
            <Display type="currency" value={user?.balance} />
          </div>
        </div>

        <div className="weidu-panel px-4 py-5">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
            {t("giftAmount", "Gift Amount")}
          </p>
          <p className="mt-3 font-semibold text-3xl tracking-[-0.04em]">
            <Display type="currency" value={user?.gift_amount} />
          </p>
        </div>

        <div className="weidu-panel px-4 py-5">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
            {t("commission", "Commission")}
          </p>
          <p className="mt-3 font-semibold text-3xl tracking-[-0.04em]">
            <Display type="currency" value={user?.commission} />
          </p>
        </div>

        {user?.refer_code && (
          <div className="weidu-panel px-4 py-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.26em]">
                  {t("inviteCode", "Invite Code")}
                </p>
                <p className="mt-3 break-all font-medium text-base">
                  {user?.refer_code}
                </p>
              </div>
              <CopyToClipboard
                onCopy={(_text: string, result: boolean) => {
                  if (result) {
                    toast.success(t("copySuccess", "Copy Success"));
                  }
                }}
                text={`${isBrowser() && location?.origin}/#/auth?invite=${user?.refer_code}`}
              >
                <Button className="size-9 rounded-full p-0" variant="outline">
                  <Icon className="text-lg" icon="mdi:content-copy" />
                </Button>
              </CopyToClipboard>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
