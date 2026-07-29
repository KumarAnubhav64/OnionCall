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
- Download/Call-to-action links
- Social links (GitLab, email)
- Version number

## Deployment

This is a static Next.js site. Deploy to any static host:

```bash
npm run build
# Output in out/ directory — deploy anywhere
```

For GitHub Pages, set the `NEXT_PUBLIC_BASE_PATH` environment variable to the repo name.

## License

MIT
