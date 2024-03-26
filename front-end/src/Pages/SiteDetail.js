import React, { useEffect, useState } from "react";
import {getCategoryDataDetail} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";
import ItemCard from "../Component/ItemCard.js";
import TwoBlockCard from "../Component/TwoBlockCard.js";

function SiteDetail () {
    const { id } = useParams()
    const [siteData, setSiteData] = useState(false)  
    useEffect(()=> {
        getCategoryDataDetail(setSiteData, "site", id);
    }, []);
    
    return siteData ? (
    <div className={"site-detail-main-grid"}>
        <div className={"detail-page-title"} title={JSON.stringify(siteData)}> Site : {siteData ? siteData.name : "?????"} </div>
        <div className={"site-detail"}>
            <section className={"presentation-section"}>
                <h2> Informations générales : </h2>
                <ul className="item-list">
                    {siteData.cur_owner_id ? 
                        <li> <ItemCard 
                        elementLeft ={"Propriétaire"} 
                        elementRight={
                        <Link to={"/historical_figure/"+siteData.cur_owner_id[0].toString()}> 
                            {siteData.cur_owner_id[1].toString()} 
                        </Link>}
                        />
                        </li>
                    : null}
                    <li>
                        <ItemCard 
                            elementLeft ={"Construit par"} 
                            elementRight={<Link to={'/entity/'+siteData.civ_id[0]}> {siteData.civ_id[1]} </Link>}
                        />
                    </li>
                </ul>
            </section>
            <section className={"site-detail-section"}>
                <h3> Strucutres : </h3>
                <ul className="event-list">
                    {Array.isArray(siteData.structures) ? 
                    siteData.structures.map((structure) => 
                        <li><TwoBlockCard title={structure.name} firstBlock={structure.type} content={""} infos={structure}/></li>)
                    : null}
                </ul>
            </section>
        </div>
    </div>
    ) : (<div> Loading </div>);
    // rajouter la map centrer sur les coordonées ? 
}

export default SiteDetail;