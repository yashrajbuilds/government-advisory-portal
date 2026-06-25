import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { PageShell } from "../components/portal/PageShell";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../hooks/use-translation";
import type { AdvisoryState } from "../types";

export const Route = createFileRoute("/states/$name")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.name} Advisory Dashboard — National Portal` },
      {
        name: "description",
        content: `Live government advisories, active emergency alerts, and department details for ${params.name}.`,
      },
    ],
  }),
  component: StateProfilePage,
});

const SECTOR_COLORS: Record<string, string> = {
  Health: "var(--category-health)",
  Weather: "var(--category-weather)",
  Agriculture: "var(--category-agriculture)",
  Education: "var(--category-education)",
  "Cyber Security": "var(--category-cyber)",
  Defence: "var(--category-defence)",
};

function StateProfilePage() {
  const { name } = useParams({ from: Route.id });
  const decodedName = decodeURIComponent(name) as AdvisoryState;
  const { advisories, alerts, departments } = useApp();
  const { t, language } = useTranslation();

  // State-specific data
  const stateAdvisories = useMemo(() => {
    return advisories.filter((a) => a.state === decodedName);
  }, [advisories, decodedName]);

  const stateAlerts = useMemo(() => {
    return alerts.filter((al) => al.region === decodedName);
  }, [alerts, decodedName]);

  const stateDeps = useMemo(() => {
    return departments.filter((d) => d.state === decodedName || d.state === "All India");
  }, [departments, decodedName]);

  // Aggregate advisories by category for the state chart
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    stateAdvisories.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [stateAdvisories]);

  // Format date helper
  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <PageShell>
      {/* Header section */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/states"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> {t("backToAdv")}
          </Link>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
                {t("stateProfile")}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("stateProfileTitle", { name: decodedName })}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{t("stateProfileSub")}</p>
            </div>
            {stateAlerts.length > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-1.5 text-sm font-bold text-destructive animate-pulse">
                <AlertTriangle className="h-4 w-4" />
                {t("activeAlertsCount", { count: stateAlerts.length })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main dashboard grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Statistics cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass-card rounded-xl p-5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </span>
            <div className="mt-3 text-3xl font-bold tabular-nums text-foreground">
              {stateAdvisories.length}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("stateTotalAdv")}
            </div>
          </div>

          <div
            className={`glass-card rounded-xl p-5 border ${stateAlerts.length > 0 ? "border-destructive/30 bg-destructive/5" : ""}`}
          >
            <span
              className={`grid h-10 w-10 place-items-center rounded-lg ${stateAlerts.length > 0 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}
            >
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div
              className={`mt-3 text-3xl font-bold tabular-nums ${stateAlerts.length > 0 ? "text-destructive" : "text-foreground"}`}
            >
              {stateAlerts.length}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("stateActiveAlerts")}
            </div>
          </div>

          <div className="glass-card rounded-xl p-5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </span>
            <div className="mt-3 text-3xl font-bold tabular-nums text-foreground">
              {stateDeps.length}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("stateDeptsCount")}
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            {/* Active alerts section */}
            {stateAlerts.length > 0 && (
              <div className="glass-card rounded-xl p-6 border border-destructive/30 bg-destructive/5">
                <h2 className="flex items-center gap-2 text-lg font-bold text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  {t("priorityAlerts")}
                </h2>
                <ul className="mt-4 space-y-4">
                  {stateAlerts.map((al) => (
                    <li
                      key={al.id}
                      className="rounded-lg border border-destructive/20 bg-card p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-foreground">{al.title}</h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${al.severity === "critical" ? "bg-destructive text-destructive-foreground" : al.severity === "high" ? "bg-orange-500 text-white" : "bg-yellow-400 text-yellow-950"}`}
                        >
                          {al.severity === "critical"
                            ? t("critical")
                            : al.severity === "high"
                              ? t("high")
                              : t("moderate")}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-foreground/90">{al.summary}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {t("issuedBy")}: {al.issuedBy}
                        </span>
                        <span>{formatDate(al.date)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Advisories timeline section */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-lg font-bold text-foreground">
                {t("latestStateAdv", { name: decodedName })}
              </h2>
              <div className="mt-6 flow-root">
                <ul className="-mb-8">
                  {stateAdvisories.map((adv, idx) => (
                    <li key={adv.id}>
                      <div className="relative pb-8">
                        {idx !== stateAdvisories.length - 1 && (
                          <span
                            className="absolute left-4.5 top-4.5 -ml-px h-full w-0.5 bg-border"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <FileText className="h-4.5 w-4.5" />
                            </span>
                          </div>
                          <div className="flex-1 min-w-0 pt-1.5">
                            <div className="text-sm font-semibold text-foreground">
                              <Link
                                to="/advisory/$id"
                                params={{ id: adv.id }}
                                className="hover:text-primary hover:underline"
                              >
                                {adv.title}
                              </Link>
                            </div>
                            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                              {adv.description}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                              <span className="font-semibold uppercase tracking-wider text-primary-glow">
                                {adv.category}
                              </span>
                              <span>•</span>
                              <span>{formatDate(adv.date)}</span>
                              <span>•</span>
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${adv.priority === "emergency" ? "bg-red-500/15 text-red-600" : adv.priority === "critical" ? "bg-orange-500/15 text-orange-600" : adv.priority === "high" ? "bg-yellow-500/15 text-yellow-600" : adv.priority === "medium" ? "bg-blue-500/15 text-blue-600" : "bg-slate-500/15 text-slate-600"}`}
                              >
                                {adv.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  {stateAdvisories.length === 0 && (
                    <li className="text-center py-6 text-sm text-muted-foreground border border-dashed border-border rounded-lg bg-secondary/10">
                      {t("stateNoAdv")}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* State-specific analytics */}
            {chartData.length > 0 && (
              <div className="glass-card rounded-xl p-5">
                <h2 className="text-sm font-bold text-foreground">{t("catDist")}</h2>
                <p className="text-xs text-muted-foreground">{t("catDistSub")}</p>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} />
                      <YAxis tick={{ fontSize: 9 }} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: 8,
                          fontSize: 11,
                          color: "var(--foreground)",
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={SECTOR_COLORS[entry.name] || "var(--primary)"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Department directories */}
            <div className="glass-card rounded-xl p-5">
              <h2 className="text-sm font-bold text-foreground">{t("stateDepsTitle")}</h2>
              <ul className="mt-4 divide-y divide-border">
                {stateDeps.map((d) => (
                  <li key={d.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-sm text-foreground">{d.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{d.shortName}</div>
                      </div>
                      <span className="inline-block rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                        {d.state === "All India" ? t("allIndia") : d.state}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs font-semibold text-primary">
                      <span>
                        {t("helpline")}: {d.contact}
                      </span>
                      <a
                        href={`tel:${d.contact}`}
                        className="inline-flex items-center gap-0.5 hover:underline text-primary-glow"
                      >
                        Call <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
