"use client";
import { Outlet } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import Announcement from "@/sections/user/announcement";
import { SidebarLeft } from "./sidebar-left";
import { SidebarRight } from "./sidebar-right";

export default function UserLayout() {
  return (
    <SidebarProvider className="container relative py-4 sm:py-5">
      <SidebarLeft className="sticky top-[92px] hidden w-56 border-r-0 bg-transparent lg:flex" />
      <SidebarInset className="relative min-h-[calc(100vh-92px)] rounded-[1.75rem] border border-primary/14 bg-card/75 p-4 shadow-[0_24px_70px_-50px_oklch(0.675_0.165_10.4)] backdrop-blur-sm sm:p-5">
        <Outlet />
      </SidebarInset>
      <SidebarRight className="sticky top-[92px] hidden w-56 border-r-0 bg-transparent 2xl:flex" />
      <Announcement type="popup" />
    </SidebarProvider>
  );
}
