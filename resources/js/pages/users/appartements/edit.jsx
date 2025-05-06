import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Switch } from "@/Components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";
import { toast } from "sonner";
import { ImageUpload } from "@/Components/ImageUpload";
import { ContentLayout } from "@/Layouts/ContentLayout";

export default function Edit({ appartement, proprietaires, types }) {
    const { data, setData, put, processing, errors } = useForm({
        proprietaire_id: appartement.proprietaire_id,
        type_id: appartement.type_id,
        nom: appartement.nom,
        description: appartement.description,
        adresse: appartement.adresse,
        ville: appartement.ville,
        pays: appartement.pays,
        superficie: appartement.superficie,
        nombre_pieces: appartement.nombre_pieces,
        nombre_sdb: appartement.nombre_sdb,
        loyer_mensuel: appartement.loyer_mensuel,
        charges_incluses: appartement.charges_incluses,
        statut: appartement.statut,
        photos: appartement.photos || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("appartements.update", appartement.id), {
            onSuccess: () => {
                toast.success("Appartement modifié avec succès");
            },
            onError: () => {
                toast.error("Une erreur est survenue");
            },
        });
    };

    return (
        <ContentLayout
            title="Modifier l'appartement"
            action={
                <Link href={route("appartements.index")}>
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
            }
        >
            <Card>
                <CardHeader>
                    <CardTitle>Informations de l'appartement</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="proprietaire_id">
                                    Propriétaire
                                </Label>
                                <Select
                                    value={data.proprietaire_id}
                                    onValueChange={(value) =>
                                        setData("proprietaire_id", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un propriétaire" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {proprietaires.map((proprietaire) => (
                                            <SelectItem
                                                key={proprietaire.id}
                                                value={proprietaire.id}
                                            >
                                                {proprietaire.nom}{" "}
                                                {proprietaire.prenom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.proprietaire_id && (
                                    <p className="text-sm text-red-500">
                                        {errors.proprietaire_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type_id">
                                    Type d'appartement
                                </Label>
                                <Select
                                    value={data.type_id}
                                    onValueChange={(value) =>
                                        setData("type_id", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {types.map((type) => (
                                            <SelectItem
                                                key={type.id}
                                                value={type.id}
                                            >
                                                {type.nom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.type_id && (
                                    <p className="text-sm text-red-500">
                                        {errors.type_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nom">
                                    Nom de l'appartement
                                </Label>
                                <Input
                                    id="nom"
                                    value={data.nom}
                                    onChange={(e) =>
                                        setData("nom", e.target.value)
                                    }
                                />
                                {errors.nom && (
                                    <p className="text-sm text-red-500">
                                        {errors.nom}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="adresse">Adresse</Label>
                                <Input
                                    id="adresse"
                                    value={data.adresse}
                                    onChange={(e) =>
                                        setData("adresse", e.target.value)
                                    }
                                />
                                {errors.adresse && (
                                    <p className="text-sm text-red-500">
                                        {errors.adresse}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ville">Ville</Label>
                                <Input
                                    id="ville"
                                    value={data.ville}
                                    onChange={(e) =>
                                        setData("ville", e.target.value)
                                    }
                                />
                                {errors.ville && (
                                    <p className="text-sm text-red-500">
                                        {errors.ville}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pays">Pays</Label>
                                <Input
                                    id="pays"
                                    value={data.pays}
                                    onChange={(e) =>
                                        setData("pays", e.target.value)
                                    }
                                />
                                {errors.pays && (
                                    <p className="text-sm text-red-500">
                                        {errors.pays}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="superficie">
                                    Superficie (m²)
                                </Label>
                                <Input
                                    id="superficie"
                                    type="number"
                                    value={data.superficie}
                                    onChange={(e) =>
                                        setData("superficie", e.target.value)
                                    }
                                />
                                {errors.superficie && (
                                    <p className="text-sm text-red-500">
                                        {errors.superficie}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nombre_pieces">
                                    Nombre de pièces
                                </Label>
                                <Input
                                    id="nombre_pieces"
                                    type="number"
                                    value={data.nombre_pieces}
                                    onChange={(e) =>
                                        setData("nombre_pieces", e.target.value)
                                    }
                                />
                                {errors.nombre_pieces && (
                                    <p className="text-sm text-red-500">
                                        {errors.nombre_pieces}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nombre_sdb">
                                    Nombre de salles de bain
                                </Label>
                                <Input
                                    id="nombre_sdb"
                                    type="number"
                                    value={data.nombre_sdb}
                                    onChange={(e) =>
                                        setData("nombre_sdb", e.target.value)
                                    }
                                />
                                {errors.nombre_sdb && (
                                    <p className="text-sm text-red-500">
                                        {errors.nombre_sdb}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="loyer_mensuel">
                                    Loyer mensuel (FCFA)
                                </Label>
                                <Input
                                    id="loyer_mensuel"
                                    type="number"
                                    value={data.loyer_mensuel}
                                    onChange={(e) =>
                                        setData("loyer_mensuel", e.target.value)
                                    }
                                />
                                {errors.loyer_mensuel && (
                                    <p className="text-sm text-red-500">
                                        {errors.loyer_mensuel}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="statut">Statut</Label>
                                <Select
                                    value={data.statut}
                                    onValueChange={(value) =>
                                        setData("statut", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="disponible">
                                            Disponible
                                        </SelectItem>
                                        <SelectItem value="occupé">
                                            Occupé
                                        </SelectItem>
                                        <SelectItem value="en maintenance">
                                            En maintenance
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.statut && (
                                    <p className="text-sm text-red-500">
                                        {errors.statut}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="charges_incluses"
                                    checked={data.charges_incluses}
                                    onCheckedChange={(checked) =>
                                        setData("charges_incluses", checked)
                                    }
                                />
                                <Label htmlFor="charges_incluses">
                                    Charges incluses
                                </Label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Photos</Label>
                            <ImageUpload
                                value={data.photos}
                                onChange={(urls) => setData("photos", urls)}
                                multiple
                            />
                            {errors.photos && (
                                <p className="text-sm text-red-500">
                                    {errors.photos}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                Modifier l'appartement
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </ContentLayout>
    );
}
