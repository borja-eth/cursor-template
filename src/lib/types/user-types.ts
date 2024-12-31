import { type user } from "@/database/schema/auth";
import { userListParamsSchema } from "@/lib/schemas/user-schemas";
import { z } from "zod";

export type User = typeof user.$inferSelect;

export interface UserWithRoles extends User {
    roles: {
        id: string;
        name: string;
    }[];
}

export type UserListParams = z.infer<typeof userListParamsSchema>;
