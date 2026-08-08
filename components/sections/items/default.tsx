import {
  Globe,
  Lock,
  MessageSquare,
  QrCode,
  Radio,
  Shield,
  Signal,
  Wifi,
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
    description: "Your connection snakes through three Tor relays so your IP stays hidden. Nobody — not even the person you're talking to — can see where you are.",
    icon: <Shield className="size-5 stroke-1" />,
  },
  {
    title: "End-to-End Encryption",
    description: "Every syllable is scrambled before it leaves your device. Your peer's machine unscrambles it. Nobody in between — not your ISP, not Tor relays — hears a thing.",
    icon: <Lock className="size-5 stroke-1" />,
  },
  {
    title: "Push-to-Talk Audio",
    description: "Works like a walkie-talkie. Hold a button to speak, let go to listen. No awkward half-duplex delays — the Opus codec keeps voice crisp even on slow connections.",
    icon: <Radio className="size-5 stroke-1" />,
  },
  {
    title: "True Peer-to-Peer",
    description: "The two devices talk directly through Tor hidden services. There's no central server to log your calls, no company to shut down, and no subscription to cancel.",
    icon: <Wifi className="size-5 stroke-1" />,
  },
  {
    title: "Bypass Censorship",
    description: "Snowflake proxies your connection through volunteers' browsers around the world. It slips past firewalls in countries that block Tor, without needing a VPN.",
    icon: <Signal className="size-5 stroke-1" />,
  },
  {
    title: "Chat Alongside Voice",
    description: "Drop a link or a quick note without interrupting the call. Messages are encrypted with the same key as your voice — everything stays private together.",
    icon: <MessageSquare className="size-5 stroke-1" />,
  },
  {
    title: "QR Code Pairing",
    description: "Show a QR code and say one password aloud. Your peer scans it and types the password to adopt your shared secret — the QR is useless to anyone who doesn't know the password.",
    icon: <QrCode className="size-5 stroke-1" />,
  },
  {
    title: "Desktop App + Web UI",
    description: "A native desktop app for Linux (.deb / AppImage) wraps the same Go backend and web UI — no browser tab required. Prefer the browser? Run it at localhost:8080; the experience is identical.",
    icon: <Globe className="size-5 stroke-1" />,
  },
];

export default function Items({
  title = "Built for conversations that stay between you.",
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
