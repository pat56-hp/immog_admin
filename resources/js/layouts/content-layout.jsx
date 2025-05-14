import React from "react";
import AppLayout from "./app-layout";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import PageTitle from "../components/page-title";
import { ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function ContentLayout({
    module,
    title = "",
    subtitle = "",
    breadcrumb,
    children,
    backButton = false,
    otherButton = [],
}) {
    return (
        <AppLayout>
            <PageTitle title={module} breadcrumb={breadcrumb} />
            <Card className="">
                <CardHeader className="items-center">
                    <CardTitle className="text-base font-medium">
                        {title}
                    </CardTitle>
                    <CardDescription>{subtitle}</CardDescription>
                    <CardAction className="flex gap-1">
                        {otherButton.length > 0 &&
                            otherButton.map((other) => (
                                <React.Fragment key={other}>
                                    {other}
                                </React.Fragment>
                            ))}
                        {backButton && (
                            <Link
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.history.back();
                                }}
                                className="flex items-center space-x-2 button bg-gray-400 hover:bg-gray-500 text-white p-2 text-sm rounded-md"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Retour</span>
                            </Link>
                        )}
                    </CardAction>
                </CardHeader>
                <CardContent className="pt-2 overflow-auto">
                    {children}
                </CardContent>
            </Card>
        </AppLayout>
    );
}
