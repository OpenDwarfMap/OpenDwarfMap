import React, { useEffect, useState } from "react";
import {getHistoricalFiguresList} from '../utils/API.js';

function HistoricalFiguresDetail () {
    const [HistoricalFiguresDetail, setHistoricalFiguresDetail] = useState()  
    useEffect(()=> {
        getHistoricalFiguresList(setHistoricalFiguresDetail);
    }, [])
    return (<div>
        
    </div>)

}

export default HistoricalFiguresDetail;