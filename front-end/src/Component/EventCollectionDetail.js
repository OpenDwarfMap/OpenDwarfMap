import React, { useEffect, useState } from "react";
import {getCategoryDataDetail} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";

function EventCollectionDetail () {
    const { id } = useParams()
    const [EventCollectionData, setEventCollectionData] = useState(false)  
    useEffect(()=> {
        getCategoryDataDetail(setEventCollectionData, "historical_event_collection", id);
    }, []);
    let content = EventCollectionData ? 
    (<div>
    <div>
        <div className={"hf-page-title"}> Collection d'événement historiques</div>
    </div>
    <div>
        <div> Cela est un {EventCollectionData.type} dnas lequel les événements suivants ont pris place : </div>
        {Array.isArray(EventCollectionData.event) 
        ? EventCollectionData.event.filter(element=> element !== null).map((event)=>{
            return(
                <div>
                    Type : {event.type}
                </div>
            )
        })
        :  (<div> Nous n'avons aucune information supplémentaire sur les événements qui constituent cette collection</div>)}
    </div>
    </div>
    )
    : null;
    return null;
}

export default EventCollectionDetail;