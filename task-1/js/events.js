import {store} from "./state.js";
import {Rerender} from "./render.js";
import {draw} from "./draw-dom.js";


//методы событий
export let events = {

    MaxId(items) {
        let maxId = items.reduce((a, b) => {
            if(a.id > b.id) {
                return a;
            }
            return b;
        })
        return maxId.id;
    },

    CreateNote() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let n, m;
        try {
            n = this.MaxId(store.getStateActiveTable());
        } catch(e) {
            n = 0;
        }
        try {
            m = this.MaxId(store.getStateArchiveTable());
        } catch(e) {
            m = 0;
        }
        if(m > n) n = m;
        let currentDate = new Date();
        let month = monthNames[currentDate.getMonth()];
        let date = currentDate.getDate();
        let year = currentDate.getFullYear();
        let set = new Set([{
            id: n + 1,
            name: '',
            created: month + ' ' + date + ', ' + year,
            category: '',
            content: '',
            dates: ''
        }]);
        store.getStateActiveTable().push(...set);
        Rerender();
        this.EditNote(n + 1);
    },

    EditNote(id) {
        draw.HideMainButtons(true, id);
        draw.ActivateButtons(true);
        draw.DrawInputEditFields(id);
    },

    ArchiveNote(id) {
        let stateTable = store.getStateActiveTable();
        let n = stateTable.length;
        for(let i = 0; i < n; i++) {
            if(stateTable[i].id === id) {
                store.getStateArchiveTable().push(stateTable[i]);
                this.DeleteNote(id, stateTable);
                break;
            }
        }
    },

    UnArchiveNote(id) {
        let stateTable = store.getStateArchiveTable();
        let n = stateTable.length;
        for(let i = 0; i < n; i++) {
            if(stateTable[i].id === id) {
                store.getStateActiveTable().push(stateTable[i]);
                this.DeleteNote(id, stateTable);
                break;
            }
        }

    },

    Sort(items) {
        items.sort(function (a, b) {
            return a.id - b.id;
        })
    },

    DeleteNote(id, stateTable) {
        if(stateTable === undefined) stateTable = store.getStateActiveTable();
        let n = stateTable.length;
        for (let i = 0; i < n; i++) {
            if (stateTable[i].id === id) {
                stateTable.splice(i, 1);
                break;
            }
        }
        Rerender();
    },

    SaveNote(id) {
        let n = store.getStateActiveTable().length;
        const input = document.getElementsByTagName('input');
        const select = document.getElementsByTagName('select');
        for(let i = 0, j = 0, buffId = 0; i < n; i++){
            for(let key in store.getStateActiveTable()[i]) {
                if(key === 'created') continue;
                if(key === 'id') {
                    buffId = store.getStateActiveTable()[i][key];
                    continue;
                }

                if(buffId === id){
                    if(key === 'category') {
                        store.getStateActiveTable()[i][key] = select[0].value;
                        continue;
                    }
                    if(key === 'dates') {
                        if(input[j].value.toString() !== '' ) {
                            let dates = input[j].value.toString().split("-").reverse().join("-").replace(/-/g, '/')
                            if(store.getStateActiveTable()[i][key] !== '')
                                store.getStateActiveTable()[i][key] = store.getStateActiveTable()[i][key] + ', ' + dates;
                            else store.getStateActiveTable()[i][key] = dates;
                        }

                        j++;
                        continue;
                    }
                    store.getStateActiveTable()[i][key] = input[j].value;
                    j++;
                }
            }
        }
        draw.HideMainButtons('', id);
        draw.ActivateButtons(false);
        Rerender();
    },

    CancelNote(id) {
        draw.HideMainButtons('', id);
        draw.ActivateButtons(false);
        Rerender();
    }
}
