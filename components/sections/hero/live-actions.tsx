"use client";

import { Download, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import {
  GITLAB_LATEST_RELEASE_API,
  parseGitLabReleasePayload,
  type ReleaseInfo,
} from "@/lib/releases";

import { LinkButton } from "../../ui/link-button";

interface LiveActionsProps {
  /** Release info server-rendered at build/ISR time — shown immediately. */
  initial: ReleaseInfo;
}

/**
 * Renders the "Latest release" pill and the primary download buttons, seeded
 * with the server-rendered release. On mount it re-checks the GitLab Releases
 * API and silently swaps in a newer tag if one exists — so the landing page
 * always shows the latest release, even on long-lived static deployments.
 */
export function LiveActions({ initial }: LiveActionsProps) {
  const [release, setRelease] = useState(initial);

  useEffect(() => {
    let cancelled = false;

    fetch(GITLAB_LATEST_RELEASE_API, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const latest = parseGitLabReleasePayload(data);
        const newer = latest.version !== release.version || release.source !== "api";
        if (newer) setRelease(latest);
      })
      .catch(() => {
        // Keep the server-rendered release on any network hiccup.
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <a
        href={siteConfig.getStartedUrl}
        className="animate-appear inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary opacity-0 delay-100 transition-colors hover:border-primary/40 hover:bg-primary/10"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        Latest release · {release.version}
      </a>
      <div className="animate-appear relative z-10 flex justify-center gap-4 opacity-0 delay-300">
        <LinkButton
          href={release.downloads.deb || release.downloads.linux}
          size="lg"
          variant="default"
          icon={<Download className="mr-2 size-4" />}
        >
          Download for Linux
        </LinkButton>
        <LinkButton
          href={release.downloads.windows}
          size="lg"
          variant="glow"
          icon={<ExternalLink className="mr-2 size-4" />}
        >
          Download for Windows
        </LinkButton>
      </div>
    </>
  );
}
