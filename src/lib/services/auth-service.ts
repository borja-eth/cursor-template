import "server-only";

import NextAuth from "next-auth";
import Okta from "next-auth/providers/okta";

export const { handlers, signIn, signOut, auth } = NextAuth({
    /*     adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }), */
    providers: [
        Okta({
            clientId: process.env.OKTA_CLIENT_ID!,
            clientSecret: process.env.OKTA_CLIENT_SECRET!,
            issuer: process.env.OKTA_ISSUER!,
        }),
    ],
});
