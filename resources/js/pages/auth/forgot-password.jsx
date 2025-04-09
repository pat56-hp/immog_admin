import React from "react";
import AuthLayout from "../../layouts/auth-layout";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { ArrowLeft, Mail, MoveLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function ForgotPassword() {
    return (
        <AuthLayout>
            <form className="p-6 md:p-8 h-full flex items-center">
                <div className="flex flex-col gap-6 flex-1">
                    <div className="flex flex-col mb-4">
                        <h1 className="text-xl font-bold">
                            Mot de passe oublié
                        </h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            Entrez votre email pour recevoir un lien de
                            réinitialisation
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

                    <Button
                        type="submit"
                        className="w-full h-12 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                    >
                        Recevoir le lien de réinitialisation
                    </Button>
                    <div className="mt-3 text-center">
                        <a
                            href="#"
                            onClick={() => window.history.back()}
                            className="inline-flex items-center text-sm font-medium text-red-400 hover:text-red-400 transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour à la connexion
                        </a>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
