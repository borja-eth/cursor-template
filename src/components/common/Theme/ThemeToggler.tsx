"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import ActionIcon from "@/components/common/ActionIcon";

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();

    return (
        <ActionIcon
            aria-label="Toggle color scheme"
            checked={theme === "light"}
            name="theme-toggler"
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <Sun className="hidden dark:block size-4" />
            <Moon className="block dark:hidden size-4" />
        </ActionIcon>
    );
};

export default ThemeToggler;
