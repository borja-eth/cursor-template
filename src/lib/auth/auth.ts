import "server-only";

import { db } from "@/database";
import { authConfig } from "@/lib/auth/auth-config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }

            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            }

            return token;
        },
    },
    session: {
        strategy: "jwt",
    },
    ...authConfig,
});

export const getLoggedUser = async () => {
    const session = await auth();

    return session?.user;
};
