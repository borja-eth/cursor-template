import { RoleForm } from "@/components/auth/security/role-form";
import { withPermissionPage } from "@/lib/middlewares/withPermissionPage";
import { getAllPermissions } from "@/lib/services/permission-service";
import { Permissions } from "@/lib/types/permission-types";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@roxom-markets/spark-ui";
import React from "react";

const NewRolePage = async () => {
    const permissions = await getAllPermissions();

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Create Role</CardTitle>
            </CardHeader>
            <CardContent>
                <RoleForm permissions={permissions} />
            </CardContent>
        </Card>
    );
};

export default withPermissionPage(NewRolePage, {
    permissions: [Permissions.ROLE_CREATE],
});
