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
        <div className="weidu-panel px-6 py-8 lg:px-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div className="space-y-5">
              <div className="weidu-kicker">Weidu Closing Note</div>
              <div className="weidu-rule max-w-28" />
              <div>
                <h2 className="max-w-xl font-semibold text-3xl leading-tight lg:text-4xl">
                  {site.site_name}
                </h2>
                <p className="mt-4 max-w-xl text-base text-muted-foreground leading-7">
                  {site.site_desc ||
                    t("footer.copyright", "All rights reserved")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="weidu-kicker">Policies</div>
              <div className="flex flex-col gap-3 text-sm">
                <Link
                  className="w-fit transition-opacity hover:opacity-60"
                  to="/tos"
                >
                  {t("footer.tos", "Terms of Service")}
                </Link>
                <Link
                  className="w-fit transition-opacity hover:opacity-60"
                  to="/privacy-policy"
                >
                  {t("footer.privacyPolicy", "Privacy Policy")}
                </Link>
                {customData.website && (
                  <a
                    className="w-fit transition-opacity hover:opacity-60"
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
              <div className="weidu-kicker">Contacts</div>
              <nav className="flex flex-wrap items-center gap-3">
                {links
                  .filter((item) => item.href)
                  .map((item, index) => (
                    <Fragment key={index}>
                      <a
                        aria-label={t(
                          `footer.social.${item.name}`,
                          `Visit our ${item.name}`
                        )}
                        className="hover:-translate-y-0.5 flex size-11 items-center justify-center rounded-full border border-border bg-background transition-transform"
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

          <Separator className="my-8" />

          <div className="flex flex-col gap-3 text-[0.7rem] text-muted-foreground uppercase tracking-[0.3em] sm:flex-row sm:items-center sm:justify-between">
            <p>
              {site.site_name} © {t("footer.copyright", "All rights reserved")}.
            </p>
            <p>Quiet routes. Deliberate design.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
