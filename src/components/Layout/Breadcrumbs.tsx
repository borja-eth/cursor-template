import React, { FC } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
} from "@roxom-markets/spark-ui";
import Link from "next/link";

type BreadcrumbsProps = {
    items: {
        title: string;
        href?: string;
    }[];
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {item.href ? (
                                <BreadcrumbLink asChild>
                                    <Link href={item.href}>{item.title}</Link>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{item.title}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
