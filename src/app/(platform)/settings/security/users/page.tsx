import { UserList } from "@/components/users/user-list";
import { withPermissionPage } from "@/lib/middlewares/withPermissionPage";
import { listRolesWithPermissions } from "@/lib/services/role-service";
import { Permissions } from "@/lib/types/permission-types";

export const metadata = {
    title: "User Management",
    description: "Manage users and their roles",
};

const UsersPage = async () => {
    const roles = await listRolesWithPermissions();

    return (
        <div className="flex flex-col gap-6">
            <UserList roles={roles} />
        </div>
    );
};

export default withPermissionPage(UsersPage, {
    permissions: [Permissions.USER_LIST],
});
