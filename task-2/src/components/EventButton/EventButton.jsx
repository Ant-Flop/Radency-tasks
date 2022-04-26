import React from "react";
import eventEditImage from "../../img/edit.png"
import eventArchiveImage from "../../img/archive.png"
import eventUnzipImage from "../../img/unzip.png"
import eventDeleteImage from "../../img/delete.png"
import eventSaveImage from "../../img/save.png"
import eventCancelImage from "../../img/cancel.png"
import {
    archiveNoteAction,
    cancelNoteAction,
    deleteNoteAction,
    editNoteAction,
    saveNoteAction,
    unzipNoteAction
} from "../../redux/state";


const EventButton = (props) => {
    let eventImgPath;
    let eventAction;
    if (props.event === 'edit') {
        eventImgPath = eventEditImage;
        eventAction = () => {
            props.dispatch(editNoteAction(), props.id, props.tbody);
        }
    }
    if (props.event === 'archive') {
        eventImgPath = eventArchiveImage;
        eventAction = () => {
            props.dispatch(archiveNoteAction(), props.id, props.tbody)
            props.dispatch(deleteNoteAction(), props.id, props.tbody)
        }
    }
    if (props.event === 'unzip') {
        eventImgPath = eventUnzipImage;
        eventAction = () => {
            props.dispatch(unzipNoteAction(), props.id, props.tbody)
            props.dispatch(deleteNoteAction(), props.id, props.tbody)
        }
    }
    if (props.event === 'delete') {
        eventImgPath = eventDeleteImage;
        eventAction = () => {
            props.dispatch(deleteNoteAction(), props.id, props.tbody)
        }
    }
    if (props.event === 'save') {
        eventImgPath = eventSaveImage;
        eventAction = () => {
            props.dispatch(saveNoteAction(), props.id, props.tbody)
        }
    }
    if (props.event === 'cancel') {
        eventImgPath = eventCancelImage;
        eventAction = () => {
            props.dispatch(cancelNoteAction(), props.id, props.tbody)
        }
    }
    let bool = false;
    let elem = null;

    for (let i = 0; i < props.tbody.length; i++) {
        if (props.tbody[i]['editMode'] === true) {
            bool = true;
            elem = props.tbody[i];
            break;
        }
    }

    if (bool === true) {
        if (elem['id'] === props.id) {
            return (
                <button onClick={eventAction} disabled={false}><img src={eventImgPath} alt={props.event}/></button>
            )
        } else {
            return (
                <button onClick={eventAction} disabled={true}><img src={eventImgPath} alt={props.event}/></button>
            )
        }
    } else {
        return (
            <button onClick={eventAction} disabled={false}><img src={eventImgPath} alt={props.event}/></button>
        )
    }

}

export default EventButton;