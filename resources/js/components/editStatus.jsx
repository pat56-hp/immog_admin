import React from "react";
import ActionAlertDialog from "./shared/action-alert-dialog";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function EditStatusComponent({
    title,
    description,
    link,
    status,
}) {
    const { patch, processing } = useForm();

    return (
        <ActionAlertDialog
            title={title}
            description={description}
            processing={processing}
            onConfirm={() =>
                patch(link, {
                    preserveScroll: true,
                    onSuccess: () => toast.success("Mise à jour effectuée"),
                })
            }
            trigger={
                <span
                    className={`px-2 py-1 hover:cursor-pointer text-center rounded-full text-xs ${
                        status === 1 || status === true
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {status === 1 || status === true ? "Actif" : "Inactif"}
                </span>
            }
        />
    );
}
