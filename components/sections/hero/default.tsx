import {
  ArrowRightIcon,
  Code2,
  Download,
  ExternalLink,
  EyeOff,
  Network,
  Server,
  ShieldCheck,
} from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { type ReleaseInfo } from "@/lib/releases";
import { cn } from "@/lib/utils";

import { Badge } from "../../ui/badge";
import ThreeUIArc from "../../ui/threeui-arc";
import { LinkButton, type LinkButtonProps } from "../../ui/link-button";
import { Mockup, MockupFrame } from "../../ui/mockup";
import { Section } from "../../ui/section";
import { LiveDownloadButtons, LiveReleaseBadge } from "./live-actions";
import TerminalDemo from "./terminal-demo";

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
  description = "A direct, forward-secret encrypted line between two devices, routed through the Tor network. It manages Tor for you and hands you a .onion address — no servers, no accounts, no one in the middle.",
  mockup = <TerminalDemo />,
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
      {/* Predictive-arc background: pixel dome + sweeping light + luminous core */}
      <div className="absolute inset-0" aria-hidden>
        <ThreeUIArc className="h-full w-full opacity-80 [mask-image:linear-gradient(to_bottom,transparent_0%,black_26%,black_70%,transparent_100%)]" />
      </div>
      <div className="max-w-container relative z-10 mx-auto flex flex-col items-center gap-12 pt-16 text-center sm:gap-14 sm:pt-20 lg:gap-16 lg:pt-24">
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
