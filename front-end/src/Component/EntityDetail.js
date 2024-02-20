import React, { useEffect, useState } from "react";
import {getCategoryData} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";

function EventDetail () {
    const { id } = useParams()
    const [EntityDetail, setEntityDetail] = useState(false)  
    useEffect(()=> {
        getCategoryData(setEntityDetail, "entity", id);
    }, []);

    return null;
}

export default EventDetail;