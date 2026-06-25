import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import type { Department, AdvisoryState } from "../types";
import { STATES } from "../data/advisories";

export const Route = createFileRoute("/admin/departments")({
  component: AdminDepartmentsPage,
});

function AdminDepartmentsPage() {
  const { departments, advisories, createDepartment, updateDepartment, deleteDepartment } =
    useApp();
  const [editing, setEditing] = useState<Department | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="grid gap-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
            Organisation
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Manage Departments</h1>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> New department
        </button>
      </header>

      <div className="glass-card overflow-x-auto rounded-xl">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Short</th>
              <th>State</th>
              <th>Contact</th>
              <th>Advisories</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => {
              const count = advisories.filter((a) => a.department === d.name).length;
              return (
                <tr key={d.id}>
                  <td className="font-semibold">{d.name}</td>
                  <td className="text-muted-foreground">{d.shortName}</td>
                  <td>{d.state}</td>
                  <td className="text-muted-foreground">{d.contact}</td>
                  <td className="tabular-nums">{count}</td>
                  <td className="text-right">
                    <div className="inline-flex gap-1">
                      <button
                        onClick={() => setEditing(d)}
                        aria-label="Edit"
                        className="grid h-8 w-8 place-items-center rounded-md border border-input bg-card hover:bg-secondary"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete department "${d.name}"?`)) {
                            deleteDepartment(d.id);
                            toast.success("Department deleted");
                          }
                        }}
                        aria-label="Delete"
                        className="grid h-8 w-8 place-items-center rounded-md border border-input bg-card text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {departments.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  No departments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(creating || editing) && (
        <DeptDialog
          initial={editing ?? undefined}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={(v) => {
            if (editing) {
              updateDepartment(editing.id, v);
              toast.success("Department updated");
            } else {
              createDepartment(v);
              toast.success("Department created");
            }
            setCreating(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function DeptDialog({
  initial,
  onSave,
  onClose,
}: {
  initial?: Department;
  onSave: (v: Omit<Department, "id">) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [shortName, setShortName] = useState(initial?.shortName ?? "");
  const [state, setState] = useState<AdvisoryState>(
    initial?.state ?? ("All India" as AdvisoryState),
  );
  const [contact, setContact] = useState(initial?.contact ?? "");

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          onSave({
            name: name.trim(),
            shortName: shortName.trim(),
            state,
            contact: contact.trim(),
          });
        }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl"
      >
        <h3 className="text-base font-semibold text-foreground">
          {initial ? "Edit department" : "New department"}
        </h3>
        <div className="mt-4 grid gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Full name
            </span>
            <input
              className="adminput"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Short name
              </span>
              <input
                className="adminput"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                State
              </span>
              <select
                className="adminput"
                value={state}
                onChange={(e) => setState(e.target.value as AdvisoryState)}
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
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contact
            </span>
            <input
              className="adminput"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Helpline or phone"
            />
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center rounded-md border border-input bg-card px-4 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
