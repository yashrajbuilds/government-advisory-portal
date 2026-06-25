import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "../components/portal/PageShell";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Government Advisory Portal" },
      {
        name: "description",
        content:
          "Get in touch with the Government Advisory Portal team for queries, feedback or accessibility support.",
      },
      { property: "og:title", content: "Contact — Government Advisory Portal" },
      {
        property: "og:description",
        content: "Contact details and feedback form for the Government Advisory Portal.",
      },
    ],
  }),
  component: ContactPage,
});

const CONTACTS = [
  { icon: MapPin, label: "Address", value: "Sector 12, Lok Nayak Bhawan, New Delhi — 110003" },
  { icon: Phone, label: "Toll Free", value: "1800-111-0000" },
  { icon: Mail, label: "Email", value: "support@advisories.gov.in" },
  { icon: Clock, label: "Working Hours", value: "Mon–Fri, 09:30 to 18:00 IST" },
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
            Get in touch
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            For queries about specific advisories, please contact the issuing department directly.
            For portal-related feedback or accessibility support, use the form below.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="space-y-3">
          {CONTACTS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card flex items-start gap-3 rounded-xl p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {label}
                </div>
                <div className="mt-0.5 text-sm font-medium text-foreground">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="glass-card rounded-xl p-6 sm:p-8"
        >
          {submitted ? (
            <div className="grid place-items-center py-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-[color:var(--success)]" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">Thank you</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your message has been received. We will respond within 3 working days.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 text-sm font-semibold text-primary hover:text-primary-glow"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-foreground">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fields marked with <span className="text-destructive">*</span> are required.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input required type="text" className={inputCls} placeholder="Your full name" />
                </Field>
                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    className={inputCls}
                    placeholder="name@example.com"
                  />
                </Field>
                <Field label="Subject" required className="sm:col-span-2">
                  <input required type="text" className={inputCls} placeholder="Brief subject" />
                </Field>
                <Field label="Message" required className="sm:col-span-2">
                  <textarea
                    required
                    rows={5}
                    className={`${inputCls} min-h-[120px] py-2.5`}
                    placeholder="How can we help?"
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" /> Send message
              </button>
            </>
          )}
        </form>
      </section>
    </PageShell>
  );
}

const inputCls =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";

function Field({
  label,
  children,
  required,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}
