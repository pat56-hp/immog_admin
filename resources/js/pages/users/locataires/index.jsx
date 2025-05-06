import { Head } from "@inertiajs/react";
import ContentLayout from "@/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Link } from "@inertiajs/react";
import Datatable from "@/components/datatable";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";

export default function Index({ locataires, title }) {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Locataires",
        },
    ];

    const columns = [
        { header: "Nom", key: "nom_complet" },
        { header: "Email", key: "email" },
        { header: "Téléphone", key: "telephone" },
        { header: "Profession", key: "profession" },
        { header: "Date d'entrée", key: "date_entree" },
        {
            header: "Statut",
            key: "status",
            render: (locataire) => (
                <Badge
                    variant={locataire.status ? "success" : "destructive"}
                    className="cursor-pointer"
                    onClick={() => handleStatusChange(locataire)}
                >
                    {locataire.status ? "Actif" : "Inactif"}
                </Badge>
            ),
        },
        {
            header: "Justificatif",
            key: "justificatif_identite",
            render: (locataire) =>
                locataire.justificatif_identite ? (
                    <a
                        href={locataire.justificatif_identite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Voir
                    </a>
                ) : (
                    <span className="text-muted-foreground">Non fourni</span>
                ),
        },
        {
            header: "Actions",
            key: "actions",
            render: (locataire) => (
                <div className="flex justify-end gap-2">
                    <Link href={route("locataires.edit", locataire.id)}>
                        <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(locataire)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const handleStatusChange = (locataire) => {
        router.put(
            route("locataires.status", locataire.id),
            {},
            {
                onSuccess: () => toast.success("Statut mis à jour avec succès"),
                onError: () => toast.error("Une erreur est survenue"),
            }
        );
    };

    const handleDelete = (locataire) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce locataire ?")) {
            router.delete(route("locataires.destroy", locataire.id), {
                onSuccess: () =>
                    toast.success("Locataire supprimé avec succès"),
                onError: () => toast.error("Une erreur est survenue"),
            });
        }
    };

    return (
        <ContentLayout
            module="Locataires"
            title={title}
            breadcrumb={breadcrumb}
        >
            <div className="flex justify-end mb-4">
                <Link href={route("locataires.create")}>
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Nouveau locataire
                    </Button>
                </Link>
            </div>

            <Datatable
                data={locataires}
                columns={columns}
                seachable={true}
                itemsPerPage={10}
            />
        </ContentLayout>
    );
}
