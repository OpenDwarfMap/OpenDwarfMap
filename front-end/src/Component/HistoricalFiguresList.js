import React, { useEffect, useState } from "react";
import {getHistoricalFiguresList} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";

function HistoricalFiguresList () {
    const { pagination } = useParams()
    const [HistoricalFiguresList, setHistoricalFiguresList] = useState([])  
    useEffect(()=> {
        getHistoricalFiguresList(setHistoricalFiguresList, pagination);
    }, [pagination])
    return (<div>
        <ul>
            {HistoricalFiguresList.map((hf) => {
                return (
                    <Link to={"/historical_figure/"+hf.id.toString()}><li key={hf.id}> {hf.name} </li></Link>
                )
            })}
        </ul>
        {parseInt(pagination) >1 ? <Link to={"/historical_figures/page/"+(parseInt(pagination)-1).toString()}> Page Précédente </Link>: null}
        <Link to={"/historical_figures/page/"+(parseInt(pagination)+1).toString()}> Page Suivante </Link>
    </div>)

}

export default HistoricalFiguresList;