
import { formatData as getCitiesNames } from "./getCities.js";

export let citiesArray = [];

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

export async function fetchCities(cityName) {
    try {
        let cities = await getCitiesNames(cityName);
        displayCitySuggestions(cities);
    } catch (err) {
        handleError(err);
    }
}

function handleDivClick(results) {
    cityInput.value = ``;
    document.getElementById("suggestions_villes").innerHTML = ``;
    citiesArray.push({ name: results[0], code: results[1]});
    console.log(citiesArray);
    
}