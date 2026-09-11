import type { OrgSlug } from "./organizations";

export type UserRole = "admin" | "staff" | "customer";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  orgs: OrgSlug[] | "all";
  status: "active" | "inactive";
}

/**
 * FRONTEND PROTOTYPE CREDENTIALS — deliberately non-production identities.
 * Real authentication/authorization must live in a backend with database
 * policies; these mock users only demonstrate UI roles.
 */
export const DEMO_PASSWORD = "demo1234";

export const mockUsers: AdminUser[] = [
  {
    id: "u-admin",
    name: "Demo Admin",
    email: "admin@demo.local",
    role: "admin",
    orgs: "all",
    status: "active",
  },
  {
    id: "u-staff-orveen",
    name: "Demo Staff ORVEEN",
    email: "staff.orveen@demo.local",
    role: "staff",
    orgs: ["orveen"],
    status: "active",
  },
  {
    id: "u-staff-reliable",
    name: "Demo Staff Reliable",
    email: "staff.reliable@demo.local",
    role: "staff",
    orgs: ["reliable"],
    status: "active",
  },
  {
    id: "u-customer",
    name: "Demo Customer",
    email: "customer@demo.local",
    role: "customer",
    orgs: [],
    status: "active",
  },
];

export const demoAccounts: { email: string; password: string; role: UserRole }[] = mockUsers.map(
  (u) => ({ email: u.email, password: DEMO_PASSWORD, role: u.role }),
);
