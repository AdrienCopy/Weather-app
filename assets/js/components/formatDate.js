export function formatDate (item) {
    let dateString = item; // "2024-05-14 15:00:00"

    let dateObject = new Date(dateString);

    // Obtenir les composants de la date
    //let year = dateObject.getFullYear();
    let monthNumber = dateObject.getMonth(); // Month est 0-indexé (janvier = 0)
    let monthTab = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let month = monthTab[monthNumber];
    let day = dateObject.getDate().toString().padStart(2, '0');
    let hours = dateObject.getHours().toString().padStart(2, '0');
    let minutes = dateObject.getMinutes().toString().padStart(2, '0');

    // Créer une nouvelle chaîne de caractères formatée
    let formattedDate = `${day}-${month} ${hours}:${minutes}`;
    return formattedDate;

}