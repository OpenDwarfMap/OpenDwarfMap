import React from "react";

export default function TwoBlockCard({ firstBlock, title, content }) {
    return (
        <div className={"event-card"}>
            <div className={"period"}>
                {firstBlock}
            </div>
            <div className={"infos"}>
                <span className={"type"}>{title}</span>
                {content}
            </div>
        </div>
    )
}