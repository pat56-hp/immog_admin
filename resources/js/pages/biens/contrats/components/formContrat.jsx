import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
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
import { Switch } from "../../../../components/ui/switch";
import { Skeleton } from "../../../../components/ui/skeleton";
import { useContrat } from "../../../../hooks/useContrat";
import { SimpleEditor } from "../../../../components/tiptap-templates/simple/simple-editor";

export default function FormContrat({
    proprietaires,
    locataires,
    isUpdate = false,
    contrat,
}) {
    const {
        data,
        setData,
        errors,
        processing,
        isLoading,
        appartements,
        handleChangeProprietaire,
        handleGenerateContrat,
        handleSubmit,
    } = useContrat(contrat, isUpdate);

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="proprietaire_id">
                        Propriétaire <Required />
                    </Label>
                    {!isUpdate && contrat?.statut !== "en cours" ? (
                        <>
                            <Select
                                value={String(data.proprietaire_id)}
                                onValueChange={handleChangeProprietaire}
                            >
                                <SelectTrigger
                                    id="proprietaire_id"
                                    className="mb-0 w-full !h-12"
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
                        </>
                    ) : (
                        <Input
                            type="text"
                            id="proprietaire_id"
                            value={contrat.proprietaire_name}
                            readonly
                            placeholder="Propriétaire d'appartement"
                            required
                        />
                    )}

                    <InputError message={errors.proprietaire_id} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="appartement_id">
                        Appartement <Required />
                    </Label>
                    {!isUpdate && contrat?.statut !== "en cours" ? (
                        <Select
                            value={String(data.appartement_id)}
                            onValueChange={(value) =>
                                setData("appartement_id", value)
                            }
                        >
                            <SelectTrigger
                                id="appartement_id"
                                className="mb-0 w-full !h-12"
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
                    ) : (
                        <Input
                            type="text"
                            id="proprietaire_id"
                            value={contrat.appartement_type}
                            readonly
                            placeholder="Appartement"
                            required
                        />
                    )}

                    <InputError message={errors.appartement_id} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="locataire_id">
                        Locataire <Required />
                    </Label>
                    <Select
                        value={String(data.locataire_id)}
                        onValueChange={(value) =>
                            setData("locataire_id", value)
                        }
                    >
                        <SelectTrigger
                            id="locataire_id"
                            className="mb-0 w-full !h-12"
                            required
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
                    <InputError message={errors.locataire_id} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="type">
                        Type de contrat <Required />
                    </Label>
                    <Select
                        value={data.type}
                        onValueChange={(value) => setData("type", value)}
                    >
                        <SelectTrigger
                            id="type"
                            className="mb-0 w-full !h-12"
                            required
                        >
                            <SelectValue placeholder="Sélectionner un type de contrat" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Bail d'habitation">
                                Bail d'habitation
                            </SelectItem>
                            <SelectItem value="Bail commercial">
                                Bail commercial
                            </SelectItem>
                            <SelectItem value="Bail professionnel">
                                Bail professionnel
                            </SelectItem>
                            <SelectItem value="Bail emphytéotique">
                                Bail emphytéotique
                            </SelectItem>
                            <SelectItem value="Autre type">
                                Autre type
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.type} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="garantie">
                        Garantie (Mois) <Required />
                    </Label>
                    <Input
                        type="number"
                        id="garantie"
                        name="date_debut"
                        value={data.garantie ?? 4}
                        onChange={(e) => setData("garantie", e.target.value)}
                        placeholder="Nombre de mois de la garantie"
                        required
                    />
                    <InputError message={errors.garantie} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="date_debut">
                            Debut <Required />
                        </Label>
                        <Input
                            type="date"
                            id="date_debut"
                            name="date_debut"
                            value={data.date_debut}
                            onChange={(e) =>
                                setData("date_debut", e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.date_debut} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date_fin">
                            Fin <Required />
                        </Label>
                        <Input
                            type="date"
                            id="date_fin"
                            name="date_fin"
                            value={data.date_fin}
                            onChange={(e) =>
                                setData("date_fin", e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.date_fin} />
                    </div>
                </div>
            </div>
            {data.description && (
                <>
                    <div className="space-y-4 grid-cols-1">
                        <div className="flex justify-between">
                            <Label>Aperçu du contrat</Label>
                            <Button
                                type="button"
                                className=" bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer"
                                onClick={handleGenerateContrat}
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? "Génération en cours..."
                                    : "Regénérer le contrat"}{" "}
                                {isLoading ? (
                                    <Loader className="w-2 h-2 animate-spin" />
                                ) : (
                                    <ArrowRight />
                                )}
                            </Button>
                        </div>
                        {isLoading ? (
                            <Skeleton className="w-full h-[200px]" />
                        ) : (
                            <div className="description_section">
                                <SimpleEditor content={data.description} />
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="statut">
                                Statut <Required />
                            </Label>
                            <Select
                                value={data.statut}
                                onValueChange={(value) =>
                                    setData("statut", value)
                                }
                            >
                                <SelectTrigger
                                    id="statut"
                                    className="mb-0 w-full !h-12"
                                    required
                                >
                                    <SelectValue placeholder="Sélectionner un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en attente">
                                        En attente
                                    </SelectItem>
                                    <SelectItem value="en cours">
                                        En cours
                                    </SelectItem>
                                    <SelectItem value="terminé">
                                        Terminé
                                    </SelectItem>
                                    <SelectItem value="résilié">
                                        Résilié
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.statut} />
                        </div>
                        {data.statut === "en cours" && (
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="mail_send"
                                    checked={data.mail_send}
                                    onCheckedChange={(checked) =>
                                        setData("mail_send", checked)
                                    }
                                />
                                <Label htmlFor="mail_send">
                                    Envoyer le contrat aux deux parties
                                </Label>
                                <InputError message={errors.mail_send} />
                            </div>
                        )}
                    </div>
                </>
            )}

            <div className="text-center space-x-4">
                {!data.description && (
                    <Button
                        type="button"
                        className="w-2xl h-12 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                        onClick={handleGenerateContrat}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Génération en cours..."
                            : "Générer le contrat"}{" "}
                        {isLoading ? (
                            <Loader className="w-2 h-2 animate-spin" />
                        ) : (
                            <ArrowRight />
                        )}
                    </Button>
                )}

                {data.description && (
                    <Button
                        type="submit"
                        className="w-2xl h-12 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                        disabled={processing}
                    >
                        Enregistrer le contrat{" "}
                        {processing && (
                            <Loader className="w-2 h-2 animate-spin" />
                        )}
                    </Button>
                )}
            </div>
        </form>
    );
}
