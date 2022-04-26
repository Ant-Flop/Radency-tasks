const CREATE_NOTE = 'CREATE-NOTE';
const EDIT_NOTE = 'EDIT-NOTE';
const ARCHIVE_NOTE = 'ARCHIVE-NOTE';
const UNZIP_NOTE = 'UNZIP-NOTE';
const DELETE_NOTE = 'DELETE-NOTE';
const SAVE_NOTE = 'SAVE-NOTE';
const CANCEL_NOTE = 'CANCEL-NOTE';
const UPDATE_NOTE = 'UPDATE-NOTE'


let store = {
    _state: {
        categories: ['Task', 'Random Thought', 'Idea'],
        headTable: [
            'Name',
            'Created',
            'Category',
            'Content',
            'Dates',
            'Events'
        ],
        headSummaryTable: ['Note Category', 'Active', 'Archive'],
        stateActiveTable: [
            {
                id: 1,
                name: 'Shopping list',
                created: 'April 20, 2021',
                category: 'Task',
                content: 'Tomatoes, bread',
                dates: '',
                events: ['edit', 'archive', 'delete'],
                editMode: false
            },
            {
                id: 2,
                name: 'The theory of evolution',
                created: 'April 27, 2021',
                category: 'Random Thought',
                content: 'The evolution..',
                dates: '',
                events: ['edit', 'archive', 'delete'],
                editMode: false
            },
            {
                id: 3,
                name: 'New Feature',
                created: 'May 05, 2021',
                category: 'Idea',
                content: 'Implement new..',
                dates: '2021-05-03',
                events: ['edit', 'archive', 'delete'],
                editMode: false
            },
            {
                id: 4,
                name: 'William Gaddis',
                created: 'May 07, 2021',
                category: 'Quote',
                content: 'Power does not co...',
                dates: '',
                events: ['edit', 'archive', 'delete'],
                editMode: false
            },
            {
                id: 5,
                name: 'Books',
                created: 'May 15, 2021',
                category: 'Task',
                content: 'The Learn Startup',
                dates: '',
                events: ['edit', 'archive', 'delete'],
                editMode: false
            }
        ],
        stateSummaryTable: [],
        stateArchiveTable: [],
        tempRow: []
    },

    _callSubscriber() {
        console.log('state changed');
    },

    subscribe(observer) {
        this._callSubscriber = observer;  // паттерн наблюдатель / publisher-subscriber
    },

    _maxId(items) {
        let maxId = items.reduce((a, b) => {
            if (a.id > b.id) {
                return a;
            }
            return b;
        })
        return maxId.id;
    },

    _Sort(items) {
        items.sort(function (a, b) {
            return a.id - b.id;
        })
    },

    formStateSummaryTable() {
        this._state.stateSummaryTable.splice(0, this._state.stateSummaryTable.length);
        for (let i = 0; i < this._state.categories.length; i++) {
            let category = this._state.categories[i];

            function filterByCategory(item) {
                return item.category === category;

            }

            let arrActive = this._state.stateActiveTable.filter(filterByCategory);
            let arrArchive = this._state.stateArchiveTable.filter(filterByCategory);
            let arr = [this._state.categories[i], arrActive.length, arrArchive.length];
            this._state.stateSummaryTable.push(arr);

        }

    },

    getState() {
        return this._state;
    },

    getCategories() {
        return this._state.categories;
    },

    dispatch(action, id, stateTable) {
        if (action.type === CREATE_NOTE) {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            let n, m;
            try {
                n = this._maxId(this._state.stateActiveTable);
            } catch (e) {
                n = 0;
            }
            try {
                m = this._maxId(this._state.stateArchiveTable);
            } catch (e) {
                m = 0;
            }
            if (m > n) n = m;
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
                dates: '',
                events: ['save', 'cancel'],
                editMode: true
            }]);
            let ActiveState = () => this._state.stateActiveTable;
            ActiveState().push(...set);
            console.log(this._state.stateActiveTable)
            this._Sort(this._state.stateActiveTable);
            id = n + 1;
            this._callSubscriber(this._state);
            this.dispatch(EDIT_NOTE, id, this._state.stateActiveTable);
        } else if (action.type === EDIT_NOTE) {
            for (let i = 0; i < this._state.stateActiveTable.length; i++) {
                if (this._state.stateActiveTable[i].id === id) {
                    stateTable[i].events = ['save', 'cancel'];
                    stateTable[i].editMode = true;
                    Object.assign(this._state.tempRow, stateTable[i]);
                    this._callSubscriber(this._state);
                    break;
                }
            }

        } else if (action.type === ARCHIVE_NOTE) {
            for (let i = 0; i < stateTable.length; i++) {
                if (stateTable[i].id === id) {
                    let tempRow = [];
                    Object.assign(tempRow, stateTable[i]);
                    tempRow.events = ['unzip'];
                    this._state.stateArchiveTable[this._state.stateArchiveTable.length] = tempRow;
                    this._Sort(this._state.stateArchiveTable);
                    this._callSubscriber(this._state);
                    break;
                }
            }
        } else if (action.type === UNZIP_NOTE) {
            for (let i = 0; i < stateTable.length; i++) {
                if (stateTable[i].id === id) {
                    let tempRow = [];
                    Object.assign(tempRow, stateTable[i]);
                    tempRow.events = ['edit', 'archive', 'delete'];
                    this._state.stateActiveTable[this._state.stateActiveTable.length] = tempRow;
                    this._Sort(this._state.stateActiveTable);
                    this._callSubscriber(this._state);
                    break;
                }
            }
        } else if (action.type === DELETE_NOTE) {
            let n = stateTable.length;
            for (let i = 0; i < n; i++) {
                if (stateTable[i].id === id) {
                    stateTable.splice(i, 1);
                    this._callSubscriber(this._state);
                    break;
                }
            }
        } else if (action.type === UPDATE_NOTE) {
            for (let i = 0; i < this._state.stateActiveTable.length; i++) {
                if (this._state.stateActiveTable[i].id === action.id) {
                    if (action.key === 'dates') {
                        if (this._state.stateActiveTable[i][action.key] !== '') {
                            this._state.stateActiveTable[i][action.key] = action.newText;
                        } else this._state.stateActiveTable[i][action.key] = action.newText;
                    } else
                        this._state.stateActiveTable[i][action.key] = action.newText;
                    this._callSubscriber(this._state);
                    break;
                }
            }
        } else if (action.type === SAVE_NOTE) {
            for (let i = 0; i < this._state.stateActiveTable.length; i++) {
                if (this._state.stateActiveTable[i]['id'] === id) {
                    this._state.tempRow = [];
                    stateTable[i].events = ['edit', 'archive', 'delete'];
                    stateTable[i].editMode = false;
                    this._callSubscriber(this._state);
                    break;
                }
            }
        } else if (action.type === CANCEL_NOTE) {
            for (let i = 0; i < this._state.stateActiveTable.length; i++) {
                if (this._state.stateActiveTable[i]['id'] === id) {
                    Object.assign(stateTable[i], this._state.tempRow)
                    this._state.tempRow = [];
                    stateTable[i].events = ['edit', 'archive', 'delete'];
                    stateTable[i].editMode = false;
                    this._callSubscriber(this._state);
                    break;
                }
            }
        }
    }
}

export const createNoteAction = () => ({type: CREATE_NOTE});
export const editNoteAction = () => ({type: EDIT_NOTE});
export const archiveNoteAction = () => ({type: ARCHIVE_NOTE});
export const deleteNoteAction = () => ({type: DELETE_NOTE});
export const unzipNoteAction = () => ({type: UNZIP_NOTE});
export const updateNoteAction = (text, id, key) => ({type: UPDATE_NOTE, newText: text, id: id, key: key});
export const saveNoteAction = () => ({type: SAVE_NOTE});
export const cancelNoteAction = () => ({type: CANCEL_NOTE});
export const getAllCategories = () => store.getCategories();

export default store;