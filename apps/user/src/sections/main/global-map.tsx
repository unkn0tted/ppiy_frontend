import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const globeNodes = [
  { delay: 0, left: "28%", top: "36%" },
  { delay: 0.45, left: "41%", top: "30%" },
  { delay: 0.9, left: "66%", top: "42%" },
  { delay: 1.35, left: "58%", top: "64%" },
];

const connectionArcs = [
  "M28 38 Q42 22 66 42",
  "M28 38 Q47 56 58 64",
  "M41 30 Q54 18 66 42",
];

function GlobeSilhouette() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-1/2 shrink-0"
      preserveAspectRatio="none"
      viewBox="0 0 800 400"
    >
      <g fill="currentColor">
        <path d="M102 156c34-29 87-44 130-31 21 6 44 23 54 42 7 13 11 32 2 46-14 22-49 34-77 32-22-1-41-10-58-23-11-8-22-18-33-20-18-3-40 4-51-8-13-14 10-26 33-38z" />
        <path d="M232 230c16-9 36-7 51 3 12 8 18 20 25 31 9 14 25 22 34 35 7 10 7 25-4 32-10 7-25 5-36 0-22-10-42-28-61-44-15-13-35-27-34-43 0-6 8-11 25-14z" />
        <path d="M426 120c43-24 100-26 145-6 29 13 56 38 57 70 1 26-16 51-40 64-19 10-40 12-58 24-17 12-31 32-53 34-26 2-46-23-55-46-11-30-11-60-4-91 2-10-3-24 8-31z" />
        <path d="M588 236c17-8 37-7 53 4 16 12 23 29 31 46 7 14 20 27 22 43 2 16-12 31-28 33-19 2-35-14-48-27-15-15-30-31-39-50-8-18-12-39 9-49z" />
        <path d="M512 286c16-7 36-4 49 8 9 9 12 22 15 34 4 15 15 29 12 44-2 12-14 20-26 20-19 0-34-16-44-31-10-14-20-31-18-48 1-12 4-20 12-27z" />
      </g>
    </svg>
  );
}

export function GlobalMap() {
  const { t } = useTranslation("main");

  return (
    <motion.aside
      className="weidu-panel relative overflow-hidden px-6 py-8 md:px-8 md:py-10 xl:min-h-[32rem]"
      initial={{ opacity: 0, y: 32 }}
      transition={{ delay: 0.12, duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(255,255,255,0.96), transparent 36%), radial-gradient(circle at bottom left, rgba(220,220,224,0.42), transparent 34%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <h2 className="font-semibold text-2xl tracking-[-0.04em]">
          {t("globalNodes", "全球节点")}
        </h2>

        <div className="relative mt-6 flex flex-1 items-center justify-center py-4">
          <div className="-translate-y-1/2 pointer-events-none absolute inset-x-[10%] top-1/2 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
          <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-[88%] w-px bg-linear-to-b from-transparent via-foreground/10 to-transparent" />

          <div className="relative aspect-square w-full max-w-[24rem]">
            <div
              className="absolute inset-[8%] overflow-hidden rounded-full border border-foreground/10"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #ffffff 0%, #eceef1 36%, #d9dde4 60%, #bdc5cf 100%)",
                boxShadow:
                  "inset -28px -36px 60px rgba(47,49,53,0.16), inset 18px 20px 40px rgba(255,255,255,0.88), 0 30px 60px rgba(47,49,53,0.1)",
              }}
            >
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                className="absolute inset-y-0 left-[-58%] flex h-full w-[216%] text-foreground/18"
                transition={{
                  duration: 18,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <GlobeSilhouette />
                <GlobeSilhouette />
              </motion.div>

              <div
                className="absolute inset-0 opacity-45"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent 0, transparent 11%, rgba(47,49,53,0.09) 11.5%, transparent 12.5%), repeating-linear-gradient(180deg, transparent 0, transparent 12%, rgba(47,49,53,0.08) 12.8%, transparent 13.6%)",
                }}
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.96), transparent 24%), radial-gradient(circle at 72% 58%, rgba(47,49,53,0.16), transparent 48%), linear-gradient(90deg, rgba(255,255,255,0.12), transparent 32%, transparent 68%, rgba(47,49,53,0.12))",
                }}
              />

              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                {connectionArcs.map((path, index) => (
                  <motion.path
                    animate={{
                      opacity: [0.25, 0.75, 0.25],
                      pathLength: [0.2, 1, 0.2],
                    }}
                    d={path}
                    fill="none"
                    key={path}
                    stroke="rgba(47,49,53,0.38)"
                    strokeDasharray="2 4"
                    strokeLinecap="round"
                    strokeWidth="0.55"
                    transition={{
                      delay: index * 0.35,
                      duration: 3.6,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ))}
              </svg>

              {globeNodes.map((node) => (
                <motion.span
                  animate={{ opacity: [0.95, 0.4, 0.95], scale: [1, 1.55, 1] }}
                  className="absolute size-2 rounded-full bg-foreground shadow-[0_0_0_6px_rgba(255,255,255,0.45)]"
                  key={`${node.left}-${node.top}`}
                  style={{ left: node.left, top: node.top }}
                  transition={{
                    delay: node.delay,
                    duration: 2.8,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-full border border-foreground/10 opacity-60" />
            <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-[104%] w-[34%] rounded-full border border-foreground/12 opacity-70" />
            <div className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-[34%] w-[104%] rounded-full border border-foreground/12 opacity-70" />

            <motion.div
              animate={{ rotate: 360 }}
              className="pointer-events-none absolute inset-[-2%] rounded-full border border-foreground/10"
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <span className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 size-3 rounded-full border border-white/70 bg-foreground/15 shadow-[0_0_0_8px_rgba(255,255,255,0.28)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
