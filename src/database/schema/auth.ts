import { relations } from "drizzle-orm";
import {
    pgTable,
    primaryKey,
    text,
    timestamp,
    uuid,
    varchar,
    unique,
    integer,
    boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const user = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
});

export const userRelations = relations(user, ({ many }) => ({
    roles: many(usersToRoles),
}));

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    }),
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    }),
);

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: text("transports"),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    }),
);

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
    permissionsToRoles: many(permissionsToRoles),
}));

export const usersToRoles = pgTable(
    "users_to_roles",
    {
        roleId: uuid("role_id")
            .notNull()
            .references(() => role.id, { onDelete: "cascade" }),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
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
    user: one(user, {
        fields: [usersToRoles.userId],
        references: [user.id],
    }),
}));

export const permission = pgTable(
    "permission",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        action: varchar("action", { length: 256 }).notNull(),
        entity: varchar("entity", { length: 256 }).notNull(),
        description: text("description").default(""),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
        updatedAt: timestamp("updated_at", { withTimezone: true }),
    },
    (t) => ({
        unq: unique().on(t.action, t.entity),
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
