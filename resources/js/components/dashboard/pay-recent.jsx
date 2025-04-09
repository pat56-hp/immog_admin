import React, { Suspense } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { RecentSalesSkeleton } from "../skeletons";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const datas = [];
export default function PayRecent() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Paiements récents</CardTitle>
                <CardDescription>
                    Listes des 5 derniers paiements
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<RecentSalesSkeleton />}>
                    <div className="space-y-8">
                        {Array.from({ length: 5 }).map((_, key) => (
                            <div className="flex items-center" key={key}>
                                <Avatar className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <AvatarImage
                                        src="/placeholder.svg?height=36&width=36"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1 max-w-70">
                                    <p className="text-sm font-medium leading-none">
                                        Olivia Martin
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        olivia.martin@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    80.000 FCFA
                                </div>
                            </div>
                        ))}
                    </div>
                </Suspense>
            </CardContent>
        </Card>
    );
}
