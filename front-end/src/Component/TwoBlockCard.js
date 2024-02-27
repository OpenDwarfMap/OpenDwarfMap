import React from "react";

export default function TwoBlockCard({ firstBlock, title, content }) {
    console.log(firstBlock);
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