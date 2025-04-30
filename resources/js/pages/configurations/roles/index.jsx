import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import { getDate } from "../../../helper/helper";
import Datatable from "../../../components/datatable";
import UpdateRole from "./components/updateRole";
import { EditRoleStatus } from "./components/editStateRole";

export default function Role({ module, title, roles }) {
    const breadcrumbs = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Roles",
        },
    ];

    return (
        <ContentLayout
            module={module}
            title={title}
            subtitle="Affichage de la liste des rôles d'utilisateur"
            breadcrumb={breadcrumbs}
        >
            <Datatable
                data={roles}
                showPagination={false}
                columuns={[
                    { key: "id", label: "ID", sortable: true },
                    { key: "libelle", label: "Libéllé", sortable: true },
                    {
                        key: "status",
                        label: "Statut",
                        render: (role) => <EditRoleStatus role={role} />,
                    },
                    {
                        key: "created_at",
                        label: "Créé le",
                        render: (role) =>
                            getDate(role.created_at) +
                            " par " +
                            role.created_by,
                    },
                    {
                        key: "action",
                        label: "Actions",
                        render: (role) => <UpdateRole role={role} />,
                    },
                ]}
            />
        </ContentLayout>
    );
}
