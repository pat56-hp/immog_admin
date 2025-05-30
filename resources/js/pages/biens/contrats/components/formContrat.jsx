import React, { useState } from "react";
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
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "sonner";
import { useForm } from "@inertiajs/react";
import { Switch } from "../../../../components/ui/switch";
import { Skeleton } from "../../../../components/ui/skeleton";

export default function FormContrat({
    proprietaires,
    locataires,
    isUpdate = false,
    contrat,
}) {
    const [appartements, setAppartements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    console.log(contrat);

    const { data, setData, errors, setError, processing, post } = useForm({
        proprietaire_id: contrat?.proprietaire?.id ?? "",
        locataire_id: contrat?.locataire_id ?? "",
        appartement_id: contrat?.appartement?.id ?? "",
        garantie: contrat?.garantie ?? "",
        type: contrat?.type ?? "",
        date_debut: contrat?.date_debut ?? "",
        date_fin: contrat?.date_fin ?? "",
        description: contrat?.description ?? "",
        statut: contrat?.statut ?? "en attente",
        mail_send: contrat?.statut === "en cours" ? true : false,
        _method: isUpdate ? "PATCH" : "POST",
    });

    //Recuperation des appartements du proprietaire selectionné
    const handleChangeProprietaire = async (proprio) => {
        setData("proprietaire_id", proprio);
        try {
            const response = await fetch(`/api/v1/appartements/${proprio}`);
            const result = await response.json();
            const data = result.data;
            setAppartements(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    //Generation du contrat
    const handleGenerate = (e) => {
        e.preventDefault();
        setIsLoading(true);

        //Mise à jour des erreurs
        setError("appartement_id", "");
        setError("date_debut", "");
        setError("date_fin", "");
        setError("garantie", "");
        setError("locataire_id", "");
        setError("proprietaire_id", "");
        setError("type", "");

        setTimeout(async () => {
            try {
                const response = await fetch(
                    "/api/v1/contrats/generate-contrat",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            accept: "application/json",
                        },
                        body: JSON.stringify({
                            locataire: data.locataire_id,
                            appartement: data.appartement_id,
                            proprietaire: data.proprietaire_id,
                            date_debut: data.date_debut,
                            date_fin: data.date_fin,
                            garantie: data.garantie,
                            type: data.type,
                        }),
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    //Capture de l'erreur de la requête
                    throw {
                        status: response.status,
                        message: result.message || "Une erreur est survenue.",
                        data: result.errors || result,
                    };
                }

                setData("description", result.data);
            } catch (error) {
                // Gestion des erreurs
                toast.error(
                    error.message ||
                        "Oups, une erreur s'est produite. Verifiez les données renseignées et rééssayez."
                );

                if (error.data) {
                    console.log("Détails de l'erreur :", error.data);
                    setError("appartement_id", error.data?.appartement);
                    setError("date_debut", error.data?.date_debut);
                    setError("date_fin", error.data?.date_fin);
                    setError("garantie", error.data?.garantie);
                    setError("locataire_id", error.data?.locataire);
                    setError("proprietaire_id", error.data?.proprietaire);
                    setError("type", error.data?.type);
                }
            } finally {
                setIsLoading(false);
            }
        }, 3000);
    };

    //Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isUpdate ? "contrats.update" : "contrats.store";
        post(route(url, contrat?.id), {
            preserveScroll: true,
            onError: (errors) => {
                console.log(errors);
                toast.error(
                    "Une erreur s'est produite, veuillez vérifier les champs du formulaire"
                );
            },
        });
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="proprietaire_id">
                        Propriétaire <Required />
                    </Label>
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
                    <InputError message={errors.proprietaire_id} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="appartement_id">
                        Appartement <Required />
                    </Label>
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
                                onClick={handleGenerate}
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
                            <Editor
                                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                                value={data.description}
                                onEditorChange={(content) =>
                                    setData("description", content)
                                }
                                init={{
                                    height: 600,
                                    menubar: true,
                                    language: "fr_FR",
                                    plugins: [
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "charmap",
                                        "preview",
                                        "anchor",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "table",
                                        "help",
                                        "wordcount",
                                        "pagebreak",
                                    ],
                                    toolbar:
                                        "undo redo | formatselect | " +
                                        "bold italic underline strikethrough | alignleft aligncenter " +
                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                        "removeformat | pagebreak | help",
                                    content_style: `
                                    body { 
                                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 14px;
                                        line-height: 1.6;
                                        padding: 20px;
                                    }
                                    h1, h2, h3, h4, h5, h6 {
                                        margin-top: 1.5em;
                                        margin-bottom: 0.5em;
                                    }
                                    p {
                                        margin-bottom: 1em;
                                    }
                                `,
                                    formats: {
                                        bold: { inline: "strong" },
                                        italic: { inline: "em" },
                                        underline: { inline: "u" },
                                        strikethrough: { inline: "s" },
                                    },
                                    style_formats: [
                                        { title: "Titre 1", block: "h1" },
                                        { title: "Titre 2", block: "h2" },
                                        { title: "Titre 3", block: "h3" },
                                        { title: "Paragraphe", block: "p" },
                                    ],
                                    pagebreak_separator:
                                        '<hr class="page-break" style="page-break-after: always;" />',
                                    setup: (editor) => {
                                        editor.on("init", () => {
                                            editor.getContainer().style.transition =
                                                "border-color 0.15s ease-in-out";
                                        });
                                        editor.on("focus", () => {
                                            editor.getContainer().style.borderColor =
                                                "#2563eb";
                                        });
                                        editor.on("blur", () => {
                                            editor.getContainer().style.borderColor =
                                                "#e5e7eb";
                                        });
                                    },
                                }}
                            />
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
                                    <SelectItem value="En attente">
                                        En attente
                                    </SelectItem>
                                    <SelectItem value="En cours">
                                        En cours
                                    </SelectItem>
                                    <SelectItem value="Terminé">
                                        Terminé
                                    </SelectItem>
                                    <SelectItem value="Résilié">
                                        Résilié
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.statut} />
                        </div>
                        {data.statut === "En cours" && (
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
                        onClick={handleGenerate}
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
