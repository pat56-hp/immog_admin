import ContentLayout from "../../../layouts/content-layout";
import FormAppart from "./components/formAppart";

export default function EditAppart({
    appartement,
    proprietaires,
    types,
    title,
    module,
}) {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Appartements",
            link: route("appartements.index"),
        },
        {
            title: "Modification d'un appartement",
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
            <FormAppart
                appartement={appartement}
                proprietaires={proprietaires}
                types={types}
                isUpdate={true}
            />
        </ContentLayout>
    );
}
