import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import OnionCallLogo from "../../logos/onion-call";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../../ui/footer";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <OnionCallLogo className="size-6 text-primary" />,
  name = "OnionCall",
  columns = [
    {
      title: "Product",
      links: [
        { text: "Features", href: "/#features" },
        { text: "Docs", href: "/docs" },
        { text: "Download", href: siteConfig.getStartedUrl },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Tor Project", href: "https://www.torproject.org/" },
        { text: "GitHub", href: siteConfig.links.github },
        { text: "Opus Codec", href: "https://opus-codec.org/" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "GitHub Issues", href: `${siteConfig.links.github}/issues` },
        { text: "Email", href: siteConfig.links.email },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} OnionCall. Open source.`,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-container mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                {logo}
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
              <p className="text-muted-foreground text-sm mt-2 max-w-xs">
                Secure, anonymous P2P voice communication over the Tor network.
                No servers, no logs, no metadata.
              </p>
            </FooterColumn>
            {columns.map((column) => (
              <FooterColumn key={column.title}>
                <h3 className="text-md pt-1 font-semibold">{column.title}</h3>
                {column.links.map((link) => (
                  <a
                    key={`${link.href}-${link.text}`}
                    href={link.href}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
