import React from "react";
import TH from "./TH/TH";

const TRow = (props) => {

    let headCells = [];
    for (let i = 0; i < props.row.length; i++) {
        headCells.push(<TH key={props.row[i]} value={props.row[i]}/>);
    }

    return (
        <tr key={props.row}>{headCells}</tr>
    )
}

export default TRow;