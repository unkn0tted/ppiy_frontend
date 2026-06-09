import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@workspace/ui/components/button";
import { LanguageSwitch } from "@workspace/ui/composed/language-switch";
import { ThemeSwitch } from "@workspace/ui/composed/theme-switch";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";
import { UserNav } from "./user-nav";

export default function Header() {
  const { t } = useTranslation("components");

  const { common, user } = useGlobalStore();
  const { site } = common;
  const supportText =
    site.site_desc || t("footer.copyright", "All rights reserved");
  const Logo = (
    <Link
      className="group flex items-center gap-2.5 font-semibold text-base tracking-tight sm:text-lg"
      to="/"
    >
      {site.site_logo && (
        <img
          alt="logo"
          className="rounded-md ring-1 ring-primary/18 transition-all duration-200 group-hover:ring-primary/35"
          height={34}
          src={site.site_logo}
          width={34}
        />
      )}
      <span className="font-display text-foreground">{site.site_name}</span>
    </Link>
  );
  return (
    <header className="sticky top-0 z-50 bg-background/95 pt-3 pb-3 backdrop-blur-md sm:pt-5">
      <div className="container">
        <div className="rose-nav-shell px-3 py-2 sm:px-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
              <nav className="flex items-center">{Logo}</nav>
              <div className="hidden min-w-0 items-center gap-2 rounded-md border border-primary/12 bg-white/55 px-3 py-2 text-muted-foreground text-sm lg:flex dark:border-white/8 dark:bg-white/5">
                <span className="size-2.5 rounded-[3px] bg-primary shadow-[0_0_0_6px_oklch(0.68_0.17_8_/0.16)]" />
                <p className="truncate">{supportText}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!user && (
                <Link
                  className="hidden rounded-md border border-primary/12 bg-white/60 px-4 py-2 font-medium text-foreground/80 text-sm transition-all duration-200 hover:border-primary/25 hover:bg-white/90 md:inline-flex dark:border-white/8 dark:bg-white/5 dark:hover:bg-white/10"
                  to="/purchasing"
                >
                  {t("pricing", "Pricing")}
                </Link>
              )}
              <div className="app-quick-actions flex items-center gap-1 rounded-md border border-primary/10 bg-white/55 p-1 dark:border-white/8 dark:bg-white/5">
                <LanguageSwitch />
                <ThemeSwitch />
              </div>
              <UserNav />
              {!user && (
                <Link
                  className={`${buttonVariants({
                    size: "sm",
                  })} rounded-md px-4 font-semibold shadow-primary/10 shadow-sm`}
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
