import express from 'express';
import { readdir, exists } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

import {artifactList, hfList, regionList, siteList, structureList} from './fakeData.js';
import {getCategory, legendData} from "./data_preprocessing/index.js";

// Middleware pour activer CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // '*' permet à tous les domaines d'accéder à la ressource
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Route get générale
app.get("/:category", (req, res) => {
  let category = req.params.category
  let shouldUseLegendPlus = (parseInt(req.query.useplus) === 1)
  category = category.replace(/['"]+/g, '')
  res.json(getCategory(category, shouldUseLegendPlus))
})

app.get("/:category/:id", (req, res) => {
  let category = req.params.category
  let shouldUseLegendPlus = (parseInt(req.query.useplus) === 1)
  category = category.replace(/['"]+/g, '')
  let id = parseInt(req.params.id)
  res.json(getCategory(category, shouldUseLegendPlus).find(elem => elem.id === id))
})

// Route pour /getAll/artifact
app.get('/getAll/artifact', (req, res) => {
  res.json(legendData["artifacts"]["artifact"]);
});

// Route pour /getAll/hfid
app.get('/getAll/hf', (req, res) => {
  res.json(hfList);
});

// Route pour /getAll/region
app.get('/getAll/region', (req, res) => {
  res.json(regionList);
});

// Route pour /getAll/site
app.get('/getAll/site', (req, res) => {
  res.json(siteList);
});

// Route pour /getAll/structure
app.get('/getAll/structure', (req, res) => {
  res.json(structureList);
});

// Route pour /maps
app.get('/maps', (req, res) => {
  var available = [];
  readdir('assets/maps', (err, filenames) => {
    if (err) throw(err);
    const mapTypeRegex = /^region(?<regionId>\d+)-(?<type>[a-z0-9_-]+)\.png$/;
    filenames.forEach( (filename) => {
      if (mapTypeRegex.test(filename)) {
        var regexpRes = mapTypeRegex.exec(filename).groups;
      }
      if (regexpRes) {
        available.push(regexpRes);
      }
    });
    res.json(available);
  });
});

// Route avec paramètre d'id de monde et de type pour /maps/:type
app.get('/region/:regionId/map/:type', (req, res) => {
  const { regionId, type } = req.params;
  res.sendFile(`assets/maps/region${regionId}-${type}.png`, { root: __dirname }, (err) => {
    if (err)
      res.status(err.status).end();
  });
})

// Route avec paramètre d'ID pour /get/artifact/:id
app.get('/get/artifact/:id', (req, res) => {
    const { id } = req.params;
    const artifact = artifactList.find(item => item.id === parseInt(id));

    if (artifact) {
      res.json(artifact);
    } else {
      res.status(404).json({ error: 'Artéfact non trouvé' });
    }
  });

  // Route avec paramètre d'ID pour /get/hfid/:id
  app.get('/get/hfid/:id', (req, res) => {
    const { id } = req.params;
    const hfid = hfList.find(item => item.id === parseInt(id));

    if (hfid) {
      res.json(hfid);
    } else {
      res.status(404).json({ error: 'HFID non trouvé' });
    }
  });

  // Route avec paramètre d'ID pour /get/region/:id
  app.get('/get/region/:id', (req, res) => {
    const { id } = req.params;
    const region = regionList.find(item => item.id === parseInt(id));

    if (region) {
      res.json(region);
    } else {
      res.status(404).json({ error: 'Région non trouvée' });
    }
  });

  // Route avec paramètre d'ID pour /get/site/:id
  app.get('/get/site/:id', (req, res) => {
    const { id } = req.params;
    const site = siteList.find(item => item.id === parseInt(id));

    if (site) {
      res.json(site);
    } else {
      res.status(404).json({ error: 'Site non trouvé' });
    }
  });

  // Route avec paramètre d'ID pour /get/structure/:id
  app.get('/get/structure/:id', (req, res) => {
    const { id } = req.params;
    const structure = structureList.find(item => item.id === parseInt(id));

    if (structure) {
      res.json(structure);
    } else {
      res.status(404).json({ error: 'Structure non trouvée' });
    }
  });

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
