import express from 'express';
const app = express();
const port = 3000;

import {artifactList, hfList, regionList, siteList, structureList} from './fakeData.js';

// Route pour /getAll/artifact
app.get('/getAll/artifact', (req, res) => {
  res.json(artifactList);
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
    const hfid = hfidList.find(item => item.id === parseInt(id));
  
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
