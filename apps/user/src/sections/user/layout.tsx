"use client";
import { Outlet, useLocation } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { useTranslation } from "react-i18next";
import { useFindNavByUrl } from "@/layout/navs";
import Announcement from "@/sections/user/announcement";
import { useGlobalStore } from "@/stores/global";
import { SidebarLeft } from "./sidebar-left";
import { SidebarRight } from "./sidebar-right";

export default function UserLayout() {
  const { t } = useTranslation("layout");
  const location = useLocation();
  const { user } = useGlobalStore();
  const matchedNavs = useFindNavByUrl(location.pathname);
  const currentNav = matchedNavs.at(-1);
  const accountLabel =
    user?.auth_methods?.[0]?.auth_identifier ||
    t("workspaceAccount", "Workspace account");

  return (
    <div className="container space-y-6 py-8 md:space-y-8 md:py-10">
      <section className="weidu-panel grid gap-6 px-6 py-8 md:grid-cols-[minmax(0,1.2fr)_20rem] md:px-8">
        <div>
          <h1 className="font-semibold text-3xl tracking-[-0.05em] md:text-5xl">
            {currentNav?.title || t("dashboardFallback", "Dashboard")}
          </h1>
        </div>
        <div className="rounded-[1.6rem] border border-foreground/10 bg-secondary/90 px-5 py-6 text-foreground">
          <p className="font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.34em]">
            {t("sessionLabel", "Session")}
          </p>
          <p className="mt-4 break-all font-medium text-lg">{accountLabel}</p>
        </div>
      </section>

      <SidebarProvider className="flex flex-col gap-6 xl:flex-row">
        <SidebarLeft className="hidden w-[17rem] shrink-0 border-r-0 bg-transparent xl:flex" />
        <SidebarInset className="relative min-w-0 rounded-none border-0 bg-transparent p-0 shadow-none">
          <div className="weidu-panel min-h-[calc(100vh-22rem)] px-4 py-4 md:px-6 md:py-6">
            <Outlet />
          </div>
        </SidebarInset>
        <SidebarRight className="hidden w-[18rem] shrink-0 border-r-0 bg-transparent 2xl:flex" />
        <Announcement type="popup" />
      </SidebarProvider>
    </div>
  );
}
