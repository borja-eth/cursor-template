import { Permission } from "@/lib/types/permission-types";

export const getPermissionSlug = (
    permission: Pick<Permission, "entity" | "action">,
) => {
    return `${permission.entity}:${permission.action}`;
};
