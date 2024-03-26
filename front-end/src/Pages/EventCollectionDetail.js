import React, { useEffect, useState } from "react";
import {getCategoryDataDetail} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";
import TwoBlockCard from "../Component/TwoBlockCard.js";
import ItemCard from "../Component/ItemCard.js";

function EventCollectionDetail () {
    const { id } = useParams()
    const [EventCollectionData, setEventCollectionData] = useState(false)  
    useEffect(()=> {
        getCategoryDataDetail(setEventCollectionData, "historical_event_collection", id);
    }, []);
    console.log(EventCollectionData);

    return EventCollectionData ? 
    (
    <div className={"event-coll-detail-main-grid"}>
        <div className={"event-coll-page-title"}>  Collection d'événement historiques </div>
            <section className="event-coll-detail">
                <h2> Informations générales : </h2>
                <ul className="item-list">
                    <li><ItemCard elementLeft={"Type"} elementRight={EventCollectionData.type}/></li>
                    <li><ItemCard elementLeft={"Date"} elementRight={`${EventCollectionData.start_year} à ${EventCollectionData.end_year}`}/></li>
                    <li>{EventCollectionData.site_id ?<ItemCard elementLeft={"Site"} elementRight={<Link to={'/site/'+(EventCollectionData.site_id[0]-1)}> {EventCollectionData.site_id[1]} </Link> }/> : null}</li>
                </ul>
            </section>
            <section className="event-coll-detail">
                <h2> Événements : </h2>
                {Array.isArray(EventCollectionData.event) 
                ? EventCollectionData.event.filter(element=> element !== null).map((event)=>{
                    return(
                        <TwoBlockCard 
                            title={"Personne impliqué(es) :"} 
                            content={
                                <ul className="event-list">
                                    {Object.keys(event)
                                    .filter( key =>(key.includes("hfid") || key == "histfig") && Array.isArray(event[key]) && event[key][0] !== -1 ) // Rajouter les clés pour tous les events
                                    .map(key=>{
                                            return (
                                                <li>
                                                    <Link key={event[key][0]} to={'/historical_figure/'+event[key][0]}>{event[key][1]}</Link>
                                                </li>)
                                    })} 
                                </ul>
                            } 
                            firstBlock={<div title={JSON.stringify(event, null, 2)}>{event.type}</div>}/>
                    )
                })
                :  (<h3> Nous n'avons aucune information supplémentaire sur les événements qui constituent cette collection</h3>)}
            </section>
    </div>
    )
    : <div> Loading ... </div>;
}

export default EventCollectionDetail;