import React, { useEffect, useState } from "react";
import {getHistoricalFiguresList} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";
import HistoricalFigureListItem from "./HistoricalFigureListItem";

function HistoricalFiguresList () {
    const { pagination } = useParams()
    const [HistoricalFiguresList, setHistoricalFiguresList] = useState([])  
    useEffect(()=> {
        getHistoricalFiguresList(setHistoricalFiguresList, pagination);
    }, [pagination])
    return (<div>
        <div className={"hf-page-title"}>Personnages historiques</div>
        <ul>
            {HistoricalFiguresList.map((hf) => {
                if(hf == null) return;
                return (
                    <Link to={"/historical_figure/"+hf.id.toString()}><li key={hf.id}> <HistoricalFigureListItem historicalFigure={hf}/></li></Link>
                )
            })}
        </ul>
        {parseInt(pagination) >1 ? <Link to={"/historical_figures/page/"+(parseInt(pagination)-1).toString()}> Page Précédente </Link>: null}
        <Link to={"/historical_figures/page/"+(parseInt(pagination)+1).toString()}> Page Suivante </Link>
    </div>)

}

export default HistoricalFiguresList;