import React from "react";
import TRow from "./TRow/TRow";

const TBody = (props) => {
    let bodyCells = [];

    for (let i = 0; i < props.tbody.length; i++) {
        bodyCells.push(<TRow key={i} index={i}
                             value={props.tbody[i]}
                             dispatch={props.dispatch}
                             tbody={props.tbody}
                             id={props.tbody[i].id}
                             activeTable={props.activeTable}/>);
    }

    return (
        <tbody>
        {bodyCells}
        </tbody>
    );
}

export default TBody;