import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Tag,
  MapPin,
  Printer,
  Share2,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { PageShell } from "../components/portal/PageShell";
import { AdvisoryCard } from "../components/portal/AdvisoryCard";
import { BookmarkButton } from "../components/portal/BookmarkButton";
import { RecentlyViewed } from "../components/portal/RecentlyViewed";
import { useRecentlyViewed } from "../hooks/use-recently-viewed";
import { useApp } from "../context/AppContext";
import { useTranslation, type TranslationKey } from "../hooks/use-translation";
import type { Advisory } from "../types";

export const Route = createFileRoute("/advisory/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Advisory ${params.id} — National Portal` },
      { name: "description", content: "Official government advisory details." },
    ],
  }),
  component: AdvisoryDetailsPage,
});

function PriorityBadge({ priority }: { priority: string }) {
  const { t } = useTranslation();
  const map: Record<string, string> = {
    emergency: "bg-red-500/10 text-red-600 border-red-500/30",
    critical: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    high: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    medium: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    low: "bg-slate-500/10 text-slate-600 border-slate-500/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${map[priority] || map.low}`}
    >
      <AlertCircle className="h-3.5 w-3.5" />
      {t(priority as TranslationKey)}
    </span>
  );
}

function AdvisoryDetailsPage() {
  const { id } = Route.useParams();
  const { advisories } = useApp();
  const advisory = advisories.find((a) => a.id === id);
  const { track } = useRecentlyViewed();
  const { t, language } = useTranslation();

  useEffect(() => {
    if (advisory) track(advisory.id);
  }, [advisory, track]);

  if (!advisory) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold">{t("notFoundTitle")}</h1>
          <p className="mt-2 text-muted-foreground">{t("notFoundSub")}</p>
          <Link
            to="/advisories"
            className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            {t("backToAdv")}
          </Link>
        </div>
      </PageShell>
    );
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const related = advisories
    .filter((a) => a.id !== advisory.id && a.category === advisory.category)
    .slice(0, 3);

  // Timeline events helper
  const timelineEvents = [
    {
      label: t("issuedOn"),
      date: advisory.date,
      icon: CheckCircle2,
      color: "text-green-500 bg-green-500/10 border-green-500/20",
    },
    ...(advisory.updatedDate
      ? [
          {
            label: t("updatedOn"),
            date: advisory.updatedDate,
            icon: Clock,
            color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
          },
        ]
      : []),
    ...(advisory.expiryDate
      ? [
          {
            label: t("expiresOn"),
            date: advisory.expiryDate,
            icon: AlertCircle,
            color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
          },
        ]
      : []),
  ];

  return (
    <PageShell>
      {/* Header Info Block */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Link
            to="/advisories"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {t("backToAdv")}
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <PriorityBadge priority={advisory.priority} />
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-semibold text-foreground">
              <Tag className="h-3.5 w-3.5 text-primary-glow" /> {advisory.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-semibold text-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary-glow" /> {advisory.state}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {advisory.title}
          </h1>

          <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="flex items-center gap-2 font-medium">
              <Building2 className="h-4 w-4 text-primary" />
              <span>{advisory.department}</span>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <Calendar className="h-4 w-4" />
              <span>
                {t("issuedOn")} {formatDate(advisory.date)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <BookmarkButton id={advisory.id} title={advisory.title} variant="full" />
            <button
              onClick={() => typeof window !== "undefined" && window.print()}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-semibold text-foreground hover:bg-secondary focus:ring-2 focus:ring-primary/20"
            >
              <Printer className="h-4 w-4" /> {t("print")}
            </button>
            <button
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.share) {
                  navigator
                    .share({
                      title: advisory.title,
                      text: advisory.description,
                      url: window.location.href,
                    })
                    .catch(() => {});
                } else if (typeof navigator !== "undefined") {
                  navigator.clipboard?.writeText(window.location.href);
                  toast.success("Link copied to clipboard");
                }
              }}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-semibold text-foreground hover:bg-secondary focus:ring-2 focus:ring-primary/20"
            >
              <Share2 className="h-4 w-4" /> {t("share")}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content & Timeline Grid */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-[3fr_1.2fr]">
        <article className="min-w-0">
          <div className="glass-card rise-in rounded-xl p-6 sm:p-8">
            <h2 className="text-base font-bold text-foreground leading-relaxed border-b border-border/20 pb-4 mb-4">
              {advisory.description}
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-foreground/90 font-medium">
              {advisory.content.split("\n\n").map((p: string, i: number) => (
                <p key={i} className="whitespace-pre-wrap">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Timeline Panel */}
        <aside className="space-y-6">
          <div className="glass-card rounded-xl p-5 border border-border/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-glow mb-4">
              Advisory Timeline
            </h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {timelineEvents.map((event, idx) => {
                  const Icon = event.icon;
                  return (
                    <li key={event.label}>
                      <div className="relative pb-8">
                        {idx !== timelineEvents.length - 1 && (
                          <span
                            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-border"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full border ${event.color}`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                          </div>
                          <div className="flex-1 min-w-0 pt-1">
                            <div className="text-xs font-semibold text-foreground">
                              {event.label}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground font-bold tabular-nums">
                              {formatDate(event.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>
      </section>

      {/* Related Section */}
      {related.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
              {t("relatedTitle")}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              {t("relatedSub")}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {related.map((a: Advisory) => (
              <AdvisoryCard key={a.id} advisory={a} />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed excludeId={advisory.id} title={t("recentlyViewed")} />
    </PageShell>
  );
}
