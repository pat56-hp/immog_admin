import { useForm } from "@inertiajs/react";
import React from "react";
import ActionDialog from "../../../../components/shared/action-dialog";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "../../../../components/ui/label";
import Required from "../../../../components/required";
import { Input } from "../../../../components/ui/input";
import InputError from "../../../../components/InputError";
import { PhoneInput } from "react-international-phone";
import { Checkbox } from "../../../../components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";

export default function AddUserButton({ roles }) {
    const { data, post, setData, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        status: "",
        role: "",
        password: "",
    });

    return (
        <ActionDialog
            title={"Ajouter un nouvel utilisateur"}
            description={"Remplissez le formulaire"}
            processing={processing}
            onConfirm={async () => {
                return new Promise((resolve, reject) => {
                    post(route("users.store"), {
                        preserveScroll: true,
                        onSuccess: () => {
                            resolve(true);
                            reset();
                            toast.success("Utilisateur enregistré avec succès");
                        },
                        onError: (error) => {
                            console.log(error);
                            reject(new Error("Echec de la requete"));
                        },
                    });
                });
            }}
            trigger={
                <Button className="hover:cursor-pointer">
                    <Plus className="w-4 h-4" /> Ajouter un utilisateur
                </Button>
            }
            content={
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="w-full">
                        <Label htmlFor="name">
                            Nom & prénom(s) <Required />
                        </Label>
                        <Input
                            id="name"
                            className="mt-2"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Nom complet"
                            required
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="email">
                            Email <Required />
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            className="mt-2"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="Contact">Contact</Label>
                        <PhoneInput
                            className="mt-2 w-full"
                            placeholder="Contact"
                            defaultCountry="ci"
                            onChange={(phone) => setData("phone", phone)}
                            value={data.phone}
                        />
                        <InputError message={errors.phone} />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="role">
                            Role <Required />
                        </Label>
                        <Select
                            defaultValue={String(data.role)}
                            onValueChange={(e) => setData("role", e)}
                        >
                            <SelectTrigger className="mt-2 w-full !h-12">
                                <SelectValue placeholder="Sélectionnez un rôle" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role, key) => (
                                    <SelectItem
                                        key={key}
                                        value={String(role.id)}
                                    >
                                        {role.libelle}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="password">
                            Mot de passe <Required />
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-2 "
                            placeholder="Mot de passe"
                            required
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div className="w-full flex gap-2">
                        <Checkbox
                            id="status"
                            checked={data.status}
                            onCheckedChange={(status) =>
                                setData("status", status)
                            }
                        />
                        <Label htmlFor="status">Activer le compte</Label>
                        <InputError message={errors.phone} />
                    </div>
                </div>
            }
        />
    );
}
