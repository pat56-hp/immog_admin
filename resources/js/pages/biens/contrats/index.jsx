import React, { useEffect } from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import { Link } from "@inertiajs/react";
import { Button } from "../../../components/ui/button";
import {
    Download,
    EllipsisVertical,
    Eye,
    Pencil,
    Plus,
    Send,
    Trash2Icon,
} from "lucide-react";
import { getFormattedDate } from "../../../helper/helper";
import { Badge } from "../../../components/ui/badge";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

export default function Contrat({ contrats, title, module, success }) {
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
            key: "loyer_formatted",
            label: "loyer",
            sortable: true,
            render: (contrat) => (
                <Badge variant="warning">{contrat.loyer_formatted}</Badge>
            ),
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
                <div className="w-full text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="h-8 w-8 bg-white-500 border-1 hover:cursor-pointer"
                            >
                                <EllipsisVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-35">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="">
                                    <Send className="w-4 h-4" />
                                    Envoyer
                                </DropdownMenuItem>
                                <Link href={route("contrats.edit", contrat.id)}>
                                    <DropdownMenuItem className="">
                                        <Pencil className="w-4 h-4" />
                                        Modifier
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="">
                                    <Download className="w-4 h-4" />
                                    Télécharger
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className=" bg-red-400 text-white hover:!bg-red-500 hover:!text-white"
                                    variant="delete"
                                >
                                    <Trash2Icon className="w-4 h-4 text-white" />
                                    Supprimer
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

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
