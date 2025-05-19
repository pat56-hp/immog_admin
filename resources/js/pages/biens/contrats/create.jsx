import React from "react";
import ContentLayout from "../../../layouts/content-layout";
import FormContrat from "./components/formContrat";

export default function CreateContrat({
    title,
    module,
    proprietaires,
    locataires,
}) {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Contrats de bail",
            link: route("contrats.index"),
        },
        {
            title: "Générer un contrat",
        },
    ];

    return (
        <ContentLayout
            title={title}
            module={module}
            subtitle="Tous les champs marqués par (*) sont obligatoires"
            backButton={true}
            breadcrumb={breadcrumb}
        >
            <FormContrat
                proprietaires={proprietaires}
                locataires={locataires}
            />
        </ContentLayout>
    );
}
