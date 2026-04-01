import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@workspace/ui/components/button";
import { LanguageSwitch } from "@workspace/ui/composed/language-switch";
import { ThemeSwitch } from "@workspace/ui/composed/theme-switch";
import { cn } from "@workspace/ui/lib/utils";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";
import { UserNav } from "./user-nav";

export default function Header() {
  const { t } = useTranslation("components");

  const { common, user } = useGlobalStore();
  const { site } = common;

  return (
    <header className="sticky top-0 z-50 border-border/70 border-b bg-background/72 backdrop-blur-xl">
      <div className="container py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link className="flex min-w-0 items-center gap-4" to="/">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-card font-semibold text-[0.62rem] uppercase tracking-[0.28em]">
                {site.site_logo ? (
                  <img
                    alt="logo"
                    className="size-8 rounded-full object-cover"
                    height={32}
                    src={site.site_logo}
                    width={32}
                  />
                ) : (
                  "wd"
                )}
              </div>
              <div className="min-w-0">
                <div className="weidu-kicker">Weidu Edition</div>
                <div className="truncate font-semibold text-xl leading-none">
                  {site.site_name}
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-3 rounded-full border border-border/70 bg-card/80 px-3 py-2 lg:flex">
              <LanguageSwitch />
              <ThemeSwitch />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
            <div className="hidden items-center gap-3 xl:flex">
              <span className="size-2 rounded-full bg-foreground" />
              <span className="font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.36em]">
                Monochrome Access Layer
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-2 py-2 shadow-sm lg:hidden">
                <LanguageSwitch />
                <ThemeSwitch />
              </div>
              <UserNav />
              {!user && (
                <Link
                  className={cn(
                    buttonVariants({
                      size: "sm",
                    }),
                    "hover:-translate-y-0.5 rounded-full border border-foreground bg-foreground px-5 text-background shadow-foreground/15 shadow-sm transition-transform hover:bg-foreground/92"
                  )}
                  to="/auth"
                >
                  {t("loginRegister", "Login / Register")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
