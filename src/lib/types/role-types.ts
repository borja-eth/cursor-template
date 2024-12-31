import { permission, role } from "@/database/schema/auth";
import type { InferSelectModel } from "drizzle-orm";

export type Role = InferSelectModel<typeof role>;
export type Permission = InferSelectModel<typeof permission>;

export interface RoleWithPermissions extends Role {
    permissions: Permission[];
}

export interface RoleFormData {
    name: string;
    description?: string;
    permissionIds: string[];
}
