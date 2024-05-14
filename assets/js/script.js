import { getWeather } from "./components/api.js";
import { displayWeather } from "./components/weather.js";
import { saveCity } from "./components/saveCity.js";

document.addEventListener("DOMContentLoaded", function() {
    displayCitiesFromLocalStorage();
});

let btn = document.getElementById('btn');   
btn.addEventListener('click', function() {
    let input = document.getElementById('city');
    let inputValue = input.value;
    saveCity(inputValue);
    
    getWeather(inputValue)
        .then((result) => {
            let cityName = result.city.name;
            console.log("City Name:", cityName);
            console.log("Weather Data:", result);
            displayWeather(result);
            //forecast(result);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            // Gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
        });

})

function displayCitiesFromLocalStorage() {
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
