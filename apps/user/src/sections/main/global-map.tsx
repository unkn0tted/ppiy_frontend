import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type GlobePoint = {
  land: boolean;
  lat: number;
  lon: number;
};

type Landmass = {
  lat: number;
  lon: number;
  rx: number;
  ry: number;
};

type NetworkNode = {
  lat: number;
  lon: number;
  label: string;
};

const landmasses: Landmass[] = [
  { lat: 47, lon: -108, rx: 42, ry: 24 },
  { lat: 18, lon: -92, rx: 22, ry: 14 },
  { lat: -16, lon: -60, rx: 20, ry: 31 },
  { lat: 74, lon: -42, rx: 12, ry: 8 },
  { lat: 54, lon: 12, rx: 18, ry: 10 },
  { lat: 9, lon: 20, rx: 24, ry: 34 },
  { lat: 54, lon: 70, rx: 54, ry: 20 },
  { lat: 22, lon: 82, rx: 30, ry: 16 },
  { lat: 24, lon: 48, rx: 12, ry: 10 },
  { lat: 0, lon: 114, rx: 22, ry: 11 },
  { lat: -25, lon: 135, rx: 16, ry: 11 },
];

const networkNodes: NetworkNode[] = [
  { lat: 39.9, lon: 116.4, label: "北京" },
  { lat: 22.5, lon: 114.1, label: "香港" },
  { lat: 1.3, lon: 103.8, label: "新加坡" },
  { lat: 35.7, lon: 139.7, label: "东京" },
  { lat: 37.6, lon: -122.4, label: "美西" },
  { lat: 40.7, lon: -74.0, label: "美东" },
  { lat: 51.5, lon: -0.1, label: "伦敦" },
  { lat: 48.9, lon: 2.3, label: "法兰克福" },
];

const networkLinks: Array<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [0, 2],
];

const globePoints = createGlobePoints();

function wrapLongitudeDelta(a: number, b: number) {
  const delta = Math.abs(a - b) % 360;
  return delta > 180 ? 360 - delta : delta;
}

function isLand(lat: number, lon: number) {
  return landmasses.some((mass) => {
    const dx = wrapLongitudeDelta(lon, mass.lon) / mass.rx;
    const dy = (lat - mass.lat) / mass.ry;
    const noise =
      0.08 * Math.sin((lon + lat) * 0.14) +
      0.05 * Math.cos(lon * 0.09 - lat * 0.18);
    return dx * dx + dy * dy <= 1 + noise;
  });
}

function createGlobePoints() {
  const points: GlobePoint[] = [];
  for (let lat = -78; lat <= 78; lat += 4) {
    const lonStep = lat > 56 || lat < -56 ? 8 : 5;
    for (let lon = -180; lon < 180; lon += lonStep) {
      points.push({ land: isLand(lat, lon), lat, lon });
    }
  }
  return points;
}

function projectPoint(
  lat: number,
  lon: number,
  rotation: number,
  radius: number,
  centerX: number,
  centerY: number
) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = ((lon + rotation) * Math.PI) / 180;
  const cosLat = Math.cos(latRad);
  const sinLat = Math.sin(latRad);
  const x = cosLat * Math.sin(lonRad);
  const y = sinLat;
  const z = cosLat * Math.cos(lonRad);
  return {
    visible: z > -0.08,
    x: centerX + x * radius,
    y: centerY - y * radius,
    z,
  };
}

export function GlobalMap() {
  const { t } = useTranslation("main");
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!(stage && canvas)) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      if (!(nextWidth && nextHeight)) return;
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(nextWidth * dpr);
      canvas.height = Math.round(nextHeight * dpr);
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      resize();
      if (!(width && height)) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }

      context.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.52;
      const radius = Math.min(width, height) * 0.36;
      const rotation = -20 + time * 0.0022;

      // ── Outer ambient glow ──────────────────────────────────────────────
      const outerGlow = context.createRadialGradient(
        centerX, centerY, radius * 0.6,
        centerX, centerY, radius * 1.7
      );
      outerGlow.addColorStop(0, "rgba(17, 17, 17, 0.08)");
      outerGlow.addColorStop(0.5, "rgba(17, 17, 17, 0.03)");
      outerGlow.addColorStop(1, "rgba(17, 17, 17, 0)");
      context.fillStyle = outerGlow;
      context.fillRect(0, 0, width, height);

      // ── Globe base (deep charcoal) ──────────────────────────────────────
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      const baseGrad = context.createRadialGradient(
        centerX - radius * 0.28, centerY - radius * 0.32, radius * 0.05,
        centerX + radius * 0.1, centerY + radius * 0.1, radius * 1.15
      );
      baseGrad.addColorStop(0, "rgba(52, 52, 52, 1)");
      baseGrad.addColorStop(0.38, "rgba(28, 28, 28, 1)");
      baseGrad.addColorStop(0.72, "rgba(16, 16, 16, 1)");
      baseGrad.addColorStop(1, "rgba(8, 8, 8, 1)");
      context.fillStyle = baseGrad;
      context.fill();

      // ── Clip everything to sphere ───────────────────────────────────────
      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.clip();

      // ── Specular highlight (top-left) ───────────────────────────────────
      const specular = context.createRadialGradient(
        centerX - radius * 0.38, centerY - radius * 0.44, 0,
        centerX - radius * 0.38, centerY - radius * 0.44, radius * 0.72
      );
      specular.addColorStop(0, "rgba(255, 255, 255, 0.13)");
      specular.addColorStop(0.45, "rgba(255, 255, 255, 0.04)");
      specular.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = specular;
      context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

      // ── Animated scan line ──────────────────────────────────────────────
      const sweep = (Math.sin(time * 0.0009) + 1) / 2;
      const sweepY = centerY - radius + sweep * radius * 2;
      const sweepGrad = context.createLinearGradient(0, sweepY - radius * 0.14, 0, sweepY + radius * 0.18);
      sweepGrad.addColorStop(0, "rgba(255,255,255,0)");
      sweepGrad.addColorStop(0.5, "rgba(255,255,255,0.06)");
      sweepGrad.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = sweepGrad;
      context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

      // ── Grid dots ──────────────────────────────────────────────────────
      for (const point of globePoints) {
        const proj = projectPoint(point.lat, point.lon, rotation, radius, centerX, centerY);
        if (!proj.visible) continue;

        const fade = Math.max(0, proj.z);
        if (point.land) {
          const dotR = 1.3 + fade * 1.1;
          const alpha = 0.22 + fade * 0.62;
          context.beginPath();
          context.arc(proj.x, proj.y, dotR, 0, Math.PI * 2);
          context.fillStyle = `rgba(200, 200, 200, ${alpha})`;
          context.fill();
        } else {
          const dotR = 0.55 + fade * 0.35;
          const alpha = 0.06 + fade * 0.1;
          context.beginPath();
          context.arc(proj.x, proj.y, dotR, 0, Math.PI * 2);
          context.fillStyle = `rgba(120, 120, 120, ${alpha})`;
          context.fill();
        }
      }

      // ── Network links ──────────────────────────────────────────────────
      const projectedNodes = networkNodes.map((node) =>
        projectPoint(node.lat, node.lon, rotation, radius, centerX, centerY)
      );

      for (const [fromIdx, toIdx] of networkLinks) {
        const from = projectedNodes[fromIdx];
        const to = projectedNodes[toIdx];
        if (!(from?.visible && to?.visible)) continue;
        const linkAlpha = 0.18 + Math.min(from.z, to.z) * 0.38;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = `rgba(180, 180, 180, ${linkAlpha})`;
        context.lineWidth = 0.8;
        context.stroke();
      }

      // ── Network nodes ──────────────────────────────────────────────────
      for (const node of projectedNodes) {
        if (!node.visible) continue;
        const fade = Math.max(0, node.z);
        const pulse = 0.72 + 0.28 * Math.sin(time * 0.0014 + node.x * 0.02);

        // Outer glow ring
        context.beginPath();
        context.arc(node.x, node.y, 11 + fade * 4, 0, Math.PI * 2);
        context.fillStyle = `rgba(220, 220, 220, ${0.04 + fade * 0.05})`;
        context.fill();

        // Mid ring
        context.beginPath();
        context.arc(node.x, node.y, 6 + fade * 2.5, 0, Math.PI * 2);
        context.fillStyle = `rgba(230, 230, 230, ${0.09 + fade * 0.09})`;
        context.fill();

        // Core dot
        context.beginPath();
        context.arc(node.x, node.y, 2.8 + fade * 1.4, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${(0.78 + fade * 0.22) * pulse})`;
        context.fill();
      }

      // ── Rim / terminator shadow ─────────────────────────────────────────
      const rimShadow = context.createRadialGradient(
        centerX + radius * 0.22, centerY + radius * 0.12, radius * 0.52,
        centerX + radius * 0.22, centerY + radius * 0.12, radius * 1.05
      );
      rimShadow.addColorStop(0, "rgba(0,0,0,0)");
      rimShadow.addColorStop(0.7, "rgba(0,0,0,0.08)");
      rimShadow.addColorStop(1, "rgba(0,0,0,0.42)");
      context.fillStyle = rimShadow;
      context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

      context.restore();

      // ── Globe border ──────────────────────────────────────────────────
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.strokeStyle = "rgba(80, 80, 80, 0.5)";
      context.lineWidth = 1;
      context.stroke();

      // ── Rim atmosphere glow ────────────────────────────────────────────
      const rimAtmo = context.createRadialGradient(
        centerX, centerY, radius * 0.92,
        centerX, centerY, radius * 1.12
      );
      rimAtmo.addColorStop(0, "rgba(100, 100, 100, 0)");
      rimAtmo.addColorStop(0.6, "rgba(80, 80, 80, 0.12)");
      rimAtmo.addColorStop(1, "rgba(50, 50, 50, 0)");
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.06, 0, Math.PI * 2);
      context.fillStyle = rimAtmo;
      context.fill();

      animationFrame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex h-full min-h-[22rem] flex-col justify-between xl:min-h-[30rem]">
      <div className="space-y-2">
        <div className="weidu-landing-kicker">
          {t("globalNodes", "全球节点")}
        </div>
        <h2 className="font-semibold text-2xl leading-tight tracking-[-0.04em] md:text-3xl">
          {t("globalMapTitle", "全球节点，持续在线")}
        </h2>
        <p className="max-w-lg text-muted-foreground text-sm leading-7">
          {t(
            "globalMapLead",
            "覆盖亚太、欧美核心机房，三网优化直连，全天候低延迟稳定运行。"
          )}
        </p>
      </div>

      <div className="relative mt-6 flex flex-1 items-center justify-center">
        <div
          className="weidu-map-shell relative aspect-square w-full max-w-[36rem]"
          ref={stageRef}
        >
          <canvas className="absolute inset-0 h-full w-full" ref={canvasRef} />
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {[
          t("mapSignalCoverage", "CN2 GIA 直连"),
          t("mapSignalRouting", "BGP 智能路由"),
          t("mapSignalReadability", "三网全覆盖"),
        ].map((item) => (
          <div
            className="rounded-[1.1rem] border border-border/80 bg-white/72 px-3 py-2.5 text-center text-[0.7rem] text-muted-foreground uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-foreground/[0.04] hover:text-foreground"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
