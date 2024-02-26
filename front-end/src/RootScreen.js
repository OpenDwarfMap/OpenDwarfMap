import React from 'react';
import {Link, Outlet} from "react-router-dom";

export default function RootScreen() {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="sidebar">
                <h1>OpenDwarfMap</h1>
                <Link to={"/"} className="navigation-item">
                    Carte
                </Link>
                <Link to={"/"} className="navigation-item">
                    Histoire
                </Link>
                <Link to={"/historical_figures/page/1"} className="navigation-item">
                    Personnages
                </Link>
            </div>
            <div style={{flex: 1, display: "flex", alignItems: "stretch"}}>
                <Outlet/>
            </div>
        </div>
    )
}