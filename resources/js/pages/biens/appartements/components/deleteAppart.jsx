import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import ActionAlertDialog from "../../../../components/shared/action-alert-dialog";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function DeleteAppart({ appartement }) {
    const { delete: destroy, processing } = useForm();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 hover:cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
            <ActionAlertDialog
                open={open}
                onOpenChange={setOpen}
                title={`Suppression de l'appartement ${appartement.libelle}`}
                description={`Êtes-vous sûr de vouloir supprimer cet appartement ? Cette action est irréversible.`}
                processing={processing}
                onConfirm={() =>
                    destroy(route("appartements.destroy", appartement.id), {
                        preserveScroll: true,
                        onSuccess: () => {
                            toast.success("Appartement supprimé avec succès");
                        },
                        onError: (error) => {
                            console.log(error);
                            toast.error("Une erreur est survenue");
                        },
                    })
                }
            />
        </>
    );
}
