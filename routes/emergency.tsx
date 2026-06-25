import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/portal/PageShell";
import {
  Siren,
  Flame,
  Ambulance,
  Shield,
  ShieldAlert,
  CloudLightning,
  PhoneCall,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Information Centre — Government Advisory Portal" },
      {
        name: "description",
        content:
          "National emergency helpline numbers for police, fire, ambulance, women, cyber crime and disaster management.",
      },
      { property: "og:title", content: "Emergency Information Centre" },
      {
        property: "og:description",
        content: "National emergency helpline numbers and quick-dial information.",
      },
    ],
  }),
  component: EmergencyPage,
});

const EMERGENCY = [
  {
    icon: Siren,
    name: "Emergency Response",
    number: "112",
    description: "Single national emergency number for all services — police, fire and ambulance.",
    tone: "bg-[color-mix(in_oklab,var(--destructive)_14%,transparent)] text-destructive border-[color-mix(in_oklab,var(--destructive)_30%,transparent)]",
  },
  {
    icon: Shield,
    name: "Police",
    number: "100",
    description: "For crimes in progress, suspicious activity, and law and order assistance.",
    tone: "bg-secondary text-primary border-border",
  },
  {
    icon: Flame,
    name: "Fire Service",
    number: "101",
    description: "Fire emergencies, rescue operations and hazardous material incidents.",
    tone: "bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] text-[color:var(--warning)] border-[color-mix(in_oklab,var(--warning)_30%,transparent)]",
  },
  {
    icon: Ambulance,
    name: "Ambulance",
    number: "102",
    description: "Medical emergencies and ambulance services across states.",
    tone: "bg-[color-mix(in_oklab,var(--success)_16%,transparent)] text-[color:var(--success)] border-[color-mix(in_oklab,var(--success)_30%,transparent)]",
  },
  {
    icon: Users,
    name: "Women Helpline",
    number: "1091",
    description: "24x7 helpline for women in distress. Also dial 181 for women's helpline.",
    tone: "bg-secondary text-primary border-border",
  },
  {
    icon: ShieldAlert,
    name: "Cyber Crime",
    number: "1930",
    description: "Report online financial fraud and cyber crime to the national portal.",
    tone: "bg-secondary text-primary border-border",
  },
  {
    icon: CloudLightning,
    name: "Disaster Management",
    number: "108",
    description: "National Disaster Management Authority emergency response.",
    tone: "bg-secondary text-primary border-border",
  },
  {
    icon: PhoneCall,
    name: "Tele-MANAS (Mental Health)",
    number: "14416",
    description: "Free, confidential mental health counselling in 20 Indian languages.",
    tone: "bg-secondary text-primary border-border",
  },
];

function EmergencyPage() {
  return (
    <PageShell>
      <section className="hero-gradient text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--destructive)]" />
            Emergency Centre
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Emergency Information Centre
          </h1>
          <p className="mt-3 max-w-2xl text-base text-primary-foreground/85">
            Quick access to national emergency helplines. Dial <strong>112</strong> for any
            emergency — police, fire or ambulance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {EMERGENCY.map(({ icon: Icon, name, number, description, tone }) => (
            <article key={name} className="glass-card rise-in flex flex-col rounded-xl p-6">
              <div className="flex items-start justify-between gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-lg border ${tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <a
                  href={`tel:${number}`}
                  className="text-2xl font-bold tabular-nums text-primary transition-colors hover:text-primary-glow"
                >
                  {number}
                </a>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{name}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <a
                href={`tel:${number}`}
                className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <PhoneCall className="h-4 w-4" /> Call {number}
              </a>
            </article>
          ))}
        </div>

        <div className="glass-card mt-10 rounded-xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Before you call</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
            <li>• Stay calm and speak clearly. State your exact location first.</li>
            <li>• Describe the nature of the emergency in a few words.</li>
            <li>• Do not hang up until the operator confirms.</li>
            <li>• Keep emergency numbers saved on your phone for offline access.</li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
