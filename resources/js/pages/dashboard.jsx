import React from "react";
import AppLayout from "../layouts/app-layout";
import PageTitle from "../components/page-title";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs";
import DashboardStats from "../components/dashboard/dashboard-stat";
import Statistique from "../components/dashboard/statistique";
import DashboardGraph from "../components/dashboard/dashboard-graph";
import PayRecent from "../components/dashboard/pay-recent";
import DataRecent from "../components/dashboard/data-recent";

export default function Dashboard() {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: "/dashboard",
        },
    ];

    return (
        <AppLayout>
            <div className="flex flex-col gap-4">
                <div>
                    <PageTitle
                        title="Tableau de bord"
                        breadcrumb={breadcrumb}
                    />
                    <p className="text-muted-foreground">
                        Aperçu des statistiques et paiements des loyers.
                    </p>
                </div>
                <Statistique />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <DashboardGraph />
                    <PayRecent />
                </div>
                <DataRecent />
            </div>
        </AppLayout>
    );
}
