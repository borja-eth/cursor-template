import { Routes } from "@/routes";

import { NextAuthConfig } from "next-auth";
import Okta from "next-auth/providers/okta";

export const authConfig = {
    providers: [
        Okta({
            clientId: process.env.OKTA_CLIENT_ID!,
            clientSecret: process.env.OKTA_CLIENT_SECRET!,
            issuer: process.env.OKTA_ISSUER!,
        }),
    ],
    pages: {
        signIn: Routes.AUTH.LOGIN,
    },
} satisfies NextAuthConfig;
