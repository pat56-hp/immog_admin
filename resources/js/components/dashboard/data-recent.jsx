import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Tabs } from "../ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import DashboardContrat from "./data/dashboard-contrat";

export default function DataRecent() {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-base font-medium">
                    Contrats & rappels
                </CardTitle>
                <CardDescription>
                    Liste des 10 derniers éléments
                </CardDescription>
                <CardContent className="pt-2 pr-0 pl-0 overflow-auto">
                    <Tabs defaultValue="contrat" className="w-full">
                        <TabsList className="mb-4 border-b w-full justify-start rounded-none bg-transparent p-0">
                            <TabsTrigger
                                value="contrat"
                                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                Contrats
                            </TabsTrigger>
                            <TabsTrigger
                                value="rappel"
                                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                Rappels
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="contrat">
                            <DashboardContrat />
                        </TabsContent>
                        <TabsContent value="rappel">
                            <DashboardContrat />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </CardHeader>
        </Card>
    );
}
