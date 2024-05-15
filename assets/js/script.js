import { getWeather } from "./components/api.js";
import { displayWeather } from "./components/weather.js";
import { displayCitiesFromLocalStorage } from "./components/loadedCities.js";
import { saveCity } from "./components/saveCity.js";

document.addEventListener("DOMContentLoaded", function() {
    displayCitiesFromLocalStorage();
});

let btn = document.getElementById('btn');   
btn.addEventListener('click', function() {
    let input = document.getElementById('city');
    let inputValue = input.value;
    
    
    getWeather(inputValue)
        .then((result) => {
            let cityName = result.city.name;
            console.log("City Name:", cityName);
            console.log("Weather Data:", result);
            displayWeather(result);
            saveCity(result.city.name);
            //forecast(result);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            // Gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
        });
    input.value = "";
})


