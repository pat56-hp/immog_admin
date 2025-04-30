import React from "react";
import ActionAlertDialog from "./shared/action-alert-dialog";
import { useForm } from "@inertiajs/react";

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
                <button className="text-yellow-500 hover:text-yellow-600">
                    <span
                        className={`px-2 py-1 hover:cursor-pointer rounded-full text-xs ${
                            status === 1
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {status === 1 ? "Actif" : "Inactif"}
                    </span>
                </button>
            }
        />
    );
}
