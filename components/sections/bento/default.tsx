import { KeyRound, Radar, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import ConstellationCanvas from "../../ui/constellation-canvas";
import HalftoneCanvas from "../../ui/halftone-canvas";
import MaskedReveal from "../../ui/masked-reveal";
import { Section } from "../../ui/section";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function CardHeader({
  tag,
  light = false,
}: {
  tag: string;
  light?: boolean;
}) {
  return (
    <header
      className={cn(
        "relative z-20 flex items-center justify-between font-mono text-xs tracking-tight",
        light ? "text-black/80" : "text-white/90"
      )}
    >
      <span className="flex items-center gap-1.5">
        <Radar className="size-4" strokeWidth={1.5} />
        onioncall
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] opacity-50">
        {tag}
      </span>
    </header>
  );
}

export default function Bento() {
  return (
    <Section className="overflow-hidden" id="features">
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-12">
        <h2 className="max-w-[600px] text-center text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl sm:leading-tight">
          Built like infrastructure for secrets.
        </h2>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {/* 01 · Network — light card, constellation sphere */}
          <article
            className="relative flex h-[460px] w-full flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-2xl md:h-auto md:min-h-[440px]"
            style={{
              border: "1px solid transparent",
              background:
                "linear-gradient(#f4f4f0, #f4f4f0) padding-box, linear-gradient(135deg, #ffffff 0%, #d1d5db 100%) border-box",
            }}
          >
            {/* film grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 opacity-[0.12] mix-blend-multiply"
              style={{ backgroundImage: NOISE }}
            />
            <div className="absolute inset-x-0 bottom-0 top-1/4 z-0">
              <ConstellationCanvas className="opacity-70" />
            </div>
            <CardHeader tag="01 · network" light />
            <main className="relative z-20 mt-auto">
              <MaskedReveal
                text={"No servers.\nNo trace."}
                className="mb-4 text-3xl leading-[1.1] font-semibold tracking-tight text-black md:text-4xl"
              />
              <p className="max-w-[240px] text-xs leading-relaxed text-black/70">
                Calls ride Tor hidden services — device to device, with no
                company in the middle to log or shut down.
              </p>
            </main>
          </article>

          {/* 02 · Keys — violet card, blueprint grid */}
          <article
            className="relative flex h-[460px] w-full flex-col justify-between overflow-hidden rounded-3xl p-7 text-white shadow-2xl md:h-auto md:min-h-[440px]"
            style={{
              border: "1px solid transparent",
              background:
                "linear-gradient(#6d28d9, #6d28d9) padding-box, linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(46,16,101,0.6) 100%) border-box",
            }}
          >
            {/* blueprint grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "1.5rem 1.5rem",
              }}
            />
            <KeyRound
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -right-8 z-0 size-44 opacity-15"
              strokeWidth={1}
            />
            <CardHeader tag="02 · keys" />
            <main className="relative z-20 mt-auto">
              <MaskedReveal
                text={"Forward secret.\nEvery call."}
                className="mb-4 text-3xl leading-[1.1] font-semibold tracking-tight md:text-4xl"
              />
              <p className="max-w-[260px] text-xs leading-relaxed text-white/75">
                A fresh X25519 key is agreed for each call and destroyed at
                hangup — recorded traffic stays sealed even if the pairing
                secret leaks later.
              </p>
              <code className="mt-4 inline-block rounded-full border border-white/25 bg-white/10 px-2.5 py-1 font-mono text-[10px]">
                X25519 · HKDF-SHA256
              </code>
            </main>
          </article>

          {/* 03 · Channel — full-width dark card, halftone field */}
          <article
            className="relative flex h-[420px] w-full flex-col justify-between overflow-hidden rounded-3xl p-7 text-white shadow-2xl md:col-span-2 md:h-[360px] md:flex-row md:gap-8"
            style={{
              border: "1px solid transparent",
              background:
                "linear-gradient(#0a0a0a, #0a0a0a) padding-box, linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 100%) border-box",
            }}
          >
            <div className="pointer-events-none absolute inset-0 z-0 md:left-1/3">
              <HalftoneCanvas className="opacity-80" />
            </div>
            <div className="relative z-20 flex flex-row items-center justify-between md:flex-col md:items-start">
              <CardHeader tag="03 · channel" />
            </div>
            <main className="relative z-20 mt-auto max-w-md md:mt-0 md:self-end md:text-right">
              <MaskedReveal
                text={"Sealed\nevery frame."}
                className="mb-4 text-4xl leading-[1.1] font-semibold uppercase tracking-tight md:text-5xl"
              />
              <p className="ml-auto flex items-start justify-start gap-2 text-xs leading-relaxed text-white/70 md:justify-end">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span className="text-pretty">
                  XChaCha20-Poly1305 on voice and text — 100% of frames
                  delivered over Tor in our recorded benchmarks.
                </span>
              </p>
            </main>
          </article>
        </div>
      </div>
    </Section>
  );
}
