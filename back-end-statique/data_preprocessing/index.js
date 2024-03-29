import fs from "fs";
import { Polygon } from 'extract-region-polygon';

const categories = [
    "landmass",
    "mountain_peak",
    "region",
    "underground_region",
    "river",
    "creature",
    "site",
    "world_construction",
    "artifact",
    "historical_figure",
    "identity",
    "entity_population",
    "entity",
    "historical_event",
    "historical_event_relationship",
    "historical_event_relationship_supplement",
    "historical_event_collection",
    "historical_era",
    "written_content",
    "poetic_form",
    "musical_form",
    "dance_form"
]

//Read the data from the JSON if necessary
let mergedLegendData = {}

initData()

export function getCategory(categoryName) {
    if(!categories.includes(categoryName)) {
        return {
            "error": "The category " + categoryName + " is not recognized"
        }
    }
    let parent = (categoryName === "entity") ? "entities" : categoryName + "s"
    return mergedLegendData[parent][categoryName]
}

export function getCategoryPagened(pagination, categoryName) {
    const startIndex = (pagination - 1) * 10;
    const endIndex = pagination * 10;

    if(!categories.includes(categoryName)) {
        return {
            "error": "The category " + categoryName + " is not recognized"
        }
    }
    let parent = (categoryName === "entity") ? "entities" : categoryName + "s"

    return mergedLegendData[parent][categoryName]
      .filter(elem => elem.id >= startIndex && elem.id < endIndex)
      .map(elem => {
          return elem;
      });
  }

export function getDetailedSite (id){
    let siteData = JSON.parse(JSON.stringify(mergedLegendData["sites"]["site"][parseInt(id)]));

    // Ajouter les noms aux id relatifs au site
    siteData.cur_owner_id= siteData.cur_owner_id ? [siteData.cur_owner_id, getName("historical_figure", siteData.cur_owner_id)] : null;
    siteData.civ_id = siteData.civ_id ? [siteData.civ_id, getName("entity", siteData.civ_id), getName("entity", siteData.civ_id, "race")] : null;
    siteData.event = getEvent('site_id',id);
    siteData.structures = "structures" in siteData && isObject(siteData.structures.structure) ? [siteData.structures.structure] :  siteData.structures ? siteData.structures.structure : null ;
    return siteData
}

export function getDetailEntity(entityId){
    const entity = JSON.parse(JSON.stringify(mergedLegendData["entities"]["entity"].find(element=> element.id == entityId)));
    if (entity.type === 'cvilisation') {
        return entity;
    }
    if (entity.histfig_id && Array.isArray(entity.histfig_id)) {
        // Ajouter noms des hfid impliqué et leurs positions
        let assignement;
        entity.histfig_id = entity.histfig_id.map(hfId => {
            if (entity.entity_position_assignment && Array.isArray(entity.entity_position_assignment)){ 
                // Si plusieurs positions
                assignement = entity.entity_position_assignment.find((element)=> element.histfig === hfId); 
                assignement = assignement ? entity.entity_position[assignement.position_id]?.name : null;
            }else if (entity.entity_position_assignment && typeof entity.entity_position_assignment === 'object'){ 
                // Si une seule postion 
                assignement = entity.entity_position_assignment.histfig ===  hfId ? entity.entity_position.name : null ;
            } else {
                // Si pas de position 
                assignement = null;
            }

            return [hfId, getName('historical_figure',hfId), assignement]
        })
    } else if (entity.histfig_id && Number.isInteger(entity.histfig_id)){
        entity.histfig_id = [entity.histfig_id, 
            getName('historical_figure', entity.histfig_id),
            entity.entity_position.name]
    }
    return entity;
}

export function getDetailedHf(hfId) {
    let HfData = mergedLegendData["historical_figures"]["historical_figure"][parseInt(hfId)]
    // Il existe des hf sans entitylink
    if (HfData.entity_link) {
        for (const indexLink of HfData.entity_link.keys()) {
            const entityId = HfData.entity_link[indexLink]["entity_id"]
            const entity = mergedLegendData["entities"]["entity"][entityId]
            HfData.entity_link[indexLink]["name"] = entity["name"] + " (" + entity["type"] + ")"
        }
    };
    if(HfData.hf_link) {
        if("link_type" in HfData["hf_link"]) {
            const hfId = HfData["hf_link"]["hfid"]
            const hf = mergedLegendData["historical_figures"]["historical_figure"][hfId]
            HfData.hf_link["name"] = hf["name"] + " (" + hf["race"] + ")"
        } else {
            for (const indexLink of HfData.hf_link.keys()) {
                const hfId = HfData.hf_link[indexLink]["hfid"]
                const hf = mergedLegendData["historical_figures"]["historical_figure"][hfId]
                HfData.hf_link[indexLink]["name"] = hf["name"] + " (" + hf["race"] + ")"
            }
        }
    }

    // Array des event parfois insignifiants reliés à notre Hf

    const events =  mergedLegendData.historical_events.historical_event
    .filter((event) => {
        let keys = Object.keys(event).filter(k => k.includes("hfid") || k == "histfig")
        for(const keyname of keys){
            if(event[keyname] == hfId) {
                return true;
            }
        }
        return false;
    })

    let event_collection;
    HfData.eventLinked = JSON.parse(JSON.stringify(mergedLegendData.historical_event_collections.historical_event_collection))
    .filter((event_collection) => {
        event_collection  = Array.isArray(event_collection.event) ? event_collection.event : [event_collection.event] ;
        return isArrayContained(event_collection, events.map((event)=> event.id))
    });

    for(let eventcol of HfData.eventLinked) {
        for(let i = 0; i < eventcol.event.length; i++) {
            let id = eventcol.event[i]
            eventcol.event[i] = events.find(elem => elem.id === id) ?? id
        }
    }

    HfData.eventLinked.forEach(event_collection => {
        event_collection.site_id = event_collection.site_id ? [event_collection.site_id, getName("site", event_collection.site_id)] : null ;
    });

    //HfData.hf_link[indexLink]["name"] = mergedLegendData["historical_figures"]["historical_figure"][entityId]["name"]
    return HfData
}

export function getHfFamily(hfId, parentDepth, childDepth, spouseDepth=1){
    const familyLinks = ["child","former spouse","spouse","deceased spouse","mother","father"]
    let hfData = mergedLegendData["historical_figures"]["historical_figure"][parseInt(hfId)]
    // filer only family links
    let hfamilyData = hfData["hf_link"].filter(link => familyLinks.includes(link["link_type"]))
    let family_members = {
        ...hfData,
        mother: hfamilyData.find(link => link.link_type === "mother") ? hfamilyData.find(link => link.link_type === "mother").hfid : null,
        father: hfamilyData.find(link => link.link_type === "father") ? hfamilyData.find(link => link.link_type === "father").hfid : null,
        spouse: hfamilyData.find(link => link.link_type === "spouse") ? hfamilyData.find(link => link.link_type === "spouse").hfid : null,
        former_spouses: hfamilyData.filter(link => link.link_type === "former spouse").map(link => link.hfid),
        deceased_spouses: hfamilyData.filter(link => link.link_type === "deceased spouse").map(link => link.hfid),
        children: [],
    }

    let family_infos = {}

    if (parentDepth > 0) {
        if (family_members.mother)
            family_infos.mother_family = getHfFamily(family_members.mother, parentDepth - 1, 0);
        if (family_members.father)
            family_infos.father_family = getHfFamily(family_members.father, parentDepth - 1, 0);
    }
    if (childDepth > 0) {
        family_members.children = hfamilyData.filter(link => link.link_type === "child").map(link => link.hfid)
        if (family_members.children.length > 0)
            family_infos.children_family = family_members.children.map(child => getHfFamily(child, 0, childDepth - 1));
    }

    if (spouseDepth > 0) {
        if (family_members.spouse) {
            family_infos.spouse_family = getHfFamily(family_members.spouse, 0, 0,0);
        }
        if (family_members.former_spouses) {
            family_infos.former_spouses_family = family_members.former_spouses.map(spouse => getHfFamily(spouse, 0, 0, 0));
        }
        if (family_members.deceased_spouses) {
            family_infos.deceased_spouses_family = family_members.deceased_spouses.map(spouse => getHfFamily(spouse, 0, 0, 0));
        }
    }

    if (Object.keys(family_infos).length > 0) {
        family_members.family_infos = family_infos
    }

    return family_members;
}

// On lit les données de legend
export function getDetailedHistoricalEventCollection(eventCollId){
    let eventCollectionData = JSON.parse(JSON.stringify(mergedLegendData["historical_event_collections"]["historical_event_collection"][parseInt(eventCollId)]));
    // Remplace les events par eventid par les events
    if (eventCollectionData.event && Array.isArray(eventCollectionData.event)){
        // event est l'array des eventId
        eventCollectionData.event = eventCollectionData.event
        .filter( event => mergedLegendData["historical_events"]["historical_event"].find(elem => elem.id == event)
        )// on enlève les events sur lesquels on n'a pas d'info
        .map(event => {
            // On remplace les eventId par les event pour ceux qu'on sait possible
            return JSON.parse(JSON.stringify(mergedLegendData["historical_events"]["historical_event"].find(elem => elem.id == event)));
        })
        .map( event => {
            // On remplace les hfId par des [hfId, nom] pour l'affichage qd cela est possible
            const keys = Object.keys(event).filter(k => k.includes("hfid") || k == "histfig")
            for(const keyname of keys){
                event[keyname] = (Number.isInteger(event[keyname]) || event[keyname] > -1)
                ? [event[keyname], getName("historical_figure", event[keyname])]
                : -1;
            }
            return event;
        })
    } else if (eventCollectionData.event && Number.isInteger(eventCollectionData.event)){
        eventCollectionData.event = JSON.parse(JSON.stringify(mergedLegendData["historical_events"]["historical_event"].find(elem => elem.id === eventCollectionData.event)));
        // On remplace les hfId par des [hfId, nom] pour l'affichage qd cela est possible
        if (isObject(eventCollectionData.event)){ // on a un vrai event et pas un event sur lequel on n'a pas d'info 
            const keys = Object.keys(eventCollectionData.event).filter(k => k.includes("hfid") || k == "histfig")
            for (const keyname of keys) {
                eventCollectionData.event[keyname] = 
                (Number.isInteger(eventCollectionData.event[keyname]) || eventCollectionData.event[keyname] > -1)
                ? [eventCollectionData.event[keyname], getName("historical_figure", eventCollectionData.event[keyname])]
                : -1;
            }
            eventCollectionData.event = [eventCollectionData.event]; // Fomrattage, tout doit être un Array
        }
    }
    // Remplace site id si il ya par [siteId, nom du site]
    eventCollectionData.site_id = eventCollectionData.site_id ? [eventCollectionData.site_id, getName("site", eventCollectionData.site_id)]: null ;
    return eventCollectionData;
}

export function getDetailedHistoricalEvent(eventId){
    const eventcollection = mergedLegendData["historical_event_collections"]["historical_event_collection"]
    .find((eventColl) => {
        if (eventColl.event && Array.isArray(eventColl.event)) {
            return eventColl.event.includes(parseInt(eventId))
        } else if (eventColl.event && Number.isInteger(eventColl.event)){
            return eventColl.event == parseInt(eventId)
        }
        return null;
    });
    return eventcollection
    ? getDetailedHistoricalEventCollection(eventcollection.id)
    : mergedLegendData["historical_events"]["historical_event"].find((element=>element.id === eventId));
}

// On lit les données de legend
function initData(){
    const legendPlusFilePath = 'legend_plus.json';
    const legendFilePath = 'legend.json';
    fs.readFile(legendPlusFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const legendPlusData = JSON.parse(data)["df_world"]

        // On lit les données de legend plus
        fs.readFile(legendFilePath, 'utf8', (err, dataPlus) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            const legendData = JSON.parse(dataPlus)["df_world"];
            mergedLegendData = mergeJsonObjects(legendData,legendPlusData);
            mergedLegendData["regions"]["region"].forEach((region, id) => {
                var p = Polygon.from_enclosed_squares_string(region["coords"]);
                region["polygon"] = [];
                p.vertices().forEach((v, i) => {
                    region["polygon"].push([v.x*16, v.y*16]);
                });
            });

            // fusion des événements, ne pas oublier de formatter les new events pour convenir au traitement classiques

            const supplement_events = JSON.parse(JSON.stringify(mergedLegendData["historical_event_relationships"]["historical_event_relationship"].map(event=> {
                event.id = event.event;
            })))
            mergedLegendData["historical_events"]["historical_event"].concat(supplement_events);

            //delete mergedLegendData["historical_event_relationships"];
            //delete mergedLegendData["historical_event_relationship_supplements"];
        });
    });
}


function mergeJsonObjects(legendData, legendPlusData) {
    const exlusiveCategories = ["historical_event_relationships","historical_event_relationship_supplements"];
    // On ajoute à legend les champs exclusifs à legendplus
    for (const category of exlusiveCategories) {
        legendData[category]=legendPlusData[category]
    }
    // Double array pq entities ne suit pas le pattern category + "s"
    const commonCategories = [
        "regions",
        "underground_regions",
        "sites",
        "artifacts",
        "historical_figures",
        "entity_populations",
        "entities",
        "historical_events",
        "written_contents",
        "poetic_forms",
        "musical_forms",
        "dance_forms"
    ]
    const commonCategorie = [
        "region",
        "underground_region",
        "site",
        "artifact",
        "historical_figure",
        "entity_population",
        "entity",
        "historical_event",
        "written_content",
        "poetic_form",
        "musical_form",
        "dance_form"
    ]

    // On merge ensuite les champs communs

    // On boucle sur les différentes catégories à merger
    for (const [indexCategory, categories] of commonCategories.entries()) {
        const category = commonCategorie[indexCategory];
        // Ensuite on boucle sur les éléments de ces catégories
        for (const indexElement of legendData[categories][category].keys()) {

            legendData[categories][category][indexElement] = Object.assign(
                legendData[categories][category][indexElement],
                legendPlusData[categories][category][indexElement])
            }
        }
    return legendData;
}

function isArrayContained(array1, array2) {
    // Loop through each element of array1
    for (let i = 0; i < array1.length; i++) {
        // Check if the current element of array1 exists in array2
        if (array2.indexOf(array1[i]) !== -1) {
            // If the element is not found in array2, return true
            return true;
        }
    }
    // If all elements are found in array2, return false
    return false;
}

function getName(category, id, field='name'){
    let parent = (category === "entity") ? "entities" : category + "s";
    return (Number.isInteger(id) && id > -1) ? mergedLegendData[parent][category].find(elem => elem.id === id)[field] : 'Inexistant' ;
}

function getEvent(field, id){
    return JSON.parse(JSON.stringify(mergedLegendData["historical_events"]["historical_event"].filter(
        (event)=>{event[field] = id }
    )));
}

function isObject(obj) {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

export function getFiltered(category, key, value) {
    let parent = (category === "entity") ? "entities" : category + "s";
    return JSON.parse(JSON.stringify(mergedLegendData[parent][category])).filter(element=> element !== null && element !== undefined).filter(element=>element[key]=== value);
}


export function trouverObjetParId(idRecherche) {
    let objetsTrouves = [];

    function parcourirJson(objet) {
        // Si l'objet est un tableau, parcourir chaque élément
        if (Array.isArray(objet)) {
            objet.forEach(element => parcourirJson(element));
        }
        // Si l'objet est un objet, vérifier s'il a une propriété "id" égale à l'id de recherche
        else if (typeof objet === 'object' && objet !== null) {
            if (objet.hasOwnProperty('id') && objet.id === idRecherche) {
                objetsTrouves.push(objet);
            }
            // Parcourir chaque propriété de l'objet récursivement
            Object.values(objet).forEach(valeur => parcourirJson(valeur));
        }
    }

    parcourirJson(mergeJsonObjects);
    return objetsTrouves;
}
