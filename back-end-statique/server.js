import express from 'express';
import { readdir } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

import {getCategory, getCategoryPagened, getDetailedHf, getDetailedSite, getDetailedHistoricalEvent, getDetailedHistoricalEventCollection, getHfFamily, getDetailEntity} from "./data_preprocessing/index.js";

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
  category = category.replace(/['"]+/g, '')
  res.json(getCategory(category))
})

//Route get générale
app.get("/filtre/:category/:key/:value", (req, res) => {
  console.log(`Route appelée: /filtre/${category}/${key}/${value}`);
  res.json(getFiltered(req.params.category, req.params.key, req.params.value))
})

app.get("/all/:id", (req, res)=> {
  console.log(`Route appelée:/all/${req.params.id}`);
  res.json(trouverObjetParId(req.params.id));
})

app.get("/:category/:id", (req, res) => {
  let category = req.params.category
  category = category.replace(/['"]+/g, '')
  let id = parseInt(req.params.id)
  res.json(getCategory(category).find(elem => elem.id === id))
})

app.get("/:category/page/:pagination",(req, res) => {
  const pagination = req.params.pagination ?? 0
  const category = req.params.category;
  console.log(`Route appelée: /${category}/page/${pagination}`);
  res.json(getCategoryPagened(pagination, category))
});

app.get("/historical_figure/detail/:hfId", (req, res)=> {
  res.json(getDetailedHf(req.params.hfId));
})

app.get("/historical_figure/detail/:hfId/family", (req, res)=> {
  const hfId = req.params.hfId;
  const parentDepth = req.query.parent_depth || 1; // Valeur par défaut 1 si non spécifié
  const childDepth = req.query.child_depth || 1; // Valeur par défaut 1 si non spécifié

  const detailedHf = getHfFamily(hfId, parentDepth, childDepth);
  res.json(detailedHf);
})

app.get("/entity/detail/:id", (req, res)=> {
  console.log(`Route appelée: /entities/detail/${req.params.id}`);
  res.json(getDetailEntity(req.params.id));
})

app.get("/historical_event_collection/detail/:id", (req, res)=> {
  console.log(`Route appelée: /historical_event_collection/detail/${req.params.id}`);
  res.json(getDetailedHistoricalEventCollection(req.params.id));
})

app.get("/historical_event/detail/:id", (req, res)=> {
  console.log(`Route appelée: /historical_event/detail/${req.params.id}`);
  res.json(getDetailedHistoricalEvent(req.params.id));
})


app.get("/site/detail/:id", (req, res)=> {
  console.log(`Route appelée:/site/detail/${req.params.id}`);
  res.json(getDetailedSite(req.params.id));
})

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

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
