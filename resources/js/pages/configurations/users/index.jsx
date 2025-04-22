import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import { getDate } from "../../../helper/helper";
import AddUserButton from "./components/createUser";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { DeleteUser } from "./components/deleteUser";
import { EditUserStatus } from "./components/editStateUser";
import UpdateUser from "./components/updateUser";

export default function User({ title, users, roles }) {
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
            title={title}
            subtitle="Consulter la liste des utilisateurs"
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
                        key: "role",
                        label: "Rôle",
                        sortable: true,
                        render: (user) => (
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                {user.role?.libelle}
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <EllipsisVertical className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side={"bottom"}
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuGroup>
                                        <DeleteUser user={user} />
                                        <UpdateUser user={user} roles={roles} />
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ),
                    },
                ]}
            />
        </ContentLayout>
    );
}
