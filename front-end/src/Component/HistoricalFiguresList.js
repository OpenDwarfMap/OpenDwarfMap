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
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            {parseInt(pagination) > 1 ?
                <Link to={"/historical_figures/page/" + (parseInt(pagination) - 1).toString()} className={"hf-page-nav-btn"}> Page
                    Précédente </Link> :
                <Link to={"/historical_figures/page/4471"} className={"hf-page-nav-btn"}> Dernière Page </Link>
            }
            <div style={{color: "white"}}>page {pagination}</div>
            {parseInt(pagination) >= 4471 ?
                <Link to={"/historical_figures/page/1"} className={"hf-page-nav-btn"}> Première Page </Link> :
                <Link to={"/historical_figures/page/" + (parseInt(pagination) + 1).toString()} className={"hf-page-nav-btn"}> Page Suivante </Link>}
        </div>
        <ul>
            {HistoricalFiguresList.map((hf) => {
                if (hf == null) return;
                return (
                    <Link to={"/historical_figure/" + hf.id.toString()}>
                        <li key={hf.id}><HistoricalFigureListItem historicalFigure={hf}/></li>
                    </Link>
                )
            })}
        </ul>
    </div>)

}

export default HistoricalFiguresList;