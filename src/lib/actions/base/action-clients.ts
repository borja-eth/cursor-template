import "server-only";

import { allPermissions } from "@/lib/types/permission-types";
import { SERVER_ERRORS, ServerError } from "@/lib/types/server-error";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

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
        const session = {
            user: {
                id: "1",
            },
        };

        if (!session || !session.user || !session.user.id) {
            throw new Error("Not logged in - Unauthorized");
        }

        const { user } = session;

        return await next({ ctx: { user } });
    })
    .use(async ({ ctx, next }) => {
        const { user } = ctx;

        if (!user.id) {
            throw new Error("No tienes permisos para realizar esta acción");
        }

        const hasPermission = true;
        // TODO: Check permissions

        if (!hasPermission) {
            throw new Error("No tienes permisos para realizar esta acción");
        }

        return await next({ ctx });
    });
