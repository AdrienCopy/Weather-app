import { getWeather } from "./components/api.js";
import { displayWeather } from "./components/weather.js";
import { displayCitiesFromLocalStorage } from "./components/loadedCities.js";
import { saveCity } from "./components/saveCity.js";
//import Chart from 'chart.js/auto';

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
            echec();
            console.error("Error fetching weather data:", error);
            
        });
    input.value = "";
})


function echec() {
    console.log('?');
    let main = document.querySelector('main');
    let div = document.createElement('div');
    div.setAttribute('id', 'cityEchec');
    
    let p = document.createElement('p');
    p.textContent = "Not found, sorry !"

    let button = document.createElement('button');
    button.textContent = 'ok';
    button.addEventListener('click', function() {
        main.removeChild(div);
    })

    div.appendChild(p);
    div.appendChild(button);
    main.appendChild(div);
}




