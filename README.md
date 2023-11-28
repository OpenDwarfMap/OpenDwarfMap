# OpenDwarfMap

## Description du projet 

## Technologie utilisée 

Application Web, Sans Back 

## Comment l'utiliser ? 

### Front-End Parcel

Pour exécuter la partie Front-End de l'application, il faut installer Parcel et lancer le serveur de développement.

Pour cela :

- Installer Node.js et npm, puis installer Parcel avec npm :

```
npm install -g parcel-bundler
```

- Ajouter la carte 'region-detailed.bmp' dans le dossier assets du projet

- Éxécuter les commandes suivantes depuis la racine du projet :

```
cd ./front-end
npm install
cp -r assets dist/assets
parcel index.html
```

## Concernant le BackEnd : 

Il suffit d'installer puis démarrer le serveur en exécutant les lignes suivantes :

```
cd ./backStatic
npm install
node server.js
```
