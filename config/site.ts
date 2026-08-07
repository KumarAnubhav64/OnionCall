export const siteConfig = {
  name: "OnionPhone",
  url: "https://onionphone.app",
  getStartedUrl: "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases",
  // Direct downloads for the latest release's binaries (published by the
  // GoReleaser pipeline in terminalphone/.gitlab-ci.yml).
  downloads: {
    linux: "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/onioncall_2.0.6_Linux_x86_64.tar.gz",
    windows: "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/onioncall_2.0.6_Windows_x86_64.zip",
    installer:
      "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases/permalink/latest/downloads/onioncall-installer_2.0.6_Linux_x86_64.tar.gz",
  },
  ogImage: "/og.jpg",
  description:
    "Secure, anonymous P2P voice communication over the Tor network. No servers, no logs, no metadata.",
  version: "v2.0.6",
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
