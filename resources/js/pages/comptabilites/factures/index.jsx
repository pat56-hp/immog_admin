import React, { useState } from "react";
import { useFacture } from "../../../hooks/comptabilites/use-facture";
import ContentLayout from "../../../layouts/content-layout";
import Datatable from "../../../components/datatable";
import { router } from "@inertiajs/react";

export default function FactureIndex({
    module,
    title,
    subtitle,
    factures,
    success,
    search,
}) {
    const { breadcrumb, columns } = useFacture(success);
    const [searchValue, setSearchValue] = useState(search || "");

    return (
        <ContentLayout
            title={title}
            module={module}
            breadcrumb={breadcrumb}
            subtitle={subtitle}
        >
            <Datatable
                data={factures.data}
                columuns={columns}
                pagination={factures}
                onPageChange={(page) =>
                    router.get(
                        route("factures.index"),
                        { page, search: searchValue },
                        { preserveState: true, replace: true }
                    )
                }
                searchValue={searchValue}
                onSearchChange={(val) => {
                    setSearchValue(val);
                    router.get(
                        route("factures.index"),
                        { page: 1, search: searchValue },
                        { preserveState: true, replace: true }
                    );
                }}
            />
        </ContentLayout>
    );
}
