"use server";

import { authAction } from "@/lib/actions/base/action-clients";
import { Permissions } from "@/lib/types/permission-types";
import { z } from "zod";
import {
    updateUserRolesSchema,
    userListParamsSchema,
} from "../schemas/user-schemas";
import {
    getUserWithRoles,
    listUsers,
    updateUserRoles,
} from "../services/user-service";

export const listUsersAction = authAction
    .metadata({
        permissions: [Permissions.USER_LIST],
    })
    .schema(userListParamsSchema)
    .action(async ({ parsedInput }) => {
        return await listUsers(parsedInput);
    });

export const getUserWithRolesAction = authAction
    .metadata({
        permissions: [Permissions.USER_READ],
    })
    .schema(z.object({ userId: z.string() }))
    .action(async ({ parsedInput }) => {
        return await getUserWithRoles(parsedInput.userId);
    });

export const updateUserRolesAction = authAction
    .metadata({
        permissions: [Permissions.ROLE_ASSIGN],
    })
    .schema(updateUserRolesSchema)
    .action(async ({ parsedInput }) => {
        const { userId, roleIds } = parsedInput;

        return await updateUserRoles(userId, roleIds);
    });
