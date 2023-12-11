import L from "leaflet";

const customIcon = L.icon({
    iconUrl: './assets/marker-icon.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

export default customIcon;
