import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portal/PageShell";
import { AdminShell } from "../components/admin/AdminShell";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Government Advisory Portal" },
      {
        name: "description",
        content: "Manage advisories, categories, departments and emergency alerts.",
      },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <PageShell>
      <AdminShell />
    </PageShell>
  );
}
