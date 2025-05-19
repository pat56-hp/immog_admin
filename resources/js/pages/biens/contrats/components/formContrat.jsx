import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import Required from "../../../../components/required";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { Label } from "../../../../components/ui/label";
import InputError from "../../../../components/InputError";
import { Input } from "../../../../components/ui/input";

export default function FormContrat({
    proprietaires,
    locataires,
    isUpdate = false,
}) {
    const [appartements, setAppartements] = useState([]);

    const handleChangeProprietaire = async (proprio) => {
        try {
            const response = await fetch(`/api/v1/appartements/${proprio}`);
            const result = await response.json();
            const data = result.data;
            setAppartements(data);
            console.log(data, result);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="proprietaire_id">
                        Propriétaire <Required />
                    </Label>
                    <Select
                        value=""
                        onValueChange={(value) =>
                            handleChangeProprietaire(value)
                        }
                    >
                        <SelectTrigger
                            id="proprietaire_id"
                            className="mt-2 mb-0 w-full !h-12"
                        >
                            <SelectValue placeholder="Sélectionner un propriétaire" />
                        </SelectTrigger>
                        <SelectContent>
                            {proprietaires.map((proprietaire, key) => (
                                <SelectItem
                                    key={key}
                                    value={String(proprietaire.id)}
                                >
                                    {proprietaire.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <i className="text-muted-foreground text-xs">
                        Veuillez choisir un propriétaire, pour commencer
                    </i>
                    <InputError message={""} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="appartement_id">
                        Appartement <Required />
                    </Label>
                    <Select
                        value=""
                        onValueChange={(value) => console.log(value)}
                    >
                        <SelectTrigger
                            id="appartement_id"
                            className="mt-2 w-full !h-12"
                        >
                            <SelectValue placeholder="Sélectionner un appartement" />
                        </SelectTrigger>
                        <SelectContent>
                            {appartements.map((appartement, key) => (
                                <SelectItem
                                    key={key}
                                    value={String(appartement.id)}
                                >
                                    {appartement.libelle}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <InputError message={""} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="locataire_id">
                        Locataire <Required />
                    </Label>
                    <Select
                        value=""
                        onValueChange={(value) => console.log(value)}
                    >
                        <SelectTrigger
                            id="locataire_id"
                            className="mt-2 w-full !h-12"
                        >
                            <SelectValue placeholder="Sélectionner un locataire" />
                        </SelectTrigger>
                        <SelectContent>
                            {locataires.map((locataire, key) => (
                                <SelectItem
                                    key={key}
                                    value={String(locataire.id)}
                                >
                                    {locataire.nom_complet}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <InputError message={""} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="date_debut">Debut</Label>
                        <Input
                            type="date"
                            id="date_debut"
                            name="date_debut"
                            value=""
                            onChange={(e) => console.log(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date_fin">Fin</Label>
                        <Input
                            type="date"
                            id="date_fin"
                            name="date_fin"
                            value=""
                            onChange={(e) => console.log(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="text-center">
                <Button
                    type="submit"
                    className="w-2xl h-12 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                >
                    Générer le contrat <ArrowRight />
                </Button>
            </div>
        </form>
    );
}
