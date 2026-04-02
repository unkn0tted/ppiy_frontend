import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useGlobalStore } from "@/stores/global";
import { ClosingStatement } from "./closing-statement";
import { Hero } from "./hero";
import { ProductShowcase } from "./product-showcase";
import { Stats } from "./stats";

export default function Main() {
  const { user } = useGlobalStore();
  const navigate = useNavigate();

  const showLanding = import.meta.env.VITE_SHOW_LANDING_PAGE !== "false";

  useEffect(() => {
    if (user) {
      navigate({ to: "/dashboard" });
      return;
    }

    if (!showLanding) {
      navigate({ to: "/auth" });
    }
  }, [user, navigate, showLanding]);

  if (!showLanding) return null;

  return (
    <main className="container pt-6 pb-24">
      <div className="weidu-landing space-y-6 md:space-y-8">
        <Hero />
        <Stats />
        <ProductShowcase />
        <ClosingStatement />
      </div>
    </main>
  );
}
