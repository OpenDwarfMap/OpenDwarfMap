import React from "react";
import {Link} from "react-router-dom";

export default function EventCard({ eventCollection }) {
    return (
        <Link className={"event-card"} to={"/event_collection/" + eventCollection.id.toString()}>
            <div className={"period"}>
                {eventCollection.start_year == eventCollection.end_year ? eventCollection.start_year : eventCollection.start_year - eventCollection.end_year }
            </div>
            <div className={"infos"}>
                <span  title={JSON.stringify(eventCollection).length < 500 ? JSON.stringify(eventCollection, null, 2) : JSON.stringify(eventCollection)}  className={"type"}>{ eventCollection.type }</span>
                {eventCollection.site_id ?
                    <Link to={"/site/"+eventCollection.site_id[0].toString()}>
                        <span style={{textDecoration: "underline"}}>{eventCollection.site_id[1]}</span>
                    </Link> : null}
            </div>
        </Link>
    )
}