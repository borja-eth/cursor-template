"use client";

import { updateUserRolesAction } from "@/lib/actions/user-actions";
import { Role } from "@/lib/types/role-types";
import { UserWithRoles } from "@/lib/types/user-types";
import {
    Badge,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Form,
    Label,
    useToast,
} from "@roxom-markets/spark-ui";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

interface UserRoleCellProps {
    user: UserWithRoles;
    roles: Role[];
    onRoleChanges?: () => void;
}

export const UserRoleCell = ({
    user,
    roles,
    onRoleChanges,
}: UserRoleCellProps) => {
    const { toast } = useToast();
    const { refresh } = useRouter();

    const form = useForm<{ roles: { id: string }[] }>({
        defaultValues: {
            roles: user.roles.map((r) => ({ id: r.id })),
        },
    });

    const {
        fields: formRoles,
        append,
        remove,
    } = useFieldArray({
        control: form.control,
        name: "roles",
        keyName: "_fieldArrayKey",
    });

    const { execute: updateRoles, status } = useAction(updateUserRolesAction, {
        onSuccess: () => {
            toast({
                title: "Success",
                description: "User roles updated successfully",
                variant: "success",
            });
            refresh();
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error || "Failed to update user roles",
                variant: "destructive",
            });
        },
    });

    const handleSave = form.handleSubmit((data) => {
        updateRoles({ userId: user.id, roleIds: data.roles.map((r) => r.id) });
    });

    const handleOpenChange = (open: boolean) => {
        if (status === "hasSucceeded" && !open) {
            onRoleChanges?.();
        }
    };

    const { roles: userRoles } = user;

    return (
        <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1">
                {userRoles.map((role) => (
                    <Badge key={role.id} variant="secondary">
                        {role.name}
                    </Badge>
                ))}
                {userRoles.length === 0 && (
                    <span className="text-sm text-muted-foreground">
                        No roles
                    </span>
                )}
            </div>
            <Dialog onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button size="sm" variant="ghost">
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User Roles</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Form {...form}>
                            <form className="space-y-4" onSubmit={handleSave}>
                                {roles.map((role) => {
                                    const selectedIdx = formRoles.findIndex(
                                        (r) => r.id === role.id,
                                    );

                                    return (
                                        <div
                                            key={role.id}
                                            className="flex flex-row items-center gap-2"
                                        >
                                            <Checkbox
                                                checked={selectedIdx !== -1}
                                                id={role.id}
                                                name={role.id}
                                                value={role.id}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        append({ id: role.id });
                                                    } else {
                                                        remove(selectedIdx);
                                                    }
                                                }}
                                            />
                                            <Label htmlFor={role.id}>
                                                {role.name}
                                            </Label>
                                        </div>
                                    );
                                })}
                                <Button
                                    disabled={status === "executing"}
                                    loading={status === "executing"}
                                    type="submit"
                                >
                                    Save changes
                                </Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
