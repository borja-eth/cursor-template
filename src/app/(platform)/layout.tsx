import SidebarLayout from "@/components/Layout/SidebarLayout";
import { PropsWithChildren } from "react";

export default function PlatformLayout({ children }: PropsWithChildren<{}>) {
    return <SidebarLayout>{children}</SidebarLayout>;
}
