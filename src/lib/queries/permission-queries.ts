import "server-only";

import { db } from "@/database";
import {
    permission,
    role,
    permissionsToRoles,
    usersToRoles,
} from "@/database/schema/auth";
import { eq, and } from "drizzle-orm";
import type { DatabaseConnection } from "@/database";
import type {
    CreatePermissionInput,
    CreateRoleInput,
} from "../types/permission-types";

export const findPermissionByUniqueQuery = async (
    action: string,
    entity: string,
    connection: DatabaseConnection = db,
) => {
    return connection.query.permission.findFirst({
        where: and(
            eq(permission.action, action),
            eq(permission.entity, entity),
        ),
    });
};

export const createPermissionQuery = async (
    data: CreatePermissionInput,
    connection: DatabaseConnection = db,
) => {
    return connection
        .insert(permission)
        .values({
            ...data,
            updatedAt: new Date(),
        })
        .returning();
};

export const findRoleByNameQuery = async (
    name: string,
    connection: DatabaseConnection = db,
) => {
    return connection.query.role.findFirst({
        where: eq(role.name, name),
    });
};

export const createRoleQuery = async (
    data: CreateRoleInput,
    connection: DatabaseConnection = db,
) => {
    return connection
        .insert(role)
        .values({
            name: data.name,
            description: data.description,
            updatedAt: new Date(),
        })
        .returning();
};

export const assignPermissionsToRoleQuery = async (
    roleId: string,
    permissionIds: string[],
    connection: DatabaseConnection = db,
) => {
    return connection.insert(permissionsToRoles).values(
        permissionIds.map((permissionId) => ({
            roleId,
            permissionId,
        })),
    );
};

export const getUserPermissionsQuery = async (
    userId: string,
    connection: DatabaseConnection = db,
) => {
    return connection.query.usersToRoles.findMany({
        where: eq(usersToRoles.userId, userId),
        with: {
            role: {
                with: {
                    permissionsToRoles: {
                        with: {
                            permission: true,
                        },
                    },
                },
            },
        },
    });
};

export const getAllPermissionsQuery = async (
    connection: DatabaseConnection = db,
) => {
    return connection.query.permission.findMany({
        orderBy: [permission.entity, permission.action],
    });
};

export const deletePermissionQuery = async (
    id: string,
    connection: DatabaseConnection = db,
) => {
    return connection
        .delete(permission)
        .where(eq(permission.id, id))
        .returning();
};
