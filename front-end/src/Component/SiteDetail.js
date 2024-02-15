import React, { useEffect, useState } from "react";
import {getCategoryDataDetail} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";

function SiteDetail () {
    const { id } = useParams()
    const [siteData, setSiteData] = useState(false)  
    useEffect(()=> {
        getCategoryDataDetail(setSiteData, "site", id);
    }, []);
    console.log(siteData);

    let content = siteData ? (
    <div>
        <div className={"hf-page-title"}>Site : {siteData ? siteData.name : null}</div>
    <div>
        Le propriétaire actuel du lieu est : 
        <Link to={"/historical_figure/"+siteData.cur_owner_id[0].toString()}>{siteData.cur_owner_id[1].toString()}</Link>
    </div>
    <div>
        Ce site est une construction de la race des : <Link to={'/entity/'+siteData.civ_id[0]}>{siteData.civ_id[1]}</Link>
    </div>
    </div>)
    : 
    (<div> Loading </div>);
    return content;
    // rajouter la map centrer sur les coordonées ? 
}

export default SiteDetail;