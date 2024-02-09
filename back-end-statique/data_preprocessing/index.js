import fs from "fs";

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
    "historical_event_relationships",
    "historical_event_relationships_supplement",
    "historical_event_collection",
    "historical_era",
    "written_content",
    "poetic_form",
    "musical_form",
    "dance_form"
]

const simplifiedField = {
    "landmass" : "",
    "mountain_peak" :"",
    "region":"",
    "underground_region":"",
    "river":"",
    "creature":"",
    "site":"",
    "world_construction":"",
    "artifact":"",
    "historical_figure":"",
    "identity":"",
    "entity_population":"",
    "entity":"",
    "historical_event":"",
    "historical_event_relationships":"",
    "historical_event_relationships_supplement":"",
    "historical_event_collection":"",
    "historical_era":"",
    "written_content":"",
    "poetic_form":"",
    "musical_form":"",
    "dance_form": ""
}
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
      .filter((elem) => elem.id > startIndex && elem.id < endIndex)
      .map((elem) => {
          return elem;
      });
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
    }
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
    //HfData.hf_link[indexLink]["name"] = mergedLegendData["historical_figures"]["historical_figure"][entityId]["name"]
    return HfData
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