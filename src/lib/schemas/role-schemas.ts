import { z } from "zod";

export const createRoleSchema = z.object({
    name: z
        .string()
        .min(1, "Role name is required")
        .max(256, "Role name must be less than 256 characters"),
    description: z
        .string()
        .max(1000, "Description must be less than 1000 characters")
        .optional(),
    permissionIds: z.array(z.object({ id: z.string().uuid() })).default([]),
});

export const updateRoleSchema = createRoleSchema.extend({
    id: z.string().uuid(),
});

export const deleteRoleSchema = z.object({
    id: z.string().uuid(),
});

export type CreateRoleSchema = z.infer<typeof createRoleSchema>;
export type UpdateRoleSchema = z.infer<typeof updateRoleSchema>;
export type DeleteRoleSchema = z.infer<typeof deleteRoleSchema>;
