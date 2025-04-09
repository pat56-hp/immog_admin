import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Overview } from "../overview";
import { OverviewSkeleton, RecentSalesSkeleton } from "../skeletons";

export default function DashboardGraph() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Statistiques des paiements</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <Suspense fallback={<OverviewSkeleton />}>
                    <Overview />
                </Suspense>
            </CardContent>
        </Card>
    );
}
