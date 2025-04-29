import { useForm } from "@inertiajs/react";
import ActionAlertDialog from "../../../../components/shared/action-alert-dialog";
import { toast } from "sonner";

export const EditUserStatus = ({ user }) => {
    const { put, processing } = useForm();

    return (
        <ActionAlertDialog
            title={`Changer le statut de l\'utilisateur ${user.name} ?`}
            description={`Le statut actuel est « ${
                user.status === 1 ? "Actif" : "Inactif"
            } ». Continuer ?`}
            processing={processing}
            onConfirm={() =>
                put(route("users.status", user.id), {
                    preserveScroll: true,
                    onSuccess: () => toast.success("Mise à jour effectuée"),
                })
            }
            trigger={
                <button className="text-yellow-500 hover:text-yellow-600">
                    <span
                        className={`px-2 py-1 hover:cursor-pointer rounded-full text-xs ${
                            user.status === 1
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {user.status === 1 ? "Actif" : "Inactif"}
                    </span>
                </button>
            }
        />
    );
};
