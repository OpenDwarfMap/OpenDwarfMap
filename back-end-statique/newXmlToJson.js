import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser"
import fs from "fs"

const filePath = '../../region2-00250-01-01-legends_plus.xml';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const options = {
        stopNodes: ['region','historical_figure','intrigue_plot','historical_event','dance_form','musical_form','poetic_form']
    };
    const parser = new XMLParser();
    let jObj = parser.parse(data);
    fs.writeFile("legend_plus.json", JSON.stringify(jObj), (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier :', err);
        } else {
            console.log('Le résultat a été écrit dans le fichier :', "legend_plus.json");
        }
    });
});