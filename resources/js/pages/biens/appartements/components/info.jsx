import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../../components/ui/card";
import { Bath, BedDouble, Home, MapPin } from "lucide-react";

export default function AppartementInfo({ appartement }) {
    return (
        <Card className="">
            <CardHeader>
                <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {appartement.adresse_name}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <BedDouble className="h-5 w-5 mb-1" />
                        <span className="text-sm font-medium">
                            {appartement.nombre_pieces} Pièce(s)
                        </span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <Bath className="h-5 w-5 mb-1" />
                        <span className="text-sm font-medium">
                            {appartement.nombre_sdb} Salle(s) de bain
                        </span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <Home className="h-5 w-5 mb-1" />
                        <span className="text-sm font-medium">
                            {appartement.superficie_formatted}
                        </span>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">
                        {appartement.description ?? "Aucune description "}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
