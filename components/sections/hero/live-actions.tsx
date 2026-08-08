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

// The two live components below re-check the GitLab Releases API on mount so
// long-lived static deployments still show the newest tag. They share a single
// module-level request, so only one API call is made per page load.

let latestRequest: Promise<ReleaseInfo | null> | null = null;

function fetchLatestRelease(): Promise<ReleaseInfo | null> {
  if (!latestRequest) {
    latestRequest = fetch(GITLAB_LATEST_RELEASE_API, {
      headers: { Accept: "application/json" },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => (data ? parseGitLabReleasePayload(data) : null))
      .catch(() => {
        // Allow a later mount to retry on any network hiccup.
        latestRequest = null;
        return null;
      });
  }
  return latestRequest;
}

/** Shared live-release state, seeded with the server-rendered release. */
function useLiveRelease(initial: ReleaseInfo): ReleaseInfo {
  const [release, setRelease] = useState(initial);

  useEffect(() => {
    let cancelled = false;

    fetchLatestRelease().then((latest) => {
      // Allow the next mount (e.g. SPA navigation back) to re-validate.
      latestRequest = null;
      if (cancelled || !latest) return;
      const newer = latest.version !== release.version || release.source !== "api";
      if (newer) setRelease(latest);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return release;
}

interface LiveReleaseProps {
  /** Release info server-rendered at build/ISR time — shown immediately. */
  initial: ReleaseInfo;
}

/**
 * "Latest release · v2.x.y" pill. Re-checks the GitLab Releases API on mount
 * and silently swaps in a newer tag if one exists — so the landing page always
 * shows the latest release, even on long-lived static deployments.
 */
export function LiveReleaseBadge({ initial }: LiveReleaseProps) {
  const release = useLiveRelease(initial);

  return (
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
  );
}

/**
 * Primary download buttons. Reads the same live release as the badge, so the
 * links always point at the newest published assets.
 */
export function LiveDownloadButtons({ initial }: LiveReleaseProps) {
  const release = useLiveRelease(initial);

  return (
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
  );
}
