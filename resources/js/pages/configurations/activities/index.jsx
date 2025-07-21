import React, { useState } from "react";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import { getDate } from "../../../helper/helper";
import useActivity from "../../../hooks/use-activity";
import { router } from "@inertiajs/react";

export default function Activities({ module, title, activities, search }) {
    const breadcrumbs = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Historique d'activité",
        },
    ];

    const { columns } = useActivity();
    const [searchValue, setSearchValue] = useState(search || "");

    return (
        <ContentLayout
            module={module}
            title={title}
            breadcrumb={breadcrumbs}
            subtitle="Affichage de la liste des activités"
        >
            <Datatable
                data={activities.data}
                pagination={activities}
                onPageChange={(page) => {
                    router.get(
                        route("activities.index"),
                        { page, search: searchValue },
                        { preserveState: true, replace: true }
                    );
                }}
                showPagination={true}
                searchValue={searchValue}
                onSearchChange={(val) => {
                    router.get(
                        route("activities.index"),
                        { page: 1, search: searchValue },
                        { preserveState: true, replace: true }
                    );
                }}
                itemsPerPage="25"
                columuns={columns}
            />
        </ContentLayout>
    );
}
