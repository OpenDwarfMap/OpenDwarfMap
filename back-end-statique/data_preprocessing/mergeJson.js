import fs from "fs";

const legendPlusFilePath = '../legend_plus.json';
const legendFilePath = '../legend.json';

let legendData = {}
let legendPlusData = {}
export let mergedLegendData = {}

// On lit les données de legend 
fs.readFile(legendPlusFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    let gameData = JSON.parse(data)
    legendPlusData = gameData["df_world"]
    // On lit les données de legend plus 
    fs.readFile(legendFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        let gameData = JSON.parse(data);
    
        legendData = gameData["df_world"];
        fs.writeFile("legend_merged.json", JSON.stringify(mergeJsonObjects(legendData,legendPlusData)), (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier :', err);
            } else {
                console.log('Le résultat a été écrit dans le fichier :', "legend_merged.json");
            }
        });
        // const mergedLegendData = mergeJsonObjects(legendData,legendPlusData);
    });
});

function mergeJsonObjects(legendData, legendPlusData) {
    const exlusiveCategories = ["historical_event_relationships","historical_event_relationship_supplements"];
    // On ajoute à legend les champs exclusifs à legendplus
    for (const category of exlusiveCategories) {
        legendData[category]=legendPlusData[category]
    }

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
