/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import LogoSvg from "./LogoSvg";

interface LogoProps {
    className?: string;
    classNameImage?: string;
    classNameText?: string;
    vertical?: boolean;
    size?: number;
}

const Logo = (props: LogoProps) => {
    const { className, classNameText, vertical = false, size = 32 } = props;

    return (
        <div
            className={clsx(
                "flex flex-row justify-start items-center",
                vertical ? "flex-col" : null,
                className,
            )}
            style={{ height: size }}
        >
            <LogoSvg />
            <img
                alt="Logo Text"
                className={clsx(
                    "dark:invert h-full ml-2 min-w-24",
                    classNameText,
                )}
                src="/exchange/logo-text.png"
            />
        </div>
    );
};

export default Logo;
