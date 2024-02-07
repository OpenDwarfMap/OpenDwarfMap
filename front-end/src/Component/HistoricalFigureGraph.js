import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';


const familyLinkTypes = ["child", "father", "mother", "spouse", "former spouse"];

function HistoricalFigureGraph({ historicalFiguresDetail }){

    let familyLink = historicalFiguresDetail.hf_link ?
        historicalFiguresDetail.hf_link
            .filter((entityData) => familyLinkTypes.includes(entityData.link_type))
            .map((entityData)=> {
            return {
                key: entityData.hfid.toString(),
                name: entityData.name + "\n\n (" + entityData.link_type + ")",
                link_type: entityData.link_type,
                parent: entityData.link_type === "child" ? historicalFiguresDetail.id : NaN,
                gender: entityData.link_type === "mother"
                    ? "F"
                    : entityData.link_type === "father"
                        ? "M"
                        : "U",
                entity_infos: entityData
            };
        }) : [];

    familyLink.unshift({
        key: historicalFiguresDetail.id,
        name: historicalFiguresDetail.name,
        link_type: "parent",
        // filter on mother or father
        parent: familyLink.find((entityData) => entityData.link_type === "father" || entityData.link_type === "mother")
            ? familyLink.find((entityData) => entityData.link_type === "father" || entityData.link_type === "mother").key
            : NaN,
        gender: historicalFiguresDetail.sex === 1 ? "M"
            : historicalFiguresDetail.sex === 0 ? "F"
            : "U",
        entity_infos: historicalFiguresDetail
    })

    console.log(familyLink)

    return <div>
        <ul>
            {familyLink.name}
        </ul>
        <ReactDiagram
            initDiagram={initDiagram}
            divClassName='diagram-component'
            nodeDataArray={familyLink}
            onModelChange={handleModelChange}
        />
    </div>
}


// get tooltip text from the object's data
function tooltipTextConverter(person) {
    var str = "";
    str += "Born: " + person.birthYear;
    if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
    if (person.reign !== undefined) str += "\nReign: " + person.reign;
    return str;
}

function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram =
    $(go.Diagram,
      {
        "toolManager.hoverDelay": 100,  // 100 milliseconds instead of the default 850
        allowCopy: false,
        layout:  // create a TreeLayout for the family tree
          $(go.TreeLayout,
            { angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform })
      });

  var bluegrad = '#90CAF9';
  var pinkgrad = '#F48FB1';

  // define Converters to be used for Bindings
    function genderBrushConverter(gender) {
        if (gender === "M") return bluegrad;
        if (gender === "F") return pinkgrad;
        return "orange";
    }

  // define tooltips for nodes
  var tooltiptemplate =
    $("ToolTip",
      { "Border.fill": "whitesmoke", "Border.stroke": "black" },
      $(go.TextBlock,
        {
          font: "bold 8pt Helvetica, bold Arial, sans-serif",
          wrap: go.TextBlock.WrapFit,
          margin: 5
        },
        new go.Binding("text", "", tooltipTextConverter))
    );

  // define a simple Node template
  // diagram.add(
  //   $(go.Part, "Table",
  //     { position: new go.Point(300, 10), selectable: false },
      // $(go.TextBlock, "Key",
      //   { row: 0, font: "700 14px Droid Serif, sans-serif" }),  // end row 0
      // $(go.Panel, "Horizontal",
      //   { row: 1, alignment: go.Spot.Left },
      //   $(go.Shape, "Rectangle",
      //     { desiredSize: new go.Size(30, 30), fill: bluegrad, margin: 5 }),
      //   $(go.TextBlock, "Males",
      //     { font: "700 13px Droid Serif, sans-serif" })
      // ),  // end row 1
      // $(go.Panel, "Horizontal",
      //   { row: 2, alignment: go.Spot.Left },
      //   $(go.Shape, "Rectangle",
      //     { desiredSize: new go.Size(30, 30), fill: pinkgrad, margin: 5 }),
      //   $(go.TextBlock, "Females",
      //     { font: "700 13px Droid Serif, sans-serif" })
      // )  // end row 2
    // ));

  diagram.nodeTemplate =
    $(go.Node, "Auto",
      { deletable: false, toolTip: tooltiptemplate },
      new go.Binding("text", "name"),
      $(go.Shape, "Rectangle",
        {
          fill: "lightgray",
          stroke: null, strokeWidth: 0,
          stretch: go.GraphObject.Fill,
          alignment: go.Spot.Center
        },
        new go.Binding("fill", "gender", genderBrushConverter)),
      $(go.TextBlock,
        {
          font: "700 12px Droid Serif, sans-serif",
          textAlign: "center",
          margin: 10, maxSize: new go.Size(80, NaN)
        },
        new go.Binding("text", "name"))
    );

  diagram.linkTemplate =
    $(go.Link,  // the whole link panel
      { routing: go.Link.Orthogonal, corner: 5, selectable: false },
      $(go.Shape, { strokeWidth: 3, stroke: '#424242' }));  // the gray link shape

  var nodeDataArray = [

      ];

  diagram.model = new go.TreeModel(nodeDataArray);

  return diagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is discussed below.
 */
function handleModelChange(changes) {
  // alert('GoJS model changed!');
}

export default HistoricalFigureGraph;