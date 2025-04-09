import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import React from "react";
import DashboardStats from "./dashboard-stat";

export default function Statistique() {
    return (
        <Tabs defaultValue="daily" className="pt-5">
            <TabsList>
                <TabsTrigger value="daily">Journalier</TabsTrigger>
                <TabsTrigger value="monthly">Mensuel</TabsTrigger>
                <TabsTrigger value="yearly">Annuel</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
                <DashboardStats />
            </TabsContent>
            <TabsContent value="monthly">Statistiques mensuelles</TabsContent>
            <TabsContent value="yearly">Statistiques annuelles</TabsContent>
        </Tabs>
    );
}
