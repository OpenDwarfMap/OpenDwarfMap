import React, { useEffect, useState } from "react";
import {getCategoryDataDetail} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";
import LoadingPage from "./LoadingPage.js";


function EventDetail () {
    const { id } = useParams()
    const [EntityDetail, setEntityDetail] = useState(false)  
    useEffect(()=> {
        getCategoryDataDetail(setEntityDetail, "entity", id);
    }, []);
    console.log(EntityDetail);

    return EntityDetail ?
    (<div>
        <div className={"hf-page-title"}> Entité : {EntityDetail.name}</div>
        <div> Cette oragnisation a {EntityDetail.child} membres et est un {EntityDetail.type} </div>
        {EntityDetail.race ? <div> Les individus qui appartiennent à cette organisation sont des {EntityDetail.race} </div> : null }
        {EntityDetail.histfig_id  ? 
        EntityDetail.histfig_id.map((hf)=>{
            console.log(typeof hf)
            return (
                <div>
                    <Link key={hf[0]} to={'/historical_figure/'+hf[0].toString()}>
                        {hf[1]} { hf[2] ? (<div> qui occupe actuellement la position de {hf[2]} </div>) : null}
                    </Link>
                </div>
            )
        })
        : null }
    </div>)
    : <LoadingPage /> ;
        
}

export default EventDetail;