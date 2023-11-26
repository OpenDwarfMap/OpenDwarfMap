import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Coordonnées du centre de votre carte
const center = [0, 0];

// Taille fixe de l'image (en degrés)
const imageSize = 0.5;

// Calcul des coordonnées du coin supérieur gauche et inférieur droit de l'image
const imageBounds = [
    [center[0] - imageSize / 2, center[1] - imageSize / 2], // Coin supérieur gauche
    [center[0] + imageSize / 2, center[1] + imageSize / 2]  // Coin inférieur droit
];

// Créez une carte avec le fond d'image
const mymap = L.map('map').setView(center, 13);

// Ajoutez l'image en tant que fond de carte
const imageUrl = './assets/region-detailed.bmp'; // Remplacez par le chemin correct de votre image
L.imageOverlay(imageUrl, imageBounds).addTo(mymap);


// Ajoutez des réflexions dans toutes les directions
const reflections = [
    { dx: 0, dy: imageSize },  // Réflexion vers le bas
    { dx: imageSize, dy: 0 },  // Réflexion vers la droite
    { dx: 0, dy: -imageSize }, // Réflexion vers le haut
    { dx: -imageSize, dy: 0 }, // Réflexion vers la gauche
    { dx: imageSize, dy: imageSize },  // Réflexion vers le bas et la droite
    { dx: imageSize, dy: -imageSize }, // Réflexion vers le haut et la droite
    { dx: -imageSize, dy: -imageSize }, // Réflexion vers le haut et la gauche
    { dx: -imageSize, dy: imageSize }  // Réflexion vers le bas et la gauche
];

// Ajoutez les réflexions
reflections.forEach(reflection => {
    const reflectedBounds = [
        [center[0] - imageSize / 2 + reflection.dy, center[1] - imageSize / 2 + reflection.dx],
        [center[0] + imageSize / 2 + reflection.dy, center[1] + imageSize / 2 + reflection.dx]
    ];
    L.imageOverlay(imageUrl, reflectedBounds).addTo(mymap);
});


// Ajoutez un marqueur avec une icône personnalisée
const customIcon = L.icon({
    iconUrl: './assets/marker-icon.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.marker(center, { icon: customIcon }).addTo(mymap)
    .bindPopup('<h3>Bienvenue aventurier !</h3><p>Tu es au centre de la carte.</p>')
    .openPopup();
