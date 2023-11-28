// Données de test pour chaque type

/*** 
    AbsTileX         int    `json:"absTileX" legend:"base" related:""`         // abs_tile_x
	AbsTileY         int    `json:"absTileY" legend:"base" related:""`         // abs_tile_y
	AbsTileZ         int    `json:"absTileZ" legend:"base" related:""`         // abs_tile_z
	HolderHfid       int    `json:"holderHfid" legend:"base" related:""`       // holder_hfid
	Id_              int    `json:"id" legend:"both" related:""`               // id
	Item             *Item  `json:"item" legend:"base" related:""`             // item
	ItemDescription  string `json:"itemDescription" legend:"plus" related:""`  // item_description
	ItemSubtype      string `json:"itemSubtype" legend:"plus" related:""`      // item_subtype
	ItemType         string `json:"itemType" legend:"plus" related:""`         // item_type
	Mat              string `json:"mat" legend:"plus" related:""`              // mat
	Name_            string `json:"name" legend:"base" related:""`             // name
	PageCount        int    `json:"pageCount" legend:"plus" related:""`        // page_count
	SiteId           int    `json:"siteId" legend:"base" related:""`           // site_id
	StructureLocalId int    `json:"structureLocalId" legend:"base" related:""` // structure_local_id
	SubregionId      int    `json:"subregionId" legend:"base" related:""`      // subregion_id
	Writing          int    `json:"writing" legend:"plus" related:""`          // writing

***/


export const artifactList = [
    {
        "L'Éclat d'Éternité": {
        "ItemDescription": "Une lame qui capture la lumière des étoiles et tranche à travers l'obscurité avec une précision divine",
        "ItemSubtype": "",
        "ItemType": "Type 1",
        "Mat": 123,
        "PageCount": {
          "AbsTileX": true,
          "AbsTileY": false,
          "AbsTileZ": true,
          "HolderHfid": true,
          "SiteId": 456,
          "StructureLocalId": false,
          "SubregionId": 789
        },
        "Writing": {
          "AbsTileX": true,
          "AbsTileY": true,
          "AbsTileZ": false,
          "HolderHfid": true,
          "SiteId": 101,
          "StructureLocalId": true,
          "SubregionId": 112
        }
      },
    },
    {}

  ];
  
  export const hfList = [
    { id: 1, name: 'HFID 1' },
    { id: 2, name: 'HFID 2' },
    // ...
  ];
  
  export const regionList = [
    { id: 1, name: 'Région 1' },
    { id: 2, name: 'Région 2' },
    // ...
  ];
  
  export const siteList = [
    { id: 1, name: 'Site 1' },
    { id: 2, name: 'Site 2' },
    // ...
  ];
  
  export const structureList = [
    { id: 1, name: 'Structure 1' },
    { id: 2, name: 'Structure 2' },
    // ...
  ];