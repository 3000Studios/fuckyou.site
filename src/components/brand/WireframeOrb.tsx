import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  size?: number;
  speed?: number;
};

type Vec3 = { x: number; y: number; z: number };

function rotX(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c };
}

function rotY(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
}

function rotZ(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c, z: v.z };
}

function project(v: Vec3, fov: number): { x: number; y: number; z: number } {
  const z = v.z + fov;
  const s = fov / z;
  return { x: v.x * s, y: v.y * s, z: v.z };
}

function makeIco(): { pts: Vec3[]; edges: Array<[number, number]> } {
  const t = (1 + Math.sqrt(5)) / 2;
  const pts: Vec3[] = [
    { x: -1, y: t, z: 0 },
    { x: 1, y: t, z: 0 },
    { x: -1, y: -t, z: 0 },
    { x: 1, y: -t, z: 0 },
    { x: 0, y: -1, z: t },
    { x: 0, y: 1, z: t },
    { x: 0, y: -1, z: -t },
    { x: 0, y: 1, z: -t },
    { x: t, y: 0, z: -1 },
    { x: t, y: 0, z: 1 },
    { x: -t, y: 0, z: -1 },
    { x: -t, y: 0, z: 1 },
  ];
  const edges: Array<[number, number]> = [];
  const d2 = (a: Vec3, b: Vec3) =>
    (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
  const ideal = d2(pts[0], pts[11]);
  for (let i = 0; i < pts.length; i += 1) {
    for (let j = i + 1; j < pts.length; j += 1) {
      const dd = d2(pts[i], pts[j]);
      if (Math.abs(dd - ideal) < 1e-6) edges.push([i, j]);
    }
  }
  return { pts, edges };
}

export function WireframeOrb({ className, size = 36, speed = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = canvas;
    const context = ctx;

    const { pts, edges } = makeIco();
    let raf = 0;
    let t = 0;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function draw() {
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      const w = size;
      const h = size;
      if (c.width !== w * dpr || c.height !== h * dpr) {
        c.width = w * dpr;
        c.height = h * dpr;
        c.style.width = `${w}px`;
        c.style.height = `${h}px`;
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const fov = 3.2;
      const scale = w * 0.36;

      const ax = (t * 0.9) / 1000;
      const ay = (t * 1.1) / 1000;
      const az = (t * 0.7) / 1000;

      const transformed = pts.map((p) => {
        let v = { ...p };
        v = rotX(v, ax);
        v = rotY(v, ay);
        v = rotZ(v, az);
        const pr = project(v, fov);
        return {
          x: cx + pr.x * scale,
          y: cy + pr.y * scale,
          z: pr.z,
        };
      });

      context.lineWidth = 1;
      context.lineCap = "round";
      for (const [i, j] of edges) {
        const a = transformed[i];
        const b = transformed[j];
        const depth = (a.z + b.z) / 2;
        const alpha = 0.15 + Math.max(0, 0.35 - depth * 0.12);
        context.strokeStyle = `rgba(41,216,255,${alpha})`;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }

      context.fillStyle = "rgba(255,42,85,0.25)";
      for (const p of transformed) {
        const r = 1.15;
        context.beginPath();
        context.arc(p.x, p.y, r, 0, Math.PI * 2);
        context.fill();
      }

      if (!reduceMotion) {
        t += 16 * speed;
        raf = window.requestAnimationFrame(draw);
      }
    }

    draw();
    if (reduceMotion) return;
    return () => window.cancelAnimationFrame(raf);
  }, [size, speed]);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  );
}
