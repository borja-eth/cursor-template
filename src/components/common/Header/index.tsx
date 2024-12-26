"use client";

import clsx from "clsx";
import Link from "next/link";
import Logo from "@/components/common/Brand/Logo";
import ThemeToggler from "@/components/common/Theme/ThemeToggler";
import GradientLine from "../Brand/GradientLine";
import { Routes } from "@/routes";
import { SITE_CONFIG } from "@/config/site";

interface HeaderProps {
    theme_toggler?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
    const { theme_toggler = true, className, children } = props;

    return (
        <header
            className={clsx(
                "bg-background relative h-[80px] pl-2 lg:pl-5",
                className,
            )}
        >
            <div className="flex flex-row justify-between items-center h-[80px]">
                <div className="flex flex-row justify-start items-center">
                    <Link href={Routes.HOME}>
                        <div className="flex flex-row gap-1 lg:gap-4 items-center">
                            <Logo classNameText="hidden md:block" size={26} />
                            <div className="flex items-center justify-center rounded-sm h-5 px-[6px] py-[2px] bg-gradient-to-r from-[#a475fa] from-5.5% to-[#fb923c] to-95.5%">
                                <h2 className="text-sm font-bold text-white">
                                    {SITE_CONFIG.name}
                                </h2>
                            </div>
                        </div>
                    </Link>
                    {children}
                </div>
                <div className="flex flex-1 flex-row lg:gap-4 items-center justify-end md:justify-between ml-4 ">
                    <div className="flex flex-row items-center lg:gap-4">
                        {theme_toggler && (
                            <div className="">
                                <ThemeToggler />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <GradientLine />
        </header>
    );
};

export default Header;
