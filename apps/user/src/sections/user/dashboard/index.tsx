import { useTranslation } from "react-i18next";
import { useGlobalStore } from "@/stores/global";
import Announcement from "../announcement";
import Content from "./content";

export default function Dashboard() {
  const { t } = useTranslation("dashboard");
  const { user } = useGlobalStore();

  return (
    <div className="flex min-h-[calc(100vh-64px-58px-32px-114px)] w-full flex-col gap-6 overflow-hidden">
      <section className="grid gap-4 rounded-[1.6rem] border border-foreground/10 bg-background/70 px-5 py-6 md:grid-cols-[minmax(0,1.2fr)_16rem]">
        <div>
          <h2 className="font-semibold text-2xl tracking-[-0.05em] md:text-3xl">
            {t("mySubscriptions", "My Subscriptions")}
          </h2>
        </div>
        <div className="rounded-[1.35rem] border border-foreground/10 bg-secondary/90 px-4 py-5 text-foreground">
          <p className="font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.34em]">
            {t("activeAccount", "Active account")}
          </p>
          <p className="mt-3 break-all font-medium leading-7">
            {user?.auth_methods?.[0]?.auth_identifier ||
              t("workspaceFallback", "Workspace")}
          </p>
        </div>
      </section>
      <Announcement type="pinned" />
      <Content />
    </div>
  );
}
