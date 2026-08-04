import { ArrowRightIcon, Download, ExternalLink } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Badge } from "../../ui/badge";
import Glow from "../../ui/glow";
import { LinkButton, type LinkButtonProps } from "../../ui/link-button";
import { Mockup, MockupFrame } from "../../ui/mockup";

import { Section } from "../../ui/section";

interface HeroButtonProps extends Omit<LinkButtonProps, "children"> {
  text: string;
}

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
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
  title = "Speak freely. No one's listening.",
  description = "OnionPhone lets you talk to someone over the internet without anyone else listening in. Your voice travels through the Tor network, scrambled with encryption that only your peer can undo. You get a direct, encrypted line between two devices. No records, no middlemen, no company watching.",
  mockup = (
    <div className="flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 sm:p-12">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-4">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Tor Connected
        </div>
        <div className="text-3xl font-bold text-foreground/80 mb-2">
          your-onion-address.onion
        </div>
        <div className="text-sm text-muted-foreground">
          Share this address with your peer to start a secure call
        </div>
      </div>
    </div>
  ),
  badge = DEFAULT_HERO_BADGE,
  buttons = DEFAULT_HERO_BUTTONS,
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0",
        className,
      )}
    >
      <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {badge !== false && badge}
          <h1 className="animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title}
          </h1>
          <p className="text-md animate-appear text-muted-foreground relative z-10 max-w-[740px] font-medium text-balance opacity-0 delay-100 sm:text-xl">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex justify-center gap-4 opacity-0 delay-300">
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
          )}
          {mockup !== false && (
            <div className="relative w-full pt-12">
              <MockupFrame
                className="animate-appear opacity-0 delay-700"
                size="small"
              >
                <Mockup
                  type="responsive"
                  className="bg-background/90 w-full rounded-xl border-0"
                >
                  {mockup}
                </Mockup>
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
