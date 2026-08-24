import {
  ArrowRight,
  FileText,
  Gauge,
  KeyRound,
  Lock,
  MonitorSmartphone,
  QrCode,
  Radio,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import Footer from "@/components/sections/footer/default";
import Navbar from "@/components/sections/navbar/default";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Changelog",
  description:
    "How OnionCall evolved: the legacy v1 wire protocol and everything that changed in v2.",
};

interface Row {
  area: string;
  v1: string;
  v2: string;
}

const COMPARISON: Row[] = [
  {
    area: "Handshake",
    v1: "Plaintext ID + cipher exchange — any reachable endpoint could connect",
    v2: "Challenge-response with HMAC proof over identities, nonces, and keys",
  },
  {
    area: "Payload encryption",
    v1: "AES-256-CBC, long-term secret as passphrase",
    v2: "XChaCha20-Poly1305 AEAD — tampering fails authentication",
  },
  {
    area: "Key model",
    v1: "One static secret protected every session, forever",
    v2: "Ephemeral X25519 per call — recorded traffic stays sealed if the secret leaks later",
  },
  {
    area: "Replay protection",
    v1: "None",
    v2: "Per-session nonce tracking rejects duplicated frames",
  },
  {
    area: "Audio transport",
    v1: "No sequencing — loss and duplicates were invisible",
    v2: "Authenticated sequence numbers, bounded jitter buffer, gap recovery",
  },
  {
    area: "Observability",
    v1: "None",
    v2: "Live sent/accepted/dropped/played counters, gaps, and jitter depth",
  },
  {
    area: "Local runtime",
    v1: "API listened on all interfaces; startup could kill unknown processes",
    v2: "Loopback-only API, configurable data root, ownership-safe port handling",
  },
];

const RELEASES = [
  {
    tag: "v2.2.0",
    date: "August 2026",
    current: true,
    items: [
      { icon: KeyRound, text: "Authenticated v2 wire protocol with forward-secret X25519 handshakes" },
      { icon: Lock, text: "XChaCha20-Poly1305 payloads with replay protection and type binding" },
      { icon: Radio, text: "Sequenced audio, bounded jitter buffer tuned by Tor A/B (drops 33.8% → 1.2%)" },
      { icon: Gauge, text: "Media metrics in the API and UI; recorded direct + Tor benchmarks" },
      { icon: MonitorSmartphone, text: "UI quality pass: call-state hierarchy, offline states, responsive layout" },
      { icon: ShieldCheck, text: "Loopback-only control API, isolated DATA_DIR, safe Tor process handling" },
    ],
  },
  {
    tag: "v2.1.0",
    date: "August 2026",
    current: false,
    items: [
      { icon: QrCode, text: "Password-protected QR pairing: share, import, and manual secret entry" },
    ],
  },
  {
    tag: "v1 era",
    date: "2025 – early 2026",
    current: false,
    items: [
      { icon: FileText, text: "Bash terminal client, later rewritten as a Go backend with an embedded Svelte UI" },
      { icon: XCircle, text: "Legacy wire format: unauthenticated handshake and AES-256-CBC payloads" },
      { icon: Radio, text: "Push-to-talk over Tor hidden services, relay group mode, Snowflake bridge" },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <Navbar />
      <Section className="pt-16 sm:pt-24">
        <div className="max-w-container mx-auto flex flex-col gap-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge variant="outline" className="border-primary/30 text-primary">
              v1 → v2
            </Badge>
            <h1 className="max-w-[640px] text-4xl font-semibold tracking-tight sm:text-5xl">
              What changed in v2
            </h1>
            <p className="text-muted-foreground max-w-[560px] text-balance sm:text-lg">
              OnionCall v2 is a deliberate breaking change: the legacy wire
              protocol could not be authenticated, so it was replaced rather
              than patched.
            </p>
          </div>

          {/* v1 vs v2 comparison */}
          <div className="overflow-hidden rounded-xl border">
            <div className="grid grid-cols-[1fr_2fr] border-b bg-muted/40 sm:grid-cols-[180px_1fr_1fr]">
              <div className="p-4 text-sm font-semibold sm:p-5">Area</div>
              <div className="text-muted-foreground p-4 text-sm font-semibold sm:p-5">
                v1 (legacy)
              </div>
              <div className="text-primary hidden p-4 text-sm font-semibold sm:block sm:p-5">
                v2 (current)
              </div>
            </div>
            {COMPARISON.map((row) => (
              <div
                key={row.area}
                className="grid grid-cols-[1fr_2fr] border-b last:border-b-0 sm:grid-cols-[180px_1fr_1fr]"
              >
                <div className="p-4 text-sm font-medium sm:p-5">{row.area}</div>
                <div className="text-muted-foreground flex items-start gap-2 p-4 text-sm sm:p-5">
                  <XCircle className="mt-0.5 size-4 shrink-0 text-red-500/70" />
                  <span className="text-pretty">{row.v1}</span>
                </div>
                <div className="flex items-start gap-2 border-t p-4 text-sm sm:border-t-0 sm:p-5">
                  <ShieldCheck className="text-brand mt-0.5 size-4 shrink-0" />
                  <span className="text-pretty">
                    {row.v2}
                    <span className="text-muted-foreground sm:hidden block pt-1">
                      replaces: {row.v1}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Release timeline */}
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Release history
            </h2>
            <ol className="relative flex flex-col gap-10 border-l pl-8">
              {RELEASES.map((rel) => (
                <li key={rel.tag} className="relative">
                  <span
                    className={cn(
                      "absolute top-1 -left-[37px] flex size-4 items-center justify-center rounded-full ring-4 ring-background",
                      rel.current ? "bg-primary" : "bg-muted-foreground/40"
                    )}
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-mono text-lg font-semibold">
                      {rel.tag}
                    </h3>
                    <span className="text-muted-foreground text-sm">
                      {rel.date}
                    </span>
                    {rel.current && (
                      <Badge className="bg-primary text-primary-foreground">
                        Latest
                      </Badge>
                    )}
                  </div>
                  <ul className="mt-4 flex flex-col gap-3">
                    {rel.items.map((item) => (
                      <li key={item.text} className="flex items-start gap-3">
                        <item.icon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                        <span className="text-sm leading-relaxed text-pretty">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl border bg-muted/30 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-muted-foreground max-w-[520px] text-sm text-pretty">
              Curious about the internals? The full security comparison —
              handshake diagrams, payload formats, and threat model — lives in
              the repository docs.
            </p>
            <Link
              href="/docs"
              className="text-primary inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold hover:underline"
            >
              Read the docs <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
