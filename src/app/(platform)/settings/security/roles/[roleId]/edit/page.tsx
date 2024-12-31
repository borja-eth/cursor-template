import { RoleForm } from "@/components/auth/security/role-form";
import { getAllPermissions } from "@/lib/services/permission-service";
import { findRoleWithPermissions } from "@/lib/services/role-service";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@roxom-markets/spark-ui";
import { FC } from "react";

type EditRolePageProps = {
    params: {
        roleId: string;
    };
};

const EditRolePage: FC<EditRolePageProps> = async ({ params }) => {
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

export default EditRolePage;
