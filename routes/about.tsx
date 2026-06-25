import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portal/PageShell";
import { ShieldCheck, Target, Eye, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Government Advisory Portal" },
      {
        name: "description",
        content:
          "Learn about the Government Advisory Portal — its mission, the ministries it serves, and how it keeps citizens informed.",
      },
      { property: "og:title", content: "About — Government Advisory Portal" },
      {
        property: "og:description",
        content: "The mission and purpose of the Government Advisory Portal.",
      },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    icon: Target,
    title: "Mission",
    body: "Deliver timely, trustworthy advisories to every citizen, regardless of region or device.",
  },
  {
    icon: Eye,
    title: "Vision",
    body: "A single, authoritative source for public notices issued by government ministries and departments.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    body: "Each advisory is attributed to its issuing department with the date of issue clearly listed.",
  },
  {
    icon: Users,
    title: "Reach",
    body: "Designed for accessibility on mobile, tablet and desktop with a clean, distraction-free interface.",
  },
];

function AboutPage() {
  return (
    <PageShell>
      <section className="hero-gradient text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
            About the portal
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            A single, authoritative source for official public advisories.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/85">
            The Government Advisory Portal consolidates notices and updates from ministries and
            departments so that citizens can stay informed quickly and reliably.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass-card rounded-xl p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="glass-card rounded-xl p-8 sm:p-10">
          <h2 className="text-xl font-bold text-foreground">How the portal works</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-foreground/90">
            <p>
              Advisories are categorised across six domains — Health, Weather, Agriculture,
              Education, Cyber Security and Defence — and tagged with the issuing department and
              date.
            </p>
            <p>
              Citizens can search by keyword, filter by category, and open any advisory to read the
              full text along with related advisories in the same domain.
            </p>
            <p>
              This is a demonstration frontend designed for clarity, accessibility and
              responsiveness across mobile, tablet and desktop devices.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
