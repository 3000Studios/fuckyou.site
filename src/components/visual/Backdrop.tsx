import { useEffect, useRef } from "react";
import { cx } from "../../lib/utils";

type Props = {
  className?: string;
  intensity?: number;
};

type P = { x: number; y: number; vx: number; vy: number; r: number };

export function Backdrop({ className, intensity = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = canvas;
    const context = ctx;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const particles: P[] = [];
    const count = Math.floor(26 * intensity);

    function reseed(w: number, h: number) {
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18 * intensity,
          vy: (Math.random() - 0.5) * 0.18 * intensity,
          r: 0.8 + Math.random() * 1.6,
        });
      }
    }

    let raf = 0;
    let t = 0;

    function draw() {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, c.clientWidth);
      const h = Math.max(1, c.clientHeight);
      const dw = Math.floor(w * dpr);
      const dh = Math.floor(h * dpr);
      if (c.width !== dw || c.height !== dh) {
        c.width = dw;
        c.height = dh;
        reseed(w, h);
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, w, h);

      // grid
      const grid = 56;
      context.lineWidth = 1;
      for (let x = 0; x <= w; x += grid) {
        const a = 0.03 + 0.02 * Math.sin((x + t) / 240);
        context.strokeStyle = `rgba(41,216,255,${a})`;
        context.beginPath();
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, h);
        context.stroke();
      }
      for (let y = 0; y <= h; y += grid) {
        const a = 0.025 + 0.02 * Math.cos((y + t) / 260);
        context.strokeStyle = `rgba(255,42,85,${a})`;
        context.beginPath();
        context.moveTo(0, y + 0.5);
        context.lineTo(w, y + 0.5);
        context.stroke();
      }

      // particles + links
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > 140) continue;
          const alpha = (1 - d / 140) * 0.09 * intensity;
          context.strokeStyle = `rgba(41,216,255,${alpha})`;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      for (const p of particles) {
        const glow = context.createRadialGradient(p.x, p.y, 0, p.x, p.y, 28);
        glow.addColorStop(0, "rgba(255,42,85,0.10)");
        glow.addColorStop(1, "rgba(255,42,85,0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(p.x, p.y, 28, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = "rgba(245,245,247,0.42)";
        context.beginPath();
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        context.fill();
      }

      t += 10;
      if (!reduceMotion) raf = window.requestAnimationFrame(draw);
    }

    draw();
    if (reduceMotion) return;
    return () => window.cancelAnimationFrame(raf);
  }, [intensity]);

  return (
    <canvas
      ref={ref}
      className={cx("absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
      role="presentation"
    />
  );
}
