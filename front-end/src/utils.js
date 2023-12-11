// Appel API pour récuperer les sites
const URL_API = "http://localhost:3000/getAll/site"

// Ajoutez un marqueur avec une icône personnalisée
const siteIcon = L.icon({
    iconUrl: './assets/sites.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

export function addSite(DfMap) {
    fetch(URL_API)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Utilisez les données de l'API pour créer un marqueur
        data.map((siteData) => {
            const allCoords = convertStringTo2DArray(siteData.Coords);
            for (const coord of allCoords) {
                var marker = L.marker([coord[0], coord[1]], { icon: siteIcon }).addTo(DfMap);
                marker.bindPopup(siteData.Name_);
            }
        })
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

function convertStringTo2DArray(inputString) {
        // Supprimer le dernier caractère '|' si présent
        if (inputString.endsWith('|')) {
        inputString = inputString.slice(0, -1);
        }
    
        // Diviser la chaîne en paires de nombres
        var pairs = inputString.split('|');
    
        // Mapper les paires en tableaux de nombres
        var resultArray = pairs.map(function(pair) {
        var numbers = pair.split(',').map(Number);
        return numbers;
    });
  
    return resultArray;
}