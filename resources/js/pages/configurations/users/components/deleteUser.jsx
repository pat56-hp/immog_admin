import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import ActionAlertDialog from "../../../../components/shared/action-alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";

export const DeleteUser = ({ user }) => {
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
                title={`Suppression de l'utilisateur ${user.name}`}
                description={`Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.`}
                processing={processing}
                onConfirm={() =>
                    destroy(route("users.delete", user.id), {
                        preserveScroll: true,
                        onSuccess: () =>
                            toast.success("Utilisateur supprimé avec succès"),
                    })
                }
            />
        </>
    );
};
