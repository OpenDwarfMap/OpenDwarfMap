import fs from "fs";

const categories = [
    "region",
    "underground_region",
    "site",
    "artifact",
    "historical_figure",
    "entity_population",
    "entity",
    "historical_event",
    "historical_event_collection",
    "historical_era",
    "written_content",
    "poetic_form",
    "musical_form",
    "dance_form",
]

const categoriesPlus = [
    "landmass",
    "mountain_peak",
    "region",
    "undeground_region",
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
    "written_content",
    "poetic_form",
    "musical_form",
    "dance_form"
]

export let legendData = {}
export let legendPlusData = {}

let dataInitialized = false

//Read the data from the JSON if necessary
initData()

function getFileCategories(fromLegendPlus) {
    return fromLegendPlus ? categoriesPlus : categories
}

export function getCategory(categoryName, fromLegendPlus = false)
{
    let currentCategories = getFileCategories(fromLegendPlus)
    if(categoryName === "all") {
        return currentCategories
    }
    if(!currentCategories.includes(categoryName)) {
        return {
            "error": "The category " + categoryName + " is not recognized"
        }
    }
    let parent = (categoryName === "entity") ? "entities" : categoryName + "s"
    return fromLegendPlus ? legendPlusData[parent][categoryName] : legendData[parent][categoryName]
}

function initData()
{
    const legendFilePath = 'legend.json';
    const legendPlusFilePath = 'legend_plus.json';
    if(!dataInitialized) {
        fs.readFile(legendFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            let gameData = JSON.parse(data)

            let entity_links = new Set()
            legendData = gameData["df_world"]
        });

        fs.readFile(legendPlusFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            let gameData = JSON.parse(data)

            let entity_links = new Set()
            legendPlusData = gameData["df_world"]
        });

        dataInitialized = true
    }
}