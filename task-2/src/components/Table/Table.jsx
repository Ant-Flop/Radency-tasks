import React from "react";
import THead from "./THead/THead";
import TBody from "./TBody/TBody";

const Table = (props) => {
    return (
        <table>
            <THead thead={props.thead}/>
            <TBody tbody={props.tbody}
                   activeTable={props.activeTable}
                   dispatch={props.dispatch}/>
        </table>
    )
}

export default Table;