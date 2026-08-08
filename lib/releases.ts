// lib/releases.ts
//
// Fetches the latest OnionCall release from the GitLab Releases API so the
// landing page never needs a manual version bump again. Every download button,
// version badge, and install command is derived from the live "latest" release.
//
// Two layers keep it current on any host:
//  1. Server-side ISR — `getLatestRelease()` caches the API response with
//     `revalidate: 3600`, so Node/Vercel deployments refresh themselves
//     within an hour of a new tag, with no rebuild.
//  2. Client-side revalidation — the hero buttons/badge re-check the API on
//     mount, so even long-lived static deployments (GitHub Pages, etc.) show
//     the newest tag without a rebuild.
//
// If the API is unreachable, everything falls back to the static values in
// config/site.ts so the page never breaks.

import { siteConfig } from "@/config/site";

export const GITLAB_PROJECT_URL = "https://gitlab.com/kumaranubhav20026/terminalphone";

/**
 * GitLab Releases API "permalink/latest" endpoint. Redirects to the newest
 * release regardless of tag, so this URL never needs updating either.
 */
export const GITLAB_LATEST_RELEASE_API =
  "https://gitlab.com/api/v4/projects/kumaranubhav20026%2Fterminalphone/releases/permalink/latest";

export interface ReleaseDownloads {
  /** Portable Linux binary archive (tar.gz) */
  linux: string;
  /** Portable Windows binary archive (zip) */
  windows: string;
  /** Linux dependency installer archive */
  installer: string;
  /** Native desktop app (.deb) */
  deb: string;
  /** Native desktop app (.AppImage) */
  appimage: string;
  /** SHA-256 checksums */
  checksums: string;
}

export interface ReleaseInfo {
  /** Latest release tag, e.g. "v2.0.10" */
  version: string;
  /** Direct link to the latest release page */
  releaseUrl: string;
  downloads: ReleaseDownloads;
  /** Whether the info came from the live API or the static fallback */
  source: "api" | "fallback";
}

interface GitLabAssetLink {
  name?: string;
  url?: string;
  direct_asset_url?: string;
}

interface GitLabReleaseResponse {
  tag_name?: string;
  assets?: {
    links?: GitLabAssetLink[];
  };
}

// Asset name patterns for the files GoReleaser + the desktop CI job publish.
// NOTE: "onioncall-installer_..." must NOT match the `linux` pattern — the
// installer name uses a hyphen after "onioncall", while the regex requires an
// underscore followed by a digit.
const LINUX_RE = /^onioncall_\d.*_Linux_x86_64\.tar\.gz$/;
const WINDOWS_RE = /^onioncall_\d.*_Windows_x86_64\.zip$/;
const INSTALLER_RE = /^onioncall-installer_\d.*\.tar\.gz$/;
const DEB_RE = /\.deb$/i;
const APPIMAGE_RE = /\.AppImage$/i;
const CHECKSUMS_RE = /^checksums\.txt$/i;

function findLink(
  links: GitLabAssetLink[],
  namePattern: RegExp,
): string | undefined {
  const match = links.find((link) => link.name && namePattern.test(link.name));
  return match?.direct_asset_url ?? match?.url ?? undefined;
}

/** Static fallback — used only when the GitLab API cannot be reached. */
export function fallbackRelease(): ReleaseInfo {
  return {
    version: siteConfig.version,
    releaseUrl: siteConfig.getStartedUrl,
    downloads: siteConfig.downloads,
    source: "fallback",
  };
}

/**
 * Pure parser for the GitLab Releases API response — shared by the server-side
 * fetch (getLatestRelease) and the client-side revalidation (hero). Unknown or
 * missing fields fall back to the static siteConfig values.
 */
export function parseGitLabReleasePayload(data: unknown): ReleaseInfo {
  const payload = (data ?? {}) as GitLabReleaseResponse;
  const links = payload.assets?.links ?? [];
  const version = payload.tag_name ?? siteConfig.version;

  return {
    version,
    releaseUrl: `${GITLAB_PROJECT_URL}/-/releases/${encodeURIComponent(version)}`,
    downloads: {
      linux: findLink(links, LINUX_RE) ?? siteConfig.downloads.linux,
      windows: findLink(links, WINDOWS_RE) ?? siteConfig.downloads.windows,
      installer: findLink(links, INSTALLER_RE) ?? siteConfig.downloads.installer,
      deb: findLink(links, DEB_RE) ?? siteConfig.downloads.deb,
      appimage: findLink(links, APPIMAGE_RE) ?? siteConfig.downloads.appimage,
      checksums: findLink(links, CHECKSUMS_RE) ?? siteConfig.downloads.checksums,
    },
    source: "api",
  };
}

export async function getLatestRelease(): Promise<ReleaseInfo> {
  try {
    const res = await fetch(GITLAB_LATEST_RELEASE_API, {
      // Cache for an hour; ISR revalidates after each re-release.
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`GitLab releases API responded with ${res.status}`);
    }
    const data: unknown = await res.json();
    return parseGitLabReleasePayload(data);
  } catch (error) {
    console.warn(
      "[releases] GitLab API unavailable, using static fallback:",
      error instanceof Error ? error.message : error,
    );
    return fallbackRelease();
  }
}
