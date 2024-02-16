import React, { useEffect, useState } from "react";
import {getCategoryDataDetail} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";

function SiteDetail () {
    const { id } = useParams()
    const [siteData, setSiteData] = useState(false)  
    useEffect(()=> {
        getCategoryDataDetail(setSiteData, "site", id);
    }, []);

    const getStructures = function (){
        if (siteData.structures && Array.isArray(siteData.structures.structure)) { // si plusieurs structures 
            return siteData.structures.structure.map((structure)=>{
                return (
                    <div>
                        Ce site contient : {structure.name} qui est {structure.type}
                    </div>
                )
            })
        } else if (siteData.structures && typeof siteData.structures.structure === 'object'){// si une structures 
            return (
                <div>
                    Ce site contient : {siteData.structures.structure.name} qui est {siteData.structures.structure.type}
                </div>
            )
        } else return null // si aucune structures 
    }

    let content = siteData ? (
    <div>
        <div className={"hf-page-title"}>Site : {siteData ? siteData.name : null}</div>
    {siteData.cur_owner_id ? 
    <div>
        Le propriétaire actuel du lieu est : 
        <Link to={"/historical_figure/"+siteData.cur_owner_id[0].toString()}>{siteData.cur_owner_id[1].toString()}</Link>
    </div> : null}
        <div>
            Ce site est une construction de l'entité de : <Link to={'/entity/'+siteData.civ_id[0]}>{siteData.civ_id[1]}</Link>
        </div>
        {getStructures()}
    </div>

    )
    : 
    (<div> Loading </div>);
    return content;
    // rajouter la map centrer sur les coordonées ? 
}

export default SiteDetail;