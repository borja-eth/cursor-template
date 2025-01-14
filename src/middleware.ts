import { authConfig } from "@/lib/auth/auth-config";
import NextAuth from "next-auth";

/*
 * This middleware is used to refresh user session.
 * Special attention to edge compatibility.
 * @docs https://authjs.dev/guides/edge-compatibility#middleware
 */
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
