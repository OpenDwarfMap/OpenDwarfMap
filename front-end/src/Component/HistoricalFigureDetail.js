import React, { useEffect, useState } from "react";
import {useParams, Link} from'react-router-dom';
import {getHistoricalFigureFamily, getHistoricalFiguresDetail} from '../utils/API.js';
import HistoricalFigureGraph from "./HistoricalFigureGraph";
import Genogram from "./GenogramLayoutGraph";

function convertToGenogramFormat(familyMember, key = 0) {
    let genogramData = [];
    console.log(familyMember, familyMember.name)

    genogramData.push({key: key, n: familyMember.name, s: familyMember.sex ? "M" : "F",
        m: familyMember.mother,
        f: familyMember.father,
        ux: familyMember.spouse ? familyMember.spouse : undefined,
        vir: undefined,
        a: ["C", "F", "K"]
    });

    let familyMembers = Array.isArray(familyMember.hf_link) ? familyMember.hf_link : [];
    let familyMembersDetails = familyMember.family_infos;

    console.log(familyMembersDetails)

    familyMembers.forEach((member) => {
        if (member.link_type === "mother") {
            console.log(member);
        }
    });
    familyMembers.forEach((member) => {
        if (member.link_type === "father") {
            console.log(member);
        }
    });

    if (familyMember.family_infos.spouse_family){
        let spouse = familyMember.family_infos.spouse_family;
        genogramData.push({key: spouse.id, n: spouse.name, s: spouse.sex ? "M" : "F",
            m: spouse.mother,
            f: spouse.father,
            ux: familyMember.sex ? key : undefined,
            vir: familyMember.sex ? undefined : key,
            a: ["C", "F", "K"]
        });
    }

    // familyMembers.forEach((member) => {
    //     if (member.link_type === "child") {
    //         console.log("child", member);
    //         console.log(familyMember.sex)
    //         genogramData.push({key: member.hfid, n: member.name, s: member.sex ? "M" : "F",
    //             f: familyMember.sex ? key : spouse_key,
    //             m: familyMember.sex && spouse_key ? spouse_key : key,
    //             ux: undefined,
    //             vir: undefined,
    //             a: ["C", "F", "K"]
    //         });
    //     }
    // });

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
            a: ["C", "F", "K"]
        });
    });

    familyMembers.forEach((member) => {
        if (member.link_type === "deceased_spouse") {
            console.log(member);
        }
    });
    familyMembers.forEach((member) => {
        if (member.link_type === "former_spouse") {
            console.log(member);
        }
    });



    // if (familyMembers.former_spouses) {
    //     familyMembers.former_spouses.forEach((spouse, i) => {
    //         addMember(-1 * (i + 1), spouse.name, spouse.sex, undefined, undefined, undefined, key);
    //     });
    // }
    //
    // if (familyMembers.deceased_spouses) {
    //     familyMembers.deceased_spouses.forEach((spouse, i) => {
    //         addMember(-1 * (familyMembers.former_spouses ? familyMembers.former_spouses.length : 0 + i + 1), spouse.name, spouse.sex, undefined, undefined, undefined, key);
    //     });
    // }
    //
    // if (familyMembers.mother) {
    //     addMember(-1 * ((familyMembers.former_spouses ? familyMembers.former_spouses.length : 0) + (familyMembers.deceased_spouses ? familyMembers.deceased_spouses.length : 0) + 1), familyMembers.mother.name, 'F', undefined, undefined, familyMembers.father ? -1 * ((familyMembers.former_spouses ? familyMembers.former_spouses.length : 0) + (familyMembers.deceased_spouses ? familyMembers.deceased_spouses.length : 0) + 2) : undefined);
    // }
    //
    // if (familyMembers.father) {
    //     addMember(-1 * ((familyMembers.former_spouses ? familyMembers.former_spouses.length : 0) + (familyMembers.deceased_spouses ? familyMembers.deceased_spouses.length : 0) + 2), familyMembers.father.name, 'M', undefined, undefined);
    // }

    // if (familyMember.children && familyMember.family_infos) {
    //     console.log("children detected", familyMember.family_infos);
    //     familyMember.family_infos.children_family.forEach((child, i) => {
    //         let childData = convertToGenogramFormat(child, i + 1);
    //         childData[0].m = familyMember.mother ? -1 * ((familyMember.former_spouses ? familyMember.former_spouses.length : 0) + (familyMember.deceased_spouses ? familyMember.deceased_spouses.length : 0) + 1) : undefined;
    //         childData[0].f = familyMember.father ? -1 * ((familyMember.former_spouses ? familyMember.former_spouses.length : 0) + (familyMember.deceased_spouses ? familyMember.deceased_spouses.length : 0) + 2) : undefined;
    //         genogramData = genogramData.concat(childData);
    //     });
    // }

    console.log(genogramData);

    // { key: 0, n: "Aaron", s: "M", m: -10, f: -11, ux: 1, a: ["C", "F", "K"] },
    // { key: 1, n: "Alice", s: "F", m: -12, f: -13, a: ["B", "H", "K"] },
    // { key: 2, n: "Bob", s: "M", m: 1, f: 0, ux: 3, a: ["C", "H", "L"] },

    // adding spouse for testing
    // genogramData.push({key: 1, n: "Test Spouse", s: "F", m: -1, f: -1, ux: key, a: ["C", "F", "K"]});

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