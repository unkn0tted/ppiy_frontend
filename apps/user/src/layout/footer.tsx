"use client";

import { Link } from "@tanstack/react-router";
import { Icon } from "@workspace/ui/composed/icon";
import { useMemo } from "react";
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
  const contactHref = customData.contacts?.email
    ? `mailto:${customData.contacts.email}`
    : customData.website;
  const contactLabel = customData.contacts?.email
    ? customData.contacts.email
    : customData.website?.replace(/^https?:\/\//, "");

  return (
    <footer className="pt-8 pb-12 sm:pt-10">
      <div className="container">
        <div className="rose-shell px-6 py-7 sm:px-8 sm:py-8">
          <div className="rose-grid opacity-30" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_auto] lg:items-end">
            <div className="min-w-0">
              <p className="font-display text-3xl leading-none sm:text-4xl">
                <span className="rose-section-title">{site.site_name}</span>
              </p>
              <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
                {site.site_desc || t("footer.copyright", "All rights reserved")}
              </p>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <div className="flex flex-wrap items-center gap-2.5">
                {links
                  .filter((item) => item.href)
                  .map((item) => (
                    <a
                      aria-label={t(
                        `footer.social.${item.name}`,
                        `Visit our ${item.name}`
                      )}
                      className="hover:-translate-y-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-primary/12 bg-white/70 transition-all duration-200 hover:border-primary/30 hover:bg-white/95 dark:border-white/8 dark:bg-white/6 dark:hover:bg-white/12"
                      href={item.href}
                      key={item.name}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon
                        className="size-4 text-foreground"
                        icon={item.icon}
                      />
                    </a>
                  ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Link
                  className="text-muted-foreground transition-colors hover:text-primary"
                  to="/tos"
                >
                  {t("footer.tos", "Terms of Service")}
                </Link>
                <Link
                  className="text-muted-foreground transition-colors hover:text-primary"
                  to="/privacy-policy"
                >
                  {t("footer.privacyPolicy", "Privacy Policy")}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 border-primary/10 border-t pt-4 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
            <p>© {t("footer.copyright", "All rights reserved")}.</p>
            {contactHref && contactLabel ? (
              <a
                className="transition-colors hover:text-primary"
                href={contactHref}
                rel={
                  customData.contacts?.email ? undefined : "noopener noreferrer"
                }
                target={customData.contacts?.email ? undefined : "_blank"}
              >
                {contactLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
