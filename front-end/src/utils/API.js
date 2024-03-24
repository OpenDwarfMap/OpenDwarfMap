import React from "react";
import {Marker, Polygon, Popup} from 'react-leaflet';
import { Link } from "react-router-dom";

const URL_API = "http://localhost:3000/";

export async function getSites(callback) {
    await fetch(URL_API+"site")
        .then(response => response.json() )
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
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <h3 style={{ marginRight: '5px' }}>name : {siteData.name}, type : {siteData.type}  </h3>
                                <h3>
                                    <Link to={"/site/"+siteData.id.toString()}>  Détail → </Link>
                                </h3>
                            </div>
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
                    <Polygon key={regionData.id} positions={regionData.polygon.reverse()} />
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

export async function getCategoryData(callback, category, id){
    await fetch(URL_API+category+'/'+id.toString())
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

export async function getCategoryDataDetail(callback, category, id){
    await fetch(URL_API+category+'/detail/'+id.toString())
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

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
