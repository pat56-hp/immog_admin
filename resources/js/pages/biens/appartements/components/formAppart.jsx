import { useForm } from "@inertiajs/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import countryList from "react-select-country-list";
import Required from "../../../../components/required";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import InputError from "../../../../components/InputError";
import { Input } from "../../../../components/ui/input";
import { Switch } from "../../../../components/ui/switch";
import { Textarea } from "../../../../components/ui/textarea";
import ImageComponent from "../../../../components/imageComponent";
import { Button } from "../../../../components/ui/button";
import { Loader } from "lucide-react";

export default function FormAppart({
    appartement,
    proprietaires,
    types,
    isUpdate = false,
}) {
    const countries = countryList().getData();
    const [images, setImages] = useState(() => {
        if (isUpdate && appartement?.photos) {
            const images = JSON.parse(appartement.photos);

            return images.map((image) => ({
                photo: image,
                isLink: true, // Marquer comme lien existant
            }));
        }
        return [];
    });

    //Uplodate des images
    const onChangeImage = (images) => {
        if (Array.isArray(images) && images.length) {
            const validFiles = images.map((image) => {
                // Vérifie si c'est un fichier ou un lien déjà existant
                return image?.file instanceof File ? image.file : image.photo;
            });

            setImages(images);
            setData("photos", validFiles);
        } else {
            setImages([]);
            setData("photos", null);
        }
    };

    const { data, setData, post, processing, errors } = useForm({
        proprietaire_id: appartement?.proprietaire_id ?? "",
        type_id: appartement?.type_id ?? "",
        libelle: appartement?.libelle ?? "",
        description: appartement?.description ?? "",
        adresse: appartement?.adresse ?? "",
        ville: appartement?.ville ?? "",
        pays: appartement?.pays ?? "CI",
        superficie: appartement?.superficie ?? "1",
        nombre_pieces: appartement?.nombre_pieces ?? "1",
        nombre_sdb: appartement?.nombre_sdb ?? "1",
        loyer_mensuel: appartement?.loyer_mensuel ?? "0",
        charges_incluses: appartement?.charges_incluses ?? false,
        statut: appartement?.statut ?? "disponible",
        photos: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(
            route(
                isUpdate ? "appartements.update" : "appartements.store",
                appartement?.id
            ),
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => console.log(errors),
            }
        );
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="proprietaire_id">
                        Propriétaire <Required />
                    </Label>
                    <Select
                        defaultValue={String(data.proprietaire_id)}
                        onValueChange={(value) =>
                            setData("proprietaire_id", value)
                        }
                    >
                        <SelectTrigger className="mt-2 w-full !h-12">
                            <SelectValue placeholder="Sélectionner un propriétaire" />
                        </SelectTrigger>
                        <SelectContent>
                            {proprietaires.map((proprietaire) => (
                                <SelectItem
                                    key={proprietaire.id}
                                    value={proprietaire.id}
                                >
                                    {proprietaire.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.proprietaire_id} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="type_id">
                        Type d'appartement <Required />
                    </Label>
                    <Select
                        value={data.type_id}
                        onValueChange={(value) => setData("type_id", value)}
                    >
                        <SelectTrigger className="mt-2 w-full !h-12">
                            <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                            {types.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                    {type.libelle}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.type_id} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="libelle">
                        Libéllé <Required />
                    </Label>
                    <Input
                        id="libelle"
                        value={data.libelle}
                        placeholder="Libéllé de l'appartement"
                        onChange={(e) => setData("libelle", e.target.value)}
                    />
                    <InputError message={errors.libelle} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pays">
                        Pays <Required />
                    </Label>
                    <Select
                        value={data.pays}
                        onValueChange={(value) => setData("pays", value)}
                    >
                        <SelectTrigger className="mt-2 w-full !h-12">
                            <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((country, index) => (
                                <SelectItem key={index} value={country.value}>
                                    {country.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.type_id} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ville">
                        Ville <Required />
                    </Label>
                    <Input
                        id="ville"
                        placeholder="Renseigner la ville de l'appartement"
                        value={data.ville}
                        onChange={(e) => setData("ville", e.target.value)}
                    />
                    <InputError message={errors.ville} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="adresse">
                        Adresse <Required />
                    </Label>
                    <Input
                        id="adresse"
                        value={data.adresse}
                        placeholder="Adresse de l'appartement"
                        onChange={(e) => setData("adresse", e.target.value)}
                    />
                    <InputError message={errors.adresse} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="superficie">
                        Superficie (m²) <Required />
                    </Label>
                    <Input
                        id="superficie"
                        type="number"
                        value={data.superficie}
                        placeholder="Superficie de l'appartement"
                        onChange={(e) => setData("superficie", e.target.value)}
                    />
                    <InputError message={errors.superficie} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="nombre_pieces">
                        Nombre de pièces <Required />
                    </Label>
                    <Input
                        id="nombre_pieces"
                        type="number"
                        value={data.nombre_pieces}
                        placeholder="Nombre de pièces de l'appartement"
                        onChange={(e) =>
                            setData("nombre_pieces", e.target.value)
                        }
                    />
                    <InputError message={errors.nombre_pieces} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="nombre_sdb">
                        Nombre de salles de bain <Required />
                    </Label>
                    <Input
                        id="nombre_sdb"
                        type="number"
                        value={data.nombre_sdb}
                        placeholder="Nombre de salle de bain de l'appartement"
                        onChange={(e) => setData("nombre_sdb", e.target.value)}
                    />
                    <InputError message={errors.nombre_sdb} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="loyer_mensuel">
                        Loyer mensuel (FCFA) <Required />
                    </Label>
                    <Input
                        id="loyer_mensuel"
                        type="number"
                        value={data.loyer_mensuel}
                        placeholder="Loyer mensuel de l'appartement"
                        onChange={(e) =>
                            setData("loyer_mensuel", e.target.value)
                        }
                    />
                    <InputError message={errors.loyer_mensuel} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="statut">
                        Statut <Required />
                    </Label>
                    <Select
                        value={data.statut}
                        onValueChange={(value) => setData("statut", value)}
                    >
                        <SelectTrigger className="mt-2 w-full !h-12">
                            <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="disponible">
                                Disponible
                            </SelectItem>
                            <SelectItem value="occupé">Occupé</SelectItem>
                            <SelectItem value="en maintenance">
                                En maintenance
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.statut} />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="charges_incluses"
                        checked={data.charges_incluses}
                        onCheckedChange={(checked) =>
                            setData("charges_incluses", checked)
                        }
                    />
                    <Label htmlFor="charges_incluses">Charges incluses</Label>
                    <InputError message={errors.charges_incluses} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={data.description}
                        placeholder="Description de l'appartement"
                        onChange={(e) => setData("description", e.target.value)}
                        className="h-30"
                    />
                    <InputError message={errors.description} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Photo(s)</Label>
                    <ImageComponent
                        imageMaxNumber={5}
                        onChangeImage={onChangeImage}
                        image={images}
                        dataUrl="photo"
                        multiple={true}
                    />
                </div>
            </div>
            <div className="text-center">
                <Button
                    type="submit"
                    className="w-2xl h-12 bg-red-400 hover:bg-red-500 hover:cursor-pointer"
                >
                    Sauvegarder
                    {processing && <Loader />}
                </Button>
            </div>
        </form>
    );
}
