import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import ActionDialog from "../../../../components/shared/action-dialog";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import InputError from "../../../../components/InputError";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Button } from "../../../../components/ui/button";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

export default function UpdateRole({ role }) {
    const { data, patch, setData, processing, errors, reset } = useForm({
        libelle: role.libelle,
        status: role.status,
    });

    useEffect(() => {
        setData({
            libelle: role.libelle,
            status: role.status,
        });

        reset();
    }, [role]);

    return (
        <ActionDialog
            title="Modification de rôle"
            description="Remplissez tous les champs obligatoire"
            content={
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="libelle">
                            Libéllé
                            <span className="text-red-400">*</span>
                        </Label>
                        <Input
                            id="libelle"
                            autoFocus={false}
                            className="mt-2 block w-full h-12 pr-10 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 rounded-lg"
                            value={data.libelle}
                            onChange={(e) => setData("libelle", e.target.value)}
                            placeholder="Libéllé"
                            required
                        />
                        <InputError message={errors.libelle} />
                    </div>
                    <div className="flex gap-2">
                        <Checkbox
                            id="status"
                            checked={data.status}
                            onCheckedChange={(e) => setData("status", e)}
                        />
                        <Label htmlFor="status">Activer</Label>
                    </div>
                </div>
            }
            processing={processing}
            onConfirm={async () => {
                return new Promise((resolve, reject) => {
                    patch(route("roles.update", role.id), {
                        preserveScroll: true,
                        onSuccess: () => {
                            resolve(true);
                            toast.success("Rôle modifié avec succès !");
                            reset();
                        },
                        onError: (error) => {
                            console.error(error);
                            reject(new Error("Echec de la requete"));
                        },
                    });
                });
            }}
            trigger={
                <Button
                    className="bg-yellow-100 h-8 w-8 text-black hover:bg-yellow-200 hover:cursor-pointer"
                    size="icon"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            }
        />
    );
}
