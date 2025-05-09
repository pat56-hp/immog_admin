import ContentLayout from "../../../layouts/content-layout";
import FormLocataire from "./components/formLocataire";

export default function Create({ title }) {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Locataires",
            link: route("locataires.index"),
        },
        {
            title: "Nouveau locataire",
        },
    ];

    return (
        <ContentLayout
            module="Locataires"
            title={title}
            breadcrumb={breadcrumb}
            backButton={true}
            subtitle="Création d'un nouveau locataire"
        >
            <FormLocataire />
        </ContentLayout>
    );
}
