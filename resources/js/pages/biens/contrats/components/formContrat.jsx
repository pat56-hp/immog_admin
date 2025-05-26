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
import { useForm } from "@inertiajs/react";

export default function FormContrat({
    proprietaires,
    locataires,
    isUpdate = false,
    contrat,
}) {
    const [appartements, setAppartements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modeleContrat, setModeleContrat] = useState("");

    // Chargement du modèle de contrat au montage du composant
    React.useEffect(() => {
        fetch("/files/contrat_de_bail.doc")
            .then((response) => response.text())
            .then((text) => {
                setModeleContrat(text);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement du modèle:", error);
                toast.error("Erreur lors du chargement du modèle de contrat");
            });
    }, []);

    const { data, setData, errors, processing, post } = useForm({
        proprietaire_id: "",
        locataire_id: "",
        appartement_id: "",
        garantie: "",
        type: "",
        date_debut: "",
        date_fin: "",
        description: "",
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
            (p) => p.id === parseInt(data.proprietaire_id)
        );
        const appartement = appartements.find(
            (a) => a.id === parseInt(data.appartement_id)
        );
        const locataire = locataires.find(
            (l) => l.id === parseInt(data.locataire_id)
        );

        //On verifie si les datas sont valide :
        if (
            !locataire ||
            !appartement ||
            !proprietaire ||
            !data.date_debut ||
            !data.date_fin ||
            !data.type ||
            !modeleContrat
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
                    Votre tâche est de générer un contrat de bail professionnel et conforme à la législation ivoirienne en utilisant un modèle de contrat que je soumet.
                    
                    Instructions importantes :
                    1. Générez UNIQUEMENT le contenu HTML du contrat, sans aucun marqueur de code (comme \`\`\`html) ou commentaires
                    2. Utilisez le modèle de contrat fourni comme base
                    3. Le contenu doit être directement utilisable dans un éditeur TinyMCE
                    4. Structurez le document avec des sections clairement définies, en utilisant toujours le modèle fornit
                    5. Utilisez uniquement des balises HTML standard
                    
                    Modèle de contrat :
                    ${modeleContrat}

                    
                    IMPORTANT : Ne pas inclure de marqueurs de code ou de commentaires dans la sortie.`,
                },
                {
                    role: "user",
                    content: `Aprés une analyse du fichier modèle, générez un contrat de bail professionnel en utilisant les informations suivantes à la place des pointillés figurants dans le fichier modèle sans supprimer du contenu provenant du modèle mais styliser le contenu et corriger les éventuelles fautes:
                    
                    Informations du bailleur :
                    - Nom : ${proprietaire.name}
                    - Contact : ${proprietaire.phone} / ${proprietaire.email}
                    - Adresse : ${proprietaire.address}
                    
                    Informations du bien :
                    - Type : ${appartement.libelle}
                    - Adresse : ${appartement.adresse}
                    - Loyer : ${appartement.loyer}
                    - Superficie : ${appartement.supercifie}
                    - Nombre de pièces : ${appartement.nombre_de_piece}
                    - Charges comprises : ${appartement.charge}
                    
                    Informations du locataire :
                    - Nom : ${locataire.nom_complet}
                    - Contact : ${locataire.telephone} / ${locataire.email}
                    - Adresse : ${locataire.adresse}
                    - Profession : ${locataire.profession}
                    
                    Durée du bail
                    - Du ${data.date_debut} au ${data.date_fin}

                    - Type de contrat : ${data.type}
                    - Montant de la garantie : ${
                        appartement.loyer * data.garantie
                    } FCFA
                    - Nombre de mois de la garantie : ${data.garantie} mois
                    
                    IMPORTANT : Générez uniquement le contenu HTML du contrat, sans aucun marqueur de code ou commentaires.`,
                },
            ],
        });

        completion
            .then((result) => {
                setData("description", result.choices[0].message.content);
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
                    </div>
                </div>
            </div>

            {data.description && (
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
                </div>
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
                            <Loader className="w-2 h-2" />
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
                        {processing && <Loader className="w-2 h-2" />}
                    </Button>
                )}
            </div>
        </form>
    );
}
