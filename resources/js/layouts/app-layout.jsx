import React, { useEffect } from "react";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/sidebar/app-sidebar";
import AppHeader from "../components/header/app-header";
import { Separator } from "../components/ui/separator";
import { Head, usePage } from "@inertiajs/react";
import { Toaster } from "../components/ui/sonner";
import { toast } from "sonner";

const appName = import.meta.env.VITE_APP_NAME || "ImmoG";

export default function AppLayout({ children }) {
    const { title, error, setting } = usePage().props;

    useEffect(() => {
        error && toast.error("Oups, une erreur s'est produite");
        error && console.log(error);
    }, [children]);

    return (
        <>
            <Head>
                <title>{title ? `${title} - ${appName}` : appName}</title>
                <link rel="shortcut icon" href={setting?.favicon_url} />
                <meta name="description" content={setting?.description} />
                <meta name="keywords" content={setting?.keywords} />
                <meta name="author" content="Pat56-hp" />
            </Head>
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset className="relative">
                    <AppHeader />
                    <div className="p-8 bg-gray-100 h-full">
                        {children}
                        <div className="mt-8 flex justify-center items-center text-gray-500 text-xs">
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
                    <Toaster
                        theme="system"
                        position="bottom-right"
                        closeButton={true}
                    />
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
