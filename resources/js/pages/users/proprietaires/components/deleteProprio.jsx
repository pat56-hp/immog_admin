import React, { useState } from "react";
import ActionAlertDialog from "../../../../components/shared/action-alert-dialog";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";

export const DeleteProprio = ({ proprietaire }) => {
    const [open, setOpen] = useState(false);
    const { delete: destroy, processing } = useForm();

    return (
        <>
            <Button
                variant="destructive"
                size="icon"
                className="hover:cursor-pointer h-8 w-8"
                onClick={() => setOpen(true)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
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
