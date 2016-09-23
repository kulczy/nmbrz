import { observable, computed } from 'mobx'

// list item object
class Item {
    @observable id
    @observable name
    @observable description
    @observable number
    @observable done

    constructor(name, description, number = 0, id = Date.now(), done = false) {
        this.id = parseInt(id)
        this.name = name
        this.description = description
        this.number = parseInt(number)
        this.done = done
    }
}

// main store class
class ListStore {
    @observable list = []
    @observable filter = ''
    @observable search = false
    @observable sort = 'a-z'
    @observable doneEnd = true

    @computed get filteredList() {

        let listCopy = this.list; // create copy of list

        // sort a-z
        if (this.sort == 'a-z') {
            listCopy = listCopy.sort((a, b) => {
                if(a.name.toUpperCase() < b.name.toUpperCase()) return -1;
                if(a.name.toUpperCase() > b.name.toUpperCase()) return 1;
                return 0;
            })
        }

        // sort z-a
        if (this.sort == 'z-a') {
            listCopy = listCopy.sort((a, b) => {
                if(a.name.toUpperCase() < b.name.toUpperCase()) return 1;
                if(a.name.toUpperCase() > b.name.toUpperCase()) return -1;
                return 0;
            })
        }

        // new first
        if (this.sort == 'new') {
            listCopy = listCopy.sort((a, b) => {
                if(a.id < b.id) return 1;
                if(a.id > b.id) return -1;
                return 0;
            })
        }

        // done at the end
        if (this.doneEnd) {
            let sortUndone = listCopy.filter(item => item.done != true)
            let sortDone = listCopy.filter(item => item.done == true)
            listCopy = sortUndone.concat(sortDone);
        }

        let matches = new RegExp(this.filter, 'i')
        return listCopy.filter(item => !this.filter || matches.test(item.name))

        // copy of default
        // let matches = new RegExp(this.filter, 'i')
        // return this.list.filter(item => !this.filter || matches.test(item.name))
    }

    constructor() {
        // download list if exist and create if not
        if (localStorage.getItem('nugato:nmbrz.list')) {
            this.downloadStore()
        } else {
            const emptyList = JSON.stringify([])
            localStorage.setItem('nugato:nmbrz.list', emptyList)
            localStorage.setItem('nugato:nmbrz.sort', 'a-z')
            localStorage.setItem('nugato:nmbrz.done', true)
        }
    }

    // download data from local storage
    downloadStore() {
        this.sort = localStorage.getItem('nugato:nmbrz.sort')
        this.doneEnd = localStorage.getItem('nugato:nmbrz.done') == 'true' ? true : false;
        const downloadedList = JSON.parse(localStorage.getItem('nugato:nmbrz.list')) // get list from local storage and change to object
        this.list = [] // clear array
        for (let item of downloadedList) {
            this.list.push(new Item(item.name, item.description, item.number, item.id, item.done)) // add to main list
        }
    }

    // upload data to local storage
    uploadStore() {
        const stringList = JSON.stringify(this.list) // stringify list
        localStorage.setItem('nugato:nmbrz.list', stringList) // add to local storage
    }

    // add new item to the list
    addItem(name, description, number) {
        this.list.push(new Item(name, description, number)) // add to list
        this.uploadStore()
    }

    // remove item from list
    removeItem(id) {
        let newList = this.list.filter(item => item.id !== id ) // create new array without removed item
        this.list = newList
        this.uploadStore()
    }

    // update item info
    updateItem(id, name, description, number, done) {
        let item = this.list.filter(item => item.id === id )[0] // find item
        Object.assign(item, {name, description, number, done}) // change values of item
        this.uploadStore()
    }

    // update item info
    changeNumbers(id, axn) {
        let item = this.list.filter(item => item.id === id )[0] // find item
        item.number = (axn === '+') ? item.number+1 : item.number-1
        this.uploadStore()
    }

    updateSort(option) {
        this.sort = option
        localStorage.setItem('nugato:nmbrz.sort', option)
    }

    updateDone() {
        this.doneEnd = !this.doneEnd
        localStorage.setItem('nugato:nmbrz.done', this.doneEnd)
    }
}

// export store
let store = window.store = new ListStore
export default store
