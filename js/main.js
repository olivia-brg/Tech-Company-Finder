import { getAllCompanies } from "./module/getCompaniesData.js";
import { formatData as getCitiesNames } from "./module/getCitiesCode.js";

async function fetchCities(cityName) {
    try {
        let cities = await getCitiesNames(cityName);
        console.log("main", cities);
    } catch (err) {
        console.error("Erreur :", err);
    }
}

export function callFetchCities() {
    const input = document.getElementById('test').value;
    
    fetchCities(document.getElementById("test").value);
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