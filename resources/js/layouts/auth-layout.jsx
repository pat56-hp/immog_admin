import { Head, usePage } from "@inertiajs/react";
import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

const appName = import.meta.env.VITE_APP_NAMe || "ImmoG";

export default function AuthLayout({ children }) {
    const { title, setting } = usePage().props;

    return (
        <>
            <Head>
                <title>{title ? `${title} - ${appName}` : appName}</title>
                <link rel="shortcut icon" href={setting?.favicon_url} />
                <meta name="description" content={setting?.description} />
                <meta name="keywords" content={setting?.keywords} />
                <meta name="author" content="Pat56-hp" />
            </Head>
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <div className="flex flex-col gap-6">
                        <a
                            href="#"
                            className="flex items-center gap-2 self-center font-medium"
                        >
                            <img
                                src={setting?.logo_url}
                                alt="Logo"
                                className=""
                            />
                        </a>
                        <Card className="overflow-hidden p-0">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                {children}
                                <div className="relative hidden bg-muted md:block">
                                    <img
                                        src="/images/login.png"
                                        alt="Image"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <div className="mt-2 flex justify-center items-center text-gray-500 text-xs">
                            <span>© Copyright {new Date().getFullYear()}</span>
                            <Separator
                                orientation="vertical"
                                className="mx-2 data-[orientation=vertical]:h-4 bg-gray-500 "
                            />
                            <span>
                                Conçu & Développé par{" "}
                                <a
                                    href="https://github.com/pat56-hp"
                                    className="text-red-400 hover:text-red-500 underline"
                                    target="_blank"
                                >
                                    Pat56-hp
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}
