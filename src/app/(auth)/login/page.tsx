import LoginOktaButton from "@/components/auth/login-okta-button";
import { SITE_CONFIG } from "@/config/site";
import { auth } from "@/lib/auth/auth";
import { Routes } from "@/routes";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@roxom-markets/spark-ui";
import { redirect } from "next/navigation";

const LoginPage = async () => {
    const session = await auth();

    if (session && session.user) {
        redirect(Routes.HOME);
    }

    return (
        <div className="min-h-screen w-full grid place-items-center bg-muted">
            <Card>
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                    <CardDescription>
                        Log in to {SITE_CONFIG.name} with your Okta account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginOktaButton className="w-full" />
                </CardContent>
                <CardFooter className="text-center text-sm text-muted-foreground">
                    Need help? Contact Juli 🤠
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
