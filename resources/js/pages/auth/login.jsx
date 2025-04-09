import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/layouts/auth-layout";
import { Link, useForm } from "@inertiajs/react";
import { Lock, Mail, EyeClosed, Eye } from "lucide-react";
import InputError from "@/components/InputError";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleEye = () => setIsOpen(!isOpen);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <AuthLayout>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="p-6 md:p-8 h-full flex items-center"
            >
                <div className="flex flex-col gap-6 flex-1">
                    <div className="flex flex-col mb-4">
                        <h1 className="text-xl font-bold">Connexion</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            Veuillez remplir tous les champs svp
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">
                            Email <span className="text-red-400">*</span>
                        </Label>
                        <div>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="adresse-email@example.com"
                                    className="h-12 pr-10 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                    required
                                    value={data.email}
                                    name="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <InputError message={errors.email} className="" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">
                                Mot de passe{" "}
                                <span className="text-red-400">*</span>
                            </Label>
                            <Link
                                href={route("password.request")}
                                className="ml-auto text-sm underline-offset-2 hover:underline text-red-400"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        <div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    className="h-12 pr-10 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                    type={isOpen ? "text" : "password"}
                                    required
                                    value={data.password}
                                    name="password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer"
                                    onClick={toggleEye}
                                >
                                    {isOpen ? (
                                        <EyeClosed className="h-5 w-5 text-gray-400 z-50" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 z-50" />
                                    )}
                                </div>
                            </div>
                            <InputError message={errors.password} />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            className="text-red-400 focus:ring-red-400"
                            name="remember"
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <Label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Se souvenir de moi
                        </Label>
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                        disabled={processing}
                    >
                        Se connecter
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
