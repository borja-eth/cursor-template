import { findUserPermissionsQuery } from "@/lib/queries/user-queries";
import { getPermissionSlug } from "@/lib/utils/permission-utils";
import { Permissions } from "@/lib/types/permission-types";

import { db } from "@/database";
import { getUserWithRolesQuery, listUsersQuery } from "../queries/user-queries";
import type { UserListParams } from "../types/user-types";
import { eq } from "drizzle-orm";
import { usersToRoles } from "@/database/schema/auth";

export const listUsers = async (params: UserListParams) => {
    try {
        return await listUsersQuery(params);
    } catch (error) {
        throw new Error("Failed to list users");
    }
};

export const getUserWithRoles = async (userId: string) => {
    try {
        const user = await getUserWithRolesQuery(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        throw new Error("Failed to get user");
    }
};

export const updateUserRoles = async (userId: string, roleIds: string[]) => {
    try {
        return await db.transaction(async (tx) => {
            // Delete existing roles
            await tx
                .delete(usersToRoles)
                .where(eq(usersToRoles.userId, userId));

            // Insert new roles
            if (roleIds.length > 0) {
                await tx.insert(usersToRoles).values(
                    roleIds.map((roleId) => ({
                        userId,
                        roleId,
                    })),
                );
            }

            return await getUserWithRolesQuery(userId, tx);
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update user roles");
    }
};

export const checkUserPermissions = async (
    userId: string,
    permission: Permissions[] | Permissions,
): Promise<Record<Permissions, boolean>> => {
    const userPermissions = await findUserPermissionsQuery(userId);

    const permissionToCheck = Array.isArray(permission)
        ? permission
        : [permission];

    return permissionToCheck.reduce(
        (acc, requiredPermission) => {
            const hasPermission =
                acc[requiredPermission] ||
                userPermissions.some(
                    (up) => getPermissionSlug(up) === requiredPermission,
                );

            acc[requiredPermission] = hasPermission;

            return acc;
        },
        {} as Record<Permissions, boolean>,
    );
};
