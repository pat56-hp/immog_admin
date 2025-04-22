import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import ActionAlertDialog from "../../../../components/shared/action-alert-dialog";
import { Trash } from "lucide-react";
import { DropdownMenuItem } from "../../../../components/ui/dropdown-menu";

export const DeleteUser = ({ user }) => {
    const { delete: destroy, processing } = useForm();
    const [open, setOpen] = useState(false);
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
                title={`Suppression de l'utilisateur ${user.name}`}
                description={`Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.`}
                processing={processing}
                onConfirm={() =>
                    destroy(route("users.delete", user.id), {
                        preserveScroll: true,
                    })
                }
            />
        </>
    );
};
