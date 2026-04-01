"use client";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Icon } from "@workspace/ui/composed/icon";
import { cn } from "@workspace/ui/lib/utils";
import { useNavs } from "@/layout/navs";

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const navs = useNavs();
  return (
    <Sidebar
      className="border-r-0 bg-transparent"
      collapsible="none"
      side="left"
      {...props}
    >
      <SidebarContent className="weidu-panel gap-6 px-4 py-5">
        <div className="space-y-3 px-2">
          <p className="weidu-kicker">Navigator</p>
          <div className="space-y-2">
            <h2 className="font-semibold text-xl tracking-[-0.04em]">
              Cabinet
            </h2>
            <p className="text-muted-foreground text-sm leading-6">
              Switch between profile, subscriptions, billing, support, and
              documentation from a single monochrome rail.
            </p>
          </div>
        </div>
        <SidebarMenu className="gap-5">
          {navs.map((nav) => (
            <SidebarGroup className="p-0" key={nav.title}>
              {nav.items && (
                <SidebarGroupLabel className="px-2 pb-2 font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.3em]">
                  {nav.title}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                  {(nav.items || [nav]).map((item) => {
                    const isActive = item.url === location.pathname;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className="h-auto rounded-[1.25rem] p-0 hover:bg-transparent data-[active=true]:bg-transparent"
                          isActive={isActive}
                          tooltip={item.title}
                        >
                          <Link
                            className={cn(
                              "flex w-full items-center gap-3 rounded-[1.25rem] border border-transparent px-3 py-3 transition-all duration-200",
                              isActive
                                ? "border-primary/55 bg-primary text-primary-foreground"
                                : "hover:border-foreground/12 hover:bg-foreground/[0.03]"
                            )}
                            to={item.url || "/"}
                          >
                            {item.icon && (
                              <span
                                className={cn(
                                  "flex size-10 items-center justify-center rounded-full border",
                                  isActive
                                    ? "border-primary-foreground/15 bg-primary-foreground/10 text-primary-foreground"
                                    : "border-foreground/10 bg-background text-foreground"
                                )}
                              >
                                <Icon className="size-5" icon={item.icon} />
                              </span>
                            )}
                            <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                              <span className="truncate font-medium text-sm">
                                {item.title}
                              </span>
                              <Icon
                                className={cn(
                                  "size-4 flex-none opacity-45",
                                  isActive && "opacity-70"
                                )}
                                icon="lucide:chevron-right"
                              />
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
