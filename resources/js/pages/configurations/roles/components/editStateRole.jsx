import { useForm } from "@inertiajs/react";
import ActionAlertDialog from "../../../../components/shared/action-alert-dialog";

export const EditRoleStatus = ({ role }) => {
    const { put, processing } = useForm();

    return (
        <ActionAlertDialog
            title={`Changer le statut du role ${role.libelle} ?`}
            description={`Le statut actuel est « ${
                role.status === 1 ? "Actif" : "Inactif"
            } ». Continuer ?`}
            processing={processing}
            onConfirm={() =>
                put(route("roles.status", role.id), { preserveScroll: true })
            }
            trigger={
                <button className="text-yellow-500 hover:text-yellow-600">
                    <span
                        className={`px-2 py-1 hover:cursor-pointer rounded-full text-xs ${
                            role.status === 1
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {role.status === 1 ? "Actif" : "Inactif"}
                    </span>
                </button>
            }
        />
    );
};
