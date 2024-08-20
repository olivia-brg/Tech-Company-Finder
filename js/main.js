import { getAllCompanies } from "./module/getCompaniesData.js";
import { formatData as getCitiesNames } from "./module/getCitiesCode.js";

async function fetchCities(cityName) {
    try {
        let cities = await getCitiesNames(cityName);
        console.log(cities);

        document.getElementById("suggestions_villes").innerHTML= ``;

        let citiesSuggestionDiv = document.getElementById("suggestions_villes");
        cities.forEach(element => {
            let citySuggestion = document.createElement(`div`);
            citySuggestion.className = "city_suggestion";

            let citySuggestionContent = `<p>${element[0]} | ${element[1]}, ${element[2]}</p>`;

            citySuggestion.innerHTML = citySuggestionContent;
            citiesSuggestionDiv.appendChild(citySuggestion);
        });


} catch (err) {
    console.error("Erreur :", err);
}
}

// Sert a delay la récupération de valeur, évite bug de frappe trop rapide
let debounceTimeout;

export function callFetchCities() {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        fetchCities(document.getElementById("input_ville").value);
    }, 50);
}
// Rend la fonction accessible globalement (pour être call dans index.html)
window.callFetchCities = callFetchCities;














// async function fetchCompaniesData() {
//     try {
//         let companiesData = await getAllCompanies();
//         console.log(companiesData);
//     } catch (err) {
//         console.error("Erreur :", err);
//     }
// }

// fetchCompaniesData();