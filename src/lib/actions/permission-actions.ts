"use server";

import { permissionSchema, roleSchema } from "../types/permission-types";
import {
    createPermission,
    createRole,
    getUserPermissions,
    getAllPermissions,
    deletePermission,
} from "../services/permission-service";
import { z } from "zod";
import { action } from "@/lib/actions/base/action-clients";

export const createPermissionAction = action
    .schema(permissionSchema)
    .action(async ({ parsedInput }) => {
        const data = parsedInput;

        return await createPermission(data);
    });

export const createRoleAction = action
    .schema(roleSchema)
    .action(async ({ parsedInput }) => {
        const data = parsedInput;

        return await createRole(data);
    });

export const getUserPermissionsAction = action
    .schema(z.object({ userId: z.string() }))
    .action(async ({ parsedInput }) => {
        const { userId } = parsedInput;

        return await getUserPermissions(userId);
    });

export const getAllPermissionsAction = action
    .schema(z.void())
    .action(async () => {
        return await getAllPermissions();
    });

export const deletePermissionAction = action
    .schema(z.object({ id: z.string() }))
    .action(async ({ parsedInput }) => {
        const { id } = parsedInput;

        return await deletePermission(id);
    });
