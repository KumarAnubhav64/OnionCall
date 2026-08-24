"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Live call-session terminal — the hero visual. Types out a real OnionCall
 * session: Tor bootstrap, onion address (hex-scrambled then resolved),
 * incoming call, forward-secret handshake, secure channel. Then shows the
 * onion route with a packet traveling through relays. Loops forever.
 */

type LineKind = "cmd" | "ok" | "info" | "call" | "secure" | "dim";

interface Line {
  kind: LineKind;
  text: string;
}

const SCRIPT: Line[] = [
  { kind: "cmd", text: "onioncall listen" },
  { kind: "ok", text: "tor circuit established · 3 hops" },
  { kind: "info", text: "onion: 9f4k2mq1azv7xu3d.onion" },
  { kind: "dim", text: "listening for calls…" },
  { kind: "call", text: "incoming call from 8fj3w0pe6r2t.onion" },
  { kind: "ok", text: "peer verified · X25519 handshake" },
  { kind: "ok", text: "channel sealed · XChaCha20-Poly1305" },
  { kind: "secure", text: "● SECURE — hold [space] to talk" },
];

const KIND_CLASS: Record<LineKind, string> = {
  cmd: "text-foreground",
  ok: "text-emerald-400",
  info: "text-sky-300",
  call: "text-violet-300",
  secure: "text-emerald-300 font-semibold",
  dim: "text-muted-foreground/60",
};

const HEX = "0123456789abcdef";
const HOLD_MS = 4200;
const TYPE_MS = 34;
const LINE_PAUSE = 260;

function scramble(text: string, progress: number): string {
  return text
    .split("")
    .map((ch, i) => {
      if (/[a-z0-9]/.test(ch) && i / text.length > progress) {
        return HEX[Math.floor(Math.random() * HEX.length)];
      }
      return ch;
    })
    .join("");
}

/** Relays + traveling packet strip shown under the terminal. */
function RouteStrip() {
  return (
    <div className="border-border/60 mt-auto border-t px-5 py-4">
      <div className="relative flex items-center justify-between">
        <span className="bg-card text-muted-foreground z-10 rounded border px-1.5 py-0.5 font-mono text-[10px]">
          you
        </span>
        <div className="relative mx-3 h-px flex-1 bg-gradient-to-r from-emerald-500/10 via-primary/40 to-emerald-500/10">
          {/* three relay ticks */}
          {[25, 50, 75].map((left) => (
            <span
              key={left}
              className="bg-primary/50 absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${left}%` }}
            />
          ))}
          {/* traveling packet */}
          <span
            className="bg-brand absolute top-1/2 size-2 -translate-y-1/2 rounded-full shadow-[0_0_10px_2px] shadow-primary/50"
            style={{
              animation: "onion-packet 2.6s ease-in-out infinite",
            }}
          />
        </div>
        <span className="bg-card text-muted-foreground z-10 rounded border px-1.5 py-0.5 font-mono text-[10px]">
          peer
        </span>
      </div>
      <p className="text-muted-foreground/70 mt-3 text-center font-mono text-[10px]">
        relays see only ciphertext · neither end reveals its IP
      </p>
    </div>
  );
}

export default function TerminalDemo() {
  // Lines revealed so far (full lines above the active one).
  const [done, setDone] = useState<Line[]>([]);
  // Partial text of the actively typing line.
  const [active, setActive] = useState("");
  const [activeKind, setActiveKind] = useState<LineKind>("cmd");
  const [scrambleP, setScrambleP] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    async function run() {
      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled) return;
        const line = SCRIPT[i];
        setActiveKind(line.kind);

        if (line.kind === "cmd") {
          // Type the command character by character.
          for (let c = 1; c <= line.text.length; c++) {
            if (cancelled) return;
            setActive(line.text.slice(0, c));
            await sleep(TYPE_MS);
          }
        } else {
          setActive(line.text);
          // Onion addresses scramble, then resolve left-to-right.
          if (line.text.includes(".onion")) {
            for (let p = 0; p <= 1.0001; p += 0.1) {
              if (cancelled) return;
              setScrambleP(Math.min(p, 1));
              await sleep(70);
            }
          }
        }
        setScrambleP(1);
        setDone((d) => [...d, line]);
        setActive("");
        await sleep(LINE_PAUSE + (i === 0 ? 350 : 0));
      }

      // Hold the completed session, then restart the loop.
      await wait(HOLD_MS);
      if (!cancelled) {
        setDone([]);
        setActive("");
        run();
      }
    }
    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedActive = useMemo(() => {
    if (scrambleP >= 1) return active;
    return scramble(active, scrambleP);
  }, [active, scrambleP]);

  return (
    <div className="flex h-full flex-col">
      {/* Title bar */}
      <div className="border-border/60 flex items-center gap-2 border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-amber-500/70" />
        <span className="size-2.5 rounded-full bg-emerald-500/70" />
        <span className="text-muted-foreground ml-3 font-mono text-xs">
          onioncall — zsh
        </span>
        <span className="text-muted-foreground/50 ml-auto font-mono text-[10px]">
          v2.2.0
        </span>
      </div>

      {/* Session output */}
      <div className="min-h-[240px] flex-1 space-y-1.5 px-5 py-4 font-mono text-[12px] leading-relaxed sm:text-[13px]">
        {done.map((line, i) => (
          <div key={i} className={cn("flex gap-2", KIND_CLASS[line.kind])}>
            {line.kind === "cmd" ? (
              <>
                <span className="text-muted-foreground select-none">$</span>
                <span>{line.text}</span>
              </>
            ) : (
              <>
                <span className="text-muted-foreground/50 select-none">│</span>
                <span>{line.text}</span>
              </>
            )}
          </div>
        ))}
        {/* Active line */}
        <div className={cn("flex gap-2", KIND_CLASS[activeKind])}>
          {activeKind === "cmd" ? (
            <span className="text-muted-foreground select-none">$</span>
          ) : (
            <span className="text-muted-foreground/50 select-none">│</span>
          )}
          <span>
            {renderedActive}
            <span className="bg-foreground/80 ml-0.5 inline-block h-3.5 w-[7px] animate-pulse align-middle" />
          </span>
        </div>
      </div>

      <RouteStrip />
    </div>
  );
}
