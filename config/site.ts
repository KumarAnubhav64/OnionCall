export const siteConfig = {
  name: "OnionPhone",
  url: "https://onionphone.app",
  getStartedUrl: "https://gitlab.com/kumaranubhav20026/terminalphone/-/releases",
  ogImage: "/og.jpg",
  description:
    "Secure, anonymous P2P voice communication over the Tor network. No servers, no logs, no metadata.",
  version: "v0.1",
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
