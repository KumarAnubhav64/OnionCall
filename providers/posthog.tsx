"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Only initializes when a key is configured — the landing page stays fully
// functional (and tracker-free) until NEXT_PUBLIC_POSTHOG_KEY is set.
if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (key) {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      // Don't auto-create persons for anonymous visitors — activity is what
      // matters here, not profiles.
      person_profiles: "identified_only",
    });
  }
}

export function PostHogProviderClient({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
