import "server-only";

import { allPermissions } from "@/lib/types/permission-types";
import { SERVER_ERRORS, ServerError } from "@/lib/types/server-error";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { checkUserPermissions } from "@/lib/services/user-service";
import { getLoggedUser } from "@/lib/auth/auth";

const handleServerError = (e: Error) => {
    console.error(e.message);

    if (e instanceof ServerError) {
        return e.getErrorCode();
    }
    // Is unhandled error or not added to server errors

    return SERVER_ERRORS.UNHANDLED_ERROR;
};

export const action = createSafeActionClient({
    handleServerError,
});

export const authAction = createSafeActionClient({
    handleServerError,
    defineMetadataSchema: () =>
        z.object({
            permissions: z.array(z.enum(allPermissions)),
            partialPermissions: z.boolean().optional(),
        }),
})
    .use(async ({ next }) => {
        try {
            const user = await getLoggedUser();

            if (!user) {
                throw new ServerError(SERVER_ERRORS.UNAUTHORIZED);
            }

            return await next({ ctx: { user } });
        } catch (e) {
            throw new ServerError(SERVER_ERRORS.UNAUTHORIZED);
        }
    })
    .use(async ({ ctx, next, metadata }) => {
        const { user } = ctx;

        if (!user.id) {
            throw new ServerError(SERVER_ERRORS.UNAUTHORIZED);
        }

        const permissionsCheck = await checkUserPermissions(
            user.id,
            metadata.permissions,
        );

        console.log(permissionsCheck);

        const permissionsFn = metadata.partialPermissions ? "some" : "every";

        const hasPermission = Object.values(permissionsCheck)[permissionsFn](
            (permission) => permission === true,
        );

        if (!hasPermission) {
            throw new ServerError(SERVER_ERRORS.UNAUTHORIZED);
        }

        return await next({ ctx });
    });
