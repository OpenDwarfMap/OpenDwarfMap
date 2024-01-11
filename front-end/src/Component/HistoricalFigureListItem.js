import React from "react";

export default function HistoricalFigureListItem({historicalFigure}) {
    return (
        <div className={"hf_list_item"}>
            <div className={"name"}>{historicalFigure.name}</div>
            <div>{historicalFigure.race}</div>
            <div>vécu de {historicalFigure.birth_year} à {historicalFigure.death_year === -1 ? "Never" : historicalFigure.death_year}</div>
        </div>
    )
}