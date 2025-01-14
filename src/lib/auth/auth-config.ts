import { serverEnv } from "@/env/server";
import { Routes } from "@/routes";

import { NextAuthConfig } from "next-auth";
import Okta from "next-auth/providers/okta";

export const authConfig = {
    providers: [
        Okta({
            clientId: serverEnv.OKTA_CLIENT_ID!,
            clientSecret: serverEnv.OKTA_CLIENT_SECRET!,
            issuer: serverEnv.OKTA_ISSUER!,
        }),
    ],
    pages: {
        signIn: Routes.AUTH.LOGIN,
    },
    trustHost: true,
} satisfies NextAuthConfig;
