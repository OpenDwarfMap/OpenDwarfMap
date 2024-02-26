import React from "react";
import {Marker, Polygon, Popup} from 'react-leaflet';

const URL_API = "http://localhost:3000/"

export async function getSites(callback) {
    await fetch(URL_API+"site")
        .then(response => response.json())
        .then(data => {
            callback(data.map(siteData => {
                let corners = siteData["rectangle"].split(':');
                let topLeft = corners[0].split(',');
                let bottomRight = corners[1].split(',');
                let center = [
                    2064-(parseInt(bottomRight[1]) + parseInt(topLeft[1])) / 2,
                    (parseInt(bottomRight[0]) + parseInt(topLeft[0])) / 2
                ]
                return (
                    <Marker key={siteData.id} position={center} icon={siteIcon}>
                        <Popup>
                            <h3>name : {siteData.name}, type : {siteData.type}</h3>
                        </Popup>
                    </Marker>
                );
            }));
        })

    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

export async function getRegionPolygons(callback) {
    await fetch(URL_API+"region")
        .then(response => response.json())
        .then(data => {
            callback(data.map(regionData => {
                return (
                    <Polygon key={regionData.id} positions={regionData.polygon} />
                )
            }));
        })

    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

const siteIcon = L.icon({
    iconUrl: './assets/sites.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

export async function getHistoricalFiguresList(callback, pagination) {
    await fetch(URL_API+"historical_figure/page/"+pagination.toString())
        .then(response => response.json())
        .then(data => {
            callback(data);
        })

    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

export async function getHistoricalFiguresDetail(callback, hfId) {
    await fetch(URL_API+"historical_figure/detail/" + hfId.toString())
        .then(response => response.json())
        .then(data => {
            callback(data);
        })

    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}
