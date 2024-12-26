import type { Metadata } from "next";

import "@roxom-markets/spark-ui/index.css";
import "./globals.css";

import { nunito_sans } from "@/helpers/fonts";
import { PropsWithChildren } from "react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    icons: {
        icon: [
            { url: "/exchange/favicons/favicon.ico", sizes: "16x16" },
            {
                url: "/exchange/favicons/android-chrome-192x192.png",
                sizes: "192x192",
            },
            {
                url: "/exchange/favicons/android-chrome-512x512.png",
                sizes: "512x512",
            },
        ],
        apple: [
            {
                url: "/exchange/favicons/apple-touch-icon.png",
                sizes: "180x180",
            },
        ],
    },
    manifest: "/exchange/favicons/site.webmanifest",
};

export default async function RootLayout({ children }: PropsWithChildren<{}>) {

    return (
        <html
            suppressHydrationWarning
            className={nunito_sans.className}
            lang="en"
        >
            <body>
                {children   }
            </body>
        </html>
    );
}
