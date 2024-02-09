import express from 'express';
import { readdir } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Polygon } from 'extract-region-polygon';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

import {getCategory, getCategoryPagened, getDetailedHf} from "./data_preprocessing/index.js";

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

app.get("/:category/:id", (req, res) => {
  let category = req.params.category
  category = category.replace(/['"]+/g, '')
  let id = parseInt(req.params.id)
  res.json(getCategory(category).find(elem => elem.id === id))
})

app.get("/:category/page/:pagination",(req, res) => {
  const pagination = req.params.pagination ?? 0
  const category = req.params.category;
  res.json(getCategoryPagened(pagination, category))
});

app.get("/historical_figure/detail/:hfId", (req, res)=> {
  res.json(getDetailedHf(req.params.hfId));
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
