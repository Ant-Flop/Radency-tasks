export let store = {
    _categories: ['Task', 'Random Thought', 'Idea'],
    _headTable: [
        'Name',
        'Created',
        'Category',
        'Content',
        'Dates',
        'Events'
    ],
    _headSummaryTable: ['Note Category', 'Active', 'Archive'],
    _stateActiveTable: [
        {
            id: 1,
            name: 'Shopping list',
            created: 'April 20, 2021',
            category: 'Task',
            content: 'Tomatoes, bread',
            dates: ''
        },
        {
            id: 2,
            name: 'The theory of evolution',
            created: 'April 27, 2021',
            category: 'Random Thought',
            content: 'The evolution..',
            dates: ''
        },
        {
            id: 3,
            name: 'New Feature',
            created: 'May 05, 2021',
            category: 'Idea',
            content: 'Implement new..',
            dates: '03/05/2021, 05/05/2021'
        },
        {
            id: 4,
            name: 'William Gaddis',
            created: 'May 07, 2021',
            category: 'Quote',
            content: 'Power does not co...',
            dates: ''
        },
        {
            id: 5,
            name: 'Books',
            created: 'May 15, 2021',
            category: 'Task',
            content: 'The Learn Startup',
            dates: ''
        }
    ],
    _stateSummaryTable: [],
    _stateArchiveTable:[],

    formStateSummaryTable() {
        this.getStateSummaryTable().splice(0, this.getStateSummaryTable().length);
        for(let i = 0; i < this.getCategories().length; i++){
            let invalidEntries = 0;
            let category = this.getCategories()[i];
            function filterByCategory(item) {
                if(item.category === category){
                    return true;
                }
                invalidEntries++;
                return false;
            }
            let arrActive = this.getStateActiveTable().filter(filterByCategory);
            let arrArchive = this.getStateArchiveTable().filter(filterByCategory);
            let arr = [this.getCategories()[i], arrActive.length, arrArchive.length];
            this.getStateSummaryTable().push(arr);

        }

    },
    getHeadTable() {
        return this._headTable;
    },
    getHeadSummaryTable() {
        return this._headSummaryTable;
    },
    getCategories() {
        return this._categories;
    },
    getStateActiveTable() {
        return this._stateActiveTable;
    },
    getStateSummaryTable() {
        return this._stateSummaryTable;
    },
    getStateArchiveTable() {
        return this._stateArchiveTable;
    }

}

