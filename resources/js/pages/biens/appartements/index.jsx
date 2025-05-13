import { HousePlus, Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";

export default function Index({ appartements, module, title }) {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Appartements",
        },
    ];

    const columns = [
        {
            key: "libelle",
            label: "Nom",
            sortable: true,
        },
        {
            key: "proprietaire_name",
            label: "Propriétaire",
            sortable: true,
        },
        {
            key: "type_libelle",
            label: "Type",
            sortable: true,
        },

        {
            label: "Pièces",
            key: "nombre_pieces",
            sortable: true,
        },

        {
            label: "Mensualité",
            key: "loyer_formatted",
            sortable: true,
        },
        {
            label: "Statut",
            key: "statut_formatted",
            sortable: true,
            render: ({ appartement }) => (
                <Badge
                    variant={
                        appartement.statut === "disponible"
                            ? "success"
                            : row.original.statut === "occupé"
                            ? "destructive"
                            : "warning"
                    }
                >
                    {appartement.statut_formatted}
                </Badge>
            ),
        },
        {
            label: "Créé le",
            key: "created_at",
            sortable: true,
            render: ({ appartement }) => formatDate(appartement.created_at),
        },
        {
            label: "Actions",
            key: "action",
            render: ({ row }) => (
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
            title={title}
            module={module}
            breadcrumb={breadcrumb}
            subtitle="Affichage de la liste des appartements"
            action={
                <Link href={route("appartements.create")}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvel appartement
                    </Button>
                </Link>
            }
        >
            <Datatable
                data={appartements}
                columuns={columns}
                seachable={true}
                itemsPerPage={25}
                buttons={[
                    <Link href={route("appartements.create")}>
                        <Button className="hover:cursor-pointer">
                            <HousePlus className="mr-2 h-4 w-4" />
                            Nouvel appartement
                        </Button>
                    </Link>,
                ]}
            />
        </ContentLayout>
    );
}
