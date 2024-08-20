import { getAllCompanies } from "./module/getCompaniesData.js";
import { getCities } from "./module/getCitiesCode.js";

async function fetchCities(city) {
    try {
        let cities = await getCities(city);
        console.log(cities);
    } catch (err) {
        console.error("Erreur :", err);
    }
}

export function callFetchCities() {
    const input = document.getElementById('test').value;
    console.log("Input value:", input);
    
    fetchCities(document.getElementById("test").value);
}

// Rend la fonction accessible globalement (pour être call dans index.html)
window.callFetchCities = callFetchCities;




async function fetchCompaniesData() {
    try {
        let companiesData = await getAllCompanies();
        console.log(companiesData);
    } catch (err) {
        console.error("Erreur :", err);
    }
}

fetchCompaniesData();