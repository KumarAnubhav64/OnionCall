import {
  Shield,
  Radio,
  Lock,
  Wifi,
  Signal,
  Globe,
  Server,
  MessageSquare,
} from "lucide-react";
import { ReactNode } from "react";

import { Item, ItemDescription, ItemIcon, ItemTitle } from "../../ui/item";
import { Section } from "../../ui/section";

interface ItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ItemsProps {
  title?: string;
  items?: ItemProps[] | false;
  className?: string;
}

const DEFAULT_ITEMS: ItemProps[] = [
  {
    title: "Tor-Powered Privacy",
    description: "All traffic routes through the Tor network. No IP leaks, no metadata, no trackers.",
    icon: <Shield className="size-5 stroke-1" />,
  },
  {
    title: "End-to-End Encryption",
    description: "Every voice packet is encrypted with NaCl secretbox. Only your peer can decrypt.",
    icon: <Lock className="size-5 stroke-1" />,
  },
  {
    title: "Push-to-Talk Audio",
    description: "Walkie-talkie style PTT with Opus codec. Hold to talk, release to listen.",
    icon: <Radio className="size-5 stroke-1" />,
  },
  {
    title: "P2P, No Servers",
    description: "Direct peer-to-peer connections over Tor hidden services. No central server, no logs.",
    icon: <Wifi className="size-5 stroke-1" />,
  },
  {
    title: "Tor Snowflake Support",
    description: "Built-in pluggable transport to bypass censorship and firewalls in restricted regions.",
    icon: <Signal className="size-5 stroke-1" />,
  },
  {
    title: "Text Messaging",
    description: "Send encrypted text messages alongside voice. Perfect for quick replies.",
    icon: <MessageSquare className="size-5 stroke-1" />,
  },
  {
    title: "Self-Hosted Relay",
    description: "Optionally run a relay to help others connect when direct P2P isn't possible.",
    icon: <Server className="size-5 stroke-1" />,
  },
  {
    title: "Cross-Platform",
    description: "Works on Linux and macOS. Run it on a server, laptop, or Raspberry Pi.",
    icon: <Globe className="size-5 stroke-1" />,
  },
];

export default function Items({
  title = "Everything you need for private communication.",
  items = DEFAULT_ITEMS,
  className,
}: ItemsProps) {
  return (
    <Section className={className} id="features">
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20">
        <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <div className="grid auto-rows-fr grid-cols-2 gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {items.map((item) => (
              <Item key={item.title}>
                <ItemTitle className="flex items-center gap-2">
                  <ItemIcon>{item.icon}</ItemIcon>
                  {item.title}
                </ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </Item>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
