import React from "react";
import AuthLayout from "../../layouts/auth-layout";
import { Link } from "@inertiajs/react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { Lock, Mail } from "lucide-react";

export default function Login() {
    return (
        <AuthLayout>
            <form className="p-6 md:p-8 h-full flex items-center">
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
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="adresse-email@example.com"
                                className="h-12 pr-10 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">
                                Mot de passe{" "}
                                <span className="text-red-400">*</span>
                            </Label>
                            <Link
                                href="/auth/password-reset"
                                className="ml-auto text-sm underline-offset-2 hover:underline text-red-400"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                className="h-12 pr-10 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500 rounded-lg"
                                type="password"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            className="text-red-400 focus:ring-red-400"
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
                    >
                        Se connecter
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
