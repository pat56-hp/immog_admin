import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import { Link } from "@inertiajs/react";
import { Button } from "../../../components/ui/button";
import { Eye, Pencil, Plus } from "lucide-react";
import { getFormattedDate } from "../../../helper/helper";
import { Badge } from "../../../components/ui/badge";

export default function Contrat({ contrats, title, module }) {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Contrats de location",
        },
    ];

    const columns = [
        {
            key: "ref",
            label: "#Ref",
            sortable: true,
        },
        {
            key: "proprietaire_name",
            label: "Propriétaire",
            sortable: true,
        },
        {
            key: "locataire_name",
            label: "Locataire",
            sortable: true,
        },
        {
            key: "loyer",
            label: "loyer_formatted",
            sortable: true,
        },
        {
            key: "periode",
            label: "Période",
            sortable: true,
        },
        {
            key: "statut",
            label: "Statut",
            sortable: true,
            render: (contrat) => (
                <Badge
                    variant={
                        contrat.statut === "disponible"
                            ? "success"
                            : contrat.statut === "terminé"
                            ? "warning"
                            : contrat.statut === "résilié"
                            ? "destructive"
                            : "secondary"
                    }
                >
                    {contrat.statut}
                </Badge>
            ),
        },
        {
            key: "created_at",
            label: "Créé le",
            sortable: true,
            render: (contrat) => getFormattedDate(contrat.created_at),
        },
        {
            label: "Actions",
            key: "action",
            render: (contrat) => (
                <div className="flex items-center gap-1">
                    <Link href={route("appartements.show", contrat.id)}>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 bg-white-500 border-1 hover:cursor-pointer"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={route("appartements.edit", contrat.id)}>
                        <Button
                            className="bg-blue-500 h-8 w-8 hover:bg-blue-600 hover:cursor-pointer"
                            size="icon"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <ContentLayout
            title={title}
            module={module}
            breadcrumb={breadcrumb}
            subtitle="Affichage de la liste des contrats de location"
        >
            <Datatable
                data={contrats}
                columuns={columns}
                seachable={true}
                itemsPerPage={25}
                buttons={[
                    <Link href={route("contrats.create")}>
                        <Button className="hover:cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" />
                            Générer un contrat
                        </Button>
                    </Link>,
                ]}
            />
        </ContentLayout>
    );
}
