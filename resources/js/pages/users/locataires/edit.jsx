import { Head, useForm } from "@inertiajs/react";
import ContentLayout from "@/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ImageUpload";

export default function Edit({ locataire, title }) {
    const breadcrumb = [
        {
            title: "Tableau de bord",
            link: route("dashboard"),
        },
        {
            title: "Locataires",
            link: route("locataires.index"),
        },
        {
            title: "Modification d'un locataire",
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        nom: locataire.nom,
        prenom: locataire.prenom,
        email: locataire.email,
        telephone: locataire.telephone,
        adresse: locataire.adresse,
        date_naissance: locataire.date_naissance,
        profession: locataire.profession,
        picture: null,
        notes: locataire.notes,
        justificatif_identite: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("locataires.update", locataire.id), {
            onSuccess: () => toast.success("Locataire modifié avec succès"),
            onError: () => toast.error("Une erreur est survenue"),
        });
    };

    return (
        <ContentLayout
            module="Locataires"
            title={title}
            breadcrumb={breadcrumb}
            backButton={true}
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="nom">Nom</Label>
                        <Input
                            id="nom"
                            value={data.nom}
                            onChange={(e) => setData("nom", e.target.value)}
                            error={errors.nom}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="prenom">Prénom</Label>
                        <Input
                            id="prenom"
                            value={data.prenom}
                            onChange={(e) => setData("prenom", e.target.value)}
                            error={errors.prenom}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            error={errors.email}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="telephone">Téléphone</Label>
                        <Input
                            id="telephone"
                            value={data.telephone}
                            onChange={(e) =>
                                setData("telephone", e.target.value)
                            }
                            error={errors.telephone}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date_naissance">
                            Date de naissance
                        </Label>
                        <Input
                            id="date_naissance"
                            type="date"
                            value={data.date_naissance}
                            onChange={(e) =>
                                setData("date_naissance", e.target.value)
                            }
                            error={errors.date_naissance}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="profession">Profession</Label>
                        <Input
                            id="profession"
                            value={data.profession}
                            onChange={(e) =>
                                setData("profession", e.target.value)
                            }
                            error={errors.profession}
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="adresse">Adresse</Label>
                        <Textarea
                            id="adresse"
                            value={data.adresse}
                            onChange={(e) => setData("adresse", e.target.value)}
                            error={errors.adresse}
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                            error={errors.notes}
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label>Photo</Label>
                        <ImageUpload
                            value={data.picture}
                            onChange={(file) => setData("picture", file)}
                            error={errors.picture}
                            defaultImage={locataire.picture}
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label>Justificatif d'identité</Label>
                        <ImageUpload
                            value={data.justificatif_identite}
                            onChange={(file) =>
                                setData("justificatif_identite", file)
                            }
                            error={errors.justificatif_identite}
                            defaultImage={locataire.justificatif_identite}
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <p className="text-sm text-muted-foreground">
                            Formats acceptés : PDF, JPG, JPEG, PNG
                        </p>
                        {locataire.justificatif_identite && (
                            <div className="mt-2">
                                <a
                                    href={locataire.justificatif_identite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Voir le justificatif actuel
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={processing}>
                        Enregistrer
                    </Button>
                </div>
            </form>
        </ContentLayout>
    );
}
