import React, { useEffect, useState } from "react";
import {useParams, Link} from'react-router-dom';
import {getHistoricalFiguresDetail} from '../utils/API.js';
import HistoricalFigureGraph from "./HistoricalFigureGraph";
import Genogram from "./GenogramLayoutGraph";

function HistoricalFiguresDetail () {
    let { hfId } = useParams();
    const [historicalFiguresDetail, setHistoricalFiguresDetail] = useState({
        // hf_skill: [
        //     {
        //         skill: {
        //             total_ip: undefined,
        //         },
        //     }
        // ],
        // skill: [],
        // entity_link: [],
        // hf_link: [],
        // entity_id: undefined
    })
    const [dataLoaded, setDataLoaded] = useState(false);

    let [familyGenoData, setFamilyGenoData] = useState( [
        { key: 0, n: "Aaron", s: "M", m: -10, f: -11, a: ["C", "F", "K"] },
        { key: -10, n: "Paternal Grandfather", s: "M", ux: -11, a: ["A", "S"] },
        { key: -11, n: "Paternal Grandmother", s: "F", a: ["E", "S"] }
    ])

    let hfSkill = historicalFiguresDetail.hf_skill ?
    historicalFiguresDetail.hf_skill.map((skillData) => {
        return <li key={skillData.skill}> Skill : {skillData.skill}, proficiency : {skillData.total_ip}</li>
    })
    : null ;

    let entityLink = historicalFiguresDetail.entity_link ?
    historicalFiguresDetail.entity_link.map((entityData)=>{
        return (
            <li key={entityData.entity_id.toString()}>
                Lien : {entityData.link_type} avec <Link to={"/historical_figure/" + entityData.entity_id.toString()}>
                <span style={{color: "green"}}>{entityData.name}</span>
            </Link>
            </li>
        );
    }) : null;

    let hfLink = historicalFiguresDetail.hf_link ?
        historicalFiguresDetail.hf_link.map((entityData)=>{
            return (
                <li key={entityData.hfid.toString()}>
                    Lien : {entityData.link_type} avec <Link to={"/historical_figure/"+entityData.hfid.toString()}>
                        <span style={{color: "blue"}}>{entityData.name}</span>
                    </Link>
                </li>
            );
        }) : null;

    useEffect(()=> {
        getHistoricalFiguresDetail(setHistoricalFiguresDetail, hfId).then((data) => {
            setDataLoaded(true);
        })
    }, [hfId])

    return (<div className={"hf-details"}>
        <h1> Name : {historicalFiguresDetail.name}</h1>
        <h2>
            Race : {historicalFiguresDetail.race},
            Birth : {historicalFiguresDetail.birth_year != -1 ? historicalFiguresDetail.birth_year : 'Never'},
            Death : {historicalFiguresDetail.death_year != -1  ? historicalFiguresDetail.death_year : 'Never'},
            Sex : {historicalFiguresDetail.caste}
        </h2>
        <h3>{historicalFiguresDetail.goal ? "Objectif : " + historicalFiguresDetail.goal : ""}</h3>
        <div>
            <ul>
                {hfSkill}
            </ul>
        </div>
        {/*<HistoricalFigureGraph historicalFiguresDetail={HistoricalFiguresDetail}/>*/}
        {dataLoaded ? <Genogram familyGenoData={historicalFiguresDetail} Genogram={familyGenoData} /> : <></>}
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