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
import OpenAI from "openai";
import { toast } from "sonner";

export default function FormContrat({
    proprietaires,
    locataires,
    isUpdate = false,
}) {
    const [appartements, setAppartements] = useState([]);
    const [selectedProprietaire, setSelectedProprietaire] = useState("");
    const [selectedAppartement, setSelectedAppartement] = useState("");
    const [selectedLocataire, setSelectedLocataire] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [contratContent, setContratContent] = useState("");
    const [typeContrat, setTypeContrat] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //Recuperation des appartements du proprietaire selectionné
    const handleChangeProprietaire = async (proprio) => {
        setSelectedProprietaire(proprio);
        try {
            const response = await fetch(`/api/v1/appartements/${proprio}`);
            const result = await response.json();
            const data = result.data;
            setAppartements(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    //Initialisation de OPENAI
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_KEY_TEST,
        dangerouslyAllowBrowser: true,
    });

    //Generation du contrat à partir de l'IA
    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const proprietaire = proprietaires.find(
            (p) => p.id === parseInt(selectedProprietaire)
        );
        const appartement = appartements.find(
            (a) => a.id === parseInt(selectedAppartement)
        );
        const locataire = locataires.find(
            (l) => l.id === parseInt(selectedLocataire)
        );

        //On verifie si les datas sont valide :
        if (
            !locataire ||
            !appartement ||
            !proprietaire ||
            !dateDebut ||
            !dateFin ||
            !typeContrat
        ) {
            setIsLoading(false);
            toast.error("Veuillez remplir tous les champs !");
            return;
        }

        const completion = openai.chat.completions.create({
            model: "gpt-4.1-mini",
            store: true,
            messages: [
                {
                    role: "system",
                    content: `Vous êtes un expert en droit immobilier ivoirien, spécialisé dans la rédaction de contrats de bail. 
                    Votre tâche est de générer un contrat de bail professionnel et conforme à la législation ivoirienne.
                    
                    Instructions importantes :
                    1. Générez UNIQUEMENT le contenu HTML du contrat, sans aucun marqueur de code (comme \`\`\`html) ou commentaires
                    2. Le contenu doit être directement utilisable dans un éditeur TinyMCE
                    3. Structurez le document avec des sections clairement définies
                    4. Utilisez uniquement des balises HTML standard
                    
                    Structure attendue du contrat :
                    - En-tête avec titre et date
                    - Section des parties (bailleur et locataire)
                    - Description du bien
                    - Conditions du bail
                    - Obligations des parties
                    - Clauses spécifiques
                    - Signature et date
                    
                    IMPORTANT : Ne pas inclure de marqueurs de code ou de commentaires dans la sortie.`,
                },
                {
                    role: "user",
                    content: `Générez un contrat de bail professionnel en utilisant les informations suivantes :
                    
                    Informations du bailleur :
                    - Nom : ${proprietaire.name}
                    - Contact : ${proprietaire.phone} / ${proprietaire.email}
                    - Adresse : ${proprietaire.address}
                    
                    Informations du bien :
                    - Type : ${appartement.libelle}
                    - Adresse : ${appartement.adresse_name}
                    - Loyer : ${appartement.loyer_formatted}
                    - Superficie : ${appartement.superficie_formatted}
                    - Nombre de pièces : ${appartement.nombre_pieces}
                    - Charges comprises : ${appartement.charges_formatted}
                    
                    Informations du locataire :
                    - Nom : ${locataire.nom_complet}
                    - Contact : ${locataire.telephone} / ${locataire.email}
                    - Adresse : ${locataire.adresse}
                    - Profession : ${locataire.profession}
                    
                    Durée du bail
                    - Du ${dateDebut} au ${dateFin}
                    
                    IMPORTANT : Générez uniquement le contenu HTML du contrat, sans aucun marqueur de code ou commentaires.`,
                },
            ],
        });

        completion
            .then((result) => {
                setContratContent(result.choices[0].message.content);
            })
            .catch((error) => {
                console.error(error);
                toast.error(
                    error.message ||
                        "Oups, une erreur s'est produite. Verifiez les données renseignées et rééssayez."
                );

                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    //Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/v1/contrats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    proprietaire_id: selectedProprietaire,
                    appartement_id: selectedAppartement,
                    locataire_id: selectedLocataire,
                    date_debut: dateDebut,
                    date_fin: dateFin,
                    contenu: contratContent,
                }),
            });

            if (response.ok) {
                // Redirection ou notification de succès
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="proprietaire_id">
                        Propriétaire <Required />
                    </Label>
                    <Select
                        value={selectedProprietaire}
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
                    <InputError message={""} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="appartement_id">
                        Appartement <Required />
                    </Label>
                    <Select
                        value={selectedAppartement}
                        onValueChange={setSelectedAppartement}
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
                    <InputError message={""} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="locataire_id">
                        Locataire <Required />
                    </Label>
                    <Select
                        value={selectedLocataire}
                        onValueChange={setSelectedLocataire}
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
                    <InputError message={""} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="type">
                        Type de contrat <Required />
                    </Label>
                    <Select value={typeContrat} onValueChange={setTypeContrat}>
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
                    <InputError message={""} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date_debut">
                        Debut <Required />
                    </Label>
                    <Input
                        type="date"
                        id="date_debut"
                        name="date_debut"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date_fin">
                        Fin <Required />
                    </Label>
                    <Input
                        type="date"
                        id="date_fin"
                        name="date_fin"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        required
                    />
                </div>
            </div>

            {contratContent && (
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label>Contenu du contrat</Label>
                        <Button
                            type="button"
                            className=" bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer"
                            onClick={handleGenerate}
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Génération en cours..."
                                : "Générer le contrat"}{" "}
                            {isLoading ? (
                                <Loader className="w-2 h-2" />
                            ) : (
                                <ArrowRight />
                            )}
                        </Button>
                    </div>
                    <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        value={contratContent}
                        onEditorChange={(content) => setContratContent(content)}
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
                </div>
            )}

            <div className="text-center space-x-4">
                {!contratContent && (
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
                            <Loader className="w-2 h-2" />
                        ) : (
                            <ArrowRight />
                        )}
                    </Button>
                )}

                {contratContent && (
                    <Button
                        type="submit"
                        className="w-2xl h-12 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                    >
                        Enregistrer le contrat
                    </Button>
                )}
            </div>
        </form>
    );
}
