import {
    db,
    eq,
    permission,
    permissionsToRoles,
    role,
    user,
    usersToRoles,
} from "@/database";

import { DatabaseConnection } from "@/database";

import { asc, ilike, or } from "drizzle-orm";
import type { UserListParams } from "../types/user-types";

export const listUsersQuery = async (
    { search }: UserListParams,
    connection: DatabaseConnection = db,
) => {
    const users = await connection.query.user.findMany({
        where: search
            ? or(
                  ilike(user.name || "", `%${search}%`),
                  ilike(user.email || "", `%${search}%`),
              )
            : undefined,
        orderBy: asc(user.name),
        with: {
            roles: {
                with: {
                    role: true,
                },
            },
        },
    });

    return users.map((u) => ({
        ...u,
        roles: u.roles.map((r) => ({ id: r.role.id, name: r.role.name })),
    }));
};

export const getUserWithRolesQuery = async (
    userId: string,
    connection: DatabaseConnection = db,
) => {
    const result = await connection
        .select({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                image: user.image,
            },
            role: {
                id: role.id,
                name: role.name,
            },
        })
        .from(user)
        .innerJoin(usersToRoles, eq(usersToRoles.userId, user.id))
        .innerJoin(role, eq(role.id, usersToRoles.roleId))
        .where(eq(user.id, userId));

    if (!result.length) return null;

    const userData = result[0].user;
    const roles = result.filter((r) => r.role.id !== null).map((r) => r.role);

    return {
        ...userData,
        roles,
    };
};

export const findUserPermissions = async (
    id: string,
    connection: DatabaseConnection = db,
) => {
    const permissions = await connection
        .selectDistinct({
            permissionId: permission.id,
            action: permission.action,
            entity: permission.entity,
        })
        .from(user)
        .innerJoin(usersToRoles, eq(user.id, usersToRoles.userId))
        .innerJoin(role, eq(usersToRoles.roleId, role.id))
        .innerJoin(permissionsToRoles, eq(role.id, permissionsToRoles.roleId))
        .innerJoin(
            permission,
            eq(permissionsToRoles.permissionId, permission.id),
        )
        .where(eq(user.id, id));

    return permissions;
};
