function buildURL(city) {
    return `https://geo.api.gouv.fr/communes?nom=${city}&fields=departement&boost=population&limit=5`;
}

export async function getCities(city) {
    let url = buildURL(city);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Statut de la réponse: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error(error.message);
        return null;
    }
}
