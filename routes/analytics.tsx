import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { FileText, ShieldAlert, Archive, MapPin, Building2 } from "lucide-react";
import { PageShell } from "../components/portal/PageShell";
import { useApp, useStats } from "../context/AppContext";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics Dashboard — Government Advisory Portal" },
      {
        name: "description",
        content: "Visual analytics across advisories, states, departments and emergency alerts.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const COLORS = ["#1D4ED8", "#3B82F6", "#60A5FA", "#93C5FD", "#0EA5E9", "#F59E0B", "#10B981"];

function AnalyticsPage() {
  const stats = useStats();
  const { advisories, departments } = useApp();

  const byCategory = useMemo(() => {
    const m = new Map<string, number>();
    advisories.forEach((a) => m.set(a.category, (m.get(a.category) ?? 0) + 1));
    return [...m.entries()].map(([name, value]) => ({ name, value }));
  }, [advisories]);

  const byState = useMemo(() => {
    const m = new Map<string, number>();
    advisories.forEach((a) => m.set(a.state, (m.get(a.state) ?? 0) + 1));
    return [...m.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [advisories]);

  const byDept = useMemo(() => {
    const m = new Map<string, number>();
    advisories.forEach((a) => m.set(a.department, (m.get(a.department) ?? 0) + 1));
    return [...m.entries()]
      .map(([name, value]) => ({ name: name.length > 26 ? name.slice(0, 24) + "…" : name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [advisories]);

  const timeline = useMemo(() => {
    const m = new Map<string, number>();
    advisories.forEach((a) => {
      const month = a.date.slice(0, 7);
      m.set(month, (m.get(month) ?? 0) + 1);
    });
    return [...m.entries()]
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => (a.month < b.month ? -1 : 1));
  }, [advisories]);

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
            Insights
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Analytics Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Visual breakdown of advisory activity across categories, states and departments.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <KPI icon={FileText} label="Total" value={stats.total} />
          <KPI icon={ShieldAlert} label="Active" value={stats.active} />
          <KPI icon={Archive} label="Archived" value={stats.archived} />
          <KPI icon={MapPin} label="States" value={stats.statesCovered} />
          <KPI icon={Building2} label="Departments" value={departments.length} />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <ChartCard title="Advisories by Category" subtitle="Pie distribution across domains">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={100} label>
                  {byCategory.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top 10 States" subtitle="Advisories by state">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byState}>
                <CartesianGrid stroke="rgba(125,125,125,0.15)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={70}
                />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top Departments" subtitle="Advisories issued per department">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byDept} layout="vertical">
                <CartesianGrid stroke="rgba(125,125,125,0.15)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={150} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Issuance Timeline" subtitle="Advisories published per month">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeline}>
                <CartesianGrid stroke="rgba(125,125,125,0.15)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1D4ED8"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>
    </PageShell>
  );
}

const tooltipStyle = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--foreground)",
};

function KPI({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText;
  label: string;
  value: number;
}) {
  return (
    <div className="glass-card rounded-xl p-5">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="mt-3 text-2xl font-bold tabular-nums text-foreground">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
