import { Eye, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Link, useForm } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";
import ContentLayout from "../../../layouts/content-layout";
import { Button } from "../../../components/ui/button";
import Datatable from "../../../components/datatable";
import EditStatusComponent from "../../../components/editStatus";
import { getDate, getFormattedDate } from "../../../helper/helper";
import ActionAlertDialog from "../../../components/shared/action-alert-dialog";
import { useEffect, useState } from "react";

export default function Index({ locataires, title, success }) {
    const { delete: destroy, processing } = useForm();
    const [open, setOpen] = useState(false);
    const [openShow, setOpenShow] = useState(false);
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Locataires",
        },
    ];

    const columns = [
        {
            label: "Image",
            key: "image",
            render: (locataire) => (
                <img
                    src={locataire.image}
                    className="w-15 h-15 rounded-full object-cover"
                />
            ),
        },
        { label: "Nom", key: "nom_complet" },
        { label: "Email", key: "email" },
        { label: "Téléphone", key: "telephone" },
        { label: "Profession", key: "profession" },

        {
            label: "Statut",
            key: "status",
            render: (locataire) => (
                <EditStatusComponent
                    title={`Changer le statut du propriétaire ${locataire.nom_complet} ?`}
                    description={`Le statut actuel est « ${locataire.status} ». Continuer ?`}
                    link={route("locataires.status", locataire.id)}
                    status={locataire.status}
                />
            ),
        },

        {
            label: "Créé le",
            key: "created_at",
            render: (locataire) => getDate(locataire.created_at),
        },
        {
            label: "Actions",
            key: "actions",
            render: (locataire) => (
                <div className="flex  gap-2">
                    <>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="hover:cursor-pointer"
                            onClick={() => setOpenShow(true)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <ActionAlertDialog
                            open={openShow}
                            onOpenChange={setOpenShow}
                            title={`Détail du locataire ${locataire.nom_complet}`}
                            confirmButton={false}
                            className="min-w-200 overflow-auto"
                            description={
                                <span>
                                    <span className="flex justify-between items-center gap-2 ">
                                        <span className="space-y-2 text-base">
                                            <span className="flex gap-2">
                                                <span className="font-bold">
                                                    Nom & prénom(s):
                                                </span>
                                                <span>
                                                    {locataire.nom_complet}
                                                </span>
                                            </span>
                                            <span className="flex gap-2">
                                                <span className="font-bold">
                                                    Email :
                                                </span>
                                                <span>
                                                    {locataire.email ??
                                                        "Aucune adresse email"}
                                                </span>
                                            </span>
                                            <span className="flex gap-2">
                                                <span className="font-bold">
                                                    Téléphone :
                                                </span>
                                                <span>
                                                    {locataire.telephone}
                                                </span>
                                            </span>
                                            <span className="flex gap-2">
                                                <span className="font-bold">
                                                    Date de naissance :
                                                </span>
                                                <span>
                                                    {getFormattedDate(
                                                        locataire.date_naissance
                                                    )}
                                                </span>
                                            </span>
                                            <span className="flex gap-2">
                                                <span className="font-bold">
                                                    Profession :
                                                </span>
                                                <span>
                                                    {locataire.profession ??
                                                        "Aucune info"}
                                                </span>
                                            </span>
                                            <span className="flex gap-2">
                                                <span className="font-bold">
                                                    Adresse :
                                                </span>
                                                <span>
                                                    {locataire.adresse ??
                                                        "Aucune info"}
                                                </span>
                                            </span>
                                            <span className="flex gap-2">
                                                <span className="font-bold">
                                                    Notes :
                                                </span>
                                                <span>
                                                    {locataire.notes ??
                                                        "Aucune info"}
                                                </span>
                                            </span>
                                        </span>
                                        <span className="overflow-hidden w-50 h-50">
                                            <a
                                                target="_blank"
                                                href={locataire.image}
                                            >
                                                <img
                                                    src={locataire.image}
                                                    className="rounded-md wi-full h-full object-cover"
                                                />
                                            </a>
                                        </span>
                                    </span>
                                    <span className="mt-5 mb-5 border-1 border-secondary block" />
                                    <span className="flex flex-col space-y-1">
                                        <span className="font-bold text-base">
                                            Justificatifs D'identité
                                        </span>
                                        <span className="flex gap-2 mt-3">
                                            {locataire.justificatif_identite
                                                ? JSON.parse(
                                                      locataire.justificatif_identite
                                                  ).map((image, key) => (
                                                      <span
                                                          key={key}
                                                          className="w-20 h-20"
                                                      >
                                                          <a
                                                              target="_blank"
                                                              href={image}
                                                          >
                                                              <img
                                                                  src={image}
                                                                  className="rounded-md w-full h-full object-cover"
                                                              />
                                                          </a>
                                                      </span>
                                                  ))
                                                : "Aucun justificatif d'identité"}
                                        </span>
                                    </span>
                                </span>
                            }
                        />
                    </>
                    <Link href={route("locataires.edit", locataire.id)}>
                        <Button
                            className="bg-yellow-100 text-black hover:bg-yellow-200 hover:cursor-pointer"
                            size="icon"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        size="icon"
                        className="hover:cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <ActionAlertDialog
                        open={open}
                        onOpenChange={setOpen}
                        title={`Suppression du propriétaire ${locataire.nom_complet}`}
                        description={`Êtes-vous sûr de vouloir supprimer ce locataire ? Cette action est irréversible.`}
                        processing={processing}
                        onConfirm={() =>
                            destroy(route("locataires.destroy", locataire.id), {
                                preserveScroll: true,
                                onSuccess: () => {
                                    toast.success(
                                        "Locataire supprimé avec succès"
                                    );
                                },
                            })
                        }
                    />
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, []);

    return (
        <ContentLayout
            module="Locataires"
            title={title}
            breadcrumb={breadcrumb}
        >
            <Datatable
                data={locataires}
                columuns={columns}
                seachable={true}
                itemsPerPage={10}
                buttons={[
                    <Link href={route("locataires.create")}>
                        <Button className="hover:cursor-pointer">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Nouveau locataire
                        </Button>
                    </Link>,
                ]}
            />
        </ContentLayout>
    );
}
