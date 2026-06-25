import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Archive, Search, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import type { Advisory } from "../types";
import { AdvisoryForm } from "../components/admin/AdvisoryForm";
import { useTranslation, type TranslationKey } from "../hooks/use-translation";

export const Route = createFileRoute("/admin/advisories")({
  component: AdminAdvisoriesPage,
});

type StatusFilterValue = "All" | Advisory["status"];

function AdminAdvisoriesPage() {
  const { advisories, createAdvisory, updateAdvisory, deleteAdvisory, archiveAdvisory } = useApp();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("All");
  const [editing, setEditing] = useState<Advisory | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return advisories
      .filter((a) => (statusFilter === "All" ? true : a.status === statusFilter))
      .filter((a) =>
        !q
          ? true
          : a.title.toLowerCase().includes(q) ||
            a.department.toLowerCase().includes(q) ||
            a.state.toLowerCase().includes(q),
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [advisories, statusFilter, query]);

  return (
    <div className="grid gap-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">CRUD</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">{t("recentAdvTable")}</h1>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary/20"
        >
          <Plus className="h-4 w-4" /> {t("newAdvisory")}
        </button>
      </header>

      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[14rem] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, state or department"
              className="adminput pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilterValue)}
            className="adminput max-w-[10rem]"
          >
            <option value="All">{t("filterStatus")}</option>
            <option value="Active">{t("active")}</option>
            <option value="Important">{t("important")}</option>
            <option value="Archived">{t("archived")}</option>
          </select>
        </div>
      </div>

      <div className="glass-card overflow-x-auto rounded-xl">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t("title")}</th>
              <th>{t("category")}</th>
              <th>{t("state")}</th>
              <th>{t("priority")}</th>
              <th>{t("status")}</th>
              <th>{t("date")}</th>
              <th className="text-right">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td className="max-w-[22rem]">
                  <p className="truncate font-semibold text-foreground">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.department}</p>
                </td>
                <td>{a.category}</td>
                <td>{a.state}</td>
                <td>
                  <span
                    className={`inline-flex items-center gap-0.5 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${a.priority === "emergency" ? "bg-red-500/10 text-red-600 border border-red-500/20" : a.priority === "critical" ? "bg-orange-500/10 text-orange-600 border border-orange-500/20" : a.priority === "high" ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20" : a.priority === "medium" ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" : "bg-slate-500/10 text-slate-600 border border-slate-500/20"}`}
                  >
                    {t(a.priority as TranslationKey)}
                  </span>
                </td>
                <td>
                  <StatusPill status={a.status} />
                </td>
                <td className="whitespace-nowrap text-xs text-muted-foreground">{a.date}</td>
                <td className="text-right">
                  <div className="inline-flex gap-1">
                    <IconBtn label="Edit" onClick={() => setEditing(a)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </IconBtn>
                    <IconBtn
                      label="Archive"
                      onClick={() => {
                        archiveAdvisory(a.id);
                        toast.success(t("archived"));
                      }}
                    >
                      <Archive className="h-3.5 w-3.5" />
                    </IconBtn>
                    <IconBtn
                      label="Delete"
                      tone="danger"
                      onClick={() => {
                        if (confirm(`Delete "${a.title}"?`)) {
                          deleteAdvisory(a.id);
                          toast.success(t("delete"));
                        }
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconBtn>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                  {t("noData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(editing || creating) && (
        <Modal
          title={editing ? t("edit") : t("newAdvisory")}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
        >
          <AdvisoryForm
            initial={editing ?? undefined}
            onSubmit={(values) => {
              if (editing) {
                updateAdvisory(editing.id, values);
                toast.success("Advisory updated");
              } else {
                createAdvisory(values);
                toast.success("Advisory published");
              }
              setEditing(null);
              setCreating(false);
            }}
            onCancel={() => {
              setEditing(null);
              setCreating(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: Advisory["status"] }) {
  const { t } = useTranslation();
  const cls =
    status === "Important"
      ? "bg-destructive/10 text-destructive border-destructive/30"
      : status === "Archived"
        ? "bg-secondary text-muted-foreground border-border"
        : "bg-primary/10 text-primary border-primary/30";
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cls}`}
    >
      {t(status.toLowerCase() as TranslationKey)}
    </span>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  tone,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  tone?: "danger";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`grid h-8 w-8 place-items-center rounded-md border border-border bg-card hover:bg-secondary focus:ring-2 focus:ring-primary/20 ${tone === "danger" ? "text-destructive hover:bg-destructive/10" : "text-foreground"}`}
    >
      {children}
    </button>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
