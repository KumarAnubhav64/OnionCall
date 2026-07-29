export const siteConfig = {
  name: "OnionPhone",
  url: "https://onionphone.app",
  getStartedUrl: "https://github.com/kumar-anubhav/terminalphone/releases",
  ogImage: "/og.jpg",
  description:
    "Secure, anonymous P2P voice communication over the Tor network. No servers, no logs, no metadata.",
  version: "v0.1",
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/kumar-anubhav/terminalphone",
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
