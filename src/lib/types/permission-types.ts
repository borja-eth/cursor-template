import { z } from "zod";
import type {
    permission,
    role,
    permissionsToRoles,
    usersToRoles,
} from "@/database/schema/auth";

// Database Types
export type Permission = typeof permission.$inferSelect;
export type Role = typeof role.$inferSelect;
export type PermissionToRole = typeof permissionsToRoles.$inferSelect;
export type UserToRole = typeof usersToRoles.$inferSelect;

// Validation Schemas
export const permissionSchema = z.object({
    action: z.string().min(1).max(256),
    entity: z.string().min(1).max(256),
    description: z.string().optional(),
});

export const roleSchema = z.object({
    name: z.string().min(1).max(256),
    description: z.string().optional(),
    permissions: z.array(z.string().uuid()).optional(),
});

export const assignRoleSchema = z.object({
    userId: z.string(),
    roleId: z.string().uuid(),
});

export type CreatePermissionInput = z.infer<typeof permissionSchema>;
export type CreateRoleInput = z.infer<typeof roleSchema>;
export type AssignRoleInput = z.infer<typeof assignRoleSchema>;

export enum Permissions {
    // User permissions
    USER_LIST = "user:list",
    USER_READ = "user:read",

    // Role permissions
    ROLE_LIST = "role:list",
    ROLE_READ = "role:read",
    ROLE_CREATE = "role:create",
    ROLE_UPDATE = "role:update",
    ROLE_DELETE = "role:delete",
    ROLE_ASSIGN = "role:assign",

    // Permission permissions
    PERMISSION_LIST = "permission:list",
    PERMISSION_READ = "permission:read",
    PERMISSION_CREATE = "permission:create",
    PERMISSION_UPDATE = "permission:update",
    PERMISSION_DELETE = "permission:delete",
}

export const allPermissions = [
    ...Object.values(Permissions),
] as const as readonly [Permissions, ...Permissions[]];
