import { getWeather } from "./api.js";
import { displayWeather } from "./weather.js";

export function displayCitiesFromLocalStorage() {
    let cities = loadCities(); // Récupérer les villes depuis le localStorage
    if (cities && cities.length > 0) {
        cities.forEach(city => {
            getWeather(city) // Appeler la fonction getWeather pour chaque ville
                .then(meteo => {
                    displayWeather(meteo); // Afficher les informations météorologiques
                })
                .catch(error => {
                    console.error(`Error fetching weather data for ${city}:`, error);
                });
        });
    }
}

function loadCities() {
    // Récupérer le tableau de villes depuis localStorage s'il existe
    let storedCities = localStorage.getItem('tab');
    if (storedCities) {
        // Convertir le tableau JSON en tableau JavaScript
        return JSON.parse(storedCities);
    }
    return [];
}