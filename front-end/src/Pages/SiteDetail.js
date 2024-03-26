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
        <div className={"detail-page-title"}> Site : {siteData ? siteData.name : "?????"} </div>
        <div className={"hf-details"}>
            <section className={"presentation-section"}>
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
                {Array.isArray(siteData.structures) ? 
                siteData.structures.map((structure) => 
                    <TwoBlockCard title={structure.name} firstBlock={structure.type} content={""}/>) 
                : null}
            </section>
        </div>
    </div>
    ) : (<div> Loading </div>);
    // rajouter la map centrer sur les coordonées ? 
}

export default SiteDetail;