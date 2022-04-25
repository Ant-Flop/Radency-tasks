let hideTable = (typeTable) => {
	const table = document.getElementsByClassName(typeTable)[0];
	table.hidden ? table.hidden = false : table.hidden = true;
}