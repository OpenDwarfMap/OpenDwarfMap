import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser"
import fs from "fs"

if process.argc < 3 || !process.argv[2].endsWith("legends.xml") {
    throw new Error("Please provide the path to your [...]-legends.xml file.");
}

const legendsPath = process.argv[2];
const legendsPlusPath = process.argv[2].replace("legends.xml", "legends_plus.xml")

fs.readFile(legendsPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const options = {
        stopNodes: [
            'region',
            'historical_figure',
            'intrigue_plot',
            'historical_event',
            'dance_form','musical_form','poetic_form']
    };
    const parser = new XMLParser();
    let jObj = parser.parse(data);
    fs.writeFile("legends.json", JSON.stringify(jObj), (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier :', err);
        } else {
            console.log('Le résultat a été écrit dans le fichier :', exportName);
    });
});

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const options = {
        stopNodes: [
            'region',
            'historical_figure',
            'intrigue_plot',
            'historical_event',
            'dance_form','musical_form','poetic_form']
    };
    const parser = new XMLParser();
    let jObj = parser.parse(data);
    fs.writeFile("legends_plus.json", JSON.stringify(jObj), (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier :', err);
        } else {
            console.log('Le résultat a été écrit dans le fichier :', exportName);
        });
    });
