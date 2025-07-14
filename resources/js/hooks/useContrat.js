import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { getAppartementByProprio } from "../services/proprietaireService";
import { generateContrat } from "../services/contratService";
import { toast } from "sonner";

export function useContrat(contrat, isUpdate) {
    const [isLoading, setIsLoading] = useState(false);
    const [appartements, setAppartements] = useState([]);
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

    //Récupération des appartements du propriétaire sélectionné
    const handleChangeProprietaire = async (proprioId) => {
        setData("proprietaire_id", proprioId);
        try {
            const result = await getAppartementByProprio(proprioId);
        } catch (error) {
            console.error(error.message);
        }
    };

    //Génération du contrat
    const handleGenerateContrat = (e) => {
        e.preventDefault();
        setIsLoading(true)[
            //Reset des erreurs
            ("appartement_id",
            "date_debut",
            "date_fin",
            "garantie",
            "locataire_id",
            "proprietaire_id",
            "type")
        ].forEach((field) => setError(field, ""));

        setTimeout(async () => {
            try {
                const result = await generateContrat({
                    locataire: data.locataire_id,
                    appartement: data.appartement_id,
                    proprietaire: data.proprietaire_id,
                    date_debut: data.date_debut,
                    date_fin: data.date_fin,
                    garantie: data.garantie,
                    type: data.type,
                });

                setData("description", result.data);
            } catch (error) {
                toast.error(
                    error.message ||
                        "Oups, une erreur s'est produite. Verifiez les données renseignées et rééssayez."
                );

                if (error.data) {
                    Object.entries(error.data).forEach(([key, val]) =>
                        setError(key, val)
                    );
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
            onError: () =>
                toast.error("Une erreur est survenue, vérifiez les champs"),
        });
    };

    // Chargement initial des appartements si update
    useEffect(() => {
        if (isUpdate && contrat?.proprietaire?.id) {
            getAppartementByProprio(contrat?.proprietaire?.id)
                .then(setAppartements)
                .catch((err) => console.error(err));
        }
    }, [isUpdate]);

    return {
        data,
        setData,
        errors,
        processing,
        isLoading,
        appartements,
        handleChangeProprietaire,
        handleGenerateContrat,
        handleSubmit,
    };
}
