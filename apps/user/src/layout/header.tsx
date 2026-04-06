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
    <header className="sticky top-0 z-50 pt-4">
      <div className="container">
        <div className="weidu-header-panel px-4 py-4 md:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link className="flex min-w-0 items-center gap-4" to="/">
                <div className="weidu-header-mark">
                  <span className="weidu-header-mark-grid" />
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border/80 bg-white font-semibold text-[0.62rem] uppercase tracking-[0.28em]">
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
                </div>

                <div className="min-w-0">
                  <div className="min-w-0 truncate font-semibold text-xl leading-none">
                    {site.site_name}
                  </div>
                </div>
              </Link>

              <div className="weidu-header-tools hidden lg:flex">
                <LanguageSwitch />
                <ThemeSwitch />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="weidu-header-tools lg:hidden">
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
                    "weidu-header-login"
                  )}
                  to="/auth"
                >
                  {t("loginRegister", "登录 / 注册")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
