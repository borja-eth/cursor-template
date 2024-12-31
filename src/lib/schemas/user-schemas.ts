import { z } from "zod";

export const userListParamsSchema = z.object({
    search: z.string().optional(),
});

export const updateUserRolesSchema = z.object({
    userId: z.string(),
    roleIds: z.array(z.string().uuid()),
});
