import React, { useEffect } from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import EditStatusComponent from "../../../components/editStatus";
import { Link } from "@inertiajs/react";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { getDate } from "../../../helper/helper";
import ProprietaireAction from "./components/proprietaireAction";
import { toast } from "sonner";

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
                            <Plus className="w-4 h-4"></Plus> Ajouter un
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
                            <ProprietaireAction proprietaire={proprietaire} />
                        ),
                    },
                ]}
            />
        </ContentLayout>
    );
}

/* const ProprietaireAction = ({ proprietaire }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuGroup>
                    <DeleteProprio proprietaire={proprietaire} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}; */
