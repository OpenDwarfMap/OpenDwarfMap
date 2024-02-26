import React from "react";
import {Link} from "react-router-dom";

export default function EventCard({ eventCollection}) {
    return (
        <div className={"event-card"}>
            <div className={"period"}>
                {eventCollection.start_year} - {eventCollection.end_year}
            </div>
            <div className={"infos"}>
                <span className={"type"}>{ eventCollection.type }</span>
                {eventCollection.site_id ?
                    <Link to={"/site/"+eventCollection.site_id[0].toString()}>
                        <span style={{textDecoration: "underline"}}>{eventCollection.site_id[1]}</span>
                    </Link> : null}
            </div>
        </div>
    )
}