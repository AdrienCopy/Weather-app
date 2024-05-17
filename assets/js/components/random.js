export function randomCity (tab) { 
    const randomIndex = Math.floor(Math.random() * tab.length);
    return tab[randomIndex];
}