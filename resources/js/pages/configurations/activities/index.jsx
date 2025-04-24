import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import { getDate } from "../../../helper/helper";

export default function Activities({ title, activities }) {
    const breadcrumbs = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Historique d'activité",
        },
    ];

    return (
        <ContentLayout
            title={title}
            breadcrumb={breadcrumbs}
            subtitle="Consulter la liste des activités"
        >
            <Datatable
                data={activities}
                showPagination={true}
                itemsPerPage="25"
                columuns={[
                    {
                        key: "user_name",
                        label: "Utilisateurs",
                        sortable: true,
                    },
                    { key: "action", label: "Actions", sortable: true },
                    {
                        key: "country",
                        label: "Pays & Adresse IP",
                        sortable: true,
                        render: (activity) => (
                            <div className="flex flex-col gap-2">
                                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                    {activity.country !== null
                                        ? activity.country
                                        : "Pays introuvable"}
                                </span>
                                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    {activity.ip !== null
                                        ? activity.ip
                                        : "Adresse IP introuvable"}
                                </span>
                            </div>
                        ),
                    },
                    { key: "navigator", label: "Navigateur", sortable: true },
                    {
                        key: "created_at",
                        label: "Date",
                        sortable: false,
                        render: (activity) => getDate(activity.created_at),
                    },
                ]}
            />
        </ContentLayout>
    );
}
