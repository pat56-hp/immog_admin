import { useForm } from "@inertiajs/react";
import React from "react";

export default function DeleteContrat({ contrat }) {
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
                title={`Suppression du type d\'appartement ${type.libelle}`}
                description={`Êtes-vous sûr de vouloir supprimer ce type d\'appartement ? Cette action est irréversible.`}
                processing={processing}
                onConfirm={() =>
                    destroy(route("appartements.types.delete", type.id), {
                        preserveScroll: true,
                        onSuccess: () => {
                            toast.success(
                                "Type d'appartement supprimé avec succès"
                            );
                        },
                    })
                }
            />
        </>
    );
}
