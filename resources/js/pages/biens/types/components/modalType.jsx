import React from "react";
import { Button } from "../../../../components/ui/button";
import { Pencil, Plus } from "lucide-react";
import ActionDialog from "../../../../components/shared/action-dialog";
import { useForm } from "@inertiajs/react";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import Required from "../../../../components/required";
import { toast } from "sonner";
import InputError from "../../../../components/InputError";

export default function ModalTypeAppart({
    type,
    isUpdate = false,
    method = "POST",
}) {
    const { data, setData, processing, errors, reset, post } = useForm({
        libelle: type?.libelle ?? "",
        description: type?.description ?? "",
        _method: method,
    });

    return (
        <ActionDialog
            title={
                isUpdate
                    ? `Modification du type d\'appartement ${type?.libelle}`
                    : "Ajouter un nouveau type d'appartement"
            }
            description={"Les champs marqués par (*) sont obligatoire"}
            processing={processing}
            onConfirm={async () => {
                return new Promise((resolve, reject) => {
                    post(
                        isUpdate
                            ? route("appartements.types.update", type?.id)
                            : route("appartements.types.store"),
                        {
                            preserveScroll: true,
                            onSuccess: () => {
                                resolve(true);
                                reset();
                                toast.success(
                                    "Informations enregistrées avec succès"
                                );
                            },
                            onError: (error) => {
                                console.log(error);
                                reject(new Error("Echec de la requete"));
                            },
                        }
                    );
                });
            }}
            trigger={
                isUpdate ? (
                    <Button
                        className="bg-blue-500 h-8 w-8 hover:bg-blue-600 hover:cursor-pointer"
                        size="icon"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                ) : (
                    <Button className="hover:cursor-pointer">
                        <Plus className="w-4 h-4" /> Ajouter un type
                    </Button>
                )
            }
            content={
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="w-full">
                        <Label htmlFor="libelle">
                            Libéllé <Required />
                        </Label>
                        <Input
                            id="libelle"
                            className="mt-2"
                            value={data.libelle}
                            onChange={(e) => setData("libelle", e.target.value)}
                            placeholder="Renseignez un libéllé"
                            required
                        />
                        <InputError message={errors.libelle} />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="name"
                            className="mt-2"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.description)
                            }
                            placeholder="Renseignez une description"
                            required
                        />
                        <InputError message={errors.description} />
                    </div>
                </div>
            }
        />
    );
}
