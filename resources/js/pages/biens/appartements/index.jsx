import { Eye, HousePlus, Pencil, Plus } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import { useEffect } from "react";
import { getFormattedDate } from "../../../helper/helper";
import DeleteAppart from "./components/deleteAppart";
import { toast } from "sonner";

export default function Index({ appartements, module, title, success }) {
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
            key: "picture",
            label: "",
            render: (appartement) => (
                <img
                    src={appartement.picture}
                    className="w-10 h-10 rounded-full object-cover"
                />
            ),
        },
        {
            key: "libelle",
            label: "Libéllé",
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
            render: (appartement) => (
                <Badge
                    variant={
                        appartement.statut === "disponible"
                            ? "success"
                            : appartement.statut === "occupé"
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
            render: (appartement) => getFormattedDate(appartement.created_at),
        },
        {
            label: "Actions",
            key: "action",
            render: (appartement) => (
                <div className="flex items-center gap-1">
                    <Link href={route("appartements.show", appartement.id)}>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 bg-white-500 border-1 hover:cursor-pointer"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={route("appartements.edit", appartement.id)}>
                        <Button
                            className="bg-blue-500 h-8 w-8 hover:bg-blue-600 hover:cursor-pointer"
                            size="icon"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                    <DeleteAppart appartement={appartement} />
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
            subtitle="Affichage de la liste des appartements"
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
