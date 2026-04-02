"use client";

import { Link } from "@tanstack/react-router";
import { Separator } from "@workspace/ui/components/separator";
import { Icon } from "@workspace/ui/composed/icon";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";

interface CustomData {
  community?: {
    discord?: string;
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    telegram?: string;
    twitter?: string;
  };
  contacts?: {
    address?: string;
    email?: string;
    telephone?: string;
  };
  website?: string;
}

export default function Footer() {
  const { t } = useTranslation("components");
  const { common } = useGlobalStore();
  const { site } = common;

  const customData = useMemo<CustomData>(() => {
    try {
      return JSON.parse(site.custom_data || "{}");
    } catch {
      return {};
    }
  }, [site.custom_data]);

  const links = useMemo(
    () => [
      {
        name: "email",
        icon: "uil:envelope",
        href: customData.contacts?.email
          ? `mailto:${customData.contacts.email}`
          : undefined,
      },
      {
        name: "telegram",
        icon: "uil:telegram",
        href: customData.community?.telegram,
      },
      {
        name: "twitter",
        icon: "uil:twitter",
        href: customData.community?.twitter,
      },
      {
        name: "discord",
        icon: "uil:discord",
        href: customData.community?.discord,
      },
      {
        name: "instagram",
        icon: "uil:instagram",
        href: customData.community?.instagram,
      },
      {
        name: "linkedin",
        icon: "uil:linkedin",
        href: customData.community?.linkedin,
      },
      {
        name: "github",
        icon: "uil:github",
        href: customData.community?.github,
      },
      {
        name: "facebook",
        icon: "uil:facebook",
        href: customData.community?.facebook,
      },
    ],
    [customData]
  );
  return (
    <footer className="pt-24 pb-12">
      <div className="container">
        <div className="weidu-footer-panel px-6 py-8 lg:px-10 lg:py-12">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="weidu-landing-kicker">
                  {t("footer.closingNote", "页脚说明")}
                </div>
                <h2 className="max-w-3xl font-semibold text-4xl leading-[0.96] lg:text-[4rem]">
                  {site.site_name}
                </h2>
                <p className="max-w-2xl text-base text-muted-foreground leading-8">
                  {t("footer.signature", "安静的路径，克制的设计。")}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="weidu-footer-chip">
                  {t("header.accessLayer", "极简访问层")}
                </div>
                <div className="weidu-footer-chip">
                  {t("footer.policies", "相关政策")}
                </div>
                <div className="weidu-footer-chip">
                  {t("footer.contacts", "联系方式")}
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="weidu-landing-kicker">
                  {t("footer.policies", "相关政策")}
                </div>
                <div className="flex flex-col gap-3 text-sm">
                  <Link className="weidu-footer-link" to="/tos">
                    {t("footer.tos", "服务条款")}
                  </Link>
                  <Link className="weidu-footer-link" to="/privacy-policy">
                    {t("footer.privacyPolicy", "隐私政策")}
                  </Link>
                  {customData.website && (
                    <a
                      className="weidu-footer-link"
                      href={customData.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {customData.website}
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="weidu-landing-kicker">
                  {t("footer.contacts", "联系方式")}
                </div>
                <nav className="flex flex-wrap items-center gap-3">
                  {links
                    .filter((item) => item.href)
                    .map((item, index) => (
                      <Fragment key={index}>
                        <a
                          aria-label={t(
                            `footer.social.${item.name}`,
                            `访问我们的${item.name}`
                          )}
                          className="weidu-footer-social"
                          href={item.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Icon
                            className="size-4 text-foreground"
                            icon={item.icon}
                          />
                        </a>
                      </Fragment>
                    ))}
                </nav>
                <div className="space-y-2 text-muted-foreground text-sm">
                  {customData.contacts?.email && (
                    <p>{customData.contacts.email}</p>
                  )}
                  {customData.contacts?.telephone && (
                    <p>{customData.contacts.telephone}</p>
                  )}
                  {customData.contacts?.address && (
                    <p>{customData.contacts.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-border/80" />

          <div className="flex flex-col gap-3 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between">
            <p>
              {site.site_name} © {t("footer.copyright", "版权所有")}.
            </p>
            <p>{t("footer.signature", "安静的路径，克制的设计。")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
