import { useForm } from "@inertiajs/react";
import React from "react";
import ActionAlertDialog from "../../../../components/shared/action-alert-dialog";
import { toast } from "sonner";

export default function DeleteContrat({
    openDialogId,
    onSetOpenDialogId,
    contratRef,
}) {
    const { delete: destroy, processing } = useForm();

    console.log(openDialogId);

    return (
        <ActionAlertDialog
            open={true}
            onOpenChange={(open) => {
                if (!open) onSetOpenDialogId(null);
            }}
            title={`Suppression du contrat #${contratRef}`}
            description={`Êtes-vous sûr de vouloir supprimer ce contrat ? Cette action est irréversible.`}
            processing={processing}
            onConfirm={() => {
                destroy(route("contrats.destroy", openDialogId), {
                    preserveScroll: true,
                    onSuccess: () => {
                        onSetOpenDialogId(null); // Ferme la boîte
                    },
                });
            }}
        />
    );
}
