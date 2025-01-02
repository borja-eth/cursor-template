import SidebarLayout from "@/components/Layout/SidebarLayout";
import { PropsWithChildren } from "react";

const PlatformLayout = ({ children }: PropsWithChildren<{}>) => {
    return <SidebarLayout>{children}</SidebarLayout>;
};

export default PlatformLayout;
