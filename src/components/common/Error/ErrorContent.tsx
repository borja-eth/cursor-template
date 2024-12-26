"use client";
import { FC } from "react";
import { Button } from "@roxom-markets/spark-ui";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes";

interface ErrorContentProps {
    icon?: FC<{ className?: string }>;
    title?: string;
    message?: string;
    buttonText?: string;
    redirectPath?: string;
}

const ErrorContent = ({
    icon: Icon,
    title,
    message,
    buttonText,
    redirectPath,
}: ErrorContentProps) => {
    const router = useRouter();

    const navigateToPath = () => {
        router.push(redirectPath ?? Routes.HOME);
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 m-4 sm:max-w-80">
            {Icon && <Icon className="text-red-500 size-12" />}
            {title && (
                <h1 className="text-xl md:text-2xl font-bold text-center">
                    {title}
                </h1>
            )}
            {message && (
                <p className="text-sm text-text-secondary text-center leading-6 ">
                    {message}
                </p>
            )}
            {buttonText && redirectPath && (
                <Button className="w-full" size="lg" onClick={navigateToPath}>
                    {buttonText}
                </Button>
            )}
        </div>
    );
};

export default ErrorContent;
