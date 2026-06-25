import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import type { Category } from "../types";
import { useTranslation } from "../hooks/use-translation";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategoriesPage,
});

function AdminCategoriesPage() {
  const { categories, createCategory, updateCategory, deleteCategory, advisories } = useApp();
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="grid gap-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
            Taxonomy
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">{t("manageCategories")}</h1>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary/20"
        >
          <Plus className="h-4 w-4" /> {t("newAdvisory") /* new category icon label fallback */}
        </button>
      </header>

      <div className="glass-card overflow-x-auto rounded-xl">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t("title")}</th>
              <th>{t("summary")}</th>
              <th>{t("navAdvisories")}</th>
              <th className="text-right">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => {
              const count = advisories.filter((a) => a.category === c.name).length;
              return (
                <tr key={c.id}>
                  <td className="font-semibold text-foreground">{c.name}</td>
                  <td className="text-muted-foreground">{c.description}</td>
                  <td className="tabular-nums font-semibold">{count}</td>
                  <td className="text-right">
                    <div className="inline-flex gap-1">
                      <button
                        onClick={() => setEditing(c)}
                        className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card hover:bg-secondary text-foreground focus:ring-2 focus:ring-primary/20"
                        aria-label="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete category "${c.name}"?`)) {
                            deleteCategory(c.id);
                            toast.success("Category deleted");
                          }
                        }}
                        className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card text-destructive hover:bg-destructive/10 focus:ring-2 focus:ring-destructive/20"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                  {t("noData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(creating || editing) && (
        <CategoryDialog
          initial={editing ?? undefined}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={(v) => {
            if (editing) {
              updateCategory(editing.id, v);
              toast.success("Category updated");
            } else {
              createCategory(v.name, v.description);
              toast.success("Category created");
            }
            setCreating(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function CategoryDialog({
  initial,
  onSave,
  onClose,
}: {
  initial?: Category;
  onSave: (v: Omit<Category, "id">) => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          onSave({ name: name.trim(), description: description.trim() });
        }}
        className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl animate-in zoom-in-95"
      >
        <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3 rounded-t-2xl">
          <h3 className="text-base font-semibold text-foreground">
            {initial ? t("edit") : t("manageCategories")}
          </h3>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t("summary")}
            </span>
            <textarea
              className="adminput"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  );
}
