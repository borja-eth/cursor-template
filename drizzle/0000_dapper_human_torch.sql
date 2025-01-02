CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"action" varchar(256) NOT NULL,
	"entity" varchar(256) NOT NULL,
	"description" text DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	CONSTRAINT "permission_action_entity_unique" UNIQUE("action","entity")
);
--> statement-breakpoint
CREATE TABLE "permissions_to_roles" (
	"role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL,
	CONSTRAINT "permissions_to_roles_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" text DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	CONSTRAINT "role_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users_to_roles" (
	"role_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "users_to_roles_role_id_user_id_pk" PRIMARY KEY("role_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "permissions_to_roles_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions_to_roles" ADD CONSTRAINT "permissions_to_roles_permission_id_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;

INSERT INTO public.role (id, name, description, created_at, updated_at) VALUES ('e6980b64-b619-4544-8115-edafe332218c', 'Administrator', 'A role with all the app permissions', '2024-12-31 17:42:48.643427 +00:00', '2025-01-02 13:09:13.181000 +00:00');

INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('678e0584-94ff-452b-9f88-28cef8f60358', 'create', 'permission', 'Allows creating new permissions', '2024-12-31 16:17:14.595019 +00:00', '2024-12-31 16:17:14.593000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('9ab031f1-524b-4e38-ae6c-5d90c9677446', 'delete', 'permission', 'Allows deleting existing permissions', '2024-12-31 16:19:10.875800 +00:00', '2024-12-31 16:19:10.873000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('3a0ff507-4dba-4ae4-9bca-5bcafa309037', 'list', 'user', 'Read list of users', '2025-01-02 13:06:15.540519 +00:00', '2025-01-02 13:06:15.517000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('76eecac9-f119-49c4-af08-802f436595e2', 'read', 'user', 'Read a single user', '2025-01-02 13:06:38.152912 +00:00', '2025-01-02 13:06:38.148000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('854e6942-3a1c-4dba-9731-5176edbb100d', 'list', 'role', 'List the app roles', '2025-01-02 13:07:16.518750 +00:00', '2025-01-02 13:07:16.517000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('3c5168f9-66fa-41d8-b4f7-3ca06aea6afb', 'read', 'role', 'Read a single role', '2025-01-02 13:07:25.199211 +00:00', '2025-01-02 13:07:25.195000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('10f7c245-ca7f-4b3e-a90d-da677b46635c', 'create', 'role', 'Create a role', '2025-01-02 13:07:33.874639 +00:00', '2025-01-02 13:07:33.873000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('38f29745-b2b6-4e35-b8b5-5450360f7a85', 'update', 'role', 'Update a role', '2025-01-02 13:07:44.688493 +00:00', '2025-01-02 13:07:44.687000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('1e0454f7-1d83-42bd-89db-cfcedee88d6b', 'delete', 'role', 'Delete a role', '2025-01-02 13:08:09.911197 +00:00', '2025-01-02 13:08:09.910000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('4c05be31-2be5-4e00-b869-57e937c5d3b9', 'assign', 'role', 'Assign a role to users', '2025-01-02 13:08:20.095840 +00:00', '2025-01-02 13:08:20.094000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('6c911acf-6e30-41b0-9e5a-b3717f049e1e', 'list', 'permission', 'List permissions', '2025-01-02 13:08:30.660350 +00:00', '2025-01-02 13:08:30.659000 +00:00');
INSERT INTO public.permission (id, action, entity, description, created_at, updated_at) VALUES ('89b11044-c986-4ed6-8a8d-dbf1a932ea44', 'read', 'permission', 'Read a single permission', '2025-01-02 13:08:39.990715 +00:00', '2025-01-02 13:08:39.987000 +00:00');

INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '9ab031f1-524b-4e38-ae6c-5d90c9677446');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '678e0584-94ff-452b-9f88-28cef8f60358');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '6c911acf-6e30-41b0-9e5a-b3717f049e1e');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '89b11044-c986-4ed6-8a8d-dbf1a932ea44');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '4c05be31-2be5-4e00-b869-57e937c5d3b9');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '10f7c245-ca7f-4b3e-a90d-da677b46635c');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '1e0454f7-1d83-42bd-89db-cfcedee88d6b');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '854e6942-3a1c-4dba-9731-5176edbb100d');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '3c5168f9-66fa-41d8-b4f7-3ca06aea6afb');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '38f29745-b2b6-4e35-b8b5-5450360f7a85');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '3a0ff507-4dba-4ae4-9bca-5bcafa309037');
INSERT INTO public.permissions_to_roles (role_id, permission_id) VALUES ('e6980b64-b619-4544-8115-edafe332218c', '76eecac9-f119-49c4-af08-802f436595e2');
