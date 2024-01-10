import React, { useEffect, useState } from "react";
import {useParams} from'react-router-dom';
import {getHistoricalFiguresDetail} from '../utils/API.js';

function HistoricalFiguresDetail () {
    let { hfId } = useParams();
    const [HistoricalFiguresDetail, setHistoricalFiguresDetail] = useState({})  

    let hfSkill = HistoricalFiguresDetail.hf_skill ? 
    HistoricalFiguresDetail.hf_skill.map((skillData) => {
        return <li key={skillData.skill}> Skill : {skillData.skill}, proficiency : {skillData.total_ip}</li>
    })
    : null ;

    useEffect(()=> {
        getHistoricalFiguresDetail(setHistoricalFiguresDetail, hfId);
    }, [])
    return (<div>
        <h1> Name : {HistoricalFiguresDetail.name}</h1>
        <h2> 
            Race : {HistoricalFiguresDetail.race}, 
            Birth : {HistoricalFiguresDetail.birth_year != -1 ? HistoricalFiguresDetail.birth_year : 'Never'}, 
            Death : {HistoricalFiguresDetail.death_year != -1  ? HistoricalFiguresDetail.death_year : 'Never'}, 
            Sex : {HistoricalFiguresDetail.sex}
        </h2>
        <h3>
            <ul>
                {hfSkill}
            </ul>
        </h3>

    </div>)

}

export default HistoricalFiguresDetail;