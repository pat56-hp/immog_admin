//Generation de contrat de bail
export async function generateContrat(payload) {
    const response = await fetch("/api/v1/contrats/generate-contrat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            message: result.message || "Une erreur est survenue.",
            data: result.errors || result,
        };
    }

    return result.data;
}
