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
        <div className="space-y-3">
          <p className="weidu-kicker">Overview</p>
          <h2 className="font-semibold text-2xl tracking-[-0.05em] md:text-3xl">
            {t("mySubscriptions", "My Subscriptions")}
          </h2>
          <p className="max-w-2xl text-muted-foreground leading-7">
            {t(
              "dashboardLead",
              "Monitor active plans, manage imports, and keep billing close without falling back to the old utility layout."
            )}
          </p>
        </div>
        <div className="rounded-[1.35rem] border border-foreground/10 bg-foreground px-4 py-5 text-background">
          <p className="font-medium text-[0.68rem] text-background/60 uppercase tracking-[0.34em]">
            Active account
          </p>
          <p className="mt-3 break-all font-medium leading-7">
            {user?.auth_methods?.[0]?.auth_identifier || "Workspace"}
          </p>
        </div>
      </section>
      <Announcement type="pinned" />
      <Content />
    </div>
  );
}
