function buildURL(cityName) {
    return `https://geo.api.gouv.fr/communes?nom=${cityName}&fields=departement&boost=population&limit=5`;
}

async function getCitiesData(cityName) {
    let url = buildURL(cityName);

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

export async function formatData (cityName) {
    
    let rawData = await getCitiesData(cityName);
    if (!rawData) return;
    
    let city = [];
    rawData.forEach(element => {
        city.push([element.nom, element.departement.nom,element.departement.code, element.code]);
    });

    return city;
}