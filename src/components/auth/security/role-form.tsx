"use client";

import { createRoleAction, updateRoleAction } from "@/lib/actions/role-actions";
import {
    createRoleSchema,
    UpdateRoleSchema,
    updateRoleSchema,
} from "@/lib/schemas/role-schemas";
import type { Permission, RoleWithPermissions } from "@/lib/types/role-types";
import { Routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Checkbox,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Textarea,
    useToast,
} from "@roxom-markets/spark-ui";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

interface RoleFormProps {
    role?: RoleWithPermissions;
    permissions: Permission[];
}

export const RoleForm = ({ role, permissions }: RoleFormProps) => {
    const form = useForm<UpdateRoleSchema>({
        defaultValues: {
            id: role?.id ?? undefined,
            name: role?.name ?? "",
            description: role?.description ?? "",
            permissionIds: (role?.permissions ?? []).map((p) => ({
                id: p.id,
            })),
        },
        resolver: zodResolver(role ? updateRoleSchema : createRoleSchema),
    });

    const {
        append,
        remove,
        fields: selectedPermissions,
    } = useFieldArray({
        control: form.control,
        name: "permissionIds",
        keyName: "_fieldArrayKey",
    });

    const { toast } = useToast();
    const { push } = useRouter();
    const { execute, status } = useAction(
        role ? updateRoleAction : createRoleAction,
        {
            onSuccess: () => {
                toast({
                    title: "Done!",
                    description: role
                        ? "Role updated successfully"
                        : "Role created successfully",
                    variant: "success",
                });
                push(Routes.SETTINGS.SECURITY.ROLES.INDEX);
            },
            onError: (error) => {
                console.error(error);
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "destructive",
                });
            },
        },
    );

    const onSubmit = form.handleSubmit((data) => {
        execute(data);
    });

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={onSubmit}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Administrator" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description{" "}
                                <span className="text-muted-foreground text-xs">
                                    (optional)
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-none bg-neutral-2 dark:bg-neutral-9"
                                    placeholder="Description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {permissions.map((permission) => {
                    const selectedIdx = selectedPermissions.findIndex(
                        (p) => p.id === permission.id,
                    );

                    return (
                        <FormItem
                            key={permission.id}
                            className="flex flex-row gap-2 items-center space-y-0"
                        >
                            <FormControl>
                                <Checkbox
                                    checked={selectedIdx !== -1}
                                    value={permission.id}
                                    onCheckedChange={(check) => {
                                        if (check) {
                                            append({ id: permission.id });
                                        } else {
                                            remove(selectedIdx);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormLabel className="leading-none mt-0">
                                {permission.entity}:{permission.action}
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    );
                })}

                <Button
                    className="w-full"
                    disabled={status === "executing"}
                    type="submit"
                >
                    {status === "executing"
                        ? "Saving..."
                        : role
                          ? "Update Role"
                          : "Create Role"}
                </Button>
            </form>
        </Form>
    );
};
