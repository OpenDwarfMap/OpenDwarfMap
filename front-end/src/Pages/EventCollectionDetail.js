import React, { useEffect, useState } from "react";
import {getCategoryDataDetail} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";

function EventCollectionDetail () {
    const { id } = useParams()
    const [EventCollectionData, setEventCollectionData] = useState(false)  
    useEffect(()=> {
        getCategoryDataDetail(setEventCollectionData, "historical_event_collection", id);
    }, []);
    console.log(EventCollectionData);

    return EventCollectionData ? 
    (
    <div className="event-coll-detail-main-grid">
        <div className={"event-coll-page-title"}>  Collection d'événement historiques </div>
        <div>
            <div> Cela est un {EventCollectionData.type} 
            qui a duré de {EventCollectionData.start_year} à {EventCollectionData.end_year} 
            {EventCollectionData.site_id && Array.isArray(EventCollectionData.site_id) ?
            <Link to={'/site/'+EventCollectionData.site_id[0]}> Au sein du site {EventCollectionData.site_id[1]} </Link> 
            : null } dans lequel les événements suivants ont pris place : </div>
            
            {Array.isArray(EventCollectionData.event) 
            ? EventCollectionData.event.filter(element=> element !== null).map((event)=>{
                return(
                    <div>
                        Type : {event.type} - 
                        Personne(s) impliquée(s) : {Object.keys(event)
                        .filter(key=>key.includes("hfid") || key == "histfig") // Rajouter les clés pour tous les events
                        .map(key=>{
                                return (
                                    <div>
                                        <Link key={event[key][0]} to={'/historical_figure/'+event[key][0]}>{event[key][1]}</Link>
                                    </div>)
                        })} 
                    </div>
                )
            })
            :  (<div> Nous n'avons aucune information supplémentaire sur les événements qui constituent cette collection</div>)}
        </div>
    </div>
    )
    : <div> Loading ... </div>;
}

export default EventCollectionDetail;