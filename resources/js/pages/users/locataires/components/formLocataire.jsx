import React from "react";
import { useForm } from "@inertiajs/react";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { PhoneInput } from "react-international-phone";
import { Loader } from "lucide-react";
import ImageComponent from "../../../../components/imageComponent";
import Required from "../../../../components/required";
import { useState } from "react";
import InputError from "../../../../components/InputError";
import { getFormattedDate } from "../../../../helper/helper";

export default function FormLocataire({ locataire, isUpdate = false }) {
    const [image, setImage] = useState(
        isUpdate ? [{ data_url: locataire.image }] : []
    );

    const [identities, setIdentities] = useState(() => {
        if (isUpdate && locataire?.justificatif_identite) {
            const images = JSON.parse(locataire.justificatif_identite);

            return images.map((image) => ({
                justificatif_identite: image,
                isLink: true, // Marquer comme lien existant
            }));
        }
        return [];
    });

    const onChangePicture = (image) => {
        if (image.length && image[0]?.file instanceof File) {
            setImage(image);
            setData("picture", image[0].file);
        } else {
            setImage([]);
            setData("picture", null);
        }
    };

    const onChangeIdentity = (images) => {
        console.log(images);
        if (Array.isArray(images) && images.length) {
            /*             const validFiles = images
                .filter((image) => image?.file instanceof File)
                .map((image) => image.file); */

            const validFiles = images.map((image) => {
                // Vérifie si c'est un fichier ou un lien déjà existant
                return image?.file instanceof File
                    ? image.file
                    : image.justificatif_identite;
            });

            setIdentities(images);
            setData("justificatif_identite", validFiles);
        } else {
            setIdentities([]);
            setData("justificatif_identite", null);
        }
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        nom: locataire?.nom ?? "",
        prenom: locataire?.prenom ?? "",
        email: locataire?.email ?? "",
        telephone: locataire?.telephone ?? "",
        adresse: locataire?.adresse ?? "",
        date_naissance: getFormattedDate(locataire?.date_naissance) ?? "",
        profession: locataire?.profession ?? "",
        picture: null,
        notes: locataire?.notes ?? "",
        justificatif_identite: null,
        _method: isUpdate ? "PUT" : "POST",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(
            route(
                isUpdate ? "locataires.update" : "locataires.store",
                locataire?.id
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
                    <Label htmlFor="nom">
                        Nom <Required />
                    </Label>
                    <Input
                        id="nom"
                        value={data.nom}
                        placeholder="Ajouter un nom"
                        onChange={(e) => setData("nom", e.target.value)}
                    />
                    <InputError message={errors.nom} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="prenom">
                        Prénom <Required />
                    </Label>
                    <Input
                        id="prenom"
                        value={data.prenom}
                        placeholder="Ajouter un prénom"
                        onChange={(e) => setData("prenom", e.target.value)}
                        error={errors.prenom}
                    />
                    <InputError message={errors.prenom} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        placeholder="Ajouter une adresse email"
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="telephone">
                        Téléphone <Required />
                    </Label>
                    <PhoneInput
                        className="mt-2"
                        value={data.telephone}
                        onChange={(phone) => setData("telephone", phone)}
                        placeholder="Numéro de téléphone"
                        defaultCountry="ci"
                        id="phone"
                    />
                    <InputError message={errors.telephone} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="date_naissance">Date de naissance</Label>
                    <Input
                        id="date_naissance"
                        type="date"
                        value={data.date_naissance}
                        placeholder="Ajouter une date de naissance"
                        onChange={(e) =>
                            setData("date_naissance", e.target.value)
                        }
                        error={errors.date_naissance}
                    />
                    <InputError message={errors.date_naissance} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="profession">Profession</Label>
                    <Input
                        id="profession"
                        value={data.profession}
                        placeholder="Ajouter une profession"
                        onChange={(e) => setData("profession", e.target.value)}
                        error={errors.profession}
                    />
                    <InputError message={errors.profession} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="adresse">Adresse</Label>
                    <Textarea
                        id="adresse"
                        value={data.adresse}
                        placeholder="Ajouter une adresse"
                        onChange={(e) => setData("adresse", e.target.value)}
                        error={errors.adresse}
                    />
                    <InputError message={errors.adresse} />
                </div>

                <div className="space-y-2 ">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                        id="notes"
                        value={data.notes}
                        placeholder="Ajouter des notes"
                        onChange={(e) => setData("notes", e.target.value)}
                        error={errors.notes}
                    />
                    <InputError message={errors.notes} />
                </div>

                <div className="space-y-2">
                    <Label>Photo</Label>
                    <ImageComponent
                        imageMaxNumber={1}
                        image={image}
                        onChangeImage={onChangePicture}
                    />
                    <InputError message={errors.picture} />
                </div>

                <div className="space-y-2 ">
                    <Label>Justificatif d'identité</Label>
                    <ImageComponent
                        imageMaxNumber={2}
                        image={identities}
                        onChangeImage={onChangeIdentity}
                        multiple={true}
                        dataUrl="justificatif_identite"
                    />
                    <p className="text-xs text-red-foreground">
                        Veuillez ajouter au moins deux justificatifs d'identité.
                    </p>
                    <InputError message={errors.justificatif_identite} />
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
