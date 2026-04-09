import { cn } from "@workspace/ui/lib/utils";

type AmbientMistProps = {
  className?: string;
  variant?: "hero" | "subscribe";
};

export function AmbientMist({
  className,
  variant = "hero",
}: Readonly<AmbientMistProps>) {
  return (
    <div
      aria-hidden
      className={cn(
        "rose-mist",
        variant === "subscribe" ? "rose-mist--subscribe" : "rose-mist--hero",
        className
      )}
    >
      <span className="rose-mist__layer rose-mist__layer--primary" />
      <span className="rose-mist__layer rose-mist__layer--secondary" />
      <span className="rose-mist__layer rose-mist__layer--veil" />
    </div>
  );
}
