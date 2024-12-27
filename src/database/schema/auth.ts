import { relations } from "drizzle-orm";
import {
    pgTable,
    primaryKey,
    text,
    timestamp,
    uuid,
    varchar,
    unique,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
    roles: many(usersToRoles),
}));

/*
export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    }),
);
*/

export const role = pgTable("role", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 256 }).unique().notNull(),
    description: text("description").default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const roleRelations = relations(role, ({ many }) => ({
    users: many(usersToRoles),
    permissions: many(permissionsToRoles),
}));

export const usersToRoles = pgTable(
    "users_to_roles",
    {
        roleId: uuid("role_id")
            .notNull()
            .references(() => role.id, { onDelete: "cascade" }),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.roleId, t.userId] }),
    }),
);

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
    role: one(role, {
        fields: [usersToRoles.roleId],
        references: [role.id],
    }),
    user: one(users, {
        fields: [usersToRoles.userId],
        references: [users.id],
    }),
}));

export const permission = pgTable(
    "permission",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        action: varchar("action", { length: 256 }).notNull(),
        entity: varchar("entity", { length: 256 }).notNull(),
        access: varchar("access", { length: 256 }).notNull(),
        description: text("description").default(""),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
        updatedAt: timestamp("updated_at", { withTimezone: true }),
    },
    (t) => ({
        unq: unique().on(t.action, t.entity, t.access),
    }),
);

export const permissionRelations = relations(permission, ({ many }) => ({
    roles: many(permissionsToRoles),
}));

export const permissionsToRoles = pgTable(
    "permissions_to_roles",
    {
        roleId: uuid("role_id")
            .notNull()
            .references(() => role.id, { onDelete: "cascade" }),
        permissionId: uuid("permission_id")
            .notNull()
            .references(() => permission.id, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.roleId, t.permissionId] }),
    }),
);

export const permissionsToRolesRelations = relations(
    permissionsToRoles,
    ({ one }) => ({
        role: one(role, {
            fields: [permissionsToRoles.roleId],
            references: [role.id],
        }),
        permission: one(permission, {
            fields: [permissionsToRoles.permissionId],
            references: [permission.id],
        }),
    }),
);
