import { authConfig } from "@/lib/auth/auth-config";
import NextAuth from "next-auth";

/*
 * This middleware is used to refresh user session.
 * Special attention to edge compatibility.
 * @docs https://authjs.dev/guides/edge-compatibility#middleware
 */
export const { auth: middleware } = NextAuth(authConfig);
