"use client";

import { createPermissionAction } from "@/lib/actions/permission-actions";
import type { CreatePermissionInput } from "@/lib/types/permission-types";
import { permissionSchema } from "@/lib/types/permission-types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useToast,
} from "@roxom-markets/spark-ui";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const PermissionForm = () => {
    const { refresh } = useRouter();
    const { toast } = useToast();
    const form = useForm<CreatePermissionInput>({
        resolver: zodResolver(permissionSchema),
        defaultValues: {
            action: "",
            entity: "",
            description: "",
        } satisfies CreatePermissionInput,
    });

    const { execute, status } = useAction(createPermissionAction, {
        onSuccess: () => {
            toast({
                title: "Done!",
                description: "Permission created successfully",
                variant: "success",
            });
            form.reset();
            refresh();
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to create permission",
                variant: "destructive",
            });
        },
    });

    const onSubmit = async (data: CreatePermissionInput) => {
        execute(data);
    };

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="entity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Entity</FormLabel>
                            <FormControl>
                                <Input placeholder="user" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="action"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Action</FormLabel>
                            <FormControl>
                                <Input placeholder="create" {...field} />
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Allows creating new users"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={status === "executing"} type="submit">
                    Create Permission
                </Button>
            </form>
        </Form>
    );
};
