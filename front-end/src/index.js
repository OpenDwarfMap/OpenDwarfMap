import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const mymap = L.map('map').setView([51.505, -0.09], 13);

const customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41], // Taille de l'icône [largeur, hauteur]
    iconAnchor: [12, 41], // Point d'ancrage de l'icône par rapport à sa position
    popupAnchor: [1, -34] // Point d'ancrage du popup par rapport à la position du marqueur
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);


L.marker([51.505, -0.09],{ icon: customIcon }).addTo(mymap)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
