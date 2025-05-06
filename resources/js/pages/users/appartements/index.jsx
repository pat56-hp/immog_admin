import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Datatable } from "@/Components/Datatable";
import { Badge } from "@/Components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ContentLayout } from "@/Layouts/ContentLayout";

export default function Index({ appartements }) {
    const columns = [
        {
            header: "Nom",
            accessorKey: "nom",
        },
        {
            header: "Propriétaire",
            accessorKey: "proprietaire.nom",
            cell: ({ row }) =>
                `${row.original.proprietaire.nom} ${row.original.proprietaire.prenom}`,
        },
        {
            header: "Type",
            accessorKey: "type.nom",
        },
        {
            header: "Superficie",
            accessorKey: "superficie_formatted",
        },
        {
            header: "Pièces",
            accessorKey: "nombre_pieces",
        },
        {
            header: "SDB",
            accessorKey: "nombre_sdb",
        },
        {
            header: "Loyer",
            accessorKey: "loyer_formatted",
        },
        {
            header: "Statut",
            accessorKey: "statut_formatted",
            cell: ({ row }) => (
                <Badge
                    variant={
                        row.original.statut === "disponible"
                            ? "success"
                            : row.original.statut === "occupé"
                            ? "destructive"
                            : "warning"
                    }
                >
                    {row.original.statut_formatted}
                </Badge>
            ),
        },
        {
            header: "Charges",
            accessorKey: "charges_formatted",
        },
        {
            header: "Date création",
            accessorKey: "created_at",
            cell: ({ row }) => formatDate(row.original.created_at),
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Link href={route("appartements.edit", row.original.id)}>
                        <Button variant="outline" size="sm">
                            Modifier
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            if (
                                confirm(
                                    "Êtes-vous sûr de vouloir supprimer cet appartement ?"
                                )
                            ) {
                                router.delete(
                                    route(
                                        "appartements.destroy",
                                        row.original.id
                                    )
                                );
                            }
                        }}
                    >
                        Supprimer
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <ContentLayout
            title="Appartements"
            action={
                <Link href={route("appartements.create")}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvel appartement
                    </Button>
                </Link>
            }
        >
            <Card>
                <CardHeader>
                    <CardTitle>Liste des appartements</CardTitle>
                </CardHeader>
                <CardContent>
                    <Datatable
                        columns={columns}
                        data={appartements}
                        searchable={true}
                        searchPlaceholder="Rechercher un appartement..."
                    />
                </CardContent>
            </Card>
        </ContentLayout>
    );
}
