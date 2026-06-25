import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Megaphone, Flag } from "lucide-react";
import { PageShell } from "../components/portal/PageShell";
import { useApp, type AlertSeverity } from "../context/AppContext";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Emergency Alert Centre — Government Advisory Portal" },
      {
        name: "description",
        content:
          "Active national emergency alerts, important advisories and public safety notices.",
      },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const { alerts, advisories } = useApp();
  const important = advisories.filter((a) => a.status === "Important").slice(0, 6);
  const national = advisories.filter((a) => a.state === "All India").slice(0, 6);

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-destructive">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-destructive" />
            Emergency Alert Centre
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Active National Alerts
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Real-time emergency notifications issued by national agencies. Citizens are advised to
            follow the guidance from the respective local authorities.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader title="Emergency alerts" kicker="Live" icon={AlertTriangle} />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {alerts.map((a) => (
            <AlertCard
              key={a.id}
              title={a.title}
              body={a.summary}
              region={a.region}
              issuedBy={a.issuedBy}
              date={a.date}
              severity={a.severity}
            />
          ))}
          {alerts.length === 0 && (
            <div className="glass-card col-span-full rounded-xl p-8 text-center text-sm text-muted-foreground">
              No active emergencies right now.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionHeader title="Important advisories" kicker="Priority" icon={Megaphone} />
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {important.map((a) => (
            <AlertCard
              key={a.id}
              title={a.title}
              body={a.description}
              region={a.state}
              issuedBy={a.department}
              date={a.date}
              severity="high"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeader title="National notices" kicker="All India" icon={Flag} />
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {national.map((a) => (
            <AlertCard
              key={a.id}
              title={a.title}
              body={a.description}
              region={a.state}
              issuedBy={a.department}
              date={a.date}
              severity="moderate"
            />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function SectionHeader({
  title,
  kicker,
  icon: Icon,
}: {
  title: string;
  kicker: string;
  icon: typeof AlertTriangle;
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">{kicker}</p>
        <h2 className="mt-1 inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
          <Icon className="h-5 w-5 text-primary" /> {title}
        </h2>
      </div>
    </div>
  );
}

function AlertCard({
  title,
  body,
  region,
  issuedBy,
  date,
  severity,
}: {
  title: string;
  body: string;
  region: string;
  issuedBy: string;
  date: string;
  severity: AlertSeverity;
}) {
  const styles = {
    critical: {
      border: "border-destructive/40",
      bg: "bg-destructive/[0.06]",
      pill: "bg-destructive text-destructive-foreground",
      label: "Critical",
    },
    high: {
      border: "border-orange-500/40",
      bg: "bg-orange-500/[0.06]",
      pill: "bg-orange-500 text-white",
      label: "High",
    },
    moderate: {
      border: "border-yellow-400/50",
      bg: "bg-yellow-400/[0.08]",
      pill: "bg-yellow-400 text-yellow-950",
      label: "Moderate",
    },
  }[severity];
  return (
    <article className={`glass-card rounded-xl border-l-4 ${styles.border} ${styles.bg} p-5`}>
      <div className="flex items-start justify-between gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles.pill}`}
        >
          {styles.label}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{date}</span>
      </div>
      <h3 className="mt-3 text-base font-bold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-medium text-muted-foreground">
        <span className="rounded-md border border-border bg-card px-2 py-0.5">{region}</span>
        <span className="rounded-md border border-border bg-card px-2 py-0.5">{issuedBy}</span>
      </div>
    </article>
  );
}
