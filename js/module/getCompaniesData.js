const codeNAF = ["62.01Z", "62.02A", "62.09Z", "58.29C", "58.21Z"];
const codeCommunes = ["44109", "44162", "44204", "44190", "44035", "44201"];
const staffSizeCode = ["52", "51", "42", "41", "31", "22", "21", "12", "11"];

const activiteMapping = {
    "58.21Z" : "Édition de jeux électroniques",
    "58.29C" : "Édition de logiciels applicatifs",
    "62.01Z": "Programmation informatique",
    "62.02A": "Conseil en systèmes et logiciels informatiques",
    "62.03Z" : "Gestion d'installations informatiques",
    "62.09Z" : "Autres activités informatiques",
    "63.11Z" : "Traitement de données, hébergement et activités connexes"
};

const effectifMapping = {
    "00" : "0 salarié",
    "01" : "1 ou 2 salariés",
    "02" : "3 à 5 salariés",
    "03" : "6 à 9 salariés",
    "11" : "10 à 19 salariés",
    "12" : "20 à 49 salariés",
    "21" : "50 à 99 salariés",
    "22" : "100 à 199 salariés",
    "31" : "200 à 499 salariés",
    "41" : "500 à 999 salariés",
    "42" : "1000 à 1999 salariés",
    "51" : "2000 à 4999 salariés",
    "52" : "5000 salariés ou plus",
    "NN" : "Effectif inconnu"
};

function createParamString(paramName, values) {
    return `${paramName}=${values.join(',')}`;
}

function buildURL(page) {
    const activity = createParamString("activite_principale", codeNAF);
    const allCities = createParamString("code_commune", codeCommunes);
    const allEffectif = createParamString("tranche_effectif_salarie", staffSizeCode);

    return `https://recherche-entreprises.api.gouv.fr/search?${activity}&${allCities}&${allEffectif}&page=${page}&per_page=25`;
}

async function getCompany(page) {
    let url = buildURL(page);

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

function formatData(data) {
    return data.map(entreprise => {
        const etablissementsOuverts = entreprise.matching_etablissements
            .filter(etablissement => etablissement.date_fermeture === null)
            .map(etablissement => {
                return {
                    "Adresse": etablissement.adresse,
                    "Activité": activiteMapping[etablissement.activite_principale] || "Activité inconnue",
                    "Salariés": effectifMapping[etablissement.tranche_effectif_salarie] || "Tranche inconnue",
                    "latitude": etablissement.latitude,
                    "longitude": etablissement.longitude
                };
            });

        if (etablissementsOuverts.length > 0) {
            return {
                "Entreprise": entreprise.nom_complet,
                "Etablissements": etablissementsOuverts
            };
        }
    }).filter(entreprise => entreprise);
}

export async function getAllCompanies() {
    let json = [];

    let firstPageData = await getCompany(1);
    if (!firstPageData) return;

    let totalPages = firstPageData.total_pages;

    json.push(...firstPageData.results);

    for (let page = 2; page <= totalPages; page++) {
        let pageData = await getCompany(page);
        if (pageData) {
            json.push(...pageData.results);
        }
    }

    return formatData(json);

    // try {
    //     let dictstring = JSON.stringify(formattedJson, null, 2);
    //     await fs.writeFile("entreprise_tech.json", dictstring);
    //     console.log("Fichier 'entreprise_tech.json' créé avec succès.");
    // } catch (err) {
    //     console.error("Erreur lors de l'écriture du fichier :", err);
    // }

}