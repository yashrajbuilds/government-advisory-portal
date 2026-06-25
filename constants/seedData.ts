import type { Advisory, Category, Department, EmergencyAlert, Notification } from "../types";

export const SEED_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Health",
    description: "Health related advisories, vaccine drives, and sanitation notices.",
  },
  {
    id: "cat-2",
    name: "Weather",
    description: "Weather alerts, heatwaves, heavy rainfall, and climate warnings.",
  },
  {
    id: "cat-3",
    name: "Agriculture",
    description: "Farming guidelines, sowing windows, pest control, and crop insurance.",
  },
  {
    id: "cat-4",
    name: "Education",
    description: "Academic calendars, examinations, anti-ragging, and university notices.",
  },
  {
    id: "cat-5",
    name: "Cyber Security",
    description: "Cyber threat advisories, phishing campaigns, and secure IT directives.",
  },
  {
    id: "cat-6",
    name: "Defence",
    description: "Military recruitment, border movement restrictions, and coast awareness.",
  },
];

export const SEED_DEPARTMENTS: Department[] = [
  {
    id: "dep-1",
    name: "Ministry of Health & Family Welfare",
    shortName: "MoHFW",
    state: "All India",
    contact: "1075",
  },
  {
    id: "dep-2",
    name: "India Meteorological Department",
    shortName: "IMD",
    state: "All India",
    contact: "1800-180-1717",
  },
  {
    id: "dep-3",
    name: "Ministry of Agriculture & Farmers Welfare",
    shortName: "MoAFW",
    state: "All India",
    contact: "1800-180-1551",
  },
  {
    id: "dep-4",
    name: "Indian Computer Emergency Response Team",
    shortName: "CERT-In",
    state: "All India",
    contact: "1930",
  },
  {
    id: "dep-5",
    name: "Ministry of Defence",
    shortName: "MoD",
    state: "All India",
    contact: "011-23012286",
  },
  {
    id: "dep-6",
    name: "National Disaster Management Authority",
    shortName: "NDMA",
    state: "All India",
    contact: "1078",
  },
  {
    id: "dep-7",
    name: "Ministry of Education",
    shortName: "MoE",
    state: "All India",
    contact: "1800-11-8004",
  },
  {
    id: "dep-8",
    name: "Central Pollution Control Board",
    shortName: "CPCB",
    state: "Delhi",
    contact: "011-43102030",
  },
];

export const SEED_ALERTS: EmergencyAlert[] = [
  {
    id: "alt-1",
    title: "Cyclone Warning — Bay of Bengal Intensification",
    severity: "critical",
    region: "Odisha",
    issuedBy: "National Disaster Management Authority",
    date: "2026-06-15",
    summary: "Coastal evacuation advised for low-lying districts. NDRF teams pre-positioned.",
    expiryDate: "2026-06-25",
  },
  {
    id: "alt-2",
    title: "Red Heatwave Alert — Northern Plains",
    severity: "critical",
    region: "Rajasthan",
    issuedBy: "India Meteorological Department",
    date: "2026-06-14",
    summary: "Temperatures expected above 47°C. Avoid outdoor activity 11:00–16:00.",
    expiryDate: "2026-06-20",
  },
  {
    id: "alt-3",
    title: "High Flood Watch — Brahmaputra Basin",
    severity: "high",
    region: "Assam",
    issuedBy: "Central Water Commission",
    date: "2026-06-13",
    summary: "River levels above warning at multiple gauges. SDRF on standby.",
    expiryDate: "2026-06-22",
  },
  {
    id: "alt-4",
    title: "Air Quality Advisory — NCR Region",
    severity: "moderate",
    region: "Delhi",
    issuedBy: "Central Pollution Control Board",
    date: "2026-06-12",
    summary: "AQI in poor range. Sensitive groups advised to limit outdoor exposure.",
    expiryDate: "2026-06-19",
  },
];

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: "ntf-1",
    kind: "alert",
    title: "Cyclone warning issued for Odisha",
    body: "NDMA has activated coastal evacuation protocols.",
    date: "2026-06-15T10:00:00.000Z",
    read: false,
    link: "/alerts",
  },
  {
    id: "ntf-2",
    kind: "advisory",
    title: "New advisory: Influenza Vaccination Drive",
    body: "Free vaccination available at all PHCs.",
    date: "2026-06-12T09:30:00.000Z",
    read: false,
    link: "/advisories",
  },
  {
    id: "ntf-3",
    kind: "department",
    title: "CERT-In expanded helpline coverage",
    body: "24x7 cyber crime helpline now available in all states.",
    date: "2026-06-10T14:15:00.000Z",
    read: true,
  },
];

export const SEED_ADVISORIES: Advisory[] = [
  {
    id: "adv-001",
    title: "Nationwide Influenza Vaccination Drive 2026",
    category: "Health",
    department: "Ministry of Health & Family Welfare",
    state: "All India",
    date: "2026-06-12",
    updatedDate: "2026-06-13",
    expiryDate: "2026-08-31",
    priority: "high",
    status: "Important",
    description:
      "Citizens are advised to participate in the seasonal influenza vaccination drive at designated health centres across all districts.",
    content:
      "The Ministry of Health & Family Welfare has launched the annual seasonal influenza vaccination drive across all states and union territories. Free vaccination is available at all government primary health centres, district hospitals, and registered urban health posts from 15 June to 31 August 2026.\n\nPriority groups include senior citizens above 60 years, children below 5 years, pregnant women, healthcare workers, and individuals with chronic respiratory or cardiac conditions. Citizens are requested to carry a valid government-issued photo ID and the e-Health card if available.\n\nFor queries, please contact the National Health Helpline 1075.",
  },
  {
    id: "adv-002",
    title: "Heatwave Alert for Northern and Central Regions",
    category: "Weather",
    department: "India Meteorological Department",
    state: "Rajasthan",
    date: "2026-06-15",
    updatedDate: "2026-06-16",
    expiryDate: "2026-06-22",
    priority: "critical",
    status: "Important",
    description:
      "Severe heatwave conditions expected across northern plains and central regions over the next 72 hours. Avoid outdoor activity between 11 AM and 4 PM.",
    content:
      "The India Meteorological Department has issued an Orange alert for severe heatwave conditions across Punjab, Haryana, Delhi, Uttar Pradesh, Madhya Pradesh, and parts of Rajasthan. Maximum day temperatures are likely to exceed 45°C with low overnight relief.\n\nResidents are advised to stay hydrated, avoid direct exposure to sun between 11:00 and 16:00 hours, wear light cotton clothing, and check on the elderly and vulnerable neighbours. Schools in affected districts are advised to reschedule outdoor activities.\n\nDistrict authorities should ensure availability of ORS, drinking water, and shaded waiting areas at bus stops and public offices.",
  },
  {
    id: "adv-003",
    title: "Advisory on Phishing Attacks Targeting Banking Customers",
    category: "Cyber Security",
    department: "Indian Computer Emergency Response Team (CERT-In)",
    state: "All India",
    date: "2026-06-10",
    updatedDate: "2026-06-10",
    expiryDate: "2026-07-15",
    priority: "high",
    status: "Important",
    description:
      "Increase in phishing campaigns impersonating major banks. Do not share OTPs, PINs, or click on suspicious links received via SMS or email.",
    content:
      "CERT-In has observed a sharp rise in coordinated phishing campaigns targeting customers of major Indian banks. Attackers are sending SMS and email messages impersonating bank security teams, asking customers to verify KYC details via fake URLs.\n\nCitizens are advised to:\n• Never share OTP, CVV, UPI PIN, or net banking credentials with anyone.\n• Verify URLs carefully — official bank domains never use random subdomains.\n• Report suspicious messages to the National Cyber Crime Helpline 1930 or via cybercrime.gov.in.\n• Enable two-factor authentication on all financial accounts.\n\nBanks have been advised to issue customer awareness communications and strengthen email gateway filtering.",
  },
  {
    id: "adv-004",
    title: "Monsoon Sowing Guidelines for Kharif Crops",
    category: "Agriculture",
    department: "Ministry of Agriculture & Farmers Welfare",
    state: "Punjab",
    date: "2026-06-08",
    expiryDate: "2026-07-31",
    priority: "medium",
    status: "Active",
    description:
      "Recommended sowing windows, seed varieties, and fertiliser usage for the 2026 Kharif season have been released for all agro-climatic zones.",
    content:
      "The Ministry of Agriculture & Farmers Welfare, in consultation with ICAR, has released the Kharif 2026 sowing advisory. Farmers are advised to commence sowing of paddy, maize, soybean, and cotton based on the onset of monsoon in their respective agro-climatic zones.\n\nDistrict Krishi Vigyan Kendras will provide certified seeds at subsidised rates. Farmers are encouraged to follow soil health card recommendations for balanced fertiliser application and to adopt water-saving techniques such as direct seeded rice where appropriate.\n\nCrop insurance under PMFBY can be availed up to 15 July 2026 through the nearest bank or Common Service Centre.",
  },
  {
    id: "adv-005",
    title: "Revised Academic Calendar for Central Universities",
    category: "Education",
    department: "University Grants Commission",
    state: "All India",
    date: "2026-05-30",
    priority: "medium",
    status: "Active",
    description:
      "All central universities to align academic sessions with the revised UGC calendar for the 2026-27 academic year.",
    content:
      "The University Grants Commission has notified the revised academic calendar for all central universities and centrally funded institutions for the academic year 2026-27. The odd semester will commence from 1 August 2026 and conclude by 15 December 2026, followed by the even semester from 1 January 2027.\n\nUniversities are directed to ensure timely declaration of results, mandatory internal assessment components, and adoption of the National Credit Framework. Examination delays beyond the notified schedule must be reported to the Commission with justification.",
  },
  {
    id: "adv-006",
    title: "Border Area Movement Restrictions Notification",
    category: "Defence",
    department: "Ministry of Defence",
    state: "Punjab",
    date: "2026-06-01",
    expiryDate: "2026-06-25",
    priority: "high",
    status: "Active",
    description:
      "Restricted movement notification for designated border zones during scheduled defence exercises from 10 to 25 June 2026.",
    content:
      "The Ministry of Defence has notified temporary movement restrictions in designated border zones during a scheduled joint services training exercise. Civilians, drone operators, and unauthorised vehicles are prohibited within the perimeter from 10 June to 25 June 2026.\n\nLocal district administrations have been informed and alternate routes have been published. Violations will attract action under the Official Secrets Act and applicable disaster management provisions. Residents in affected villages will receive support from civil-military liaison officers.",
  },
  {
    id: "adv-007",
    title: "Dengue Prevention Advisory for Urban Local Bodies",
    category: "Health",
    department: "National Centre for Vector Borne Diseases Control",
    state: "Maharashtra",
    date: "2026-06-05",
    priority: "medium",
    status: "Active",
    description:
      "Pre-monsoon dengue prevention measures including source reduction, fogging schedules, and citizen awareness campaigns.",
    content:
      "Urban Local Bodies are directed to intensify source reduction drives ahead of the monsoon season. Weekly fogging schedules must be published and adhered to, with priority for high-incidence wards identified in the 2025 surveillance data.\n\nCitizens are requested to empty stagnant water from coolers, flowerpots, and discarded containers every Sunday. Symptoms such as sudden high fever, severe headache, and joint pain should not be ignored — please consult the nearest government hospital and avoid self-medication with NSAIDs.",
  },
  {
    id: "adv-008",
    title: "Cyclone Preparedness Advisory for Eastern Coast",
    category: "Weather",
    department: "National Disaster Management Authority",
    state: "Odisha",
    date: "2026-06-14",
    expiryDate: "2026-06-25",
    priority: "emergency",
    status: "Important",
    description:
      "Coastal districts of Odisha, Andhra Pradesh, and West Bengal advised to activate cyclone preparedness protocols.",
    content:
      "A low-pressure system over the Bay of Bengal is likely to intensify into a cyclonic storm within 48 hours. Coastal districts of Odisha, Andhra Pradesh, and West Bengal are advised to activate standard cyclone preparedness protocols.\n\nFishermen are advised not to venture into the sea until further notice. Identified shelter homes are being stocked with food, water, and medical supplies. NDRF teams have been pre-positioned at vulnerable locations. Citizens should keep emergency contact numbers and essential documents accessible.",
  },
  {
    id: "adv-009",
    title: "Ransomware Threat Advisory for State Government Networks",
    category: "Cyber Security",
    department: "Indian Computer Emergency Response Team (CERT-In)",
    state: "All India",
    date: "2026-06-02",
    priority: "critical",
    status: "Important",
    description:
      "State government IT departments advised to patch critical vulnerabilities and review backup integrity in response to active ransomware campaigns.",
    content:
      "CERT-In has issued a high-severity advisory on active ransomware campaigns targeting state government and public sector unit networks. Attackers are exploiting unpatched VPN gateways and weak remote desktop credentials.\n\nState IT departments are directed to:\n• Apply latest vendor patches for all internet-facing infrastructure.\n• Disable unused remote access protocols.\n• Maintain offline, immutable backups and validate restore procedures.\n• Conduct user awareness sessions on suspicious attachments.\n\nIncidents must be reported to CERT-In within 6 hours as per the 2022 directions.",
  },
  {
    id: "adv-010",
    title: "Pest Surveillance Advisory for Cotton Growing Regions",
    category: "Agriculture",
    department: "Indian Council of Agricultural Research",
    state: "Maharashtra",
    date: "2026-06-09",
    priority: "medium",
    status: "Active",
    description:
      "Pink bollworm activity reported in parts of Maharashtra and Gujarat. Farmers advised to install pheromone traps and follow integrated pest management.",
    content:
      "ICAR field surveillance has reported early-stage pink bollworm activity in select cotton growing regions of Maharashtra and Gujarat. Farmers are advised to install pheromone traps at the rate of 5 per hectare and monitor populations weekly.\n\nIntegrated Pest Management is recommended: rotate insecticides, avoid blanket spraying, and uproot and destroy rosette flowers. State agriculture departments will provide subsidised lures through Krishi Vigyan Kendras.",
  },
  {
    id: "adv-011",
    title: "National Scholarship Portal — Renewal Deadline Notification",
    category: "Education",
    department: "Ministry of Education",
    state: "All India",
    date: "2026-05-25",
    expiryDate: "2026-06-30",
    priority: "low",
    status: "Active",
    description:
      "Last date for renewal of scholarships under the National Scholarship Portal extended to 30 June 2026.",
    content:
      "The Ministry of Education has extended the last date for renewal of scholarships under the National Scholarship Portal to 30 June 2026. Eligible students must log in with their registered credentials, update academic progress, and re-verify Aadhaar-linked bank account details.\n\nInstitutional nodal officers are responsible for verification of applications within 7 working days of submission. Defaulting institutions will be flagged in the next review cycle.",
  },
  {
    id: "adv-012",
    title: "Veterans' Welfare Outreach Programme Schedule",
    category: "Defence",
    department: "Department of Ex-Servicemen Welfare",
    state: "All India",
    date: "2026-05-28",
    expiryDate: "2026-07-31",
    priority: "medium",
    status: "Active",
    description:
      "District-level outreach camps for ex-servicemen and their dependents scheduled across 75 districts in July 2026.",
    content:
      "The Department of Ex-Servicemen Welfare will conduct district-level outreach camps across 75 districts in July 2026. Services on offer include ECHS enrolment, pension grievance redressal, education concessions for wards, and skill development counselling.\n\nVeterans are requested to carry their Service Pension Pay Order, Discharge Book, and Aadhaar card. Schedules are available on the Kendriya Sainik Board website and at Zila Sainik Welfare Offices.",
  },
  {
    id: "adv-013",
    title: "Air Quality Advisory for Metropolitan Areas",
    category: "Health",
    department: "Central Pollution Control Board",
    state: "Delhi",
    date: "2026-06-07",
    priority: "high",
    status: "Active",
    description:
      "Persons with respiratory conditions advised to limit outdoor exposure in metropolitan areas reporting poor AQI.",
    content:
      "Several metropolitan areas have reported AQI in the 'Poor' to 'Very Poor' range due to elevated PM2.5 levels. Sensitive groups including children, the elderly, and persons with asthma or COPD are advised to limit outdoor activity, especially during early morning and late evening hours.\n\nUse of N95 masks is recommended for outdoor exposure. State pollution control boards have been directed to enforce GRAP measures and step up inspections of construction sites and industrial units.",
  },
  {
    id: "adv-014",
    title: "Flood Watch Advisory — North Eastern States",
    category: "Weather",
    department: "Central Water Commission",
    state: "Assam",
    date: "2026-06-13",
    expiryDate: "2026-06-22",
    priority: "high",
    status: "Active",
    description:
      "River levels rising in Assam and parts of Arunachal Pradesh. Riverside communities advised to remain vigilant.",
    content:
      "Continued heavy rainfall has caused the Brahmaputra and its tributaries to rise above warning levels at multiple monitoring stations. Riverside communities in Assam and adjoining areas of Arunachal Pradesh are advised to remain vigilant and follow instructions from district administrations.\n\nSDRF and NDRF teams have been deployed. Citizens should keep essential documents waterproofed, prepare grab bags, and identify the nearest higher-ground shelter.",
  },
  {
    id: "adv-015",
    title: "Safe Mobile Banking Practices — Citizen Awareness",
    category: "Cyber Security",
    department: "Reserve Bank of India",
    state: "All India",
    date: "2026-05-22",
    priority: "medium",
    status: "Active",
    description:
      "Guidance on safe mobile banking, UPI usage, and recognising fraudulent payment requests.",
    content:
      "The Reserve Bank of India, in collaboration with major payment systems, has released updated citizen guidance on safe digital payments. Customers are reminded to verify payee names before authorising UPI transactions and to enable transaction alerts on all linked accounts.\n\nNever approve a 'collect request' without verifying its origin. Report unauthorised debits within 3 working days to your bank to avail full liability protection under the RBI customer protection framework.",
  },
  {
    id: "adv-026",
    title: "Western Disturbance — Hill State Advisory",
    category: "Weather",
    department: "India Meteorological Department",
    state: "Himachal Pradesh",
    date: "2026-03-15",
    priority: "low",
    status: "Archived",
    description:
      "Travellers to hill states advised of disrupted road conditions due to late-season snowfall.",
    content:
      "A western disturbance brought late-season snowfall to higher reaches of Himachal Pradesh, Uttarakhand, and Jammu & Kashmir in March 2026. The advisory has since been closed; archived for reference.",
  },
];
