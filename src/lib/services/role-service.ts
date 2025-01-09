import "server-only";

import type {
    CreateRoleSchema,
    UpdateRoleSchema,
} from "@/lib/schemas/role-schemas";
import {
    findRoleByNameQuery,
    findRoleByIdQuery,
    createRoleQuery,
    updateRoleQuery,
    deleteRoleQuery,
    findRoleWithPermissionsQuery,
    listRolesWithPermissionsQuery,
} from "@/lib/queries/role-queries";
import type { DatabaseConnection } from "@/database";
import { db } from "@/database";
import { role } from "@/database/schema/auth";

export const createRole = async (
    data: CreateRoleSchema,
    connection?: DatabaseConnection,
) => {
    const existingRole = await findRoleByNameQuery(data.name, connection);

    if (existingRole) {
        throw new Error("A role with this name already exists");
    }

    return createRoleQuery(data, connection);
};

export const updateRole = async (
    data: UpdateRoleSchema,
    connection?: DatabaseConnection,
) => {
    const existingRole = await findRoleByIdQuery(data.id, connection);

    if (!existingRole) {
        throw new Error("Role not found");
    }

    const roleWithSameName = await findRoleByNameQuery(data.name, connection);

    if (roleWithSameName && roleWithSameName.id !== data.id) {
        throw new Error("A role with this name already exists");
    }

    return updateRoleQuery(data, connection);
};

export const deleteRole = async (
    id: string,
    connection?: DatabaseConnection,
) => {
    const existingRole = await findRoleByIdQuery(id, connection);

    if (!existingRole) {
        throw new Error("Role not found");
    }

    return deleteRoleQuery(id, connection);
};

export const findRoleWithPermissions = async (
    id: string,
    connection?: DatabaseConnection,
) => {
    const role = await findRoleWithPermissionsQuery(id, connection);

    if (!role) {
        throw new Error("Role not found");
    }

    return role;
};

export const listRolesWithPermissions = (connection?: DatabaseConnection) => {
    return listRolesWithPermissionsQuery(connection);
};

export const listRoles = async () => {
    try {
        const roles = await db.select().from(role);

        return { roles };
    } catch (error) {
        throw new Error("Failed to list roles");
    }
};
