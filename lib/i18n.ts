import { useApp } from "../context/AppContext";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.advisories": "Advisories",
  "nav.departments": "Departments",
  "nav.states": "States",
  "nav.alerts": "Alerts",
  "nav.analytics": "Analytics",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.admin": "Admin",
  "nav.bookmarks": "Bookmarks",
  "common.search": "Search",
  "common.all": "All",
  "common.viewAll": "View all",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.delete": "Delete",
  "common.edit": "Edit",
  "common.create": "Create",
  "common.archive": "Archive",
  "common.reset": "Reset",
  "common.signedInAs": "Signed in as",
  "role.citizen": "Citizen",
  "role.officer": "Officer",
  "role.admin": "Super Admin",
  "notifications.title": "Notifications",
  "notifications.empty": "You have no notifications.",
  "notifications.markAll": "Mark all read",
  "notifications.clear": "Clear",
  "stats.total": "Total Advisories",
  "stats.active": "Active Advisories",
  "stats.states": "States Covered",
  "stats.departments": "Departments",
  "stats.archived": "Archived",
  "stats.emergencies": "Emergency Notices",
};

const hi: Dict = {
  "nav.home": "मुख्य पृष्ठ",
  "nav.advisories": "परामर्श",
  "nav.departments": "विभाग",
  "nav.states": "राज्य",
  "nav.alerts": "चेतावनी",
  "nav.analytics": "विश्लेषण",
  "nav.about": "परिचय",
  "nav.contact": "संपर्क",
  "nav.admin": "प्रशासन",
  "nav.bookmarks": "बुकमार्क",
  "common.search": "खोजें",
  "common.all": "सभी",
  "common.viewAll": "सभी देखें",
  "common.save": "सहेजें",
  "common.cancel": "रद्द करें",
  "common.delete": "हटाएँ",
  "common.edit": "संपादित करें",
  "common.create": "बनाएँ",
  "common.archive": "संग्रहित करें",
  "common.reset": "रीसेट",
  "common.signedInAs": "लॉग इन",
  "role.citizen": "नागरिक",
  "role.officer": "अधिकारी",
  "role.admin": "महाप्रशासक",
  "notifications.title": "सूचनाएँ",
  "notifications.empty": "कोई सूचना नहीं।",
  "notifications.markAll": "सभी पढ़ी हुई",
  "notifications.clear": "साफ़ करें",
  "stats.total": "कुल परामर्श",
  "stats.active": "सक्रिय परामर्श",
  "stats.states": "राज्य कवर",
  "stats.departments": "विभाग",
  "stats.archived": "संग्रहित",
  "stats.emergencies": "आपातकालीन सूचनाएँ",
};

const dicts = { en, hi };

export function useT() {
  const { language } = useApp();
  const dict = dicts[language] ?? en;
  return (key: string) => dict[key] ?? en[key] ?? key;
}
