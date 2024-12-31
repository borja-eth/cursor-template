import { RoleList } from "@/components/auth/security/role-list";
import { listRolesWithPermissions } from "@/lib/services/role-service";

export const dynamic = "force-dynamic";

const RolesPage = async () => {
    const roles = await listRolesWithPermissions();

    return (
        <div className="container mx-auto py-6">
            <RoleList roles={roles} />
        </div>
    );
};

export default RolesPage;
