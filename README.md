# OnionCall — Landing Page

**Secure, anonymous P2P voice communication over the Tor network.**

This is the official landing page for [OnionCall](https://gitlab.com/kumaranubhav20026/terminalphone), an encrypted push-to-talk voice communication tool that routes calls through Tor hidden services.

Built with Next.js 16, Tailwind CSS v4, and shadcn/ui.

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # → Production build
npm run start      # → Serve production build
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui components
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
├── app/
│   ├── page.tsx          # Home page (Hero, Features, FAQ, CTA, Footer)
│   ├── layout.tsx        # Root layout with metadata, fonts, dark mode
│   └── docs/page.tsx     # Full documentation page
├── components/
│   ├── logos/            # OnionPhone logo component (PNG-based)
│   ├── sections/         # Page sections: hero, items, stats, faq, cta, footer, navbar
│   └── ui/               # Reusable UI primitives (button, card, badge, etc.)
├── config/
│   └── site.ts           # Site configuration (URLs, links, metadata)
├── public/
│   ├── logo.png          # OnionPhone logo
│   ├── og.jpg            # Open Graph image
│   └── dashboard-*.png   # Screenshots
└── styles/
    └── utils.css         # Tailwind utility classes
```

## Configuration

Edit `config/site.ts` to update:

- Site name and URL
- Social links (GitLab, email)
- Static fallback version and download URLs

## Release auto-sync (no more manual version bumps)

The landing page fetches the **latest release live from the GitLab Releases API**
(`lib/releases.ts` → `GET /api/v4/projects/kumaranubhav20026%2Fterminalphone/releases/permalink/latest`):

- The **version badge** (hero + footer), the **download buttons**, and the
  **install commands in the docs page** all derive from the latest tag and its
  asset links — push a new `v*` tag and they update themselves.
- **Node/Vercel deployments**: the API response is cached with ISR
  (`revalidate: 3600`), so the page refreshes within an hour of a new release —
  no rebuild needed.
- **Static deployments (GitHub Pages, etc.)**: the hero pill and download
  buttons re-check the API in the browser on every load, so they always show
  the newest tag even though the page itself is pre-rendered.
- If the API is unreachable (offline build, GitLab down), `config/site.ts` is
  used as a static fallback so the page never breaks.

## Deployment

This is a static Next.js site. Deploy to any static host:

```bash
npm run build
# Output in out/ directory — deploy anywhere
```

For GitHub Pages, set the `NEXT_PUBLIC_BASE_PATH` environment variable to the repo name.

## License

MIT
