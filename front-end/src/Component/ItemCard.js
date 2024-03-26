import React from "react";

export default function ItemCard({elementLeft, elementRight}) {
    return (
        <div className={"item-card"}>
            <span className={"element-left"}>{elementLeft}</span>
            <span className={"element-right"}>{elementRight}</span>
        </div>
    );
}