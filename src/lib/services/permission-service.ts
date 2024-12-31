import "server-only";

import {
    findPermissionByUniqueQuery,
    createPermissionQuery as createPermissionQuery,
    findRoleByNameQuery,
    createRoleQuery as createRoleQuery,
    assignPermissionsToRoleQuery,
    getUserPermissionsQuery,
    getAllPermissionsQuery,
    deletePermissionQuery,
} from "../queries/permission-queries";
import type {
    CreatePermissionInput,
    CreateRoleInput,
} from "../types/permission-types";

export async function createPermission(input: CreatePermissionInput) {
    const existing = await findPermissionByUniqueQuery(
        input.action,
        input.entity,
    );

    if (existing) {
        throw new Error("Permission with these attributes already exists");
    }

    return createPermissionQuery(input);
}

export async function createRole({
    permissions: permissionIds,
    ...roleData
}: CreateRoleInput) {
    const existing = await findRoleByNameQuery(roleData.name);

    if (existing) {
        throw new Error("Role with this name already exists");
    }

    const [role] = await createRoleQuery(roleData);

    if (permissionIds?.length) {
        await assignPermissionsToRoleQuery(role.id, permissionIds);
    }

    return role;
}

export async function getUserPermissions(userId: string) {
    const userRoles = await getUserPermissionsQuery(userId);

    // Transform the nested data into a flat permissions array
    return userRoles.flatMap((ur) =>
        ur.role.permissionsToRoles.map((rp) => rp.permission),
    );
}

export async function getAllPermissions() {
    return getAllPermissionsQuery();
}

export async function deletePermission(id: string) {
    const [deletedPermission] = await deletePermissionQuery(id);

    if (!deletedPermission) {
        throw new Error("Permission not found");
    }

    return deletedPermission;
}
