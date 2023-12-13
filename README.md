# OpenDwarfMap

## Description du projet 

[Figma du projet](https://www.figma.com/file/GGiNC0kGp6J1DkIKIOtZxe/OpenDwarfMap?type=design&node-id=0%3A1&mode=design&t=sSov3rlpJNgLrshO-1)

## Technologie utilisée 

Application Web, Avec Back

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

## Exporter le XML en JSON
Les actions suivantes sont à entreprendre dans le dossier back-end-statique, si besoin tapez la commande suivante :
```
cd back-end-statique
```

Il faut mettre à jour la variable "filePath" du fichier newXmlToJson.js.
Ensuite il faut executer la commande suivante :
```
node newXmlToJson.js
```

Si cette commande échoue pour des raisons de mémoire, exécutez la commande suivante dans votre terminal :

```
export NODE_OPTIONS="--max-old-space-size=8192"
```

**Sur Windows** :

```
Set NODE_OPTIONS="--max-old-space-size=8192"
```

*Voir cette page pour comprendre à quoi sert la commande : [stackoverflow](https://stackoverflow.com/questions/53230823/fatal-error-ineffective-mark-compacts-near-heap-limit-allocation-failed-javas?fbclid=IwAR2v3kGwPINtWMgc4azg4eNEgK7w4lEaXDXVKx4NFsOTVCmbxlNb9rfeHOY).*

Puis refaite la commande précédente.

Pour vérifier que tout fonctionne bien pour vous, executez la commande suivante :
```
node testOpenJson.js
```