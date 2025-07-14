import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import EditStatusComponent from "../../../components/editStatus";
import { getDate } from "../../../helper/helper";
import ModalTypeAppart from "./components/modalType";
import DeleteType from "./components/deleteType";

export default function TypeAppartement({ types, title }) {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Appartements",
            link: route("appartements.index"),
        },
        {
            title: "Types d'appartement",
        },
    ];

    const columns = [
        { label: "Libéllé", key: "libelle", sortable: true },
        {
            label: "Description",
            key: "description",
            sortable: true,
            render: (type) => type.description ?? "Aucune info",
        },
        { label: "Total appart", key: "appartements_count", sortable: true },
        {
            label: "Statut",
            key: "status",
            sortable: true,
            render: (type) => (
                <EditStatusComponent
                    title={`Changer le statut du type d'appartement ${type.name} ?`}
                    description={`Le statut actuel est « ${type.status_name} ». Continuer ?`}
                    link={route("appartements.types.status", type.id)}
                    status={type.status}
                />
            ),
        },
        {
            label: "Créé le",
            key: "created_at",
            sortable: true,
            render: (type) => getDate(type.created_at),
        },
        {
            label: "Actions",
            key: "actions",
            render: (type) => <ActionType type={type} />,
        },
    ];

    return (
        <ContentLayout
            module="Appartements"
            title={title}
            subtitle="Liste des types d'appartement"
            breadcrumb={breadcrumb}
        >
            <Datatable
                data={types}
                columuns={columns}
                seachable={true}
                itemsPerPage={25}
                buttons={[<ModalTypeAppart key={"create"} />]}
            />
        </ContentLayout>
    );
}

function ActionType({ type }) {
    return (
        <div className="flex gap-1">
            <ModalTypeAppart
                key={type.id}
                type={type}
                isUpdate={true}
                method="PATCH"
            />
            <DeleteType type={type} />
        </div>
    );
}
