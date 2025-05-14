import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import { getDate } from "../../../helper/helper";
import AddUserButton from "./components/createUser";
import { DeleteUser } from "./components/deleteUser";
import { EditUserStatus } from "./components/editStateUser";
import UpdateUser from "./components/updateUser";

export default function User({ module, title, users, roles }) {
    const breadcrumbs = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Utilisateurs",
        },
    ];

    return (
        <ContentLayout
            module={module}
            title={title}
            subtitle="Affichage de la liste des utilisateurs"
            breadcrumb={breadcrumbs}
        >
            <Datatable
                data={users}
                showPagination={true}
                buttons={[<AddUserButton roles={roles} />]}
                columuns={[
                    { key: "name", label: "Nom & prénom(s)", sortable: true },
                    { key: "email", label: "Email", sortable: true },
                    {
                        key: "phone",
                        label: "Contact",
                        render: (user) => (
                            <span>
                                {user.phone != null ? user.phone : "Aucun"}
                            </span>
                        ),
                    },
                    {
                        key: "role_label",
                        label: "Rôle",
                        sortable: true,
                        render: (user) => (
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                {user.role_label}
                            </span>
                        ),
                    },
                    {
                        key: "status",
                        label: "Statut",
                        render: (user) => <EditUserStatus user={user} />,
                    },
                    {
                        key: "created_at",
                        label: "Créé le",
                        render: (user) =>
                            getDate(user.created_at) +
                            " par " +
                            user.created_by,
                    },
                    {
                        key: "action",
                        label: "Actions",
                        render: (user) => (
                            <div className="flex gap-1">
                                <UpdateUser user={user} roles={roles} asChild />
                                <DeleteUser user={user} asChild />
                            </div>
                        ),
                    },
                ]}
            />
        </ContentLayout>
    );
}
