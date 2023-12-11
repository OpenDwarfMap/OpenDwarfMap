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
        "absTileX": 10,
        "absTileY": 20,
        "absTileZ": 5,
        "holderHfid": 123,
        "id": 1,
        "item": {
          "property1": "value1",
          "property2": "value2"
          // ... (ajoutez les propriétés de l'objet Item selon vos besoins)
        },
        "itemDescription": "Description de l'artefact 1",
        "itemSubtype": "Subtype 1",
        "itemType": "Type 1",
        "mat": "Material 1",
        "name": "Nom de l'artefact 1",
        "pageCount": {
          "absTileX": true,
          "absTileY": true,
          "absTileZ": true,
          "holderHfid": true,
          "siteId": true,
          "structureLocalId": true,
          "subregionId": true
        },
        "writing": {
          "absTileX": true,
          "absTileY": true,
          "absTileZ": true,
          "holderHfid": true,
          "siteId": true,
          "structureLocalId": true,
          "subregionId": true
        },
        "siteId": 456,
        "structureLocalId": 789,
        "subregionId": 101,
        "writing": 1
    }, 
    {
        "absTileX": 30,
        "absTileY": 40,
        "absTileZ": 8,
        "holderHfid": 456,
        "id": 2,
        "item": {
          "property1": "value3",
          "property2": "value4"
          // ... (ajoutez les propriétés de l'objet Item selon vos besoins)
        },
        "itemDescription": "Description de l'artefact 2",
        "itemSubtype": "Subtype 2",
        "itemType": "Type 2",
        "mat": "Material 2",
        "name": "Nom de l'artefact 2",
        "pageCount": {
          "absTileX": true,
          "absTileY": true,
          "absTileZ": true,
          "holderHfid": true,
          "siteId": true,
          "structureLocalId": true,
          "subregionId": true
        },
        "writing": {
          "absTileX": true,
          "absTileY": true,
          "absTileZ": true,
          "holderHfid": true,
          "siteId": true,
          "structureLocalId": true,
          "subregionId": true
        },
        "siteId": 789,
        "structureLocalId": 123,
        "subregionId": 202,
        "writing": 2
    }

  ];
  
/***
 * type HistoricalFigure struct {
	ActiveInteraction               []string                           `json:"activeInteraction" legend:"base" related:""`               // active_interaction
	Adventurer                      bool                               `json:"adventurer" legend:"base" related:""`                      // adventurer
	Animated                        bool                               `json:"animated" legend:"base" related:""`                        // animated
	AnimatedString                  string                             `json:"animatedString" legend:"base" related:""`                  // animated_string
	Appeared                        int                                `json:"appeared" legend:"base" related:""`                        // appeared
	AssociatedType                  string                             `json:"associatedType" legend:"base" related:""`                  // associated_type
	BirthSeconds72                  int                                `json:"birthSeconds72" legend:"base" related:""`                  // birth_seconds72
	BirthYear                       int                                `json:"birthYear" legend:"base" related:""`                       // birth_year
	BreedId                         int                                `json:"breedId" legend:"base" related:""`                         // breed_id
	Caste                           string                             `json:"caste" legend:"base" related:""`                           // caste
	CurrentIdentityId               int                                `json:"currentIdentityId" legend:"base" related:""`               // current_identity_id
	DeathSeconds72                  int                                `json:"deathSeconds72" legend:"base" related:""`                  // death_seconds72
	DeathYear                       int                                `json:"deathYear" legend:"base" related:""`                       // death_year
	Deity                           bool                               `json:"deity" legend:"base" related:""`                           // deity
	EntPopId                        int                                `json:"entPopId" legend:"base" related:""`                        // ent_pop_id
	EntityFormerPositionLink        []*EntityFormerPositionLink        `json:"entityFormerPositionLink" legend:"base" related:""`        // entity_former_position_link
	EntityFormerSquadLink           []*EntityFormerSquadLink           `json:"entityFormerSquadLink" legend:"base" related:""`           // entity_former_squad_link
	EntityLink                      []*HistoricalFigureEntityLink      `json:"entityLink" legend:"base" related:""`                      // entity_link
	EntityPositionLink              []*EntityPositionLink              `json:"entityPositionLink" legend:"base" related:""`              // entity_position_link
	EntityReputation                []*EntityReputation                `json:"entityReputation" legend:"base" related:""`                // entity_reputation
	EntitySquadLink                 []*EntitySquadLink                 `json:"entitySquadLink" legend:"base" related:""`                 // entity_squad_link
	Force                           bool                               `json:"force" legend:"base" related:""`                           // force
	Ghost                           bool                               `json:"ghost" legend:"base" related:""`                           // ghost
	Goal                            []HistoricalFigureGoal             `json:"goal" legend:"base" related:""`                            // goal
	HfLink                          []*HfLink                          `json:"hfLink" legend:"base" related:""`                          // hf_link
	HfSkill                         []*HfSkill                         `json:"hfSkill" legend:"base" related:""`                         // hf_skill
	HoldsArtifact                   []int                              `json:"holdsArtifact" legend:"base" related:""`                   // holds_artifact
	HonorEntity                     []*HonorEntity                     `json:"honorEntity" legend:"base" related:""`                     // honor_entity
	Id_                             int                                `json:"id" legend:"both" related:""`                              // id
	InteractionKnowledge            []string                           `json:"interactionKnowledge" legend:"base" related:""`            // interaction_knowledge
	IntrigueActor                   []*IntrigueActor                   `json:"intrigueActor" legend:"base" related:""`                   // intrigue_actor
	IntriguePlot                    []*IntriguePlot                    `json:"intriguePlot" legend:"base" related:""`                    // intrigue_plot
	JourneyPet                      []string                           `json:"journeyPet" legend:"base" related:""`                      // journey_pet
	Name_                           string                             `json:"name" legend:"base" related:""`                            // name
	Race                            string                             `json:"race" legend:"both" related:""`                            // race
	RelationshipProfileHfHistorical []*RelationshipProfileHfHistorical `json:"relationshipProfileHfHistorical" legend:"base" related:""` // relationship_profile_hf_historical
	RelationshipProfileHfIdentity   []*RelationshipProfileHfIdentity   `json:"relationshipProfileHfIdentity" legend:"base" related:""`   // relationship_profile_hf_identity
	RelationshipProfileHfVisual     []*RelationshipProfileHfVisual     `json:"relationshipProfileHfVisual" legend:"base" related:""`     // relationship_profile_hf_visual
	Sex                             int                                `json:"sex" legend:"plus" related:""`                             // sex
	SiteLink                        []*SiteLink                        `json:"siteLink" legend:"base" related:""`                        // site_link
	SiteProperty                    []*HistoricalFigureSiteProperty    `json:"siteProperty" legend:"base" related:""`                    // site_property
	Sphere                          []string                           `json:"sphere" legend:"base" related:""`                          // sphere
	UsedIdentityId                  []int                              `json:"usedIdentityId" legend:"base" related:""`                  // used_identity_id
	VagueRelationship               []*VagueRelationship               `json:"vagueRelationship" legend:"base" related:""`               // vague_relationship
	Kills                           []int                              `json:"kills" legend:"add" related:""`                            // Kills
	Leader                          bool                               `json:"leader" legend:"add" related:""`                           // Leader
	Necromancer                     bool                               `json:"necromancer" legend:"add" related:""`                      // Necromancer
	NecromancerSince                int                                `json:"necromancerSince" legend:"add" related:""`                 // NecromancerSince
	Vampire                         bool                               `json:"vampire" legend:"add" related:""`                          // Vampire
	VampireSince                    int                                `json:"vampireSince" legend:"add" related:""`                     // VampireSince
	Werebeast                       bool                               `json:"werebeast" legend:"add" related:""`                        // Werebeast
	WerebeastSince                  int                                `json:"werebeastSince" legend:"add" related:""`                   // WerebeastSince
}
 ***/
export const hfList = [
  {
    "activeInteraction": ["Friendship", "Trade"],
    "adventurer": true,
    "animated": false,
    "animatedString": "Glowing",
    "appeared": 2200,
    "associatedType": "Hero",
    "birthSeconds72": 154321,
    "birthYear": 1985,
    "breedId": 567,
    "caste": "Noble",
    "currentIdentityId": 789,
    "deathSeconds72": 189765,
    "deathYear": 2250,
    "deity": false,
    "entPopId": 890,
    "entityFormerPositionLink": [
      { "position": "Commander", "siteId": 123 },
      { "position": "Diplomat", "siteId": 456 }
    ],
    "entityFormerSquadLink": [
      { "squad": "Elite Guard", "siteId": 123 },
      { "squad": "Exploration Team", "siteId": 789 }
    ],
    "entityLink": [
      { "id": 111, "linkType": "Rival" },
      { "id": 222, "linkType": "Friend" }
    ],
    // ... (ajoutez les autres propriétés selon vos besoins)
    "sex": 1,
    "siteLink": [
      { "siteId": 123, "linkType": "Birthplace" },
      { "siteId": 456, "linkType": "Residence" }
    ],
    "siteProperty": [
      { "siteId": 123, "property": "Fortress" },
      { "siteId": 789, "property": "Library" }
    ],
    "sphere": ["Magic", "War"],
    "usedIdentityId": [456, 789],
    "vagueRelationship": [
      { "relationship": "Unknown", "siteId": 123 },
      { "relationship": "Suspicious", "siteId": 789 }
    ],
    "kills": [111, 222],
    "leader": true,
    "necromancer": false,
    "necromancerSince": 0,
    "vampire": true,
    "vampireSince": 2200,
    "werebeast": true,
    "werebeastSince": 2250
  }, {
  "activeInteraction": ["Battle", "Negotiation"],
  "adventurer": false,
  "animated": true,
  "animatedString": "Phasing",
  "appeared": 2300,
  "associatedType": "Villain",
  "birthSeconds72": 200000,
  "birthYear": 1990,
  "breedId": 678,
  "caste": "Commoner",
  "currentIdentityId": 890,
  "deathSeconds72": 250000,
  "deathYear": 2350,
  "deity": true,
  "entPopId": 901,
  "entityFormerPositionLink": [
    { "position": "Spy", "siteId": 234 },
    { "position": "Assassin", "siteId": 567 }
  ],
  "entityFormerSquadLink": [
    { "squad": "Secret Agents", "siteId": 234 },
    { "squad": "Dark Brotherhood", "siteId": 890 }
  ],
  "entityLink": [
    { "id": 333, "linkType": "Rival" },
    { "id": 444, "linkType": "Enemy" }
  ],
  // ... (ajoutez les autres propriétés selon vos besoins)
  "sex": 0,
  "siteLink": [
    { "siteId": 234, "linkType": "Birthplace" },
    { "siteId": 567, "linkType": "Hideout" }
  ],
  "siteProperty": [
    { "siteId": 234, "property": "Temple" },
    { "siteId": 890, "property": "Underground Lair" }
  ],
  "sphere": ["Dark Magic", "Intrigue"],
  "usedIdentityId": [567, 890],
  "vagueRelationship": [
    { "relationship": "Alliance", "siteId": 234 },
    { "relationship": "Unknown", "siteId": 890 }
  ],
  "kills": [333, 444],
  "leader": false,
  "necromancer": true,
  "necromancerSince": 2320,
  "vampire": false,
  "vampireSince": 0,
  "werebeast": false,
  "werebeastSince": 0
}
  ];
  
  /***type Region struct {
	Coords   string         `json:"coords" legend:"plus" related:""`   // coords
	Evilness RegionEvilness `json:"evilness" legend:"plus" related:""` // evilness
	ForceId  int            `json:"forceId" legend:"plus" related:""`  // force_id
	Id_      int            `json:"id" legend:"both" related:""`       // id
	Name_    string         `json:"name" legend:"base" related:""`     // name
	Type_    RegionType     `json:"type" legend:"base" related:""`     // type
} ***/


  export const regionList = [
    { coords : "122,4|122,5|122,6|123,4|", Name_ : "the steppe of births", Type_ : "Grassland", Id_ : "1", ForceId : 2, Evilness : "neutral"},
    { coords : "7,5|", Name_ : "the pleated dunes", Type_ : "Desert", Id_ : "2", ForceId : 3, Evilness : "evil"},
    { coords : "76,5|76,6|77,5|78,4|78,5|78,6|79,3|79,4|79,5|80,3|80,4|80,5|81,2|81,3|81,4|81,5|81,6|82,2|82,3|82,4|82,5|83,2|83,3|83,4|83,5|83,6|84,3|84,4|84,5|84,6|84,7|85,2|85,3|85,4|85,5|86,5|86,6|86,7|", Name_ : "the yellow hills", Type_ : "Hills", Id_ : "2", ForceId : 3, Evilness : "evil"}
  ];
  

  /***
type Site struct {
	CivId          int                       `json:"civId" legend:"plus" related:""`          // civ_id
	Coords         string                    `json:"coords" legend:"base" related:""`         // coords
	CurOwnerId     int                       `json:"curOwnerId" legend:"plus" related:""`     // cur_owner_id
	Id_            int                       `json:"id" legend:"both" related:""`             // id
	Name_          string                    `json:"name" legend:"base" related:""`           // name
	Rectangle      string                    `json:"rectangle" legend:"base" related:""`      // rectangle
	SiteProperties map[int]*SiteSiteProperty `json:"siteProperties" legend:"base" related:""` // site_properties
	Structures     map[int]*Structure        `json:"structures" legend:"both" related:""`     // structures
	Type_          SiteType                  `json:"type" legend:"base" related:""`           // type
	Owner          int                       `json:"owner" legend:"add" related:""`           // Owner
	Ruin           bool                      `json:"ruin" legend:"add" related:""`            // Ruin
} ***/

  export const siteList = [
    { Id_: 1, CivId : 4, Coords : "7,5|4,5", curOwnerId : 45, Id_ :3, Name_: "the goldorak ruins", Rectangle : "162,1591:164,1593", SiteProperties:[], Structures : [6,7], Type_:"Cave", Owner :"67", Ruin : false},
    { Id_: 2, CivId : 5, Coords : "115,118", curOwnerId : 21, Id_ :2, Name_: "the dour depths", Rectangle : "1293,183:1295,185", SiteProperties:[], Structures : [6,7], Type_:"Cave", Owner :"32", Ruin : false},
    { Id_: 3, CivId : 2, Coords : "80,11", curOwnerId : 4, Id_ :1, Name_: "the deified scar", Rectangle : "1847,1901:1849,1903", SiteProperties: [], Structures : [6,7], Type_:"Cave", Owner :"25", Ruin : true},
  ];

  /*** type Structure struct {
	CopiedArtifactId []int            `json:"copiedArtifactId" legend:"base" related:""` // copied_artifact_id
	Deity            int              `json:"deity" legend:"plus" related:""`            // deity
	DeityType        int              `json:"deityType" legend:"plus" related:""`        // deity_type
	DungeonType      int              `json:"dungeonType" legend:"plus" related:""`      // dungeon_type
	EntityId         int              `json:"entityId" legend:"base" related:""`         // entity_id
	Id_              int              `json:"id" legend:"plus" related:""`               // id
	Inhabitant       []int            `json:"inhabitant" legend:"plus" related:""`       // inhabitant
	LocalId          int              `json:"localId" legend:"base" related:""`          // local_id
	Name_            string           `json:"name" legend:"both" related:""`             // name
	Name2            string           `json:"name2" legend:"plus" related:""`            // name2
	Religion         int              `json:"religion" legend:"plus" related:""`         // religion
	Subtype          StructureSubtype `json:"subtype" legend:"base" related:""`          // subtype
	Type_            StructureType    `json:"type" legend:"both" related:""`             // type
	WorshipHfid      int              `json:"worshipHfid" legend:"base" related:""`      // worship_hfid
	Ruin             bool             `json:"ruin" legend:"add" related:""`              // Ruin
	SiteId           int              `json:"siteId" legend:"add" related:""`            // SiteId
} ***/
  
  export const structureList = [
    { Id_: 6, Religion :2, Deity: 4, Inhabitant : [3,4], Name_ : "Temple of Vory",DungeonType:-1, Name2: "Temple of Vovory",Type_: "temple",Subtype :"catacombs",Ruin: false, SiteId : 1, WorshipHfid: 3, EntityId:5, LocalId_:1 },
    { Id_: 7, Religion :-1, Deity: -1, Inhabitant : [3,4], Name_ : "Dungeo of Death" ,DungeonType:1, Name2: "Dungeon death Hardcore",Type_: "dungeon",Subtype :"catacombs",Ruin: false, SiteId : 2, WorshipHfid: 2, EntityId:6, LocalId_:2 },
  ];
