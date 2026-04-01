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
  { lat: 51.5, lon: -0.1 },
  { lat: 40.7, lon: -74 },
  { lat: 48.9, lon: 2.3 },
  { lat: 25.2, lon: 55.3 },
  { lat: 6.5, lon: 3.4 },
  { lat: -26.2, lon: 28 },
  { lat: 35.7, lon: 139.7 },
];

const networkLinks: Array<readonly [number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [2, 4],
  [3, 4],
  [4, 5],
  [3, 6],
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
      points.push({
        land: isLand(lat, lon),
        lat,
        lon,
      });
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
    visible: z > 0,
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
      const centerY = height * 0.54;
      const radius = Math.min(width, height) * 0.34;
      const rotation = -18 + time * 0.0045;

      const haloGradient = context.createRadialGradient(
        centerX,
        centerY,
        radius * 0.25,
        centerX,
        centerY,
        radius * 1.55
      );
      haloGradient.addColorStop(0, "rgba(212, 224, 255, 0.46)");
      haloGradient.addColorStop(0.5, "rgba(212, 224, 255, 0.18)");
      haloGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = haloGradient;
      context.fillRect(0, 0, width, height);

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fillStyle = "#dbe4f8";
      context.fill();

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.clip();

      const sphereGradient = context.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.42,
        radius * 0.12,
        centerX,
        centerY,
        radius * 1.12
      );
      sphereGradient.addColorStop(0, "rgba(255, 255, 255, 0.98)");
      sphereGradient.addColorStop(0.18, "rgba(241, 246, 255, 0.98)");
      sphereGradient.addColorStop(0.62, "rgba(207, 219, 242, 0.95)");
      sphereGradient.addColorStop(1, "rgba(168, 182, 214, 0.96)");
      context.fillStyle = sphereGradient;
      context.fillRect(
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2
      );

      for (const point of globePoints) {
        const projected = projectPoint(
          point.lat,
          point.lon,
          rotation,
          radius,
          centerX,
          centerY
        );

        if (!projected.visible) continue;

        const baseRadius = point.land ? 1.65 : 0.75;
        const dotRadius = baseRadius + projected.z * (point.land ? 1.2 : 0.45);
        const alpha = point.land
          ? 0.22 + projected.z * 0.9
          : 0.03 + projected.z * 0.08;

        context.beginPath();
        context.arc(projected.x, projected.y, dotRadius, 0, Math.PI * 2);
        context.fillStyle = point.land
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(108, 124, 154, ${alpha})`;
        context.fill();
      }

      const projectedNodes = networkNodes.map((node) =>
        projectPoint(node.lat, node.lon, rotation, radius, centerX, centerY)
      );

      context.lineWidth = 1;

      for (const [fromIndex, toIndex] of networkLinks) {
        const from = projectedNodes[fromIndex];
        const to = projectedNodes[toIndex];

        if (!(from?.visible && to?.visible)) continue;

        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = `rgba(255, 255, 255, ${
          0.14 + Math.min(from.z, to.z) * 0.4
        })`;
        context.stroke();
      }

      for (const node of projectedNodes) {
        if (!node.visible) continue;

        context.beginPath();
        context.arc(node.x, node.y, 3.4 + node.z * 2.1, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${0.52 + node.z * 0.4})`;
        context.fill();

        context.beginPath();
        context.arc(node.x, node.y, 8 + node.z * 3.5, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${0.08 + node.z * 0.06})`;
        context.fill();
      }

      const shadowGradient = context.createLinearGradient(
        centerX + radius * 0.18,
        centerY - radius * 0.4,
        centerX + radius,
        centerY + radius * 0.45
      );
      shadowGradient.addColorStop(0, "rgba(120, 136, 169, 0)");
      shadowGradient.addColorStop(1, "rgba(96, 108, 137, 0.28)");
      context.fillStyle = shadowGradient;
      context.fillRect(
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2
      );

      context.restore();

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.strokeStyle = "rgba(196, 206, 230, 0.75)";
      context.lineWidth = 1.2;
      context.stroke();

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
    <div className="flex h-full min-h-[22rem] flex-col justify-between xl:min-h-[31rem]">
      <h2 className="font-semibold text-2xl tracking-[-0.04em]">
        {t("globalNodes", "全球节点")}
      </h2>
      <div className="relative mt-6 flex flex-1 items-center justify-center">
        <div
          className="relative aspect-square w-full max-w-[38rem]"
          ref={stageRef}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(215, 226, 255, 0.42), transparent 44%), radial-gradient(circle at center, rgba(255, 255, 255, 0.8), transparent 72%)",
            }}
          />
          <canvas className="absolute inset-0 h-full w-full" ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}
