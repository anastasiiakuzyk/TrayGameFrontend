import React, {ReactElement} from "react";

export default function Preloader(): ReactElement {
    return (
        <div className="preloader">
            <div className="spin first"/>
            <div className="spin second"/>
            <div className="spin third"/>
        </div>
    );
}