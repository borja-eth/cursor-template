"use client";

import { deleteRoleAction } from "@/lib/actions/role-actions";
import type { RoleWithPermissions } from "@/lib/types/role-types";
import { Routes } from "@/routes";
import {
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    useToast,
} from "@roxom-markets/spark-ui";
import { MoreVertical, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RoleListProps {
    roles: RoleWithPermissions[];
}

export const RoleList = ({ roles }: RoleListProps) => {
    const { toast } = useToast();
    const { refresh } = useRouter();

    const { execute: executeDelete } = useAction(deleteRoleAction, {
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Role deleted successfully",
                variant: "success",
            });
            refresh();
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong while deleting the role",
                variant: "destructive",
            });
        },
    });

    const handleDelete = (role: RoleWithPermissions) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            executeDelete({ id: role.id });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Roles</h2>
                <Link
                    className="flex items-center gap-2"
                    href={Routes.SETTINGS.SECURITY.ROLES.NEW}
                >
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Role
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                    <Card key={role.id} className="dark:border border-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {role.name}
                            </CardTitle>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="h-8 w-8 p-0"
                                        variant="ghost"
                                    >
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="bg-neutral-2 dark:bg-neutral-11 border border-border"
                                >
                                    <DropdownMenuItem asChild>
                                        <Link
                                            className=""
                                            href={Routes.SETTINGS.SECURITY.ROLES.EDIT(
                                                role.id,
                                            )}
                                        >
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => handleDelete(role)}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm">
                                {role.description || "No description"}
                            </CardDescription>
                            <div className="mt-2 flex flex-wrap gap-1">
                                {role.permissions.map((permission) => (
                                    <Badge
                                        key={permission.id}
                                        className="text-xs"
                                        variant="secondary"
                                    >
                                        {permission.action} {permission.entity}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
