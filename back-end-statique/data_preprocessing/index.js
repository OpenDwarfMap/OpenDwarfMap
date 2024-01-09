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

export let legendData = {}
export let legendPlusData = {}

let dataInitialized = false

//Read the data from the JSON if necessary
initData()

export function getCategory(categoryName)
{
    if(categoryName === "all") {
        return categories
    }
    if(!categories.includes(categoryName)) {
        return {
            "error": "The category " + categoryName + " is not recognized"
        }
    }
    let parent = (categoryName === "entity") ? "entities" : categoryName + "s"
    return legendData[parent][categoryName]
}

function initData()
{
    const legendFilePath = 'legend.json';
    const legendPlusFilePath = 'legend.json';
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
            legendPlusData = gameData
        });

        dataInitialized = true
    }
}