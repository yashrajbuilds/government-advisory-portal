import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, AlertTriangle, Building2 } from "lucide-react";
import { PageShell } from "../components/portal/PageShell";
import { IndiaInteractiveMap, STATE_PINS } from "../components/map/IndiaInteractiveMap";
import { useApp } from "../context/AppContext";

export const Route = createFileRoute("/states")({
  head: () => ({
    meta: [
      { title: "States Dashboard — Government Advisory Portal" },
      {
        name: "description",
        content:
          "Explore advisories, departments and active alerts across every state of India on an interactive map.",
      },
      { property: "og:title", content: "Explore States — Government Advisory Portal" },
      {
        property: "og:description",
        content: "Interactive India map with state-level advisories and emergency alerts.",
      },
    ],
  }),
  component: StatesPage,
});

function StatesPage() {
  const { advisories, alerts, departments } = useApp();

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
            National coverage
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore Advisories by State
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            An interactive map of India — hover or click a state to view live advisory counts,
            active emergency alerts, and department contacts.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <IndiaInteractiveMap />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">All States</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Quick links to every state covered by the portal.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STATE_PINS.map(({ state }) => {
            const a = advisories.filter((x) => x.state === state).length;
            const al = alerts.filter((x) => x.region === state).length;
            const d = departments.filter((x) => x.state === state).length;
            return (
              <Link
                key={state}
                to="/advisories"
                className="glass-card group flex flex-col gap-3 rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-foreground group-hover:text-primary">
                    {state}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <Tile icon={FileText} label="Adv" value={a} />
                  <Tile
                    icon={AlertTriangle}
                    label="Alerts"
                    value={al}
                    tone={al > 0 ? "danger" : "default"}
                  />
                  <Tile icon={Building2} label="Depts" value={d} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

function Tile({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: typeof FileText;
  label: string;
  value: number;
  tone?: "default" | "danger";
}) {
  return (
    <div
      className={`rounded-md border px-2 py-1.5 ${tone === "danger" ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"}`}
    >
      <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className={`h-3 w-3 ${tone === "danger" ? "text-destructive" : "text-primary"}`} />{" "}
        {label}
      </div>
      <div className="text-base font-bold tabular-nums text-foreground">{value}</div>
    </div>
  );
}
