export const Routes = {
    HOME: "/",
    AUTH: {
        LOGIN: "/login",
    },
    SETTINGS: {
        SECURITY: {
            INDEX: "/settings/security",
            USERS: {
                INDEX: "/settings/security/users",
            },
            ROLES: {
                INDEX: "/settings/security/roles",
                NEW: "/settings/security/roles/new",
                EDIT: (roleId: string) =>
                    `/settings/security/roles/${roleId}/edit`,
            },
            PERMISSIONS: {
                INDEX: "/settings/security/permissions",
            },
        },
    },
};
