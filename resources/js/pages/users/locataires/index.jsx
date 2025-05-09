import { Eye, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Link, router } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";
import ContentLayout from "../../../layouts/content-layout";
import { Button } from "../../../components/ui/button";
import Datatable from "../../../components/datatable";
import EditStatusComponent from "../../../components/editStatus";
import { getDate } from "../../../helper/helper";

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
        {
            label: "Image",
            key: "image",
            render: (locataire) => (
                <img src={locataire.image} className="w-15 h-15 rounded-full" />
            ),
        },
        { label: "Nom", key: "nom_complet" },
        { label: "Email", key: "email" },
        { label: "Téléphone", key: "telephone" },
        { label: "Profession", key: "profession" },

        {
            label: "Statut",
            key: "status",
            render: (locataire) => (
                <EditStatusComponent
                    title={`Changer le statut du propriétaire ${locataire.nom_complet} ?`}
                    description={`Le statut actuel est « ${locataire.status} ». Continuer ?`}
                    link={route("locataires.status", locataire.id)}
                    status={locataire.status}
                />
            ),
        },

        {
            label: "Créé le",
            key: "created_at",
            render: (locataire) => getDate(locataire.created_at),
        },
        {
            label: "Actions",
            key: "actions",
            render: (locataire) => (
                <div className="flex  gap-2">
                    <Link href={route("locataires.show", locataire.id)}>
                        <Button variant="secondary" size="icon">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={route("locataires.edit", locataire.id)}>
                        <Button
                            className="bg-yellow-100 text-black hover:bg-yellow-200"
                            size="icon"
                        >
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
            <Datatable
                data={locataires}
                columuns={columns}
                seachable={true}
                itemsPerPage={10}
                buttons={[
                    <Link href={route("locataires.create")}>
                        <Button className="hover:cursor-pointer">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Nouveau locataire
                        </Button>
                    </Link>,
                ]}
            />
        </ContentLayout>
    );
}
