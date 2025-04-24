import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import ActionDialog from "../../../../components/shared/action-dialog";
import { Edit, Plus } from "lucide-react";
import { DropdownMenuItem } from "../../../../components/ui/dropdown-menu";
import { Label } from "../../../../components/ui/label";
import Required from "../../../../components/required";
import { Input } from "../../../../components/ui/input";
import InputError from "../../../../components/InputError";
import { PhoneInput } from "react-international-phone";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { Checkbox } from "../../../../components/ui/checkbox";

export default function UpdateUser({ user, roles }) {
    const itemRef = useRef(null);

    const [open, setOpen] = useState(false);
    const { data, patch, setData, processing, errors, reset } = useForm({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        status: user?.status,
        role: user?.role_id,
        password: "",
    });

    useEffect(() => {
        setData({
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            status: user?.status,
            role: user?.role_id,
            password: "",
        });
    }, [user]);

    return (
        <>
            <DropdownMenuItem
                ref={itemRef}
                onSelect={(e) => {
                    e.preventDefault();

                    const menu = itemRef.current?.closest(
                        "[data-radix-popper-content-wrapper]"
                    );

                    if (menu) {
                        menu.setAttribute("style", "display: none");
                    }

                    // Lancer modale après un tout petit délai
                    setTimeout(() => {
                        setOpen(true);
                    }, 80);
                }}
            >
                <Edit className="h-4 w-4" /> Modifier
            </DropdownMenuItem>
            <ActionDialog
                open={open}
                onOpenChange={setOpen}
                title={`Modifier un utilisateur`}
                description={`Modifier l'utilisateur ${user?.name}`}
                processing={processing}
                onConfirm={async () => {
                    return new Promise((resolve, reject) => {
                        patch(route("users.update", user?.id), {
                            preserveScroll: true,
                            onSuccess: () => {
                                resolve(true);
                                reset();
                                const menu = itemRef.current?.closest(
                                    "[data-radix-popper-content-wrapper]"
                                );
                                menu?.setAttribute("style", "display: initial");
                            },
                            onError: (errors) => {
                                console.log(errors);
                                reject(errors);
                            },
                        });
                    });
                }}
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
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
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
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
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
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                //value={data.password}
                                className="mt-2 "
                                placeholder="Mot de passe"
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
        </>
    );
}
