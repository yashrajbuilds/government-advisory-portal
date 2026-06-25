import {
  AdvisoryRepository,
  CategoryRepository,
  DepartmentRepository,
  AlertRepository,
  NotificationRepository,
  ActivityLogRepository,
} from "../repositories";
import type {
  Advisory,
  Category,
  Department,
  EmergencyAlert,
  Notification,
  ActivityLog,
  Role,
  AdvisoryStatus,
  AdvisoryPriority,
  AdvisoryState,
  AdvisoryCategory,
} from "../types";

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}

export class LogService {
  static getLogs(): ActivityLog[] {
    return ActivityLogRepository.getAll();
  }

  static addLog(
    action: ActivityLog["action"],
    entityType: ActivityLog["entityType"],
    entityId: string,
    details: string,
    role: Role,
  ): void {
    const log: ActivityLog = {
      id: uid("log"),
      timestamp: new Date().toISOString(),
      action,
      entityType,
      entityId,
      details,
      role,
    };
    ActivityLogRepository.create(log);
  }

  static clearLogs(role: Role): void {
    ActivityLogRepository.clearAll();
    this.addLog("RESET", "SYSTEM", "system", "Cleared all system activity logs", role);
  }
}

export class NotificationService {
  static getNotifications(): Notification[] {
    return NotificationRepository.getAll();
  }

  static addNotification(
    kind: Notification["kind"],
    title: string,
    body: string,
    link?: string,
  ): void {
    const notification: Notification = {
      id: uid("ntf"),
      kind,
      title,
      body,
      date: new Date().toISOString(),
      read: false,
      link,
    };
    NotificationRepository.create(notification);
  }

  static markAllRead(): void {
    NotificationRepository.markAllRead();
  }

  static clearAll(): void {
    NotificationRepository.clearAll();
  }
}

export class AdvisoryService {
  static getAll(): Advisory[] {
    return AdvisoryRepository.getAll();
  }

  static create(params: Omit<Advisory, "id" | "date" | "updatedDate">, role: Role): Advisory {
    const newAdv: Advisory = {
      ...params,
      id: uid("adv"),
      date: new Date().toISOString().slice(0, 10),
    };
    AdvisoryRepository.create(newAdv);

    // Side effects
    NotificationService.addNotification(
      "advisory",
      `New advisory: ${newAdv.title}`,
      newAdv.description,
      `/advisory/${newAdv.id}`,
    );

    LogService.addLog(
      "CREATE",
      "ADVISORY",
      newAdv.id,
      `Created advisory: "${newAdv.title}" (${newAdv.category}, ${newAdv.state})`,
      role,
    );

    return newAdv;
  }

  static update(id: string, patch: Partial<Advisory>, role: Role): void {
    const old = AdvisoryRepository.getById(id);
    AdvisoryRepository.update(id, patch);

    LogService.addLog(
      "UPDATE",
      "ADVISORY",
      id,
      `Updated advisory details for: "${patch.title || old?.title || id}"`,
      role,
    );
  }

  static delete(id: string, role: Role): void {
    const old = AdvisoryRepository.getById(id);
    AdvisoryRepository.delete(id);

    LogService.addLog("DELETE", "ADVISORY", id, `Deleted advisory: "${old?.title || id}"`, role);
  }

  static archive(id: string, role: Role): void {
    const old = AdvisoryRepository.getById(id);
    AdvisoryRepository.update(id, { status: "Archived" as AdvisoryStatus });

    LogService.addLog("ARCHIVE", "ADVISORY", id, `Archived advisory: "${old?.title || id}"`, role);
  }
}

export class CategoryService {
  static getAll(): Category[] {
    return CategoryRepository.getAll();
  }

  static create(name: string, description: string, role: Role): void {
    const newCat: Category = {
      id: uid("cat"),
      name,
      description,
    };
    CategoryRepository.create(newCat);

    LogService.addLog("CREATE", "CATEGORY", newCat.id, `Created category: "${name}"`, role);
  }

  static update(id: string, patch: Partial<Category>, role: Role): void {
    const old = CategoryRepository.getAll().find((c) => c.id === id);
    CategoryRepository.update(id, patch);

    LogService.addLog(
      "UPDATE",
      "CATEGORY",
      id,
      `Updated category: "${patch.name || old?.name || id}"`,
      role,
    );
  }

  static delete(id: string, role: Role): void {
    const old = CategoryRepository.getAll().find((c) => c.id === id);
    CategoryRepository.delete(id);

    LogService.addLog("DELETE", "CATEGORY", id, `Deleted category: "${old?.name || id}"`, role);
  }
}

export class DepartmentService {
  static getAll(): Department[] {
    return DepartmentRepository.getAll();
  }

  static create(params: Omit<Department, "id">, role: Role): void {
    const newDep: Department = {
      ...params,
      id: uid("dep"),
    };
    DepartmentRepository.create(newDep);

    NotificationService.addNotification(
      "department",
      `New department directory: ${newDep.name}`,
      `Contact details: ${newDep.contact}`,
    );

    LogService.addLog(
      "CREATE",
      "DEPARTMENT",
      newDep.id,
      `Created department: "${newDep.name}" (${newDep.shortName}, ${newDep.state})`,
      role,
    );
  }

  static update(id: string, patch: Partial<Department>, role: Role): void {
    const old = DepartmentRepository.getAll().find((d) => d.id === id);
    DepartmentRepository.update(id, patch);

    LogService.addLog(
      "UPDATE",
      "DEPARTMENT",
      id,
      `Updated department details for: "${patch.name || old?.name || id}"`,
      role,
    );
  }

  static delete(id: string, role: Role): void {
    const old = DepartmentRepository.getAll().find((d) => d.id === id);
    DepartmentRepository.delete(id);

    LogService.addLog(
      "DELETE",
      "DEPARTMENT",
      id,
      `Deleted department directory: "${old?.name || id}"`,
      role,
    );
  }
}

export class AlertService {
  static getAll(): EmergencyAlert[] {
    return AlertRepository.getAll();
  }

  static create(params: Omit<EmergencyAlert, "id" | "date">, role: Role): void {
    const newAlert: EmergencyAlert = {
      ...params,
      id: uid("alt"),
      date: new Date().toISOString().slice(0, 10),
    };
    AlertRepository.create(newAlert);

    NotificationService.addNotification(
      "alert",
      `Emergency alert: ${newAlert.title}`,
      newAlert.summary,
      "/alerts",
    );

    LogService.addLog(
      "CREATE",
      "ALERT",
      newAlert.id,
      `Issued emergency alert: "${newAlert.title}" (${newAlert.severity}, ${newAlert.region})`,
      role,
    );
  }

  static delete(id: string, role: Role): void {
    const old = AlertRepository.getAll().find((a) => a.id === id);
    AlertRepository.delete(id);

    LogService.addLog(
      "DELETE",
      "ALERT",
      id,
      `Withdrew emergency alert: "${old?.title || id}"`,
      role,
    );
  }
}
