"use client";

import { useCallback } from "react";
import { useAction } from "next-safe-action/hooks";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Button,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    useToast,
} from "@roxom-markets/spark-ui";
import { Trash2 } from "lucide-react";
import { deletePermissionAction } from "@/lib/actions/permission-actions";
import type { Permission } from "@/lib/types/permission-types";
import { useRouter } from "next/navigation";

interface PermissionListProps {
    permissions: Permission[];
}

export const PermissionList = ({ permissions }: PermissionListProps) => {
    const { toast } = useToast();
    const { refresh } = useRouter();
    const { execute } = useAction(deletePermissionAction, {
        onSuccess: () => {
            toast({
                title: "Done!",
                description: "Permission deleted successfully",
                variant: "success",
            });
            refresh();
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to delete permission",
                variant: "destructive",
            });
        },
    });

    const handleDelete = useCallback(
        async (id: string) => {
            execute({ id });
        },
        [execute],
    );

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Entity</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {permissions.map((permission) => (
                        <TableRow key={permission.id}>
                            <TableCell className="font-medium">
                                {permission.entity}
                            </TableCell>
                            <TableCell>{permission.action}</TableCell>
                            <TableCell>{permission.description}</TableCell>
                            <TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Delete Permission
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete
                                                this permission? This action
                                                cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        handleDelete(
                                                            permission.id,
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
