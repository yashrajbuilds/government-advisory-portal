import { StorageHelper } from "./StorageHelper";
import {
  SEED_ADVISORIES,
  SEED_CATEGORIES,
  SEED_DEPARTMENTS,
  SEED_ALERTS,
  SEED_NOTIFICATIONS,
} from "../constants/seedData";
import type {
  Advisory,
  Category,
  Department,
  EmergencyAlert,
  Notification,
  ActivityLog,
  Role,
} from "../types";

const KEYS = {
  advisories: "gp:v4:advisories",
  categories: "gp:v4:categories",
  departments: "gp:v4:departments",
  alerts: "gp:v4:alerts",
  notifications: "gp:v4:notifications",
  logs: "gp:v4:logs",
};

export class AdvisoryRepository {
  static getAll(): Advisory[] {
    return StorageHelper.read(KEYS.advisories, SEED_ADVISORIES);
  }

  static saveAll(list: Advisory[]): void {
    StorageHelper.write(KEYS.advisories, list);
  }

  static getById(id: string): Advisory | undefined {
    return this.getAll().find((a) => a.id === id);
  }

  static create(advisory: Advisory): void {
    const list = this.getAll();
    list.unshift(advisory);
    this.saveAll(list);
  }

  static update(id: string, patch: Partial<Advisory>): void {
    const list = this.getAll().map((a) =>
      a.id === id ? { ...a, ...patch, updatedDate: new Date().toISOString().slice(0, 10) } : a,
    );
    this.saveAll(list);
  }

  static delete(id: string): void {
    const list = this.getAll().filter((a) => a.id !== id);
    this.saveAll(list);
  }
}

export class CategoryRepository {
  static getAll(): Category[] {
    return StorageHelper.read(KEYS.categories, SEED_CATEGORIES);
  }

  static saveAll(list: Category[]): void {
    StorageHelper.write(KEYS.categories, list);
  }

  static create(category: Category): void {
    const list = this.getAll();
    list.push(category);
    this.saveAll(list);
  }

  static update(id: string, patch: Partial<Category>): void {
    const list = this.getAll().map((c) => (c.id === id ? { ...c, ...patch } : c));
    this.saveAll(list);
  }

  static delete(id: string): void {
    const list = this.getAll().filter((c) => c.id !== id);
    this.saveAll(list);
  }
}

export class DepartmentRepository {
  static getAll(): Department[] {
    return StorageHelper.read(KEYS.departments, SEED_DEPARTMENTS);
  }

  static saveAll(list: Department[]): void {
    StorageHelper.write(KEYS.departments, list);
  }

  static create(department: Department): void {
    const list = this.getAll();
    list.push(department);
    this.saveAll(list);
  }

  static update(id: string, patch: Partial<Department>): void {
    const list = this.getAll().map((d) => (d.id === id ? { ...d, ...patch } : d));
    this.saveAll(list);
  }

  static delete(id: string): void {
    const list = this.getAll().filter((d) => d.id !== id);
    this.saveAll(list);
  }
}

export class AlertRepository {
  static getAll(): EmergencyAlert[] {
    return StorageHelper.read(KEYS.alerts, SEED_ALERTS);
  }

  static saveAll(list: EmergencyAlert[]): void {
    StorageHelper.write(KEYS.alerts, list);
  }

  static create(alert: EmergencyAlert): void {
    const list = this.getAll();
    list.unshift(alert);
    this.saveAll(list);
  }

  static delete(id: string): void {
    const list = this.getAll().filter((a) => a.id !== id);
    this.saveAll(list);
  }
}

export class NotificationRepository {
  static getAll(): Notification[] {
    return StorageHelper.read(KEYS.notifications, SEED_NOTIFICATIONS);
  }

  static saveAll(list: Notification[]): void {
    StorageHelper.write(KEYS.notifications, list);
  }

  static create(notification: Notification): void {
    const list = this.getAll();
    list.unshift(notification);
    this.saveAll(list);
  }

  static markAllRead(): void {
    const list = this.getAll().map((n) => ({ ...n, read: true }));
    this.saveAll(list);
  }

  static clearAll(): void {
    this.saveAll([]);
  }
}

export class ActivityLogRepository {
  static getAll(): ActivityLog[] {
    return StorageHelper.read(KEYS.logs, []);
  }

  static saveAll(list: ActivityLog[]): void {
    StorageHelper.write(KEYS.logs, list);
  }

  static create(log: ActivityLog): void {
    const list = this.getAll();
    list.unshift(log);
    this.saveAll(list);
  }

  static clearAll(): void {
    this.saveAll([]);
  }
}
