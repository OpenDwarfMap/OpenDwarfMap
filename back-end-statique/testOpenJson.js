import fs from "fs"

const filePath = 'new_test.json';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    let gameData = JSON.parse(data)

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

    categories.forEach((category) => {
        let parent = (category === "entity") ? "entities" : category + "s"
        let data = gameData["df_world"][parent][category]
        console.log(parent + " : " + data.length)
    })
});