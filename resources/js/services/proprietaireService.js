//Recuperation des appartements appartenant à un proprio
export async function getAppartementByProprio(proprio) {
    const resp = await fetch(`/api/v1/appartements/${proprio}`);
    const result = await resp.json();

    if (!resp.ok) {
        throw {
            status: resp.status,
            message: result.message || "Une erreur est survenue.",
            data: result.errors || result,
        };
    }
    return result.data;
}
