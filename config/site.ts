export const siteConfig = {
  name: "OnionCall",
  url: "https://onionphone.app",
  getStartedUrl: "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases",
  // Static fallbacks used ONLY when the GitLab Releases API is unreachable
  // (see lib/releases.ts — the live API keeps these in sync automatically,
  // so you never need to edit this file when a new release is tagged).
  downloads: {
    linux: "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/onioncall_2.0.10_Linux_x86_64.tar.gz",
    windows: "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/onioncall_2.0.10_Windows_x86_64.zip",
    installer:
      "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/onioncall-installer_2.0.10_Linux_x86_64.tar.gz",
    deb: "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/OnionCall_2.0.10_amd64.deb",
    appimage:
      "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/OnionCall_2.0.10_amd64.AppImage",
    checksums:
      "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/checksums.txt",
  },
  ogImage: "/og.jpg",
  description:
    "Secure, anonymous P2P voice communication over the Tor network. No servers, no logs, no metadata.",
  version: "v2.0.10",
  links: {
    twitter: "https://twitter.com/",
    github: "https://gitlab.com/kumaranubhav20026/terminalphone",
    email: "mailto:hello@onionphone.app",
  },
  stats: {
    github: 0,
    updated: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  },
};

export type SiteConfig = typeof siteConfig;
