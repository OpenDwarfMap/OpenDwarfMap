import React, { useEffect, useState } from "react";
import {useParams, Link} from'react-router-dom';
import {getHistoricalFigureFamily, getHistoricalFiguresDetail} from '../utils/API.js';
import HistoricalFigureGraph from "./HistoricalFigureGraph";
import Genogram from "./GenogramLayoutGraph";

function convertToGenogramFormat(familyMembers, key = 0) {
    let genogramData = [];

    const addMember = (id, name, sex, m, f, ux, vir, a) => {
        genogramData.push({ key: id, n: name, s: sex, m, f, ux, vir, a });
    };

    addMember(key, familyMembers.name, familyMembers.sex ? "M" : "F",
        familyMembers.mother,
        familyMembers.father,
        familyMembers.spouse ? familyMembers.spouse : undefined,
        undefined,
        ["C", "F", "K"]);

    if (familyMembers.former_spouses) {
        familyMembers.former_spouses.forEach((spouse, i) => {
            addMember(-1 * (i + 1), spouse.name, spouse.sex, undefined, undefined, undefined, key);
        });
    }

    if (familyMembers.deceased_spouses) {
        familyMembers.deceased_spouses.forEach((spouse, i) => {
            addMember(-1 * (familyMembers.former_spouses ? familyMembers.former_spouses.length : 0 + i + 1), spouse.name, spouse.sex, undefined, undefined, undefined, key);
        });
    }

    if (familyMembers.mother) {
        addMember(-1 * ((familyMembers.former_spouses ? familyMembers.former_spouses.length : 0) + (familyMembers.deceased_spouses ? familyMembers.deceased_spouses.length : 0) + 1), familyMembers.mother.name, 'F', undefined, undefined, familyMembers.father ? -1 * ((familyMembers.former_spouses ? familyMembers.former_spouses.length : 0) + (familyMembers.deceased_spouses ? familyMembers.deceased_spouses.length : 0) + 2) : undefined);
    }

    if (familyMembers.father) {
        addMember(-1 * ((familyMembers.former_spouses ? familyMembers.former_spouses.length : 0) + (familyMembers.deceased_spouses ? familyMembers.deceased_spouses.length : 0) + 2), familyMembers.father.name, 'M', undefined, undefined);
    }

    if (familyMembers.children) {
        familyMembers.children.forEach((child, i) => {
            let childData = convertToGenogramFormat(child, i + 1);
            childData[0].m = familyMembers.mother ? -1 * ((familyMembers.former_spouses ? familyMembers.former_spouses.length : 0) + (familyMembers.deceased_spouses ? familyMembers.deceased_spouses.length : 0) + 1) : undefined;
            childData[0].f = familyMembers.father ? -1 * ((familyMembers.former_spouses ? familyMembers.former_spouses.length : 0) + (familyMembers.deceased_spouses ? familyMembers.deceased_spouses.length : 0) + 2) : undefined;
            genogramData = genogramData.concat(childData);
        });
    }

    return genogramData;
}




function HistoricalFiguresDetail () {
    let { hfId } = useParams();
    const [historicalFiguresDetail, setHistoricalFiguresDetail] = useState({})
    const [historicalFigureFamily, setHistoricalFigureFamily] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [familyDataLoaded, setFamilyDataLoaded] = useState(false);

    let [familyGenoData, setFamilyGenoData] = useState( [
        { key: 0, n: "", s: "", m: undefined, f: undefined, a: ["C", "F", "K"] },
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
        getHistoricalFiguresDetail(setHistoricalFiguresDetail, hfId).then(() => {
            setDataLoaded(true);
        });
        getHistoricalFigureFamily(setHistoricalFigureFamily, hfId).then(() => {
            setFamilyDataLoaded(true);
        });
    }, [hfId])

    useEffect(() => {
        setFamilyGenoData(convertToGenogramFormat(historicalFiguresDetail));
    }, [historicalFiguresDetail, setFamilyGenoData])

    useEffect(() => {
        if (familyGenoData.find((elem) => elem.key === 0).n) { // check if the name is not undefined
            setFamilyDataLoaded(true);
            console.log(historicalFiguresDetail);
            console.log(familyGenoData);
            console.log(historicalFigureFamily);
            console.log(convertToGenogramFormat(historicalFigureFamily));
        }
        else {
            setFamilyDataLoaded(false);
        }
    }, [familyGenoData]);


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
        {familyDataLoaded ? <Genogram familyGenoData={historicalFiguresDetail} Genogram={familyGenoData} /> : <></>}
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