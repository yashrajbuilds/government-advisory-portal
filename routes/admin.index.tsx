import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  Folder,
  Building2,
  AlertTriangle,
  Plus,
  Eye,
  Archive,
  RefreshCw,
} from "lucide-react";
import { useApp, useStats } from "../context/AppContext";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const stats = useStats();
  const { advisories, alerts, resetAll } = useApp();
  const recent = [...advisories].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
            Overview
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all citizen-facing content from a single control center.
          </p>
        </div>
        <button
          onClick={() => {
            if (confirm("Reset all data to factory seeds? This clears local changes.")) resetAll();
          }}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm font-medium hover:bg-secondary"
        >
          <RefreshCw className="h-4 w-4" /> Reset to seed
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI icon={FileText} label="Total advisories" value={stats.total} tone="primary" />
        <KPI icon={Archive} label="Archived" value={stats.archived} tone="muted" />
        <KPI icon={AlertTriangle} label="Active alerts" value={stats.emergencies} tone="danger" />
        <KPI icon={Building2} label="Departments" value={stats.departments} tone="primary" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Recent advisories</h2>
            <Link
              to="/admin/advisories"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Manage →
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {recent.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {a.category} · {a.state}
                  </p>
                </div>
                <Link
                  to="/advisory/$id"
                  params={{ id: a.id }}
                  className="inline-flex h-8 items-center gap-1 rounded-md border border-input bg-card px-2.5 text-xs font-medium hover:bg-secondary"
                >
                  <Eye className="h-3.5 w-3.5" /> View
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Active emergency alerts</h2>
            <Link to="/admin/alerts" className="text-xs font-semibold text-primary hover:underline">
              Manage →
            </Link>
          </div>
          <ul className="mt-3 space-y-2">
            {alerts.slice(0, 5).map((a) => (
              <li
                key={a.id}
                className="rounded-lg border border-destructive/30 bg-destructive/5 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">{a.title}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${a.severity === "critical" ? "bg-destructive text-destructive-foreground" : a.severity === "high" ? "bg-orange-500 text-white" : "bg-yellow-400 text-yellow-950"}`}
                  >
                    {a.severity}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {a.region} · {a.issuedBy}
                </p>
              </li>
            ))}
            {alerts.length === 0 && (
              <li className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                No active alerts.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <QuickAction icon={Plus} label="New Advisory" to="/admin/advisories" />
        <QuickAction icon={Folder} label="Manage Categories" to="/admin/categories" />
        <QuickAction icon={Building2} label="Manage Departments" to="/admin/departments" />
        <QuickAction icon={AlertTriangle} label="Manage Alerts" to="/admin/alerts" />
      </div>
    </div>
  );
}

function KPI({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof FileText;
  label: string;
  value: number;
  tone: "primary" | "muted" | "danger";
}) {
  const styles = {
    primary: "bg-primary/10 text-primary",
    muted: "bg-secondary text-muted-foreground",
    danger: "bg-destructive/10 text-destructive",
  }[tone];
  return (
    <div className="glass-card rounded-xl p-5">
      <span className={`grid h-9 w-9 place-items-center rounded-md ${styles}`}>
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="mt-3 text-3xl font-bold tabular-nums text-foreground">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  to,
}: {
  icon: typeof FileText;
  label: string;
  to: string;
}) {
  return (
    <Link
      to={to as never}
      className="glass-card flex items-center gap-3 rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]"
    >
      <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </Link>
  );
}
