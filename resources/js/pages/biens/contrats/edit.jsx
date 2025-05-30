import React from "react";
import FormContrat from "./components/formContrat";
import ContentLayout from "../../../layouts/content-layout";

export default function EditContrat({
    contrat,
    proprietaires,
    locataires,
    title,
    module,
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
            title: "Édition d'un contrat",
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
                contrat={contrat}
                isUpdate={true}
            />
        </ContentLayout>
    );
}
