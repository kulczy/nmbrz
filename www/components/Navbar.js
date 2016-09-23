import React from 'react';
import { IndexLink, Link, hashHistory } from 'react-router'
import { observer, inject } from 'mobx-react'

@inject('store') @observer
export default class Navbar extends React.Component {

    _filter(e) {
        this.props.store.filter = e.target.value
    }

    _searchSwitch(axn) {
        this.props.store.search = axn
        this.props.store.filter = ''
        hashHistory.push('/') // redirect to home
    }

    _search() {
        return <div className="search">
            <input type="text" value={this.props.store.filter} placeholder="type something..." onChange={this._filter.bind(this)} ref={input => {input != null ? input.focus() : ''}} />
            <button type="button" className="search-close-btn" onClick={this._searchSwitch.bind(this, false)}>&#xf2d7;</button>
        </div>
    }

    render() {
        return <div className={this.props.store.search ? 'navbar navbar-search' : 'navbar'}>
            {/* Search button */}
            <button type="button" className="search-btn" onClick={this._searchSwitch.bind(this, true)}>&#xf4a4;</button>
            {/* Logo */}
            <div className="logo"><IndexLink to="/"><img src="img/nmbrz-logo.svg" alt="nmbrz"/></IndexLink></div>
            {/* Add item button */}
            <Link to={this.props.page == '/' ? '/edit' : '/'} className={this.props.page == '/' ? 'add-btn' : 'add-btn cancel-btn'}>&#xf2c7;</Link>
            {/* Search input field */}
            <div className="search-wrapper">{this.props.store.search ? this._search() : ''}</div>
        </div>
    }
}
