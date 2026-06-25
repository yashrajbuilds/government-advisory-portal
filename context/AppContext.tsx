import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  AdvisoryService,
  CategoryService,
  DepartmentService,
  AlertService,
  NotificationService,
  LogService,
} from "../services";
import type {
  Advisory,
  Category,
  Department,
  EmergencyAlert,
  Notification,
  ActivityLog,
  Role,
  Language,
} from "../types";
import { StorageHelper } from "../repositories/StorageHelper";

interface AppState {
  advisories: Advisory[];
  categories: Category[];
  departments: Department[];
  alerts: EmergencyAlert[];
  notifications: Notification[];
  activityLogs: ActivityLog[];
  role: Role;
  language: Language;

  // Advisory CRUD
  createAdvisory: (a: Omit<Advisory, "id" | "date" | "updatedDate">) => Advisory;
  updateAdvisory: (id: string, patch: Partial<Advisory>) => void;
  deleteAdvisory: (id: string) => void;
  archiveAdvisory: (id: string) => void;

  // Category CRUD
  createCategory: (name: string, description: string) => void;
  updateCategory: (id: string, patch: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Department CRUD
  createDepartment: (d: Omit<Department, "id">) => void;
  updateDepartment: (id: string, patch: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;

  // Alert CRUD
  createAlert: (a: Omit<EmergencyAlert, "id" | "date">) => void;
  deleteAlert: (id: string) => void;

  // Notifications
  pushNotification: (
    kind: Notification["kind"],
    title: string,
    body: string,
    link?: string,
  ) => void;
  markAllRead: () => void;
  clearNotifications: () => void;

  // System
  clearLogs: () => void;
  setRole: (r: Role) => void;
  setLanguage: (l: Language) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppState | null>(null);

const LS_KEYS = {
  role: "gp:v4:role",
  language: "gp:v4:language",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  // Core States (loaded from services which delegate to repositories)
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [role, setRoleState] = useState<Role>("citizen");
  const [language, setLanguageState] = useState<Language>("en");

  // Hydrate data from repositories on mount
  useEffect(() => {
    setAdvisories(AdvisoryService.getAll());
    setCategories(CategoryService.getAll());
    setDepartments(DepartmentService.getAll());
    setAlerts(AlertService.getAll());
    setNotifications(NotificationService.getNotifications());
    setActivityLogs(LogService.getLogs());
    setRoleState(StorageHelper.read<Role>(LS_KEYS.role, "citizen"));
    setLanguageState(StorageHelper.read<Language>(LS_KEYS.language, "en"));
    setHydrated(true);
  }, []);

  // Sync role/language with LocalStorage on change
  useEffect(() => {
    if (hydrated) {
      StorageHelper.write(LS_KEYS.role, role);
    }
  }, [hydrated, role]);

  useEffect(() => {
    if (hydrated) {
      StorageHelper.write(LS_KEYS.language, language);
    }
  }, [hydrated, language]);

  // Refresh helper to sync UI state with repository updates
  const syncWithStorage = useCallback(() => {
    setAdvisories(AdvisoryService.getAll());
    setCategories(CategoryService.getAll());
    setDepartments(DepartmentService.getAll());
    setAlerts(AlertService.getAll());
    setNotifications(NotificationService.getNotifications());
    setActivityLogs(LogService.getLogs());
  }, []);

  /* ==========================================
   * Mutation Operations (delegating to Services)
   * ========================================== */

  const createAdvisory = useCallback(
    (a: Omit<Advisory, "id" | "date" | "updatedDate">) => {
      const newAdv = AdvisoryService.create(a, role);
      syncWithStorage();
      return newAdv;
    },
    [role, syncWithStorage],
  );

  const updateAdvisory = useCallback(
    (id: string, patch: Partial<Advisory>) => {
      AdvisoryService.update(id, patch, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const deleteAdvisory = useCallback(
    (id: string) => {
      AdvisoryService.delete(id, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const archiveAdvisory = useCallback(
    (id: string) => {
      AdvisoryService.archive(id, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const createCategory = useCallback(
    (name: string, description: string) => {
      CategoryService.create(name, description, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const updateCategory = useCallback(
    (id: string, patch: Partial<Category>) => {
      CategoryService.update(id, patch, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const deleteCategory = useCallback(
    (id: string) => {
      CategoryService.delete(id, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const createDepartment = useCallback(
    (d: Omit<Department, "id">) => {
      DepartmentService.create(d, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const updateDepartment = useCallback(
    (id: string, patch: Partial<Department>) => {
      DepartmentService.update(id, patch, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const deleteDepartment = useCallback(
    (id: string) => {
      DepartmentService.delete(id, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const createAlert = useCallback(
    (a: Omit<EmergencyAlert, "id" | "date">) => {
      AlertService.create(a, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const deleteAlert = useCallback(
    (id: string) => {
      AlertService.delete(id, role);
      syncWithStorage();
    },
    [role, syncWithStorage],
  );

  const pushNotification = useCallback(
    (kind: Notification["kind"], title: string, body: string, link?: string) => {
      NotificationService.addNotification(kind, title, body, link);
      syncWithStorage();
    },
    [syncWithStorage],
  );

  const markAllRead = useCallback(() => {
    NotificationService.markAllRead();
    syncWithStorage();
  }, [syncWithStorage]);

  const clearNotifications = useCallback(() => {
    NotificationService.clearAll();
    syncWithStorage();
  }, [syncWithStorage]);

  const clearLogs = useCallback(() => {
    LogService.clearLogs(role);
    syncWithStorage();
  }, [role, syncWithStorage]);

  const setRole = useCallback((r: Role) => {
    setRoleState(r);
  }, []);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
  }, []);

  const resetAll = useCallback(() => {
    // Clear LocalStorage variables to restore factory seeds
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("gp:v4:advisories");
      window.localStorage.removeItem("gp:v4:categories");
      window.localStorage.removeItem("gp:v4:departments");
      window.localStorage.removeItem("gp:v4:alerts");
      window.localStorage.removeItem("gp:v4:notifications");
      window.localStorage.removeItem("gp:v4:logs");
    }

    // Trigger seeds reloading
    setAdvisories(AdvisoryService.getAll());
    setCategories(CategoryService.getAll());
    setDepartments(DepartmentService.getAll());
    setAlerts(AlertService.getAll());
    setNotifications(NotificationService.getNotifications());

    // Log system reset
    LogService.addLog("RESET", "SYSTEM", "system", "Reset all data to default seeds", role);
    setActivityLogs(LogService.getLogs());

    setRoleState("citizen");
    setLanguageState("en");
  }, [role]);

  const value = useMemo<AppState>(
    () => ({
      advisories,
      categories,
      departments,
      alerts,
      notifications,
      activityLogs,
      role,
      language,
      createAdvisory,
      updateAdvisory,
      deleteAdvisory,
      archiveAdvisory,
      createCategory,
      updateCategory,
      deleteCategory,
      createDepartment,
      updateDepartment,
      deleteDepartment,
      createAlert,
      deleteAlert,
      pushNotification,
      markAllRead,
      clearNotifications,
      clearLogs,
      setRole,
      setLanguage,
      resetAll,
    }),
    [
      advisories,
      categories,
      departments,
      alerts,
      notifications,
      activityLogs,
      role,
      language,
      createAdvisory,
      updateAdvisory,
      deleteAdvisory,
      archiveAdvisory,
      createCategory,
      updateCategory,
      deleteCategory,
      createDepartment,
      updateDepartment,
      deleteDepartment,
      createAlert,
      deleteAlert,
      pushNotification,
      markAllRead,
      clearNotifications,
      clearLogs,
      setRole,
      setLanguage,
      resetAll,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function useAdvisoryById(id: string) {
  const { advisories } = useApp();
  return advisories.find((a) => a.id === id);
}

export function useStats() {
  const { advisories, departments, alerts } = useApp();
  return useMemo(() => {
    const total = advisories.length;
    const active = advisories.filter(
      (a) => a.status === "Active" || a.status === "Important",
    ).length;
    const archived = advisories.filter((a) => a.status === "Archived").length;
    const statesCovered = new Set(advisories.map((a) => a.state)).size;
    const departmentsCount = departments.length;
    const emergencies = alerts.length;
    return { total, active, archived, statesCovered, departments: departmentsCount, emergencies };
  }, [advisories, departments, alerts]);
}
