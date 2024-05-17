const apiKey = 'aaf86622a3e38a0de48051d03356612b';
// Fonction pour récupérer les données météo
export function getWeather(city) {
    //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; //prevision actuelle
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`; 

    // Effectuer la requête fetch vers l'API météo
    return fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            return data;
            //console.log(data);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            // Gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
        });
}

const pictueKey = 'KTTn2BPeDrkFCS6mttygV8f_vlUeGx6B6bmmziCM6SM';
//const city = 'bruxelles';

export function picture(city) {
    const apiUrl = `https://api.unsplash.com/search/photos?&query=${city}&client_id=${pictueKey}`; 

    return fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            return data;
            console.log(data);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}