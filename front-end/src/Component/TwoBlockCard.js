import React from "react";

export default function TwoBlockCard({ firstBlock, title, content, infos }) {
    return (
        <div className={"event-card"}>
            <div className={"period"}  title={JSON.stringify(infos).length < 500 ? JSON.stringify(infos, null, 2) : JSON.stringify(infos)}>
                {firstBlock}
            </div>
            <div className={"infos"}>
                <span className={"type"}>{title}</span>
                {content}
            </div>
        </div>
    )
}