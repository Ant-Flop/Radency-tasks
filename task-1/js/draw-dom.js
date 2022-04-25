import {store} from './state.js';
import {events} from "./events.js";


//методы отрисовки
export let draw = {
    // метод отрисовки шапки таблицы
    DrawHeadTable($table, arrHead) {
        const $headTable = document.createElement('tbody');
        for (let i = 0; i < arrHead.length; i++) {
            const $cell = document.createElement('th');
            $cell.innerHTML = arrHead[i];
            $headTable.appendChild($cell);
            $table.appendChild($headTable);
        }
    },

    // метод отрисовки активной таблицы
    DrawActiveTable() {
        events.Sort(store.getStateActiveTable());
        const $activeTable = document.querySelector('.active-table table');
        let arrHead = store.getHeadTable();
        this.DrawHeadTable($activeTable, arrHead);
        this.DrawMainPartActiveTable($activeTable);

    },

    // метод отрисовки активной таблицы(контент)
    DrawMainPartActiveTable($activeTable) {
        let n = store.getStateActiveTable().length;
        for (let i = 0; i < n; i++) {
            const $row = document.createElement('tbody');
            $row.id = 'active-' + (i + 1);
            const $event_cell = document.createElement('td');
            let arrElemState = store.getStateActiveTable()[i];
            for (let key in arrElemState) {
                if (key !== 'id') {
                    const $cell = document.createElement('td');
                    $cell.innerHTML = arrElemState[key];
                    $row.appendChild($cell);
                    $activeTable.appendChild($row);
                } else {
                    this.DrawEventButtons($event_cell, 'edit-' + arrElemState[key], arrElemState[key], 'img/edit.png', events.EditNote.bind(events));
                    this.DrawEventButtons($event_cell, 'archive-' + arrElemState[key], arrElemState[key], 'img/archive.png', events.ArchiveNote.bind(events));
                    this.DrawEventButtons($event_cell, 'delete-' + arrElemState[key], arrElemState[key], 'img/delete.png', events.DeleteNote.bind(events));
                }
            }
            $row.appendChild($event_cell);
            $activeTable.appendChild($row);
        }
    },

    // метод отрисовки суммарной таблицы
    DrawSummaryTable() {
        const $summaryTable = document.querySelector('.summary-table table');
        let arrHead = store.getHeadSummaryTable();
        this.DrawHeadTable($summaryTable, arrHead);
        this.DrawMainPartSummaryTable($summaryTable);
    },

    // метод отрисовки суммарной таблицы(контент)
    DrawMainPartSummaryTable($summaryTable) {
        store.formStateSummaryTable();
        let n = store.getStateSummaryTable().length;
        for (let i = 0; i < n; i++) {
            const $row = document.createElement('tbody');
            $row.id = 'summary-' + (i + 1);
            let arrElemState = store.getStateSummaryTable()[i];
            for (let key in arrElemState) {
                const $cell = document.createElement('td');
                $cell.innerHTML = arrElemState[key];
                $row.appendChild($cell);
                $summaryTable.appendChild($row);
            }
        }
    },

    // метод отрисовки архивной таблицы
    DrawArchiveTable() {
        events.Sort(store.getStateArchiveTable());
        const $archiveTable = document.querySelector('.archive-table table');
        let arrHead = store.getHeadTable();
        this.DrawHeadTable($archiveTable, arrHead);
        this.DrawMainPartArchiveTable($archiveTable);
    },

    // метод отрисовки архивной таблицы(контент)
    DrawMainPartArchiveTable($archiveTable) {
        let n = store.getStateArchiveTable().length;
        for (let i = 0; i < n; i++) {
            const $row = document.createElement('tbody');
            $row.id = 'archive-' + (i + 1);
            const $event_cell = document.createElement('td');
            let arrElemState = store.getStateArchiveTable()[i];
            for (let key in arrElemState) {
                if(key !== 'id') {
                    const $cell = document.createElement('td');
                    $cell.innerHTML = arrElemState[key];
                    $row.appendChild($cell);
                    $archiveTable.appendChild($row);
                } else {
                    this.DrawEventButtons($event_cell, 'edit-' + arrElemState[key], arrElemState[key], 'img/unarchive.png', events.UnArchiveNote.bind(events));
                }
            }
            $row.appendChild($event_cell);
            $archiveTable.appendChild($row);
        }
    },

    // метод отрисовки основных трех кнопок редактировать/архивировать/удалить
    DrawEventButtons($event, idButton, idState, src, callback) {
        const $button = document.createElement('button');
        const $img = document.createElement('img');
        $button.id = idButton;
        $img.src = src;
        $img.alt = src;
        $button.addEventListener('click', () => callback(idState));
        $button.appendChild($img);
        $event.appendChild($button);
    },

    // метод скрытия/отображения основных трех кнопок редактировать/архивировать/удалить
    HideMainButtons(bool, id) {
        const editButton = document.querySelector('#edit-' + id);
        editButton.hidden = bool + '';
        const archiveButton = document.querySelector('#archive-' + id);
        archiveButton.hidden = bool + '';
        const deleteButton = document.querySelector('#delete-' + id);
        deleteButton.hidden = bool + '';
    },

    // метод отрисовки кнопок сохранить/отмена во время реадктирования
    DrawSubEventButtons(parent, id) {
        const $saveButton = document.createElement('button');
        const $imgSaveButton = document.createElement('img');
        $imgSaveButton.src = 'img/save.png';
        $saveButton.id = 'save-' + id;
        $saveButton.appendChild($imgSaveButton);
        $saveButton.addEventListener('click', () => events.SaveNote(id));
        parent.append($saveButton);
        const $cancelButton = document.createElement('button');
        const $imgCancelButton = document.createElement('img');
        $imgCancelButton.src = 'img/cancel.png';
        $cancelButton.id = 'cancel-' + id;
        $cancelButton.appendChild($imgCancelButton);
        $cancelButton.addEventListener('click', () => events.CancelNote(id))
        parent.append($cancelButton);
    },

    // метод отрисовки полей редактирования
    DrawInputEditFields(id) {
        const childButton = document.querySelector('#edit-' + id);
        let parent;
        for(parent = childButton.parentNode; ;){
            if(parent.nodeName === 'TBODY')
                break;
            else parent = parent.parentNode;
        }
        for(let i = 0; i < parent.childNodes.length - 1; i++) {
            if(i === 1) continue;
            if(i === 2) {
                const $select = document.createElement('select');
                for(let j = 0; j < store.getCategories().length; j++) {
                    const $option = document.createElement('option');
                    $option.innerHTML = store.getCategories()[j];
                    $select.appendChild($option);
                    parent.childNodes[i].innerHTML = '';
                    parent.childNodes[i].appendChild($select);
                }
                continue;
            }
            const inputField = document.createElement('input');
            if(i === 4)
                inputField.type = 'date';
            inputField.value = parent.childNodes[i].innerHTML;
            parent.childNodes[i].innerHTML = '';
            parent.childNodes[i].appendChild(inputField);
        }
        this.DrawSubEventButtons(childButton.parentNode, id);
    },

    // метод активации режима редактирования
    ActivateButtons(bool) {
        const $allButtons = document.getElementsByTagName('button');
        for(let i = 0; i < $allButtons.length; i++){
            $allButtons[i].disabled = bool;
        }
    },

    // метод отрисовки кнопки создать заметку
    DrawAddNoteButton() {
        const $activeTable = document.querySelector('.active-table');
        const $createButton = document.createElement('button');
        $createButton.innerHTML = 'Create Note';
        $createButton.id = 'create_note';
        $createButton.addEventListener('click', () => events.CreateNote());
        $activeTable.appendChild($createButton);

    },

    // метод удаления DOM-элементов
    RemoveCurrentDOM() {
        const $activeTable = document.querySelector('.active-table table');
        while ($activeTable.lastChild) {
            $activeTable.removeChild($activeTable.lastChild);
        }
        const $summaryTable = document.querySelector('.summary-table table');
        while ($summaryTable.lastChild) {
            $summaryTable.removeChild($summaryTable.lastChild);
        }
        const $archiveTable = document.querySelector('.archive-table table');
        while ($archiveTable.lastChild) {
            $archiveTable.removeChild($archiveTable.lastChild);
        }
    },
}









