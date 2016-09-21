import React from 'react';
import { hashHistory } from 'react-router'
import { observer, inject } from 'mobx-react'

@inject('store') @observer
export default class Edit extends React.Component {

    constructor(props) {
        super(props)

        // check if edit or add element
        let editedItem = this.props.params.id
        ? this.props.store.list.filter(item => item.id == this.props.params.id)[0] // find edited element
        : { id: null, name: null, description: null, number: 0, done: false } // default item values

        this.state = { item: editedItem, check: editedItem.done }
    }

    componentWillMount() {
        // reset search in navbar
        this.props.store.search = false
        this.props.store.filter = ''
    }

    _save(e) {
        e.preventDefault();
        // stop if fields are empty
        if (!this.refs.name.value.length) {
            alert("Name can't be empty")
            return
        }
        // get updated values
        const id = parseInt(this.state.item.id)
        const name = this.refs.name.value
        const description = this.refs.description.value
        const number = parseInt(this.refs.number.value)
        const done = this.state.check

        this.props.params.id
        ? this.props.store.updateItem(id, name, description, number, done) // update item in store
        : this.props.store.addItem(name, description, number) // add new item to store

        hashHistory.push('/') // redirect to home
    }

    _remove(e) {
        this.props.store.removeItem(this.state.item.id)
        hashHistory.push('/') // redirect to home
    }

    _checkboxHelper(e) {
        const oposite = !this.state.check
        this.setState({ check: oposite })
    }

    render() {

        // assign item info to new variables
        const { id, name, description, number, done } = this.state.item

        return <div className="edit animation-edit">
            <form onSubmit={this._save.bind(this)}>

                <div className="input-wrapper">
                    <input id="inName" type="text" ref="name" defaultValue={name} />
                    <div className="input-after"></div>
                    <label htmlFor="inName">Name</label>
                </div>

                <div className="input-wrapper">
                    <input id="inDesc" type="text" ref="description" defaultValue={description} />
                    <div className="input-after"></div>
                    <label htmlFor="inDesc">Description</label>
                </div>

                <div className="input-wrapper">
                    <input id="inNumb" type="number" ref="number" defaultValue={number} />
                    <div className="input-after"></div>
                    <label htmlFor="inNumb">Number</label>
                </div>

                <div className="input-wrapper">
                    <div className="input-txt">
                        <label className="checkbox-switch">
                            <input id="inDone" type="checkbox" ref="done" checked={this.state.check} onChange={this._checkboxHelper.bind(this)} />
                            <div></div>
                        </label>
                    </div>
                    <div className="input-after"></div>
                    <label htmlFor="inDone">Done</label>
                </div>

                <div className="edit-btn-wrapper">
                    <button type="submit" className="btn-save">Save</button>
                    { this.props.params.id ? <button type="button" className="btn-delete" onClick={this._remove.bind(this)}>Delete</button> : '' }
                </div>
            </form>
        </div>
    }
}
