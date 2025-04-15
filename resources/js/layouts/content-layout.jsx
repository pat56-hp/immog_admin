import React from "react";
import AppLayout from "./app-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import PageTitle from "../components/page-title";

export default function ContentLayout({
    title,
    subtitle = "",
    breadcrumb,
    children,
}) {
    return (
        <AppLayout>
            <PageTitle title={title} breadcrumb={breadcrumb} />
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-base font-medium">
                        {title}
                    </CardTitle>
                    <CardDescription>{subtitle}</CardDescription>
                    <CardContent className="pt-2 pr-0 pl-0 overflow-auto">
                        {children}
                    </CardContent>
                </CardHeader>
            </Card>
        </AppLayout>
    );
}
