import fs from "fs";

const filePath = 'legend.json';
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    let gameData = JSON.parse(data)

    let names = []
    gameData["df_world"]["historical_figures"]["historical_figure"].forEach((hf) => {
        names.push(hf.name + " (" + hf.race + ")")
    })

    let namesFilePath = "hf_names.json";
    fs.writeFile(namesFilePath, JSON.stringify(names), (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier :', err);
        } else {
            console.log('Le résultat a été écrit dans le fichier :', namesFilePath);
        }
    });
});