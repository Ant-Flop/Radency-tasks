import './App.css';
import React from "react";
import Table from "./components/Table/Table";
import CreateButton from "./components/CreateButton/CreateButton";
import eventEyeImage from "./img/open-eye.png"


function App(props) {
    const hideTable = (typeTable) => {
        const table = document.getElementsByClassName(typeTable)[0];
        console.log(table)
	    table.hidden ? table.hidden = false : table.hidden = true;
    }

    return (
        <div className={"wrapper"}>
            <div className="header">
			    <div className="logo">Note App</div>
		    </div>
            <div className="main">
            <div className="table-content">
				<div className="name-table">
					<img src={eventEyeImage} alt="hide" className="show-hide" onClick={hideTable.bind(this, 'active-table')}/>
					<span>Active table</span>
				</div>
				<div className="active-table">
                <Table thead={props.state.headTable} tbody={props.state.stateActiveTable} dispatch={props.dispatch}/>
                <CreateButton tbody={props.state.stateActiveTable} dispatch={props.dispatch}/>
				</div>
			</div>
			<div className="table-content">
				<div className="name-table">
					<img src={eventEyeImage} alt="hide" className="show-hide" onClick={hideTable.bind(this, 'summary-table')}/>
					<span>Summary table</span>
				</div>
				<div className="summary-table">
                <Table thead={props.state.headSummaryTable} tbody={props.state.stateSummaryTable}/>
				</div>
			</div>
			<div className="table-content">
				<div className="name-table">
					<img src={eventEyeImage} alt="hide" className="show-hide" onClick={hideTable.bind(this, 'archive-table')}/>
					<span>Archive table</span>
				</div>
				<div className="archive-table">
                <Table thead={props.state.headTable} tbody={props.state.stateArchiveTable} activeTable={props.state.stateActiveTable} dispatch={props.dispatch}/>
				</div>
			</div>
            </div>
        </div>
    );
}

export default App;
