import React from "react";
import TRow from "./TRow/TRow";


const THead = (props) => {

    return (
        <thead>
        <TRow key={props.thead} row={props.thead}/>
        </thead>
    )
}

export default THead;