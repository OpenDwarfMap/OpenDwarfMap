import React from "react";

export default function SkillCard({name, proficiency}) {
    return (
        <div className={"skill-card"}>
            <span className={"skill"}>{ name }</span>
            <span className={"ip"}>{ proficiency }</span>
        </div>
    );
}