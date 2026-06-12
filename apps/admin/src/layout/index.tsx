import { Outlet } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { getCookie } from "@workspace/ui/lib/cookies";
import { useEffect, useState } from "react";
import { Header } from "@/layout/header";
import { SidebarLeft } from "./sidebar-left";

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const sidebarState = getCookie("sidebar_state");
    if (sidebarState !== undefined) {
      setOpen(sidebarState === "true");
    }
  }, []);

  return (
    <SidebarProvider
      className="relative min-h-svh overflow-hidden bg-transparent"
      defaultOpen={open}
    >
      <div className="rose-grid opacity-20" />
      <SidebarLeft />
      <SidebarInset className="relative flex-grow overflow-hidden bg-transparent">
        <Header />
        <div className="h-[calc(100vh-76px)] flex-grow overflow-auto px-3 pb-5 sm:px-5">
          <div className="rose-shell min-h-full p-3 sm:p-5">
            <div className="relative flex min-h-[calc(100vh-116px)] flex-col gap-4">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
