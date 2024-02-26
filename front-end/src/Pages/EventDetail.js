import React, { useEffect, useState } from "react";
import {getCategoryData} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";

function EventDetail () {
    const { id } = useParams()
    const [EventCollectionData, setEventCollectionData] = useState(false)  
    useEffect(()=> {
        getCategoryData(setEventCollectionData, "historical_event_collection", id);
    }, []);

    return null;
}

export default EventDetail;