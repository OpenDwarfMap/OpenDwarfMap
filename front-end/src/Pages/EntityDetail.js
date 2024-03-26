import React, { useEffect, useState } from "react";
import {getCategoryDataDetail} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";
import ItemCard from "../Component/ItemCard.js";
import TwoBlockCard from "../Component/TwoBlockCard.js";

function EntityDetail () {
    const { id } = useParams()
    const [EntityData, setEntityData] = useState(false)  
    useEffect(()=> {
        getCategoryDataDetail(setEntityData, "entity", id);
    }, []);

    console.log(EntityData);
    
    return EntityData ?
    <div className={"entity-detail-main-grid"}>
        <div className={"detail-page-title"}> Entité : </div>
        <section className="event-coll-detail">
                <h2> Informations générales : </h2>
                <ul className="item-list">
                    <li><ItemCard elementLeft={"Type"} elementRight={EntityData.type}/></li>
                    <li><ItemCard elementLeft={"Nombre de partisans"}
                                  elementRight={
                                    Array.isArray(EntityData.child) ?
                                        EntityData.child.length :
                                        0
                                    }
                    /></li>
                    {EntityData.race ? <li><ItemCard elementLeft={"Race"} elementRight={EntityData.race}/></li> : null}
                </ul>
        </section>
        {EntityData.histfig_id ? 
        <section className="event-coll-detail">
            <h2> Individus importants : </h2>
            {EntityData.histfig_id.map((hf)=>{
                return (
                    <TwoBlockCard 
                        firstBlock={hf[2] ?? "poste inconnnu"}
                        title={<Link key={hf[0]} to={'/historical_figure/'+hf[0].toString()}>{hf[1]}</Link>}
                        content={""}/>
                )
            })}
        </section> : null}
    </div> : <div> Loading </div>;
}

export default EntityDetail;