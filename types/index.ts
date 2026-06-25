export type Role = "citizen" | "officer" | "admin";
export type Language = "en" | "hi";

export type AdvisoryCategory =
  | "Health"
  | "Weather"
  | "Agriculture"
  | "Education"
  | "Cyber Security"
  | "Defence";

export type AdvisoryStatus = "Active" | "Important" | "Archived";

export type AdvisoryPriority = "emergency" | "critical" | "high" | "medium" | "low";

export type AdvisoryState =
  | "All India"
  | "Andaman and Nicobar Islands"
  | "Andhra Pradesh"
  | "Arunachal Pradesh"
  | "Assam"
  | "Bihar"
  | "Chandigarh"
  | "Chhattisgarh"
  | "Dadra and Nagar Haveli and Daman and Diu"
  | "Delhi"
  | "Goa"
  | "Gujarat"
  | "Haryana"
  | "Himachal Pradesh"
  | "Jammu and Kashmir"
  | "Jharkhand"
  | "Karnataka"
  | "Kerala"
  | "Ladakh"
  | "Lakshadweep"
  | "Madhya Pradesh"
  | "Maharashtra"
  | "Manipur"
  | "Meghalaya"
  | "Mizoram"
  | "Nagaland"
  | "Odisha"
  | "Puducherry"
  | "Punjab"
  | "Rajasthan"
  | "Sikkim"
  | "Tamil Nadu"
  | "Telangana"
  | "Tripura"
  | "Uttar Pradesh"
  | "Uttarakhand"
  | "West Bengal";

export interface Advisory {
  id: string;
  title: string;
  category: AdvisoryCategory;
  department: string;
  state: AdvisoryState;
  date: string; // ISO format (YYYY-MM-DD)
  updatedDate?: string; // ISO format
  expiryDate?: string; // ISO format
  priority: AdvisoryPriority;
  status: AdvisoryStatus;
  description: string;
  content: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  state: AdvisoryState;
  contact: string;
}

export type AlertSeverity = "critical" | "high" | "moderate";

export interface EmergencyAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  region: AdvisoryState;
  issuedBy: string;
  date: string; // ISO format
  summary: string;
  expiryDate?: string;
}

export type NotificationKind = "advisory" | "alert" | "department";

export interface Notification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  date: string; // ISO format
  read: boolean;
  link?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string; // ISO format
  action: "CREATE" | "UPDATE" | "DELETE" | "ARCHIVE" | "RESET";
  entityType: "ADVISORY" | "CATEGORY" | "DEPARTMENT" | "ALERT" | "SYSTEM";
  entityId: string;
  details: string;
  role: Role;
}
