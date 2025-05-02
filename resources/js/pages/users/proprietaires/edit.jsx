import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import FormProprietaire from "./components/formProprietaire";

export default function ProprietaireEdit({ proprietaire, module, title }) {
    const breadcrumbs = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Propriétaires",
            link: route("proprietaires.index"),
        },
        {
            title: "Editer un propriétaire",
        },
    ];

    return (
        <ContentLayout
            module={module}
            title={title}
            subtitle="Edition d'un propriétaire"
            breadcrumb={breadcrumbs}
            backButton={true}
        >
            <FormProprietaire proprietaire={proprietaire} isUpdate={true} />
        </ContentLayout>
    );
}
