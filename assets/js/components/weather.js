import { formatDate } from "./formatDate.js";
let main = document.querySelector('main');

export function displayWeather(meteo) {
    let section = document.createElement('section');
    main.appendChild(section);
    //section.textContent = "";
    let cityName = document.createElement('h2');
    cityName.textContent = meteo.city.name;
    section.appendChild(cityName);

    let temperature = document.createElement('p');
    let temp = meteo.list[0].main.feels_like;
    let convertion = temp - 273.15;
    temperature.textContent = `Temperature : ${convertion.toFixed(1)} °C`;
    section.appendChild(temperature);

    let codeIcon = meteo.list[0].weather[0].icon;
    let icon = 'https://openweathermap.org/img/wn/' + codeIcon + '@2x.png';
    let imgIcon = document.createElement('img');
    imgIcon.src = icon; 
    section.appendChild(imgIcon);
    
    let description = document.createElement('p');
    let desc = meteo.list[0].weather[0].description;
    description.textContent = desc;
    section.appendChild(description);

    forecast(meteo, section);
}

function forecast(meteo, section) {
    let forecast = document.createElement('div');
    forecast.setAttribute('id', 'forecast');
    section.appendChild(forecast);

    meteo.list.forEach((item, index) => {
        let codeIcon = item.weather[0].icon;
        let icon = 'https://openweathermap.org/img/wn/' + codeIcon + '@2x.png';
        let imgIcon = document.createElement('img');
        imgIcon.src = icon; 

        let temp = item.main.feels_like;
        let date = formatDate(item.dt_txt);
        let convertion = temp - 273.15;
        
        let divElement = document.createElement('div');
        let p = document.createElement('p');
        p.textContent = `${date} ${convertion.toFixed(1)} °C`

        divElement.appendChild(imgIcon);
        divElement.appendChild(p);
        forecast.appendChild(divElement);
        
        console.log(`Temperature ${index} : ${convertion.toFixed(1)} et ${date}`);
        
    });
    
}