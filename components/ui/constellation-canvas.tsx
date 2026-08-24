"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Constellation sphere — slowly rotating point cloud with connective lines
 * for nearby nodes. Canvas 2D adaptation of the reference WebGL lines globe;
 * tuned for a light card with dark ink. Pauses offscreen, respects
 * prefers-reduced-motion.
 */
export default function ConstellationCanvas({
  className,
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const INK = "24, 24, 27";
    const N = 80;
    const LINK = 0.72;

    // Fibonacci sphere for even distribution.
    const pts: [number, number, number][] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * 2.399963;
      pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
    }

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(w * dpr);
      canvas.height = Math.ceil(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;
      const rotY = t * 0.18;
      const rotX = 0.45;
      const R = Math.min(w, h) * 0.42;
      const cx = w * 0.5;
      const cy = h * 0.52;

      const proj = pts.map(([x, y, z]) => {
        // Rotate Y then X.
        const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
        const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
        const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
        return { x: cx + x1 * R, y: cy + y2 * R, z: z2 };
      });

      // Connective lines for close pairs.
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i][0] - pts[j][0];
          const dy = pts[i][1] - pts[j][1];
          const dz = pts[i][2] - pts[j][2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d > LINK) continue;
          const a = (1 - d / LINK) * 0.28;
          ctx.strokeStyle = `rgba(${INK}, ${a.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(proj[i].x, proj[i].y);
          ctx.lineTo(proj[j].x, proj[j].y);
          ctx.stroke();
        }
      }

      // Nodes, depth-scaled.
      for (const p of proj) {
        const depth = (p.z + 1) / 2; // 0 back → 1 front
        const r = 1.2 + depth * 1.6;
        ctx.fillStyle = `rgba(${INK}, ${(0.25 + depth * 0.55).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(performance.now());
    if (!reduced) raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !running && !reduced) {
        running = true;
        raf = requestAnimationFrame(draw);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    />
  );
}
