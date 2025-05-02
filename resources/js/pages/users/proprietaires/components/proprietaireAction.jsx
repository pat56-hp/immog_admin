import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import ActionAlertDialog from "../../../../components/shared/action-alert-dialog";
import { toast } from "sonner";

export default function ProprietaireAction({ proprietaire }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuGroup>
                    <Link href={route("proprietaires.edit", proprietaire.id)}>
                        <DropdownMenuItem>
                            <Edit className="h-4 w-4" /> Modifier
                        </DropdownMenuItem>
                    </Link>
                    <DeleteProprio proprietaire={proprietaire} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/**
 * Suppression d'un propriétaire
 * @param {*} proprietaire
 * @returns
 */
const DeleteProprio = ({ proprietaire }) => {
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
                title={`Suppression du propriétaire ${proprietaire.name}`}
                description={`Êtes-vous sûr de vouloir supprimer ce propriétaire ? Cette action est irréversible.`}
                processing={processing}
                onConfirm={() =>
                    destroy(route("proprietaires.delete", proprietaire.id), {
                        preserveScroll: true,
                        onSuccess: () => {
                            toast.success("Propriétaire supprimé avec succès");
                        },
                    })
                }
            />
        </>
    );
};
