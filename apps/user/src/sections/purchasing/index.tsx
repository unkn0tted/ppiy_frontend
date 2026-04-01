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
      <section className="weidu-panel px-6 py-8 md:px-8">
        <h1 className="max-w-3xl font-semibold text-3xl tracking-[-0.05em] md:text-5xl">
          {subscription?.name || t("checkout", "Checkout")}
        </h1>
      </section>
      <Content subscription={subscription} />
    </main>
  );
}
