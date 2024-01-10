import React, { useEffect, useState } from "react";
import {getHistoricalFiguresList} from '../utils/API.js';

function HistoricalFiguresList () {
    const [HistoricalFiguresList, setHistoricalFiguresList] = useState()  
    useEffect(()=> {
        getHistoricalFiguresList(setHistoricalFiguresList);
    }, [])
    return (<div>
        
    </div>)

}

export default HistoricalFiguresList;