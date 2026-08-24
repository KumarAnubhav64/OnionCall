"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Animated halftone dot field — Canvas 2D adaptation of the reference
 * Three.js halftone shader: dot radius pulses as a wave radiating from the
 * center, colored white → violet by height. Dark-card variant.
 */
export default function HalftoneCanvas({
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
    const GAP = 16;
    const MAX_R = 4.6;

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
      const cx = w * 0.62;
      const cy = h * 0.5;

      for (let y = GAP / 2; y < h; y += GAP) {
        // Color eases white (top) → violet (bottom), matching the reference mix.
        const mix = y / Math.max(h, 1);
        const cr = Math.round(167 + (255 - 167) * (1 - mix));
        const cg = Math.round(139 + (255 - 139) * (1 - mix));
        const cb = Math.round(250 + (255 - 250) * (1 - mix));
        for (let x = GAP / 2; x < w; x += GAP) {
          const d = Math.hypot(x - cx, y - cy);
          const wave = Math.sin(d * 0.045 - t * 2.2) * 0.5 + 0.5;
          const r = MAX_R * wave;
          if (r < 0.4) continue;
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${(wave * 0.85).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
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
