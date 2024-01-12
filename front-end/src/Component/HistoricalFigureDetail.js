import React, { useEffect, useState } from "react";
import {useParams, Link} from'react-router-dom';
import {getHistoricalFiguresDetail} from '../utils/API.js';

function HistoricalFiguresDetail () {
    let { hfId } = useParams();
    const [HistoricalFiguresDetail, setHistoricalFiguresDetail] = useState({})  

    let hfSkill = HistoricalFiguresDetail.hf_skill ? 
    HistoricalFiguresDetail.hf_skill.map((skillData) => {
        return <li key={skillData.skill}> Skill : {skillData.skill}, proficiency : {skillData.total_ip}</li>
    })
    : null ;

    let entityLink = HistoricalFiguresDetail.entity_link ?
    HistoricalFiguresDetail.entity_link.map((entityData)=>{
        return (
            <li key={entityData.entity_id.toString()}>
                Lien : {entityData.link_type} avec <Link to={"/historical_figure/" + entityData.entity_id.toString()}>
                <span style={{color: "green"}}>{entityData.name}</span>
            </Link>
            </li>
        );
    }) : null;

    let hfLink = HistoricalFiguresDetail.hf_link ?
        HistoricalFiguresDetail.hf_link.map((entityData)=>{
            return (
                <li key={entityData.hfid.toString()}>
                    Lien : {entityData.link_type} avec <Link to={"/historical_figure/"+entityData.hfid.toString()}>
                        <span style={{color: "blue"}}>{entityData.name}</span>
                    </Link>
                </li>
            );
        }) : null;

    useEffect(()=> {
        getHistoricalFiguresDetail(setHistoricalFiguresDetail, hfId);
    }, [hfId])

    return (<div className={"hf-details"}>
        <h1> Name : {HistoricalFiguresDetail.name}</h1>
        <h2>
            Race : {HistoricalFiguresDetail.race}, 
            Birth : {HistoricalFiguresDetail.birth_year != -1 ? HistoricalFiguresDetail.birth_year : 'Never'}, 
            Death : {HistoricalFiguresDetail.death_year != -1  ? HistoricalFiguresDetail.death_year : 'Never'}, 
            Sex : {HistoricalFiguresDetail.caste}
        </h2>
        <h3>{HistoricalFiguresDetail.goal ? "Objectif : " + HistoricalFiguresDetail.goal : ""}</h3>
        <div>
            <ul>
                {hfSkill}
            </ul>
        </div>
        <h2> Lien avec d'autres figures historiques : </h2>
        <div>
            <ul>
                {hfLink}
            </ul>
            <ul>
                {entityLink}
            </ul>
        </div>

    </div>)

}

export default HistoricalFiguresDetail;