import { createFileRoute, Link } from "@tanstack/react-router";
import {
  HeartPulse,
  Wheat,
  GraduationCap,
  Swords,
  Landmark,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PageShell } from "../components/portal/PageShell";
import { useApp } from "../context/AppContext";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Government Departments — Advisory Portal" },
      {
        name: "description",
        content:
          "Directory of government ministries and departments issuing public advisories across India.",
      },
      { property: "og:title", content: "Government Departments Directory" },
      {
        property: "og:description",
        content: "Browse major government departments and their responsibilities.",
      },
    ],
  }),
  component: DepartmentsPage,
});

const DEPARTMENTS = [
  {
    icon: HeartPulse,
    name: "Health Ministry",
    short: "Ministry of Health & Family Welfare",
    description:
      "Responsible for national health policy, public health programmes, disease surveillance, and citizen health advisories.",
    responsibilities: [
      "Vaccination and immunisation programmes",
      "Disease surveillance and outbreak response",
      "Public health awareness campaigns",
      "Regulation of medical devices and pharmaceuticals",
    ],
    matchCategory: "Health",
  },
  {
    icon: Wheat,
    name: "Agriculture Ministry",
    short: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Frames policies for agricultural development, farmer welfare schemes, crop insurance, and rural prosperity.",
    responsibilities: [
      "Kharif and Rabi season sowing advisories",
      "Soil Health Card distribution",
      "Crop insurance under PMFBY",
      "Pest surveillance and IPM guidance",
    ],
    matchCategory: "Agriculture",
  },
  {
    icon: GraduationCap,
    name: "Education Ministry",
    short: "Ministry of Education",
    description:
      "Oversees school and higher education policy, academic calendars, scholarships, and safety in educational institutions.",
    responsibilities: [
      "National scholarship administration",
      "Academic calendar coordination",
      "School safety and PM POSHAN scheme",
      "Higher education compliance monitoring",
    ],
    matchCategory: "Education",
  },
  {
    icon: Swords,
    name: "Defence Ministry",
    short: "Ministry of Defence",
    description:
      "Responsible for national defence, armed forces administration, defence procurement, and ex-servicemen welfare.",
    responsibilities: [
      "Armed forces recruitment notifications",
      "Border area movement notifications",
      "Veterans' welfare outreach",
      "Defence pension administration",
    ],
    matchCategory: "Defence",
  },
  {
    icon: Landmark,
    name: "Home Affairs",
    short: "Ministry of Home Affairs",
    description:
      "Internal security, disaster management coordination, border management, and centre-state relations.",
    responsibilities: [
      "Disaster preparedness coordination",
      "National emergency response (NDRF)",
      "Public safety advisories",
      "Coordination with state governments",
    ],
    matchCategory: "Weather",
  },
  {
    icon: ShieldCheck,
    name: "Cyber Security Division",
    short: "Indian Computer Emergency Response Team (CERT-In)",
    description:
      "National nodal agency for responding to computer security incidents and issuing cyber security advisories.",
    responsibilities: [
      "Cyber threat advisories and alerts",
      "Incident response coordination",
      "Vulnerability assessment guidance",
      "Citizen awareness on digital safety",
    ],
    matchCategory: "Cyber Security",
  },
] as const;

function DepartmentsPage() {
  const { advisories, departments } = useApp();
  return (
    <PageShell>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
            Directory
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Government Departments
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Major ministries and departments that issue public advisories, along with their core
            areas of responsibility.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((d) => {
            const Icon = d.icon;
            const count = advisories.filter((a) => a.category === d.matchCategory).length;
            return (
              <article key={d.name} className="glass-card rise-in flex flex-col rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-foreground">{d.name}</h3>
                    <p className="text-xs text-muted-foreground">{d.short}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {d.description}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Key responsibilities
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
                    {d.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{count}</span> related advisor
                    {count === 1 ? "y" : "ies"}
                  </span>
                  <Link
                    to="/advisories"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-glow"
                  >
                    View advisories <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Departments Directory</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Live registry of departments managed via the admin panel.
        </p>
        <div className="glass-card mt-5 overflow-x-auto rounded-xl">
          <table className="data-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Short</th>
                <th>State</th>
                <th>Contact</th>
                <th>Advisories</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.id}>
                  <td className="font-semibold">{d.name}</td>
                  <td className="text-muted-foreground">{d.shortName}</td>
                  <td>{d.state}</td>
                  <td className="text-muted-foreground">{d.contact}</td>
                  <td className="tabular-nums">
                    {advisories.filter((a) => a.department === d.name).length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}
