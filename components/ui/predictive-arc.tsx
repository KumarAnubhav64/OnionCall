"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * PredictiveArc — hero background inspired by ThreeUI's Predictive Arc
 * ("violet predictive pixel arch with a luminous animated core").
 *
 * Canvas 2D adaptation: a pixel-cell dome rises from the hero's bottom edge;
 * a radar-style sweep travels the arch lighting cells as it passes, and a
 * pulsing core glows at the apex. Static cells are pre-rendered to an
 * offscreen canvas once per resize so per-frame work stays small.
 */

interface ArcCell {
  x: number;
  y: number;
  /** 0 = inner edge of the band, 1 = outer edge. */
  band: number;
  /** Angle in radians, 0 = apex, increasing toward the sides. */
  angle: number;
  base: number;
}

interface ArcGeometry {
  cells: ArcCell[];
  staticLayer: HTMLCanvasElement;
  cx: number;
  cy: number;
  radius: number;
  dpr: number;
}

const CELL = 7;
const BAND = 90; // arch shell thickness in px
const SWEEP_SPAN = 0.55; // radians of trail behind the sweep head
const VIOLET = "167, 139, 250"; // violet-400
const VIOLET_DEEP = "124, 58, 237"; // violet-600

function buildGeometry(w: number, h: number, dpr: number): ArcGeometry {
  const cx = w / 2;
  const cy = h + 40; // arch center sits below the fold so only the dome shows
  const radius = Math.min(w * 0.62, h * 1.15);

  const cells: ArcCell[] = [];
  const cols = Math.ceil(w / CELL);
  const rows = Math.ceil(h / CELL);
  const inner = radius - BAND;
  const outer = radius + BAND * 0.4;

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const x = gx * CELL + CELL / 2;
      const y = gy * CELL + CELL / 2;
      const dx = x - cx;
      const dy = cy - y; // positive above center
      if (dy < 0) continue; // below the horizon
      const dist = Math.hypot(dx, dy);
      if (dist < inner || dist > outer) continue;

      const angle = Math.atan2(Math.abs(dx), dy); // 0 at apex → π/2 at sides
      const band = (dist - inner) / (outer - inner);
      // Dimmer toward the outer edge and the sides; slight per-cell jitter.
      const base =
        (1 - band * 0.75) * (1 - angle / 2.4) * (0.35 + Math.random() * 0.65);

      cells.push({ x, y, band, angle, base });
    }
  }

  // Pre-render the dim static shell once.
  const staticLayer = document.createElement("canvas");
  staticLayer.width = Math.ceil(w * dpr);
  staticLayer.height = Math.ceil(h * dpr);
  const sctx = staticLayer.getContext("2d");
  if (sctx) {
    sctx.scale(dpr, dpr);
    for (const c of cells) {
      const a = c.base * 0.16;
      if (a < 0.015) continue;
      sctx.fillStyle = `rgba(${VIOLET}, ${a.toFixed(3)})`;
      sctx.fillRect(c.x - 1.5, c.y - 1.5, 3, 3);
    }
  }

  return { cells, staticLayer, cx, cy, radius, dpr };
}

export default function PredictiveArc({
  className,
  speed = 1,
}: {
  className?: string;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    let geometry: ArcGeometry | null = null;
    let raf = 0;
    let running = true;
    // Normalized ping-pong phase: 0 → 1 → 0. The head eases at both ends
    // (cosine), so the sweep slows as it gathers at the core and at the
    // horizon — no dead zone where the arch goes dark.
    let phase = 0;
    let last = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(w * dpr);
      canvas.height = Math.ceil(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      geometry = buildGeometry(w, h, dpr);
    };

    const draw = (now: number) => {
      if (!geometry) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const { width: w, height: h } = canvas;
      const wCss = w / geometry.dpr;
      const hCss = h / geometry.dpr;

      ctx.clearRect(0, 0, wCss, hCss);

      // Dim pre-rendered shell.
      ctx.drawImage(geometry.staticLayer, 0, 0, wCss, hCss);

      // Ping-pong sweep: eases at the core and the horizon, so part of the
      // arch is always lit — no dead zone after each pass.
      phase = (phase + dt * 0.28 * speed) % 1;
      const tt = (1 - Math.cos(phase * Math.PI * 2)) / 2; // 0 → 1 → 0
      const head = tt * (Math.PI / 2);
      const dir = phase < 0.5 ? 1 : -1;
      for (const c of geometry.cells) {
        const d = dir > 0 ? head - c.angle : c.angle - head;
        if (d < 0 || d > SWEEP_SPAN) continue;
        // Brightest at the head, trailing behind the motion.
        const t = 1 - d / SWEEP_SPAN;
        const a = Math.min(0.9, c.base * 0.4 + t * t * 0.8);
        const size = 3 + t * 1.5;
        ctx.fillStyle = `rgba(${VIOLET}, ${a.toFixed(3)})`;
        ctx.fillRect(c.x - size / 2, c.y - size / 2, size, size);
      }

      // Luminous core at the apex, breathing.
      const pulse = 0.5 + 0.5 * Math.sin(now / 900 * speed);
      const coreY = geometry.cy - geometry.radius;
      const coreR = 90 + pulse * 46;
      const glow = ctx.createRadialGradient(
        geometry.cx,
        coreY,
        0,
        geometry.cx,
        coreY,
        coreR
      );
      glow.addColorStop(0, `rgba(${VIOLET}, ${0.28 + pulse * 0.14})`);
      glow.addColorStop(0.4, `rgba(${VIOLET_DEEP}, ${0.1 + pulse * 0.06})`);
      glow.addColorStop(1, "rgba(124, 58, 237, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(
        geometry.cx - coreR,
        coreY - coreR,
        coreR * 2,
        coreR * 2
      );
      // Hot center dot.
      ctx.fillStyle = `rgba(230, 222, 255, ${0.5 + pulse * 0.3})`;
      ctx.beginPath();
      ctx.arc(geometry.cx, coreY, 2.2 + pulse * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Thin concentric guide arcs, barely there.
      ctx.strokeStyle = `rgba(${VIOLET}, 0.07)`;
      ctx.lineWidth = 1;
      for (const r of [geometry.radius - 30, geometry.radius, geometry.radius + 30]) {
        ctx.beginPath();
        ctx.arc(geometry.cx, geometry.cy, r, Math.PI, 0);
        ctx.stroke();
      }

      if (running && !reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    // Static single frame for reduced motion.
    draw(performance.now());
    if (!reduced) raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(performance.now());
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Pause when scrolled away.
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !running && !reduced) {
        running = true;
        last = performance.now();
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
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    />
  );
}
