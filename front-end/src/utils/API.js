import React from "react";
import {Marker, Popup} from 'react-leaflet'

const URL_API = "http://localhost:3000/"

export async function getSites(callback) {
    await fetch(URL_API+"site")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            callback(data.map(siteData => { 
                return (
                    <Marker position={[parseInt(siteData.coords.split(",")[0]),parseInt(siteData.coords.split(",")[1])]} icon={siteIcon}>
                        <Popup>
                            <h3>name : {siteData.name}, type : {siteData.type}</h3>
                        </Popup>
                    </Marker>
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
    await fetch(URL_API+"historical_figures/page/"+pagination.toString())
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

export async function getHistoricalFigureFamily(callback, hfId) {
    await fetch(URL_API+"historical_figure/detail/" + hfId.toString() + "/family")
        .then(response => response.json())
        .then(data => {
            callback(data);
        })

    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}