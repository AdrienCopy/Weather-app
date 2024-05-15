export function saveCity (value) {
    /*if (value.trim() === "") {
        return;
    }*/
    let tab = [];
    const existingTab = localStorage.getItem('tab');// Vérifier s'il existe pour ne pas l'effacer...
    if (existingTab) {
        tab = JSON.parse(existingTab);
    }
    if (!tab.includes(value)) { // Ajouter uniquement la nouvelle valeur à ce tableau
        tab.push(value);
        localStorage.setItem('tab', JSON.stringify(tab));
    } 
}