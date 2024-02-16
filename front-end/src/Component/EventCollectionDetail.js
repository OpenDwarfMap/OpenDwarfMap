import React, { useEffect, useState } from "react";
import {getCategoryDataDetail} from '../utils/API.js';
import { useParams, Link } from "react-router-dom";

function EventCollectionDetail () {
    const { id } = useParams()
    const [EventCollectionData, setEventCollectionData] = useState(false)  
    useEffect(()=> {
        getCategoryDataDetail(setEventCollectionData, "historical_event_collection", id);
    }, []);
    console.log(EventCollectionData);
    return null;
}

export default EventCollectionDetail;