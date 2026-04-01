import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function GlobalMap() {
  const { t } = useTranslation("main");
  return (
    <motion.section
      className="weidu-panel-ink px-6 py-8 lg:px-8 lg:py-10"
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.35 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="font-medium text-[0.68rem] text-background/55 uppercase tracking-[0.36em]">
        Coverage
      </div>
      <h2 className="mt-6 max-w-md font-semibold text-3xl leading-tight lg:text-[2.4rem]">
        {t("global_map_itle", "Global Connection, Easy and Worry-free")}
      </h2>
      <p className="mt-4 max-w-xl text-background/72 text-base leading-8">
        {t(
          "global_map_description",
          "Explore seamless global connectivity. Choose network services that suit your needs and stay connected anytime, anywhere."
        )}
      </p>

      <div className="mt-10 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-3">
        <div className="overflow-hidden rounded-[1.3rem] border border-white/10 bg-black/20">
          <DotLottieReact
            autoplay
            className="w-full scale-[1.22] opacity-80 grayscale invert"
            loop
            src="./assets/lotties/global-map.json"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {["Quiet routing", "Focused contrast", "Global reach"].map((item) => (
          <div
            className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 text-background/75 text-sm uppercase tracking-[0.18em]"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
