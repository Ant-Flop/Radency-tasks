import React from "react";
import TD from "./TD/TD";
import EventButton from "../../../EventButton/EventButton";

const TRow = (props) => {
    function TRow(cell, i) {
        let index = i;
        let row = [];
        for (let key in cell) {
            if (key !== 'id' && key !== 'editMode')
                if (key === 'events') {
                    let eventButtons = [];
                    for (let i = 0; i < cell[key].length; i++) {
                        eventButtons.push(<EventButton key={cell[key][i]}
                                                       event={cell[key][i]}
                                                       dispatch={props.dispatch}
                                                       tbody={props.tbody}
                                                       id={props.id}
                                                       activeTable={props.activeTable}
                        />)
                    }
                    row.push(<TD key={index} index={index}
                                 value={eventButtons}/>);
                } else
                    row.push(<TD key={index} index={index}
                                 value={cell[key]}
                                 id={props.id}
                                 editKey={key}
                                 editMode={cell['editMode']}
                                 dispatch={props.dispatch}/>);
            index++;
        }
        return row;
    }

    return (
        <tr key={props.value}>{TRow(props.value, props.index)}</tr>
    );
}

export default TRow;