import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portal/PageShell";
import { Hero } from "../components/portal/Hero";
import { FeaturedAdvisories } from "../components/portal/FeaturedAdvisories";
import { Stats } from "../components/portal/Stats";
import { Categories } from "../components/portal/Categories";
import { LatestAdvisories } from "../components/portal/LatestAdvisories";
import { RecentlyViewed } from "../components/portal/RecentlyViewed";
import { CTA } from "../components/portal/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Government Advisory Portal — Official Public Notices & Updates" },
      {
        name: "description",
        content:
          "Stay informed with official government advisories, public notices and important updates across health, weather, agriculture, education, cyber security and defence.",
      },
      { property: "og:title", content: "Government Advisory Portal" },
      {
        property: "og:description",
        content:
          "Official advisories, notices and updates from government ministries and departments.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Stats />
      <FeaturedAdvisories />
      <Categories />
      <LatestAdvisories />
      <RecentlyViewed compact />
      <CTA />
    </PageShell>
  );
}
