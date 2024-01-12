import React from 'react';
import {Link, Outlet} from "react-router-dom";

export default function RootScreen() {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="sidebar">
                <h1>OpenDwarfMap</h1>
                <button className="navigation-item">
                    <Link to={"/"}>Carte</Link>
                </button>
                <button className="navigation-item">
                    <Link to={"/"}>Histoire</Link>
                </button>
                <button className="navigation-item">
                    <Link to={"/historical_figures/page/1"}>Personnages</Link>
                </button>
            </div>
            <div style={{flex: 1, padding: "0 16px"}}>
                <Outlet/>
            </div>
        </div>
    )
}