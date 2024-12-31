"use client";
import React from "react";

import { AppSidebar } from "@/components/Layout/sidebar/app-sidebar";
import Header from "@/components/common/Header";
import { SidebarInset, SidebarProvider } from "@roxom-markets/spark-ui";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="mx-auto grid min-h-screen grid-rows-[auto,1fr,auto] font-sans antialiased w-full">
                    <Header />
                    <div className="w-full p-2">{children}</div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default SidebarLayout;
