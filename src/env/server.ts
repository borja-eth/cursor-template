import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
    server: {
        DATABASE_URL: z.string().url().min(1),
        AUTH_SECRET: z.string().min(1),
        OKTA_CLIENT_ID: z.string().min(1),
        OKTA_CLIENT_SECRET: z.string().min(1),
        OKTA_ISSUER: z.string().min(1),
        AUTH_URL_INTERNAL: z.string().url().min(1),
        AUTH_URL: z.string().url().min(1),
        AUTH_TRUST_HOST: z.enum(["true", "false"]).optional(),
    },
    experimental__runtimeEnv: process.env,
    skipValidation: process.env.BUILD === "true",
});
