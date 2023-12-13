import fs from 'fs';
import xml2js from 'xml2js';

function convertXmlFileToJsonStream(filePath, tagsToFind) {
  const idDictionary = {};
  const startTags = []
  const endTags = []
  for (const tag of tagsToFind) {
    idDictionary[tag] = {}
    startTags.push('<'+tag+'>');
    endTags.push('</'+tag+'>');
  }

  let xmlBatch = '';


  // Créer un flux de lecture pour le fichier XML
  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  // Écouter les événements 'data' du flux de lecture
  readStream.on('data', (chunk) => {
    xmlBatch += chunk;
    delimiterBalise(xmlBatch, startTags, endTags, idDictionary);
  });

  // Écouter l'événement 'end' pour finaliser le traitement
  readStream.on('end', () => {
    // Traitez le dernier lot d'XML s'il en reste
    if (xmlBatch) {
      delimiterBalise(xmlBatch, startTags, endTags, idDictionary);
    }

    // Écrire le résultat dans un fichier
    writeResultToFile(outputFilePath, idDictionary);
  });
}

async function delimiterBalise(chunk, startTags, endTags, idDictionary) {
  for (let i = 0; i < startTags.length; i++) {
    const startTag = startTags[i];
    const endTag = endTags[i];

    let startIdx = chunk.indexOf(startTag);
    let endIdx = chunk.indexOf(endTag);

    while (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
      const xmlData = chunk.substring(startIdx, endIdx + endTag.length);

      const result = await xml2js.parseStringPromise(xmlData, parseOptions);
      idDictionary[tagsToFind[i]][result.id]=result; 
      
      // Supprimer la portion traitée
      chunk = chunk.substring(endIdx + endTag.length);

      // Rechercher la prochaine occurrence
      startIdx = chunk.indexOf(startTag);
      endIdx = chunk.indexOf(endTag);
    }
  }
}

function writeResultToFile(outputFilePath, idDictionary) {
  const jsonData = JSON.stringify(idDictionary, null, 2);

  fs.writeFile(outputFilePath, jsonData, (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture du fichier :', err);
    } else {
      console.log('Le résultat a été écrit dans le fichier :', outputFilePath);
    }
  });
}

const parseOptions = {
  explicitArray: false,
  explicitRoot: false,
};

// Exemple d'utilisation
const filePath = '../../region2-00250-01-01-legends.xml';
// const tagsToFind = ['region', 'landmass','historical_figure','entity','historical_event','written_content'];
// Reste à créer ,'historical_event_collection','written_content'

//const tagsToFind = ['region','historical_figure','intrigue_plot','historical_event','dance_form','musical_form','poetic_form'];
const tagsToFind = ['region'];
const outputFilePath = './legend.json';

convertXmlFileToJsonStream(filePath, tagsToFind);
