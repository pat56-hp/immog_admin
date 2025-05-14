import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { Badge } from "../../../../components/ui/badge";

export default function AppartementResume({ appartement }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Propriétaire</span>
                    <span className="font-medium">
                        {appartement.proprietaire_name}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">
                        {appartement.type_libelle}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Loyer mensuel</span>
                    <span className="font-medium">
                        {appartement.loyer_formatted}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Charges</span>
                    <div className="flex items-center">
                        <span className="font-medium">
                            {appartement.charges_formatted}
                        </span>
                    </div>
                </div>

                <Separator />
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Statut</span>
                    <Badge
                        variant={
                            appartement.statut === "disponible"
                                ? "success"
                                : appartement.statut === "occupé"
                                ? "destructive"
                                : "warning"
                        }
                    >
                        {appartement.statut_formatted}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}
