import { getAllCompanies } from "./module/getCompaniesData.js";
import { formatData as getCitiesNames } from "./module/getCitiesCode.js";

const cityInput = document.getElementById("input_ville");

async function fetchCities(cityName) {
    try {
        let cities = await getCitiesNames(cityName);

        const citiesSuggestionDiv = document.getElementById("suggestions_villes");
        citiesSuggestionDiv.innerHTML = ``;

        cities.forEach(element => {
            const citySuggestion = document.createElement(`li`);
            citySuggestion.style.border = "solid";
            citySuggestion.className = "city_suggestion";
            citySuggestion.addEventListener('click', () => {
                handleDivClick([element[0], element[3]]);
            });

            const citySuggestionContent = `<p>${element[0]} | ${element[1]}, ${element[2]}</p>`;
            citySuggestion.innerHTML = citySuggestionContent;
            citiesSuggestionDiv.appendChild(citySuggestion);
        });

        if (cityInput.value && !cities.length) {
            const citySuggestion = document.createElement(`li`);
            citySuggestion.style.border = "solid";
            citySuggestion.className = "city_suggestion";

            const citySuggestionContent = `Aucun résultat`;
            citySuggestion.innerHTML = citySuggestionContent;
            citiesSuggestionDiv.appendChild(citySuggestion);
        }

    } catch (err) {
        console.error("Erreur :", err);
    }
}

function handleDivClick(result) {
    console.log(result[0], result[1]);
    cityInput.value = ``;
    document.getElementById("suggestions_villes").innerHTML = ``;
}

// Sert a delay fetchCities(), évite un bug de frappe trop rapide
let debounceTimeout;
export function callFetchCities() {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        fetchCities(cityInput.value);
    }, 150); // <- valeur en ms du delay
}
// Rend la fonction accessible pour le globale (peut-être call dans index.html)
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