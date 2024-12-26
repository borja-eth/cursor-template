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
            <Sun className="hidden dark:block" />
            <Moon className="block dark:hidden" />
        </ActionIcon>
    );
};

export default ThemeToggler;
