import { fetchCities } from "./module/displayCities.js";
import { fetchCompaniesData } from "./module/getCompaniesData.js";

// Sert a delay fetchCities(), évite bug d'affichage lors de frappe trop rapide
let debounceTimeout;
export function callFetchCities() {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        fetchCities(document.getElementById("input_ville").value);
    }, 150); // <- valeur en ms du delay
}
// Rend la fonction accessible pour le globale (peut-être call dans index.html)
window.callFetchCities = callFetchCities;

export function searchCompanies() {
    fetchCompaniesData();
}
window.searchCompanies = searchCompanies;