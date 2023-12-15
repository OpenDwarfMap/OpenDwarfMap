import fs from "fs";

const filePath = 'legend.json';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    let gameData = JSON.parse(data)

    let entity_links = new Set()
    gameData["df_world"]["historical_figures"]["historical_figure"].forEach(hf => {
        if("hf_link" in hf) {
            if("link_type" in hf["hf_link"]) {
                entity_links.add(hf["hf_link"]["link_type"])
            } else {
                hf["hf_link"].forEach(link => entity_links.add(link["link_type"]))
            }
        }
        if("entity_link" in hf) {
            if("link_type" in hf["entity_link"]) {
                entity_links.add(hf["entity_link"]["link_type"])
            } else {
                hf["entity_link"].forEach(link => entity_links.add(link["link_type"]))
            }
        }
    })

    let links = ""
    entity_links.forEach(value => {
        links += value + "\n"
    })

    let linksFilePath = "hf_link_types.txt";
    fs.writeFile(linksFilePath, links, (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier :', err);
        } else {
            console.log('Le résultat a été écrit dans le fichier :', linksFilePath);
        }
    });
});