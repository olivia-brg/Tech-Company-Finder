import { getAllCompanies } from "./module/getCompaniesData.js";
import { formatData as getCitiesNames } from "./module/getCitiesCode.js";

const cityInput = document.getElementById("input_ville");

function createCitySuggestionElement(cityData) {
    const citySuggestion = document.createElement('li');
    citySuggestion.style.border = "solid";
    citySuggestion.className = "city_suggestion";
    citySuggestion.innerHTML = `<p>${cityData[0]} | ${cityData[1]}, ${cityData[2]}</p>`;
    citySuggestion.addEventListener('click', () => {
        handleDivClick([cityData[0], cityData[3]]);
    });
    return citySuggestion;
}

function displayCitySuggestions(cities) {
    const citiesSuggestionDiv = document.getElementById("suggestions_villes");
    citiesSuggestionDiv.innerHTML = '';

    cities.forEach(city => {
        const citySuggestion = createCitySuggestionElement(city);
        citiesSuggestionDiv.appendChild(citySuggestion);
    });

    if (cityInput.value && !cities.length) {
        displayNoResults(citiesSuggestionDiv);
    }
}

function displayNoResults(container) {
    const citySuggestion = document.createElement('li');
    citySuggestion.style.border = "solid";
    citySuggestion.className = "city_suggestion";
    citySuggestion.innerHTML = `Aucun résultat`;
    container.appendChild(citySuggestion);
}

function handleError(err) {
    console.error("Erreur :", err);
}

async function fetchCities(cityName) {
    try {
        let cities = await getCitiesNames(cityName);
        displayCitySuggestions(cities);
    } catch (err) {
        handleError(err);
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