import ContentLayout from "../../../layouts/content-layout";
import FormLocataire from "./components/formLocataire";

export default function EditLocataire({ locataire, title }) {
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
            title: "Modification d'un locataire",
        },
    ];

    return (
        <ContentLayout
            module="Locataires"
            title={title}
            breadcrumb={breadcrumb}
            backButton={true}
            subtitle={`Édition du locataire ${locataire.nom_complet}`}
        >
            <FormLocataire locataire={locataire} isUpdate={true} />
        </ContentLayout>
    );
}
