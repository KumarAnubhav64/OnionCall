import { ReactNode } from "react";

import { siteConfig } from "@/config/site";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

export default function FAQ({
  title = "Frequently Asked Questions",
  items = [
    {
      question: "How does OnionCall protect my privacy?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            OnionCall routes all traffic through the Tor network, which encrypts
            your data in multiple layers and bounces it through three volunteer-operated
            relays. Your IP address is never revealed to your peer, and no central
            server logs your calls.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
            On top of Tor, both peers run an authenticated handshake: they prove
            knowledge of your shared secret, then agree a brand-new ephemeral
            X25519 key for that call. Audio and text are sealed with
            XChaCha20-Poly1305 under that per-call key and protected against
            replays — so even if the shared secret ever leaked later, recorded
            calls stay unreadable.
          </p>
        </>
      ),
    },
    {
      question: "How do I pair with a friend?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[600px]">
            On the Dashboard, open the &ldquo;Pair with a Peer&rdquo; card and hit
            Generate. A QR code appears containing your onion address and a freshly
            generated shared secret — encrypted with a password only you know.
            Tell your friend that password out loud, over the phone, or in person;
            never send it inside the QR itself.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[600px]">
            Your friend uploads a photo of the QR code and types the password.
            OnionCall decrypts it, adopts the same secret, and offers a one-click
            call. Even if someone photographs the QR, it&apos;s useless without the
            password. Prefer keyboards? You can also type the shared secret in
            manually.
          </p>
        </>
      ),
    },
    {
      question: "Do I need to install Tor separately?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[600px]">
            No. OnionCall bundles and manages its own Tor process. When you launch
            the app, it automatically starts Tor, creates a hidden service (onion
            service), and generates your unique .onion address. Everything is handled
            for you.
          </p>
        </>
      ),
    },
    {
      question: "Can I use OnionCall without the Tor network?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Yes, OnionCall also supports a direct TCP mode for testing on local
            networks without Tor. However, for actual private communications, Tor
            mode is strongly recommended to protect your identity and location.
          </p>
        </>
      ),
    },
    {
      question: "Is the audio quality good?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            OnionCall uses the Opus audio codec, which delivers excellent voice
            quality even at low bitrates. The push-to-talk (PTT) model ensures
            efficient bandwidth usage — audio is only transmitted when you hold
            the talk button.
          </p>
        </>
      ),
    },
    {
      question: "Can I use it behind a firewall or in a restricted country?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Yes. OnionCall supports Tor Snowflake, a pluggable transport that
            helps bypass censorship. Snowflake proxies your connection through
            volunteer browsers, making it difficult for firewalls to block.
          </p>
        </>
      ),
    },
    {
      question: "Is there a desktop app?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Yes. OnionCall ships a native desktop app for Linux (the .deb and AppImage
            packages, built with Tauri) that wraps the same Go backend and web UI in a
            real window. Portable binaries are also available for Linux and Windows —
            everything is published together on each release page.
          </p>
        </>
      ),
    },
    {
      question: "Is OnionCall free and open source?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[580px]">
            Yes, OnionCall is completely free and open source under the MIT license.
            You can view, modify, and distribute the source code on{" "}
            <a
              href={siteConfig.links.github}
              className="underline underline-offset-2"
            >
              GitLab
            </a>
            .
          </p>
        </>
      ),
    },
  ],
  className,
}: FAQProps) {
  return (
    <Section className={className} id="faq">
      <div className="max-w-container mx-auto flex flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {items.map((item, index) => (
              <AccordionItem
                key={item.value ?? item.question}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
