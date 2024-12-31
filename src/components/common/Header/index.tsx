"use client";

import ThemeToggler from "@/components/common/Theme/ThemeToggler";
import { SITE_CONFIG } from "@/config/site";
import { Button, SidebarTrigger, useSidebar } from "@roxom-markets/spark-ui";
import clsx from "clsx";
import { SidebarIcon } from "lucide-react";
import GradientLine from "../Brand/GradientLine";

interface HeaderProps {
    theme_toggler?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
    const { theme_toggler = true, className, children } = props;
    const { toggleSidebar, isMobile, open } = useSidebar();

    return (
        <header
            className={clsx(
                "bg-background relative  w-full",
                className,
            )}
        >
            <div className="flex flex-row justify-between items-center py-2">
                <div className="flex flex-row justify-start items-center h-8 pl-2 lg:pl-5">
                    <div className="flex flex-row gap-1 lg:gap-4 items-center">
                        <Button
                            variant="ghost"
                            onClick={toggleSidebar}
                            size="icon"
                        >
                            <SidebarIcon className="size-4" />
                        </Button>
                        <div className="flex items-center justify-center rounded-sm h-5 px-[6px] py-[2px] bg-gradient-to-r from-[#a475fa] from-5.5% to-[#fb923c] to-95.5%">
                            <h2 className="text-sm font-bold text-white">
                                {SITE_CONFIG.name}
                            </h2>
                        </div>
                    </div>
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
