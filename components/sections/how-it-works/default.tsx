import { Globe, KeyRound, Mic, QrCode } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section } from "../../ui/section";

interface Step {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    title: "Pair once",
    description:
      "Show a QR code and speak one password aloud. Your peer scans and adopts your shared secret — the code is useless without the words.",
    detail: "password-protected QR",
    icon: QrCode,
  },
  {
    title: "Go online",
    description:
      "OnionCall manages its own Tor process and hands you a private .onion address. No sign-up, no phone number, no server.",
    detail: "managed hidden service",
    icon: Globe,
  },
  {
    title: "Connect",
    description:
      "Dial your peer's onion address. Both sides prove the shared secret, then mint an encryption key that exists for this call only.",
    detail: "X25519 · forward-secret handshake",
    icon: KeyRound,
  },
  {
    title: "Talk",
    description:
      "Hold to talk, release to listen. Voice frames and chat are sealed end-to-end before they ever touch the Tor network.",
    detail: "XChaCha20-Poly1305 AEAD",
    icon: Mic,
  },
];

function Node({
  step,
  index,
  className,
}: {
  step: Step;
  index: number;
  className?: string;
}) {
  const Icon = step.icon;
  return (
    <div className={cn("relative z-10 flex", className)}>
      <div
        className={cn(
          "bg-card ring-border relative flex size-14 shrink-0 items-center justify-center rounded-full ring-1 sm:size-16",
          "shadow-[0_0_0_6px_var(--background)]"
        )}
      >
        <Icon className="text-brand size-6 stroke-1.5" />
        <span className="bg-brand text-brand-foreground absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
          {index + 1}
        </span>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <Section className="overflow-hidden" id="how-it-works">
      <div className="max-w-container mx-auto flex flex-col items-center gap-4 sm:gap-6">
        <h2 className="max-w-[600px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          Private call in four steps
        </h2>
        <p className="text-muted-foreground max-w-[520px] text-center text-balance sm:text-lg">
          No accounts, no servers, nothing to configure. Pair with the person
          you trust and OnionCall handles the cryptography.
        </p>

        {/* Desktop: connected horizontal flow */}
        <ol className="mt-10 hidden w-full grid-cols-4 gap-6 lg:grid">
          {/* connector line behind node centers */}
          <div
            aria-hidden
            className="absolute top-8 right-[12.5%] left-[12.5%] h-px bg-gradient-to-r from-border via-primary/40 to-border"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          />
          {STEPS.map((step, i) => {
            return (
              <li
                key={step.title}
                className={cn(
                  "animate-appear relative flex flex-col items-start gap-4 opacity-0",
                  i === 0 && "delay-0",
                  i === 1 && "delay-200",
                  i === 2 && "delay-400",
                  i === 3 && "delay-600"
                )}
              >
                <Node step={step} index={i} className="mx-auto" />
                <div className="flex flex-col items-center gap-2 text-center">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground max-w-[260px] text-sm leading-relaxed text-pretty">
                    {step.description}
                  </p>
                  <code className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-[11px]">
                    {step.detail}
                  </code>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Mobile: vertical timeline */}
        <ol className="relative mt-8 flex w-full max-w-md flex-col lg:hidden">
          <div
            aria-hidden
            className="from-brand/50 absolute top-4 bottom-4 left-7 w-px bg-gradient-to-b to-transparent"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="animate-appear relative pb-10 pl-16 opacity-0 last:pb-0">
              <div className="absolute top-0 left-0">
                <Node step={step} index={i} />
              </div>
              <h3 className="pt-1 font-semibold">{step.title}</h3>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed text-pretty">
                {step.description}
              </p>
              <code className="bg-muted text-muted-foreground mt-2 inline-block rounded-full px-2.5 py-1 text-[11px]">
                {step.detail}
              </code>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
