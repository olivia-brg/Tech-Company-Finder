import { citiesArray } from "./displayDropdownCities.js";


function createSelectedCityElement(city, code) {
    const citySelected = document.createElement('li');

    citySelected.style.border = "solid";
    citySelected.className = "city_selected";
    citySelected.id = `${city.code}`
    citySelected.innerHTML = `${city.name}`;

    citySelected.addEventListener('click', () => {
        handleDivClick(city.code);
    });
    return citySelected;
}

export function displaySelectedCities(cities) {
    const selectedCitiesDiv = document.getElementById("affichage_villes_select");

    selectedCitiesDiv.innerHTML = '';
    cities.forEach(city => {

        const selectedCity = createSelectedCityElement(city)
        selectedCitiesDiv.appendChild(selectedCity);
    });
}



function handleDivClick(code) {

    const index = citiesArray.findIndex(ville => ville.code === code);

    if (index !== -1) {
        citiesArray.splice(index, 1);
    }
    displaySelectedCities(citiesArray);
}
