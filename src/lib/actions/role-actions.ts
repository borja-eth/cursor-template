"use server";
import { authAction } from "@/lib/actions/base/action-clients";
import {
    createRoleSchema,
    updateRoleSchema,
    deleteRoleSchema,
} from "@/lib/schemas/role-schemas";
import {
    createRole,
    updateRole,
    deleteRole,
    findRoleWithPermissions,
    listRolesWithPermissions,
    listRoles,
} from "@/lib/services/role-service";
import { Permissions } from "@/lib/types/permission-types";
import { z } from "zod";

export const createRoleAction = authAction
    .metadata({
        permissions: [Permissions.ROLE_CREATE],
    })
    .schema(createRoleSchema)
    .action(async ({ parsedInput }) => {
        console.log("Creating role", parsedInput);

        return await createRole(parsedInput);
    });

export const updateRoleAction = authAction
    .metadata({
        permissions: [Permissions.ROLE_UPDATE],
    })
    .schema(updateRoleSchema)
    .action(async ({ parsedInput }) => {
        console.log("Updating role", parsedInput);

        return await updateRole(parsedInput);
    });

export const deleteRoleAction = authAction
    .metadata({
        permissions: [Permissions.ROLE_DELETE],
    })
    .schema(deleteRoleSchema)
    .action(async ({ parsedInput }) => {
        return await deleteRole(parsedInput.id);
    });

export const findRoleWithPermissionsAction = async (id: string) => {
    return findRoleWithPermissions(id);
};

export const listRolesWithPermissionsAction = async () => {
    return listRolesWithPermissions();
};

export const listRolesAction = authAction
    .metadata({
        permissions: [Permissions.ROLE_LIST],
    })
    .schema(z.object({}).optional())
    .action(async () => {
        return await listRoles();
    });
