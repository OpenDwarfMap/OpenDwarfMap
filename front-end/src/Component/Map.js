import React, { useEffect, useState, StrictMode } from "react";
import {ImageOverlay, MapContainer, Marker,  Polygon, Popup} from 'react-leaflet'
import {getSites, getRegionPolygons} from '../utils/API.js';

function Polygons() {
  const [regionPolygons, setRegionPolygons] = useState()
  useEffect(()=> {
    getRegionPolygons(setRegionPolygons);
  }, [])

  console.log(regionPolygons)

  return regionPolygons;
}

function Sites() {
  const [sitesMarkers, setSitesMarkers] = useState()
  useEffect(()=> {
    getSites(setSitesMarkers);
  }, [])

  return sitesMarkers;
}

function Map() {
    const imageUrl = './assets/region-detailed.bmp';

    const imageHeight = 2064;
    const imageWidth = 2064;

    // Coordonnées du centre de votre carte
    const center = [imageHeight/2, imageWidth/2];

    // Taille fixe de l'image (en degrés)
    const imageSize = 0.5;

    // Calcul des coordonnées du coin supérieur gauche et inférieur droit de l'image
    const imageBounds = [
        [center[0] - imageSize / 2, center[1] - imageSize / 2], // Coin supérieur gauche
        [center[0] + imageSize / 2, center[1] + imageSize / 2]  // Coin inférieur droit
    ];

    // Définissez les coordonnées des coins de votre image de fond
  const bounds = [[0, 0], [imageHeight, imageWidth]]; // Remplacez imageHeight et imageWidth par la hauteur et la largeur de votre image

  return (
    <MapContainer
      center={center}
      zoom={0}
      minZoom={-1}
      maxZoom={5}
      scrollWheelZoom={true}
      crs={L.CRS.Simple} // Utilisez un système de coordonnées simple
      maxBounds={bounds} // Définissez les limites de la carte
      style={{ height: '100%', width: '100%' }}
    >
      <ImageOverlay
        url={imageUrl}
        bounds={bounds}
      />
      <Sites />
      <Polygon pathOptions={{color: 'blue'}} positions={[[-1000, -1000], [1000, -1000], [1000, 1000], [-1000, 1000]]} />
      <StrictMode>
        <Polygons />
      </StrictMode>
    </MapContainer>
  )
};

export default Map;
