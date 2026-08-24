import { Section } from "../../ui/section";

interface StatItemProps {
  label?: string;
  value: string | number;
  suffix?: string;
  description?: string;
}

interface StatsProps {
  items?: StatItemProps[] | false;
  className?: string;
}

const DEFAULT_STATS: StatItemProps[] = [
  {
    label: "encryption",
    value: "AEAD",
    description: "XChaCha20-Poly1305 sealed",
  },
  {
    label: "secrecy",
    value: "PFS",
    description: "fresh X25519 keys every call",
  },
  {
    label: "delivery",
    value: "100%",
    description: "frames delivered over Tor",
  },
  {
    label: "model",
    value: "P2P",
    description: "zero central servers",
  },
];

export default function Stats({
  items = DEFAULT_STATS,
  className,
}: StatsProps) {
  return (
    <Section className={className}>
      <div className="container mx-auto max-w-[960px]">
        {items !== false && items.length > 0 && (
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
            {items.map((item) => (
              <div
                key={`${item.label}-${item.description}`}
                className="flex min-w-0 flex-col items-start gap-3 text-left"
              >
                {item.label && (
                  <div className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
                    {item.label}
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <div className="from-foreground to-foreground dark:to-brand bg-linear-to-r bg-clip-text text-3xl font-medium break-words text-transparent sm:text-5xl md:text-6xl drop-shadow-[2px_1px_24px_var(--brand-foreground)] transition-all duration-300 sm:text-5xl md:text-6xl">
                    {item.value}
                  </div>
                  {item.suffix && (
                    <div className="text-brand text-2xl font-semibold">
                      {item.suffix}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div className="text-muted-foreground text-sm font-semibold text-pretty">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
