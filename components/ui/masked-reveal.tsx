"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * MaskedReveal — words rise out of an overflow mask when scrolled into view
 * (IntersectionObserver + CSS transition; no animation dependency).
 * Supports "\n" for hard line breaks.
 */
export default function MaskedReveal({
  text,
  className,
  as: Tag = "h2",
  stagger = 45,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let wordIndex = 0;
  const lines = text.split("\n");

  return (
    // @ts-expect-error -- dynamic tag with a shared ref type
    <Tag ref={ref} className={cn(className)} aria-label={text}>
      {lines.map((line, li) => (
        <span key={li}>
          {line.split(" ").map((word, wi) => {
            const delay = wordIndex++ * stagger;
            return (
              <span
                key={wi}
                className="inline-block overflow-hidden align-bottom pb-[0.12em]"
              >
                <span
                  className="inline-block will-change-transform"
                  style={{
                    transform: shown ? "translateY(0)" : "translateY(110%)",
                    transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {word}
                  {wi < line.split(" ").length - 1 ? "\u00A0" : ""}
                </span>
              </span>
            );
          })}
          {li < lines.length - 1 && <br />}
        </span>
      ))}
    </Tag>
  );
}
