import React from "react";
import {createNoteAction} from "../../redux/state";


const CreateButton = (props) => {
    let eventAction = () => {
        props.dispatch(createNoteAction(), null, props.tbody);
    }
    let editMode = () => {
        for (let i = 0; i < props.tbody.length; i++) {
            if (props.tbody[i].editMode === true) {
                return true;
            }
        }
        return false;
    }

    return (
        <button id={'create_note'} onClick={eventAction} disabled={editMode()}>Create note</button>
    )


}

export default CreateButton;