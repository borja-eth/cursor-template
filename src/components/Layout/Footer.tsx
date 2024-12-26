import React from "react";

const Footer = () => {
    return (
        <footer className="text-center text-neutral-8 dark:text-neutral-2 leading-[4rem] opacity-70">
            © {new Date().getFullYear()} Roxom. All rights reserved
        </footer>
    );
};

export default Footer;
