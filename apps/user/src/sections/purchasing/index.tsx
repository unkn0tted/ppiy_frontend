import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { getSubscription } from "@workspace/ui/services/user/portal";
import { useTranslation } from "react-i18next";
import Content from "./content";

export default function Purchasing() {
  const { id } = useSearch({ from: "/(main)/purchasing/" }) as { id: string };
  const { i18n, t } = useTranslation("subscribe");
  const { data } = useQuery({
    queryKey: ["subscription", i18n.language],
    queryFn: async () => {
      const { data } = await getSubscription(
        {
          language: i18n.language,
        },
        {
          skipErrorHandler: true,
        }
      );
      return data.data?.list || [];
    },
  });

  const subscription = data?.find(
    (item: API.Subscribe) => item.id === Number(id)
  );

  return (
    <main className="container space-y-6 py-8 md:space-y-8 md:py-10">
      <section className="weidu-panel grid gap-6 px-6 py-8 md:grid-cols-[minmax(0,1.2fr)_18rem] md:px-8">
        <div className="space-y-4">
          <p className="weidu-kicker">Checkout atelier</p>
          <div className="space-y-3">
            <h1 className="max-w-3xl font-semibold text-3xl tracking-[-0.05em] md:text-5xl">
              {subscription?.name || t("checkout", "Checkout")}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground leading-7 md:text-lg">
              {t(
                "checkoutLead",
                "Confirm identity, review access details, and complete payment from a quieter monochrome workspace."
              )}
            </p>
          </div>
        </div>
        <div className="grid gap-4 text-sm sm:grid-cols-2 md:grid-cols-1">
          <div className="rounded-[1.5rem] border border-foreground/10 bg-background/70 p-4">
            <p className="weidu-kicker">Flow</p>
            <p className="mt-3 font-medium text-base text-foreground">
              Identify / Configure / Pay
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-foreground/10 bg-secondary/90 px-4 py-5 text-foreground">
            <p className="font-medium text-[0.68rem] text-muted-foreground uppercase tracking-[0.32em]">
              Context
            </p>
            <p className="mt-3 text-muted-foreground text-sm leading-6">
              {subscription?.name ||
                t("subscriptionNotFound", "Subscription not found")}
            </p>
          </div>
        </div>
      </section>
      <Content subscription={subscription} />
    </main>
  );
}
