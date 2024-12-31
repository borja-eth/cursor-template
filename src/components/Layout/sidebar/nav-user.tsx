"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Routes } from "@/routes";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    Skeleton,
    useSidebar,
} from "@roxom-markets/spark-ui";
import { signOut, useSession } from "next-auth/react";
import { Fragment, useMemo } from "react";
export function NavUser() {
    const { isMobile } = useSidebar();

    const { data, status } = useSession();

    const { email, image, name } = data?.user ?? {};
    const initials = useMemo(() => {
        return (
            name
                ?.split(" ")
                ?.map((n) => n[0])
                .join("")
                .slice(0, 2) ?? ""
        );
    }, [name]);

    const UserAvatar = useMemo(() => {
        return (
            <Avatar className="size-8 rounded-lg">
                <AvatarImage alt={name ?? undefined} src={image ?? undefined} />
                <AvatarFallback className="rounded-lg">
                    {initials}
                </AvatarFallback>
            </Avatar>
        );
    }, [initials, image, name]);

    if (status === "unauthenticated") {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            size="lg"
                        >
                            {status === "loading" && (
                                <Skeleton className="size-8 rounded-full" />
                            )}
                            {status === "authenticated" && (
                                <Fragment>
                                    {UserAvatar}
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {email}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </Fragment>
                            )}
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    {status === "authenticated" && (
                        <DropdownMenuContent
                            align="end"
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-neutral-2 dark:bg-neutral-11 border border-border"
                            side={isMobile ? "bottom" : "right"}
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    {UserAvatar}
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    signOut({
                                        redirect: true,
                                        redirectTo: Routes.AUTH.LOGIN,
                                    })
                                }
                            >
                                <LogOut className="size-4 mr-2 text-destructive" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    )}
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
