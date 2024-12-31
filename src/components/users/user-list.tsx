"use client";

import { UserRoleCell } from "@/components/users/user-role-cell";
import { listUsersAction } from "@/lib/actions/user-actions";
import { Role } from "@/lib/types/role-types";
import {
    Card,
    Input,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@roxom-markets/spark-ui";
import { useDebounce } from "@uidotdev/usehooks";
import { format } from "date-fns";
import { useAction } from "next-safe-action/hooks";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

type UserListProps = {
    roles: Role[];
};
export const UserList: FC<UserListProps> = ({ roles }) => {
    const [search, setSearch] = useState<string>("");

    const { execute, result, status } = useAction(listUsersAction);

    const handleSearch = useCallback((search: string) => {
        setSearch(search);
    }, []);

    const searchValue = useDebounce(search, 500);

    // Fetch users when params change
    useEffect(() => {
        execute({ search: searchValue });
    }, [execute, searchValue]);

    const users = useMemo(() => result.data ?? [], [result.data]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <Input
                    className="max-w-sm"
                    placeholder="Search users..."
                    value={search || ""}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <Card className="p-4 min-h-[400px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead>Verified</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {status !== "executing"
                            ? users.map((user) => (
                                  <TableRow key={user.id}>
                                      <TableCell className="font-medium">
                                          {user.name || "N/A"}
                                      </TableCell>
                                      <TableCell>{user.email}</TableCell>
                                      <TableCell>
                                          <UserRoleCell
                                              roles={roles}
                                              user={user}
                                              onRoleChanges={() => {
                                                  execute({
                                                      search: searchValue,
                                                  });
                                              }}
                                          />
                                      </TableCell>
                                      <TableCell>
                                          {user.emailVerified
                                              ? format(
                                                    new Date(
                                                        user.emailVerified,
                                                    ),
                                                    "PP",
                                                )
                                              : "Not verified"}
                                      </TableCell>
                                  </TableRow>
                              ))
                            : new Array(5).fill(null).map((_, i) => (
                                  <TableRow key={i}>
                                      <TableCell colSpan={4}>
                                          <Skeleton className="h-8 w-full" />
                                      </TableCell>
                                  </TableRow>
                              ))}
                        {status === "hasSucceeded" && users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <span className="text-sm text-muted-foreground">
                                        No users found
                                    </span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};
