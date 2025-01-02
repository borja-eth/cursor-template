import { RoleForm } from "@/components/auth/security/role-form";
import { withPermissionPage } from "@/lib/middlewares/withPermissionPage";
import { getAllPermissions } from "@/lib/services/permission-service";
import { findRoleWithPermissions } from "@/lib/services/role-service";
import { Permissions } from "@/lib/types/permission-types";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@roxom-markets/spark-ui";

type EditRolePageProps = {
    params: {
        roleId: string;
    };
};

const EditRolePage = async ({ params }: EditRolePageProps) => {
    const { roleId } = params;

    const [role, permissions] = await Promise.all([
        findRoleWithPermissions(roleId),
        getAllPermissions(),
    ]);

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Edit Role</CardTitle>
            </CardHeader>
            <CardContent>
                <RoleForm permissions={permissions} role={role} />
            </CardContent>
        </Card>
    );
};

export default withPermissionPage(EditRolePage, {
    permissions: [Permissions.ROLE_UPDATE],
});
