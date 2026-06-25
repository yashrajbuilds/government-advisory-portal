import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "../components/portal/PageShell";
import { SearchBar } from "../components/portal/SearchBar";
import { CategoryFilter, type CategoryValue } from "../components/portal/CategoryFilter";
import { StateFilter, type StateValue } from "../components/portal/StateFilter";
import { AdvisoryCard } from "../components/portal/AdvisoryCard";
import { SkeletonGrid } from "../components/portal/SkeletonCard";
import { useApp } from "../context/AppContext";
import { FileSearch, X } from "lucide-react";
import type { AdvisoryStatus, AdvisoryPriority } from "../types";
import { useTranslation, type TranslationKey } from "../hooks/use-translation";

export const Route = createFileRoute("/advisories")({
  head: () => ({
    meta: [
      { title: "All Advisories — Government Advisory Portal" },
      {
        name: "description",
        content:
          "Browse, search and filter all official government advisories by category, state, department or keyword.",
      },
      { property: "og:title", content: "All Advisories — Government Advisory Portal" },
      {
        property: "og:description",
        content: "Search and filter every published government advisory in one place.",
      },
    ],
  }),
  component: AdvisoriesPage,
});

type StatusValue = "All" | AdvisoryStatus;
type PriorityValue = "All" | AdvisoryPriority;

function AdvisoriesPage() {
  const { advisories, departments } = useApp();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryValue>("All");
  const [state, setState] = useState<StateValue>("All");
  const [department, setDepartment] = useState<string>("All");
  const [status, setStatus] = useState<StatusValue>("All");
  const [priority, setPriority] = useState<PriorityValue>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return advisories
      .filter((a) => (category === "All" ? true : a.category === category))
      .filter((a) => (state === "All" ? true : a.state === state))
      .filter((a) => (department === "All" ? true : a.department === department))
      .filter((a) => (status === "All" ? true : a.status === status))
      .filter((a) => (priority === "All" ? true : a.priority === priority))
      .filter((a) => {
        if (!q) return true;
        return (
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q) ||
          a.state.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [advisories, query, category, state, department, status, priority]);

  const hasFilters =
    !!query ||
    category !== "All" ||
    state !== "All" ||
    department !== "All" ||
    status !== "All" ||
    priority !== "All";

  const reset = () => {
    setQuery("");
    setCategory("All");
    setState("All");
    setDepartment("All");
    setStatus("All");
    setPriority("All");
  };

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
            {t("heroLatestUpdates")}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("allAdvTitle")}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t("allAdvSub")}
          </p>

          <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
            <SearchBar value={query} onChange={setQuery} />
            <CategoryFilter value={category} onChange={setCategory} />
            <StateFilter value={state} onChange={setState} />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-11 rounded-lg border border-input bg-card px-3 text-sm font-semibold shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 text-foreground"
            >
              <option value="All">{t("filterDept")}</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusValue)}
              className="h-11 rounded-lg border border-input bg-card px-3 text-sm font-semibold shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 text-foreground"
            >
              <option value="All">{t("filterStatus")}</option>
              <option value="Active">{t("active")}</option>
              <option value="Important">{t("important")}</option>
              <option value="Archived">{t("archived")}</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityValue)}
              className="h-11 rounded-lg border border-input bg-card px-3 text-sm font-semibold shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30 text-foreground"
            >
              <option value="All">
                {t("priority")}: {t("filterStatus")}
              </option>
              <option value="emergency">{t("emergency")}</option>
              <option value="critical">{t("critical")}</option>
              <option value="high">{t("high")}</option>
              <option value="medium">{t("medium")}</option>
              <option value="low">{t("low")}</option>
            </select>
          </div>

          {hasFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {query && (
                <Pill onClear={() => setQuery("")}>
                  {t("search")}: "{query}"
                </Pill>
              )}
              {category !== "All" && (
                <Pill onClear={() => setCategory("All")}>
                  {t("category")}: {category}
                </Pill>
              )}
              {state !== "All" && (
                <Pill onClear={() => setState("All")}>
                  {t("state")}: {state}
                </Pill>
              )}
              {department !== "All" && (
                <Pill onClear={() => setDepartment("All")}>
                  {t("department")}: {department}
                </Pill>
              )}
              {status !== "All" && (
                <Pill onClear={() => setStatus("All")}>
                  {t("status")}: {t(status.toLowerCase() as TranslationKey)}
                </Pill>
              )}
              {priority !== "All" && (
                <Pill onClear={() => setPriority("All")}>
                  {t("priority")}: {t(priority as TranslationKey)}
                </Pill>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {t("showingAdvisories", { count: filtered.length, total: advisories.length })}
          </span>
          {hasFilters && (
            <button
              onClick={reset}
              className="text-sm font-bold text-primary hover:text-primary-glow"
            >
              {t("reset")}
            </button>
          )}
        </div>

        {loading ? (
          <SkeletonGrid count={6} />
        ) : filtered.length === 0 ? (
          <div className="glass-card rise-in grid place-items-center rounded-xl p-12 text-center">
            <FileSearch className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-3 text-base font-bold text-foreground">{t("noAdvFound")}</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">{t("noAdvFoundSub")}</p>
            {hasFilters && (
              <button
                onClick={reset}
                className="mt-5 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90"
              >
                {t("reset")}
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <AdvisoryCard key={a.id} advisory={a} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

function Pill({ children, onClear }: { children: React.ReactNode; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground">
      {children}
      <button
        type="button"
        onClick={onClear}
        aria-label="Remove filter"
        className="grid h-4 w-4 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
