import { useForm } from "@inertiajs/react";
import { useState } from "react";
import countryList from "react-select-country-list";
import { toast } from "sonner";

export function useAppartement(appartement, isUpdate) {
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

    const { data, setData, post, processing, errors } = useForm({
        proprietaire_id: appartement?.proprietaire_id ?? "",
        type_appartement_id: appartement?.type_appartement_id ?? "",
        //libelle: appartement?.libelle ?? "",
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
        _method: isUpdate ? "PUT" : "POST",
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
                //onSuccess: () => reset(),
                onError: (errors) => {
                    console.log(errors);
                    toast.error(
                        "Une erreur s'est produite, veuillez vérifier les champs du formulaire"
                    );
                },
            }
        );
    };

    return {
        images,
        data,
        setData,
        processing,
        errors,
        countries,
        onChangeImage,
        handleSubmit,
    };
}
