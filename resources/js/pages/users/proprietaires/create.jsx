import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import FormProprietaire from "./components/formProprietaire";

export default function CreateProprietaire({ module, title }) {
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
            title: "Ajouter un propriétaire",
        },
    ];
    return (
        <ContentLayout
            module={module}
            title={title}
            subtitle="Création d'un nouveau propriétaire"
            breadcrumb={breadcrumbs}
            backButton={true}
        >
            <FormProprietaire />
        </ContentLayout>
    );
}
