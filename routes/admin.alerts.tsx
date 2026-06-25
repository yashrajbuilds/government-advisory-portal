import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import type { AlertSeverity, EmergencyAlert, AdvisoryState } from "../types";
import { STATES } from "../data/advisories";
import { useTranslation, type TranslationKey } from "../hooks/use-translation";

export const Route = createFileRoute("/admin/alerts")({
  component: AdminAlertsPage,
});

function AdminAlertsPage() {
  const { alerts, createAlert, deleteAlert, departments } = useApp();
  const [creating, setCreating] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="grid gap-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
            {t("emergency")}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">{t("manageAlerts")}</h1>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-destructive px-4 text-sm font-bold text-destructive-foreground hover:bg-destructive/90 focus:ring-2 focus:ring-destructive/20"
        >
          <Plus className="h-4 w-4" /> {t("manageAlerts")}
        </button>
      </header>

      <div className="glass-card overflow-x-auto rounded-xl">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t("title")}</th>
              <th>{t("severity")}</th>
              <th>{t("state")}</th>
              <th>{t("issuedBy")}</th>
              <th>{t("date")}</th>
              <th className="text-right">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id}>
                <td className="max-w-[20rem]">
                  <p className="truncate font-semibold text-foreground">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.summary}</p>
                </td>
                <td>
                  <SeverityPill severity={a.severity} />
                </td>
                <td>{a.region}</td>
                <td className="text-muted-foreground">{a.issuedBy}</td>
                <td className="whitespace-nowrap text-xs text-muted-foreground">{a.date}</td>
                <td className="text-right">
                  <button
                    onClick={() => {
                      if (confirm(`Delete alert?`)) {
                        deleteAlert(a.id);
                        toast.success("Alert deleted");
                      }
                    }}
                    aria-label="Delete"
                    className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
            {alerts.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                  {t("noData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {creating && (
        <AlertDialog
          departments={departments.map((d) => d.name)}
          onClose={() => setCreating(false)}
          onSave={(v) => {
            createAlert(v);
            toast.success("Emergency alert published");
            setCreating(false);
          }}
        />
      )}
    </div>
  );
}

function SeverityPill({ severity }: { severity: AlertSeverity }) {
  const { t } = useTranslation();
  const map = {
    critical: "bg-destructive text-destructive-foreground",
    high: "bg-orange-500 text-white",
    moderate: "bg-yellow-400 text-yellow-950",
  } as const;
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${map[severity]}`}
    >
      {t(severity as TranslationKey)}
    </span>
  );
}

function AlertDialog({
  onSave,
  onClose,
  departments,
}: {
  onSave: (v: Omit<EmergencyAlert, "id" | "date">) => void;
  onClose: () => void;
  departments: string[];
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<AlertSeverity>("high");
  const [region, setRegion] = useState<AdvisoryState>("All India" as AdvisoryState);
  const [issuedBy, setIssuedBy] = useState(departments[0] ?? "");
  const [summary, setSummary] = useState("");

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          onSave({ title: title.trim(), severity, region, issuedBy, summary: summary.trim() });
        }}
        className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl animate-in zoom-in-95"
      >
        <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3 rounded-t-2xl">
          <h3 className="text-base font-semibold text-foreground">{t("manageAlerts")}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 grid gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t("title")}
            </span>
            <input
              className="adminput"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("severity")}
              </span>
              <select
                className="adminput"
                value={severity}
                onChange={(e) => setSeverity(e.target.value as AlertSeverity)}
              >
                <option value="critical">{t("critical")}</option>
                <option value="high">{t("high")}</option>
                <option value="moderate">{t("moderate")}</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("state")}
              </span>
              <select
                className="adminput"
                value={region}
                onChange={(e) => setRegion(e.target.value as AdvisoryState)}
              >
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t("issuedBy")}
            </span>
            <select
              className="adminput"
              value={issuedBy}
              onChange={(e) => setIssuedBy(e.target.value)}
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t("summary")}
            </span>
            <textarea
              className="adminput"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="p-5 border-t border-border/20 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center rounded-lg border border-border bg-card px-4 text-sm font-semibold text-foreground hover:bg-secondary"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="inline-flex h-10 items-center rounded-lg bg-destructive px-4 text-sm font-bold text-destructive-foreground hover:bg-destructive/90"
          >
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  );
}
