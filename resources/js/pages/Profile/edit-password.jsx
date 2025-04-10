import React, { useRef } from "react";
import AuthLayout from "../../layouts/app-layout";
import PageTitle from "../../components/page-title";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import InputError from "../../components/InputError";
import { Button } from "../../components/ui/button";
import { Loader } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function EditPassword() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing } = useForm({
        currentPassword: "",
        password: "",
        password_confirmation: "",
    });

    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Mon profil",
            link: route("profile.edit"),
        },
        {
            title: "Mot de passe",
            link: route("profile.password"),
        },
    ];

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("profile.password"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success("Mise à jour du mot de passe éffectuée");
            },
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.currentPassword) {
                    reset("currentPassword");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <AuthLayout>
            <PageTitle
                title={"Modifier mon mot de passe"}
                breadcrumb={breadcrumb}
            />
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <div className="max-w-xl">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Modification du mot de passe
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Remplissez tous les champs pour la modification
                                de votre mot de passe
                            </p>
                        </header>
                        <form
                            onSubmit={updatePassword}
                            className="mt-6 space-y-4"
                        >
                            <div>
                                <Label htmlFor="currentPassword">
                                    Mot de passe actuel{" "}
                                    <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                    ref={currentPasswordInput}
                                    id="currentPassword"
                                    type="password"
                                    name="currentPassword"
                                    value={data.currentPassword}
                                    className="mt-2 block w-full h-12 pr-10 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                    placeholder="Mot de passe actuel"
                                    required
                                    onChange={(e) =>
                                        setData(
                                            "currentPassword",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.currentPassword}
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">
                                    Nouveau mot de passe
                                    <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                    ref={passwordInput}
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-2 block w-full h-12 pr-10 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                    placeholder="Nouveau mot de passe"
                                    required
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.password}
                                />
                            </div>
                            <div>
                                <Label htmlFor="passwordConfirmation">
                                    Confirmation du mot de passe
                                    <span className="text-red-400">*</span>
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-2 block w-full h-12 pr-10 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                    placeholder="Confirmer le nouveau mot de passe"
                                    required
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    className="h-12 w-50 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                                >
                                    {processing && <Loader />} Enregistrer
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
