import React, { useEffect, useState } from "react";
import {ImageOverlay, MapContainer, Marker, Popup} from 'react-leaflet'
import {getSites} from '../utils/API.js';

function Map() {
    const [sitesMarkers, setSitesMarkers] = useState()  
    useEffect(()=> {
        getSites(setSitesMarkers);
    }, [])

    // Coordonnées du centre de votre carte
    const center = [0, 0];

    // Taille fixe de l'image (en degrés)
    const imageSize = 0.5;

    // Calcul des coordonnées du coin supérieur gauche et inférieur droit de l'image
    const imageBounds = [
        [center[0] - imageSize / 2, center[1] - imageSize / 2], // Coin supérieur gauche
        [center[0] + imageSize / 2, center[1] + imageSize / 2]  // Coin inférieur droit
    ];

    const imageUrl = '../../assets/region-detailed.bmp';

    const imageHeight = 130;
    const imageWidth = 130;

    // Définissez les coordonnées des coins de votre image de fond
  const bounds = [[0, 0], [imageHeight, imageWidth]]; // Remplacez imageHeight et imageWidth par la hauteur et la largeur de votre image

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      minZoom={0}
      maxZoom={5}
      scrollWheelZoom={true}
      crs={L.CRS.Simple} // Utilisez un système de coordonnées simple
      maxBounds={bounds} // Définissez les limites de la carte
      style={{ height: '500px', width: '100%' }}
    >
      <ImageOverlay
        url={imageUrl}
        bounds={bounds}
      />
      {sitesMarkers}
    </MapContainer>
  )
};

export default Map;
