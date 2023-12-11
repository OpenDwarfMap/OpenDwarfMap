import React from "react";
import {ImageOverlay, MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import customIcon from "./map/customIcon";


export function App() {

    // Coordonnées du centre de votre carte
    const center = [0, 0];

    // Taille fixe de l'image (en degrés)
    const imageSize = 0.5;

    // Calcul des coordonnées du coin supérieur gauche et inférieur droit de l'image
    const imageBounds = [
        [center[0] - imageSize / 2, center[1] - imageSize / 2], // Coin supérieur gauche
        [center[0] + imageSize / 2, center[1] + imageSize / 2]  // Coin inférieur droit
    ];

    const imageUrl = './assets/region-detailed.bmp';

    return <MapContainer id ="map"
                         center={center}
                         zoom={13}
                         scrollWheelZoom={true}
                         bounds={imageBounds}
    >
       <ImageOverlay
           url={imageUrl}
           bounds={imageBounds}
       />
        <Marker position={[0,0]} icon={customIcon}>
            <Popup>
                <h3>Bienvenue aventurier !</h3><p>Tu es au centre de la carte.</p>
            </Popup>
        </Marker>
    </MapContainer>;
}
