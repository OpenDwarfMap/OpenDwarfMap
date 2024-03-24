# OpenDwarfMap

## Description du projet 

[Figma du projet](https://www.figma.com/file/GGiNC0kGp6J1DkIKIOtZxe/OpenDwarfMap?type=design&node-id=0%3A1&mode=design&t=sSov3rlpJNgLrshO-1)

## Technologie utilisée 

Application Web, Avec Back

## Comment l'utiliser ? 

Clonez le projet : 
```
git clone https://github.com/OpenDwarfMap/OpenDwarfMap.git
```

Exportez également les données de votre partie avec DFHack et notez le chemin où elles sont exportées.

### Avec docker compose

Pour exécuter le programme avec `docker-compose`, mettez le dossier contenant l'export réalisé par DFHack dans le dossier `dfhack-export` puis lancez le projet :

```bash
docker compose up -d
```

Vous pourrez alors accéder au programme dans votre navigateur sur http://localhost:1234.

### Front-End Parcel

Pour exécuter la partie Front-End de l'application, il faut installer Parcel et lancer le serveur de développement.

Pour cela :

- Installer Node.js et npm, puis installer Parcel avec npm :

```
npm install -g parcel-bundler
```

- Dans les données exportées se trouve une image dont le nom se termine par `detailed.bmp`. Copiez-la dans `front-end/assets` sous le nom `region-detailed.bmp`.

- Éxécuter les commandes suivantes depuis la racine du projet :

```
cd ./front-end
npm install
cp -r assets dist/assets
parcel index.html
```

## Concernant le BackEnd :

Il suffit d'installer les dépendances puis de démarrer le serveur en exécutant les lignes suivantes :

``` bash
cd ./back-end-statique
npm install
node server.js
```

## Exporter le XML en JSON
Les actions suivantes sont à entreprendre dans le dossier back-end-statique, si besoin tapez la commande suivante :
``` bash
cd back-end-statique
```

Ensuite il faut exécuter la commande suivante :
``` bash
node --max-old-space-size=8192 newXmlToJson.js <chemin vers votre fichier legends.xml>
```

Pour vérifier que tout fonctionne bien pour vous, exécutez la commande suivante :
``` bash
node testOpenJson.js
```
