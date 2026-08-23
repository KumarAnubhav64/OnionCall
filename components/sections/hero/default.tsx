import {
  ArrowRightIcon,
  Code2,
  Download,
  ExternalLink,
  EyeOff,
  Lock,
  Network,
  QrCode,
  Server,
  ShieldCheck,
} from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { type ReleaseInfo } from "@/lib/releases";
import { cn } from "@/lib/utils";

import { Badge } from "../../ui/badge";
import Glow from "../../ui/glow";
import { LinkButton, type LinkButtonProps } from "../../ui/link-button";
import { Mockup, MockupFrame } from "../../ui/mockup";
import { Section } from "../../ui/section";
import { LiveDownloadButtons, LiveReleaseBadge } from "./live-actions";

interface HeroButtonProps extends Omit<LinkButtonProps, "children"> {
  text: string;
}

interface HeroProps {
  title?: string;
  /** Accent sentence rendered with the brand gradient (second line of the headline). */
  titleAccent?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  /** Latest release tag (e.g. "v2.0.10") — fetched live from GitLab */
  latestVersion?: string;
  /** Live release data — renders the self-updating pill + download buttons */
  release?: ReleaseInfo;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

const DEFAULT_HERO_BUTTONS: HeroButtonProps[] = [
  {
    href: siteConfig.downloads.linux,
    text: "Download for Linux",
    variant: "default",
    icon: <Download className="mr-2 size-4" />,
  },
  {
    href: siteConfig.downloads.windows,
    text: "Download for Windows",
    variant: "glow",
    icon: <ExternalLink className="mr-2 size-4" />,
  },
];

const DEFAULT_HERO_BADGE = (
  <Badge variant="outline" className="animate-appear border-primary/30 text-primary">
    <span className="text-muted-foreground">
      Private calls. No exceptions.
    </span>
    <a href={siteConfig.links.github} className="flex items-center gap-1">
      Learn more on GitLab
      <ArrowRightIcon className="size-3" />
    </a>
  </Badge>
);

export default function Hero({
  title = "Speak freely.",
  titleAccent = "No one's listening.",
  description = "OnionCall gives you a direct, end-to-end encrypted line between two devices over the Tor network. Install the native desktop app (Linux & Windows) or open the web UI in any browser — it starts Tor for you and hands you a .onion address. No servers, no logs, no company watching.",
  mockup = (
    <div className="flex flex-col items-center justify-center gap-8 rounded-lg bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 sm:p-12">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        {/* Your screen — share */}
        <div className="w-full max-w-[220px] rounded-xl border border-primary/20 bg-background/90 p-4 text-center shadow-xl shadow-primary/10">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
            <Lock className="size-3" />
            Encrypted with password
          </div>
          <div className="relative mx-auto mb-3 flex size-28 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1.5 sm:size-32">
            <QrCode className="size-full text-neutral-900" strokeWidth={1} />
            <span className="absolute inset-x-1.5 top-1/2 h-0.5 -translate-y-1/2 animate-pulse rounded-full bg-primary/70 shadow-[0_0_12px_2px] shadow-primary/40" />
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            Show this QR · say the password
          </p>
        </div>

        <ArrowRightIcon className="size-5 shrink-0 rotate-90 text-muted-foreground sm:rotate-0" />

        {/* Peer's screen — scan */}
        <div className="w-full max-w-[220px] rounded-xl border border-emerald-500/25 bg-background/90 p-4 text-center shadow-xl shadow-emerald-500/5">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="size-3" />
            Pairing complete
          </div>
          <div className="mx-auto mb-3 flex size-28 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/5 sm:size-32">
            <ShieldCheck className="size-10 text-emerald-500" strokeWidth={1.5} />
          </div>
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Paired · forward-secret E2EE
          </p>
        </div>
      </div>
      <div className="text-center text-sm font-medium text-muted-foreground">
        One scan + one spoken password = fully paired, no servers involved
      </div>
    </div>
  ),
  badge = DEFAULT_HERO_BADGE,
  latestVersion,
  release,
  buttons = DEFAULT_HERO_BUTTONS,
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "fade-bottom relative overflow-hidden pb-0 sm:pb-0 md:pb-0",
        className,
      )}
    >
      <div className="max-w-container relative mx-auto flex flex-col items-center gap-12 pt-16 text-center sm:gap-14 sm:pt-20 lg:gap-16 lg:pt-24">
        {/* Release pill + badge */}
        <div className="animate-appear relative z-10 flex flex-col items-center gap-4 opacity-0 delay-100">
          {release ? (
            <LiveReleaseBadge initial={release} />
          ) : (
            latestVersion && (
              <a
                href={siteConfig.getStartedUrl}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/10"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Latest release · {latestVersion}
              </a>
            )
          )}
          {badge !== false && badge}
        </div>

        {/* Headline */}
        <h1 className="animate-appear text-5xl leading-tight font-semibold tracking-tight text-balance opacity-0 delay-200 drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-7xl md:leading-[1.05]">
          {title}
          {titleAccent && (
            <span className="from-[#c4b5fd] via-[#a78bfa] to-[#7c3aed] block bg-linear-to-r bg-clip-text text-transparent">
              {titleAccent}
            </span>
          )}
        </h1>

        {/* Description */}
        <p className="animate-appear max-w-2xl text-lg font-medium text-balance text-muted-foreground opacity-0 delay-300 sm:text-xl">
          {description}
        </p>

        {/* CTAs */}
        {release ? (
          <LiveDownloadButtons initial={release} className="justify-center" />
        ) : (
          buttons !== false &&
          buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex flex-wrap items-center justify-center gap-4 opacity-0 delay-400">
              {buttons.map((button) => (
                <LinkButton
                  key={`${button.href}-${button.text}`}
                  variant={button.variant || "default"}
                  size="lg"
                  href={button.href}
                  icon={button.icon}
                  iconRight={button.iconRight}
                >
                  {button.text}
                </LinkButton>
              ))}
            </div>
          )
        )}

        {/* Trust row */}
        <div className="animate-appear flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground opacity-0 delay-500">
          <span className="inline-flex items-center gap-1.5">
            <Server className="size-4 text-primary" />
            No servers
          </span>
          <span className="inline-flex items-center gap-1.5">
            <EyeOff className="size-4 text-primary" />
            No logs
          </span>
          <a
            href={siteConfig.links.github}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Code2 className="size-4 text-primary" />
            Open source
          </a>
        </div>

        {/* Product visual — single glow behind it */}
        {mockup !== false && (
          <div className="relative mx-auto mt-4 w-full max-w-2xl sm:mt-6">
            <Glow
              variant="center"
              className="animate-appear-zoom opacity-0 delay-1000"
            />
            <div className="animate-appear relative z-10 opacity-0 delay-700">
              <MockupFrame size="large">
                <Mockup
                  type="responsive"
                  className="bg-background/90 w-full rounded-xl border-0"
                >
                  {mockup}
                </Mockup>
              </MockupFrame>
              <Badge
                variant="secondary"
                className="animate-appear absolute -left-3 top-10 z-20 gap-1.5 opacity-0 delay-1000"
              >
                <Network className="size-3.5 text-primary" />
                Tor network
              </Badge>
              <Badge
                variant="secondary"
                className="animate-appear absolute -right-3 bottom-12 z-20 gap-1.5 opacity-0 delay-1000"
              >
                <ShieldCheck className="size-3.5 text-emerald-500" />
                XChaCha20-Poly1305
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
