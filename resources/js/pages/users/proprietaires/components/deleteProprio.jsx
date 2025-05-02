import React, { useState } from "react";
import { DropdownMenuItem } from "../../../../components/ui/dropdown-menu";
import ActionAlertDialog from "../../../../components/shared/action-alert-dialog";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Trash } from "lucide-react";

export const DeleteProprio = ({ proprietaire }) => {
    const [open, setOpen] = useState(false);
    const { delete: destroy, processing } = useForm();

    return (
        <>
            <DropdownMenuItem
                onSelect={(e) => {
                    e.preventDefault(); // évite la fermeture automatique
                    setTimeout(() => {
                        setOpen(true);
                    }, 10);
                }}
            >
                <Trash className="h-4 w-4" /> Supprimer
            </DropdownMenuItem>
            <ActionAlertDialog
                open={open}
                onOpenChange={setOpen}
                title={`Suppression de l'utilisateur ${proprietaire.name}`}
                description={`Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.`}
                processing={processing}
                onConfirm={() =>
                    destroy(route("proprietaires.delete", proprietaire.id), {
                        preserveScroll: true,
                        onSuccess: () =>
                            toast.success("Propriétaire supprimé avec succès"),
                    })
                }
            />
        </>
    );
};
