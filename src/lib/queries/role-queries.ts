import { DatabaseConnection, db } from "@/database";
import { permissionsToRoles, role } from "@/database/schema/auth";
import type {
    CreateRoleSchema,
    UpdateRoleSchema,
} from "@/lib/schemas/role-schemas";
import type { RoleWithPermissions } from "@/lib/types/role-types";
import { eq } from "drizzle-orm";

export const findRoleByNameQuery = async (
    name: string,
    connection: DatabaseConnection = db,
) => {
    const roles = await connection
        .select()
        .from(role)
        .where(eq(role.name, name));

    return roles[0];
};

export const findRoleByIdQuery = async (
    id: string,
    connection: DatabaseConnection = db,
) => {
    const roles = await connection.select().from(role).where(eq(role.id, id));

    return roles[0];
};

export const findRoleWithPermissionsQuery = async (
    id: string,
    connection: DatabaseConnection = db,
): Promise<RoleWithPermissions | undefined> => {
    const foundRole = await connection.query.role.findFirst({
        where: eq(role.id, id),
        orderBy: [role.name],
        with: {
            permissionsToRoles: {
                with: {
                    permission: true,
                },
            },
        },
    });

    if (!foundRole) {
        return undefined;
    }

    return {
        ...foundRole,
        permissions: foundRole.permissionsToRoles.map((pr) => pr.permission),
    };
};

export const listRolesWithPermissionsQuery = async (
    connection: DatabaseConnection = db,
): Promise<RoleWithPermissions[]> => {
    const data = await connection.query.role.findMany({
        orderBy: [role.name],
        with: {
            permissionsToRoles: {
                with: {
                    permission: true,
                },
            },
        },
    });

    return data.map((r) => ({
        ...r,
        permissions: r.permissionsToRoles.map((pr) => pr.permission),
        permissionsToRoles: undefined,
    }));
};

export const createRoleQuery = async (
    data: CreateRoleSchema,
    connection: DatabaseConnection = db,
) => {
    const [newRole] = await connection
        .insert(role)
        .values({
            name: data.name,
            description: data.description,
        })
        .returning();

    if (data.permissionIds.length > 0) {
        await connection.insert(permissionsToRoles).values(
            data.permissionIds.map((newPerm) => ({
                roleId: newRole.id,
                permissionId: newPerm.id,
            })),
        );
    }

    return newRole;
};

export const updateRoleQuery = async (
    data: UpdateRoleSchema,
    connection: DatabaseConnection = db,
) => {
    return await connection.transaction(async (tx) => {
        const [updatedRole] = await tx
            .update(role)
            .set({
                name: data.name,
                description: data.description,
                updatedAt: new Date(),
            })
            .where(eq(role.id, data.id))
            .returning();

        // Update permissions
        await tx
            .delete(permissionsToRoles)
            .where(eq(permissionsToRoles.roleId, data.id));

        if (data.permissionIds.length > 0) {
            await tx.insert(permissionsToRoles).values(
                data.permissionIds.map((perm) => ({
                    roleId: data.id,
                    permissionId: perm.id,
                })),
            );
        }

        return updatedRole;
    });
};

export const deleteRoleQuery = async (
    id: string,
    connection: DatabaseConnection = db,
) => {
    const [deletedRole] = await connection
        .delete(role)
        .where(eq(role.id, id))
        .returning();

    return deletedRole;
};
