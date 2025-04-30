import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import EditStatusComponent from "../../../components/editStatus";
import { Link } from "@inertiajs/react";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";

export default function ProprietaireIndex({ module, title, proprietaires }) {
    const breadcrumbs = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Proprietaires",
        },
    ];

    return (
        <ContentLayout
            module={module}
            title={title}
            subtitle="Affichage de la liste des proprietaires"
            breadcrumb={breadcrumbs}
        >
            <Datatable
                data={proprietaires}
                showPagination={true}
                itemsPerPage={25}
                buttons={[
                    <Link href={route("proprietaires.create")}>
                        <Button className="hover:cursor-pointer">
                            <Plus className="w-4 h-4"></Plus> Ajouter un
                            proprietaire
                        </Button>
                    </Link>,
                ]}
                columuns={[
                    { key: "nom", label: "Nom complet", sortable: true },
                    { key: "email", label: "Email", sortable: true },
                    { key: "phone", label: "Contact", sortable: true },
                    { key: "adresse", label: "Adresse", sortable: true },
                    {
                        key: "type",
                        label: "Type",
                        sortable: true,
                        render: (proprietaire) => (
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                {proprietaire.type}
                            </span>
                        ),
                    },
                    {
                        key: "status",
                        label: "Statut",
                        sortable: true,
                        render: (proprietaire) => (
                            <EditStatusComponent
                                title={`Changer le statut du propriétaire ${proprietaire.nom} ?`}
                                description={`Le statut actuel est « ${proprietaire.status} ». Continuer ?`}
                                link={route(
                                    "proprietaires.status",
                                    proprietaire.id
                                )}
                                status={proprietaire.status === "Actif" ? 1 : 0}
                            />
                        ),
                    },
                    {
                        key: "created_at",
                        label: "Date de création",
                        sortable: true,
                        render: (proprietaire) =>
                            getDate(proprietaire.created_at),
                    },
                    { key: "action", label: "Action" },
                ]}
            />
        </ContentLayout>
    );
}
