import { RoleList } from "@/components/auth/security/role-list";
import { withPermissionPage } from "@/lib/middlewares/withPermissionPage";
import { listRolesWithPermissions } from "@/lib/services/role-service";
import { Permissions } from "@/lib/types/permission-types";

export const dynamic = "force-dynamic";

const RolesPage = async () => {
    const roles = await listRolesWithPermissions();

    return (
        <div className="container mx-auto py-6">
            <RoleList roles={roles} />
        </div>
    );
};

export default withPermissionPage(RolesPage, {
    permissions: [Permissions.ROLE_LIST],
});
