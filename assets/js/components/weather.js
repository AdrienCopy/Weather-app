import { formatDate } from "./formatDate.js";
import { picture } from "./api.js";
import { randomCity } from "./random.js";
//import { Chart } from '../../../node_modules/chart.js/auto';
//import { Chart } from './path/to/chart.js/auto';
//import { Chart } from 'chart.js/auto';

let main = document.querySelector('main');

const randomId = function (length = 6) {
    return Math.random().toString(36).substring(2, length + 2);
};

export function displayWeather(meteo) {
    let section = document.createElement('section');
    let index = randomId();
    section.setAttribute('id', index);
    section.classList.add('scroll');
    main.prepend(section);

    let removeBtn = document.createElement('button');
    removeBtn.setAttribute('id', 'removeBtn');
    removeBtn.textContent = 'X';
    removeBtn.addEventListener('click', function () {
        deleteCity(index);
    })
    section.appendChild(removeBtn);

    let cityName = document.createElement('h2');
    cityName.textContent = meteo.city.name;
    section.appendChild(cityName);

    let codeIcon = meteo.list[0].weather[0].icon;
    let icon = 'https://openweathermap.org/img/wn/' + codeIcon + '@2x.png';
    let imgIcon = document.createElement('img');
    imgIcon.src = icon;
    section.appendChild(imgIcon);

    let description = document.createElement('p');
    let desc = meteo.list[0].weather[0].description;
    description.textContent = desc;
    section.appendChild(description);

    let temperature = document.createElement('p');
    let temp = meteo.list[0].main.feels_like;
    let convertion = temp - 273.15;
    temperature.textContent = `Temperature : ${convertion.toFixed(1)} °C`;
    section.appendChild(temperature);

    let humidity = document.createElement('p');
    let humid = meteo.list[0].main.humidity;
    humidity.textContent = `Humidité : ${humid} %`;
    section.appendChild(humidity);

    let wind = document.createElement('p');
    let speed = meteo.list[0].wind.speed;
    let speedKm = speed * 3.6;
    wind.textContent = `Vitesse du vent : ${speedKm.toFixed(1)} Km/h`
    section.appendChild(wind);
    console.log(speed);

    forecast(meteo, section);
    chartA(meteo, section);
    Picture(meteo.city.name, section);

    
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
        divElement.setAttribute('id', 'hour');
        let pDate = document.createElement('p');
        let pDegre = document.createElement('p');
        pDate.textContent = date;
        pDegre.textContent = `${convertion.toFixed(1)} °C`;

        divElement.appendChild(imgIcon);
        divElement.appendChild(pDate);
        divElement.appendChild(pDegre);
        forecast.appendChild(divElement);

        //console.log(`Temperature ${index} : ${convertion.toFixed(1)} et ${date}`);

    });

}

function chartA(meteo, section) {
    let chartTab = document.createElement('canvas');
    chartTab.setAttribute('id', 'myChart');
    section.appendChild(chartTab);
    let tableauMeteo = [];

    meteo.list.forEach((item) => {
        let temp = item.main.feels_like;
        let date = formatDate(item.dt_txt);
        let conversion = (temp - 273.15).toFixed(1);

        let nouvelleEntree = {
            date: date,
            conversion: parseFloat(conversion)
        };

        tableauMeteo.push(nouvelleEntree);
    });

    const ctx = chartTab.getContext('2d');
    new Chart(ctx, {
        type: 'line', // graphique
        data: {
            labels: tableauMeteo.map((entry) => entry.date), // Tableau des dates
            datasets: [{
                label: 'Température (°C)',
                data: tableauMeteo.map((entry) => entry.conversion), // Tableau des valeurs de température
                backgroundColor: '#4bc0c033',
                borderColor: '#0594D0',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Axe y commence à zéro
                }
            }
        }
    });

}

function Picture(city, section) {
    picture(city)
        .then((result) => {
            if (result.results && result.results.length > 0) {
                let cityPictures = [];
                result.results.forEach((item) => {
                    let image = item.urls.regular;
                    cityPictures.push(image);
                });
                cityPictures = randomCity(cityPictures);
                console.log('ok', cityPictures);
                let img = document.createElement('img');
                img.src = cityPictures;
                img.setAttribute('id', 'imgPicture');
                section.appendChild(img);

            } else {
                console.log('No pictures found for the specified city.');
            }
        })
        .catch((error) => {
            echec();
            console.error("Error fetching picture data:", error);
        });
}


export function deleteCity(index) {
    // supprime du DOM
    let element = document.getElementById(index);
    main.removeChild(element);

    //supprimer du LocalStorage
    let h2 = element.querySelector('h2');
    let cityName = h2.textContent.trim();
    let local = localStorage.getItem('tab');
    let cities = JSON.parse(local);
    let cityIndex = cities.findIndex(city => city === cityName);
    if (cityIndex !== -1) {
        cities.splice(cityIndex, 1);
        localStorage.setItem('tab', JSON.stringify(cities));
    } else {
        console.log(Error);
        console.log(cityName);
    }
}
