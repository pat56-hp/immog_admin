import React, { useEffect } from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import EditStatusComponent from "../../../components/editStatus";
import { Link } from "@inertiajs/react";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { getDate } from "../../../helper/helper";
import { toast } from "sonner";
import EditProprietaireAction from "./components/editProprietaireAction";
import { DeleteProprio } from "./components/deleteProprio";

export default function ProprietaireIndex({
    module,
    title,
    proprietaires,
    success,
}) {
    const breadcrumbs = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Proprietaires",
        },
    ];

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, []);

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
                            <Plus className="mr-2 w-4 h-4"></Plus> Ajouter un
                            proprietaire
                        </Button>
                    </Link>,
                ]}
                columuns={[
                    {
                        key: "image",
                        label: "Image",
                        render: (proprietaire) => (
                            <img
                                src={proprietaire.image}
                                alt={proprietaire.name}
                                className="w-10 h-10 rounded-full"
                            />
                        ),
                    },
                    { key: "name", label: "Nom complet", sortable: true },
                    { key: "email", label: "Email", sortable: true },
                    { key: "phone", label: "Contact", sortable: true },
                    { key: "address", label: "Adresse", sortable: true },
                    {
                        key: "type",
                        label: "Type",
                        sortable: true,
                        render: (proprietaire) => (
                            <div className="grid gap-2 justify-start">
                                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                    {proprietaire.type}
                                </span>
                                <EditStatusComponent
                                    title={`Changer le statut du propriétaire ${proprietaire.nom} ?`}
                                    description={`Le statut actuel est « ${proprietaire.status} ». Continuer ?`}
                                    link={route(
                                        "proprietaires.status",
                                        proprietaire.id
                                    )}
                                    status={proprietaire.status}
                                />
                            </div>
                        ),
                    },
                    {
                        key: "created_at",
                        label: "Créé le",
                        sortable: true,
                        render: (proprietaire) =>
                            getDate(proprietaire.created_at),
                    },
                    {
                        key: "action",
                        label: "Action",
                        render: (proprietaire) => (
                            <div className="flex gap-1">
                                <EditProprietaireAction
                                    proprietaire={proprietaire}
                                />
                                <DeleteProprio proprietaire={proprietaire} />
                            </div>
                        ),
                    },
                ]}
            />
        </ContentLayout>
    );
}
