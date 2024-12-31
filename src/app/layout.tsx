import type { Metadata } from "next";

import "@roxom-markets/spark-ui/index.css";
import "./globals.css";

import { PropsWithChildren } from "react";
import { SITE_CONFIG } from "@/config/site";
import { nunito_sans } from "@/helpers/fonts";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@roxom-markets/spark-ui";

export const metadata: Metadata = {
    title: `Roxom - ${SITE_CONFIG.name}`,
    description: SITE_CONFIG.description,
    icons: {
        icon: [
            { url: "/favicons/favicon.ico", sizes: "16x16" },
            {
                url: "/favicons/android-chrome-192x192.png",
                sizes: "192x192",
            },
            {
                url: "/favicons/android-chrome-512x512.png",
                sizes: "512x512",
            },
        ],
        apple: [
            {
                url: "/favicons/apple-touch-icon.png",
                sizes: "180x180",
            },
        ],
    },
    manifest: "/favicons/site.webmanifest",
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
    return (
        <html
            suppressHydrationWarning
            className={nunito_sans.className}
            lang="en"
        >
            <body>
                <SessionProvider>
                    <ThemeProvider attribute="class">
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
