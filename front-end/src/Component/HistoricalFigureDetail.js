import React, { useEffect, useState } from "react";
import {useParams, Link} from'react-router-dom';
import {getHistoricalFigureFamily, getHistoricalFiguresDetail} from '../utils/API.js';
import HistoricalFigureGraph from "./HistoricalFigureGraph";
import Genogram from "./GenogramLayoutGraph";
import {isArray} from "leaflet/src/core/Util";

export function convertToGenogramFormat(familyMember, key = 0) {
    let genogramData = [];
    console.log(familyMember, familyMember.name)

    genogramData.push({key: key, n: familyMember.name, s: familyMember.sex ? "M" : "F",
        m: familyMember.mother,
        f: familyMember.father,
        ux: familyMember.spouse ? familyMember.spouse : undefined,
        vir: undefined,
        a: ["E", "G"]
    });

    let familyMembersDetails = familyMember.family_infos;

    if (familyMember.family_infos.mother_family) {
        let mother = familyMember.family_infos.mother_family;
        genogramData.push({key: mother.id, n: mother.name, s:mother.sex ? "M" : "F",
            m: mother.mother,
            f: mother.father,
            ux: familyMember.family_infos.father_family ? familyMember.family_infos.father_family.id : undefined,
            vir: undefined,
            a: ["F", "M"]
        });
    }

    if (familyMember.family_infos.father_family) {
        let father = familyMember.family_infos.father_family;
        genogramData.push({key: father.id, n: father.name, s: father.sex ? "M" : "F",
            m: father.mother,
            f: father.father,
            ux: undefined,
            vir: familyMember.family_infos.mother_family ? familyMember.family_infos.mother_family.id : undefined,
            a: ["M"]
        });
    }

    if (familyMember.family_infos.spouse_family){
        let spouse = familyMember.family_infos.spouse_family;
        genogramData.push({key: spouse.id, n: spouse.name, s: spouse.sex ? "M" : "F",
            m: spouse.mother,
            f: spouse.father,
            ux: familyMember.sex ? key : undefined,
            vir: familyMember.sex ? undefined : key,
            a: ["F", "G"]
        });
    }

    if (familyMembersDetails.former_spouses_family) {
        familyMembersDetails.former_spouses_family.forEach((spouse) => {
            genogramData.push({key: spouse.id, n: spouse.name, s: spouse.sex ? "M" : "F",
                m: spouse.mother,
                f: spouse.father,
                ux: familyMember.sex ? key : undefined,
                vir: familyMember.sex ? undefined : key,
                a: ["H"]
            });
        });
    }

    if (familyMembersDetails.deceased_spouses_family) {
        familyMembersDetails.deceased_spouses_family.forEach((spouse) => {
            genogramData.push({
                key: spouse.id, n: spouse.name, s: spouse.sex ? "M" : "F",
                m: spouse.mother,
                f: spouse.father,
                ux: familyMember.sex ? key : undefined,
                vir: familyMember.sex ? undefined : key,
                a: ["H", "S"]
            });
        });
    }

    if (familyMembersDetails.children_family) {
        let children = familyMembersDetails.children_family;
        children.forEach((child) => {
            console.log(child);
            // recursively extract children
            if (child.family_infos.children_family) {
                let childData = convertToGenogramFormat(child, child.id);
                genogramData = genogramData.concat(childData);
            }
            genogramData.push({
                key: child.id, n: child.name, s: child.sex ? "M" : "F",
                f: child.father,
                m: child.mother,
                ux: undefined,
                vir: undefined,
                a: ["D", "K"]
            });
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

    let hfLink = historicalFiguresDetail.hf_link && Array.isArray(historicalFiguresDetail.hf_link) ?
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
        getHistoricalFigureFamily(setHistoricalFigureFamily, hfId);
    }, [hfId])

    useEffect(() => {
        if (historicalFigureFamily.id) {
            setFamilyGenoData(convertToGenogramFormat(historicalFigureFamily, historicalFiguresDetail.id));
            setFamilyDataLoaded(true);
        }
    }, [historicalFigureFamily])


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