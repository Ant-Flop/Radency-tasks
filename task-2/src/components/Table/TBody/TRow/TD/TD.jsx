import React, {useState} from "react";
import "./TD.css"
import {updateNoteAction, getAllCategories} from "../../../../../redux/state";

const TD = (props) => {
    const [category] = useState(getAllCategories());


    if (props.editMode !== undefined && props.editMode === true) {
        let updateCell = React.createRef();
        let onCellChange = () => {
            let text = updateCell.current.value;
            props.dispatch(updateNoteAction(text, props.id, props.editKey))
        }

        if (props.editKey === 'name' || props.editKey === 'content')
            return (
                <td key={props.index}><input onChange={onCellChange} ref={updateCell} value={props.value}/></td>
            );
        else if (props.editKey === 'category') {
            const addCategory = category.map(addCategory => addCategory);
            return (
                <td key={props.index}>
                    <select onChange={onCellChange} ref={updateCell} value={props.value}>
                        {
                            addCategory.map((value, key) => <option key={key} value={value}>{value}</option>)
                        }
                    </select>
                </td>
            );
        }
        else if (props.editKey === 'dates') {
            return (
                <td key={props.index}><input
                   type="date" onChange={onCellChange} ref={updateCell} value={props.value}/></td>
            );
        }
    }

    return (
        <td key={props.index}>{props.value}</td>
    );
}

export default TD;