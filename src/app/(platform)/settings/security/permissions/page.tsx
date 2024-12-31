import { PermissionForm } from "@/components/auth/security/permission-form";
import { PermissionFormHelpDialog } from "@/components/auth/security/permission-form-help-dialog";
import { PermissionList } from "@/components/auth/security/permission-list";
import { getAllPermissions } from "@/lib/services/permission-service";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@roxom-markets/spark-ui";

export const dynamic = "force-dynamic";

const PermissionPage = async () => {
    const permissions = await getAllPermissions();

    return (
        <div className="container mx-auto py-10">
            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center w-full justify-between">
                            <CardTitle>Create Permission</CardTitle>
                            <PermissionFormHelpDialog />
                        </div>
                        <CardDescription>
                            Create a new permission to control access to
                            specific features or resources.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PermissionForm />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                        <CardDescription>
                            See and manage existing permissions in the app.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PermissionList permissions={permissions} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PermissionPage;
