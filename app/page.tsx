import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Items from "../components/sections/items/default";
import Navbar from "../components/sections/navbar/default";
import Stats from "../components/sections/stats/default";
import { LayoutLines } from "../components/ui/layout-lines";
import { getLatestRelease } from "../lib/releases";

export default async function Home() {
  // Fetches the latest release (tag + download URLs) from the GitLab API.
  // Falls back to config/site.ts if the API is unreachable.
  const release = await getLatestRelease();

  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <LayoutLines />
      <Navbar />
      <Hero release={release} />
      <Items />
      <Stats />
      <FAQ />
      <CTA />
      <Footer version={release.version} />
    </main>
  );
}
