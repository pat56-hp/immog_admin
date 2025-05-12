import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import ContentLayout from "../../../layouts/content-layout";
import { Button } from "../../../components/ui/button";
import Datatable from "../../../components/datatable";
import EditStatusComponent from "../../../components/editStatus";
import { getDate } from "../../../helper/helper";
import { useEffect } from "react";
import DeleteLocataire from "./components/DeleteLocataire";
import ShowLocataire from "./components/showLocataire";

export default function Index({ locataires, title, success }) {
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
                <img
                    src={locataire.image}
                    className="w-10 h-10 rounded-full object-cover"
                />
            ),
        },
        { label: "Nom", key: "nom_complet", sortable: true },
        { label: "Email", key: "email", sortable: true },
        { label: "Téléphone", key: "telephone", sortable: true },
        { label: "Profession", key: "profession", sortable: true },
        {
            label: "Statut",
            key: "status",
            sortable: true,
            render: (locataire) => (
                <EditStatusComponent
                    title={`Changer le statut du propriétaire ${locataire.nom_complet} ?`}
                    description={`Le statut actuel est « ${locataire.status_name} ». Continuer ?`}
                    link={route("locataires.status", locataire.id)}
                    status={locataire.status}
                />
            ),
        },
        {
            label: "Créé le",
            key: "created_at",
            sortable: true,
            render: (locataire) => getDate(locataire.created_at),
        },
        {
            label: "Actions",
            key: "actions",
            render: (locataire) => (
                <div className="flex gap-2">
                    <ShowLocataire locataire={locataire} />
                    <Link href={route("locataires.edit", locataire.id)}>
                        <Button
                            className="bg-yellow-100 h-8 w-8 text-black hover:bg-yellow-200 hover:cursor-pointer"
                            size="icon"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                    <DeleteLocataire locataire={locataire} />
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, []);

    return (
        <ContentLayout
            module="Locataires"
            subtitle="Liste des locataires"
            title={title}
            breadcrumb={breadcrumb}
        >
            <Datatable
                data={locataires}
                columuns={columns}
                seachable={true}
                itemsPerPage={25}
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
