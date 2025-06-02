import React, { useEffect, useState } from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "../../../components/ui/button";
import {
    Download,
    EllipsisVertical,
    Loader,
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
import ActionAlertDialog from "../../../components/shared/action-alert-dialog";

export default function Contrat({ contrats, title, module, success }) {
    const [download, setDownload] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [openDialogId, setOpenDialogId] = useState(null);
    const { delete: destroy, processing } = useForm();

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
            label: "Appartement",
            sortable: true,
            render: (contrat) => (
                <div className="space-y-1">
                    <Badge variant="success">
                        {contrat.appartement.libelle}
                    </Badge>
                    <br />
                    <Badge variant="warning">{contrat.loyer_formatted}</Badge>
                </div>
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
                    <DropdownMenu
                        open={openDialogId === contrat.ref}
                        onOpenChange={(open) =>
                            setOpenDialogId(open ? contrat.id : null)
                        }
                    >
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
                                <DropdownMenuItem
                                    onClick={(e) => downloadContrat(e, contrat)}
                                >
                                    <Download className="w-4 h-4" />
                                    Télécharger
                                    {download && (
                                        <Loader className="w-2 h-2 animate-spin" />
                                    )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className=" bg-red-400 text-white hover:!bg-red-500 hover:!text-white"
                                    variant="delete"
                                    onClick={() => {
                                        setDropdownOpenId(null); // ferme le menu
                                        setTimeout(
                                            () => setOpenDialogId(contrat.ref),
                                            10
                                        ); // ouvre le dialog
                                    }}
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

    /** Telechargement du contrat */
    const downloadContrat = (e, contrat) => {
        e.preventDefault();

        setDownload(true);
        setTimeout(() => {
            fetch(route("contrats.download", contrat.id), {
                method: "GET",
                headers: {
                    Accept: "application/pdf",
                },
            })
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `contrat_${contrat.ref}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(
                        "Une erreur est survenue lors du téléchargement du contrat."
                    );
                })
                .finally(() => {
                    setDownload(false);
                    setOpenMenuId(null);
                });
        }, [3000]);
    };

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

            {openDialogId && (
                <ActionAlertDialog
                    open={true}
                    onOpenChange={(open) => {
                        if (!open) setOpenDialogId(null);
                    }}
                    title={`Suppression du contrat #${openDialogId}`}
                    description={`Êtes-vous sûr de vouloir supprimer ce contrat ? Cette action est irréversible.`}
                    processing={processing}
                    onConfirm={() => {
                        destroy(route("contrats.destroy", openDialogId), {
                            preserveScroll: true,
                            onSuccess: () => {
                                toast.success("Contrat supprimé avec succès");
                                setOpenDialogId(null); // Ferme la boîte
                            },
                        });
                    }}
                />
            )}
        </ContentLayout>
    );
}
