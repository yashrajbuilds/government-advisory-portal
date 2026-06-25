import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Trash2 } from "lucide-react";
import { PageShell } from "../components/portal/PageShell";
import { AdvisoryCard } from "../components/portal/AdvisoryCard";
import { useBookmarks } from "../hooks/use-bookmarks";
import { useApp } from "../context/AppContext";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "My Bookmarks — Government Advisory Portal" },
      {
        name: "description",
        content:
          "Your saved advisories from the Government Advisory Portal — stored locally on this device.",
      },
      { property: "og:title", content: "My Bookmarks" },
      {
        property: "og:description",
        content: "Your saved advisories on the Government Advisory Portal.",
      },
    ],
  }),
  component: BookmarksPage,
});

function BookmarksPage() {
  const { ids, clear } = useBookmarks();
  const { advisories } = useApp();
  const items = ids
    .map((id) => advisories.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
              My library
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Saved Advisories
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {items.length === 0
                ? "Bookmark advisories to read them later — they are saved on this device."
                : `${items.length} advisor${items.length === 1 ? "y" : "ies"} saved on this device.`}
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-input bg-card px-4 text-sm font-medium text-foreground hover:bg-secondary"
            >
              <Trash2 className="h-4 w-4" /> Clear all
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="glass-card rise-in grid place-items-center rounded-xl p-12 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-primary">
              <Bookmark className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-foreground">No bookmarks yet</h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Browse the advisories and tap the bookmark icon on any card to save it for quick
              access later.
            </p>
            <Link
              to="/advisories"
              className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Browse advisories
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((a) => (
              <AdvisoryCard key={a.id} advisory={a} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
