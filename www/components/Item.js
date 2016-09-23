import React from 'react';
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
export default class Item extends React.Component {

    componentDidMount() {
        $('<div />').html(this.props.item.number).appendTo('#'+this.props.item.id);
    }

    componentDidUpdate(prevProps, prevState) {
        $('#'+this.props.item.id).find('div').slideUp(200);
        $('<div />').html(prevProps.item.number).appendTo('#'+this.props.item.id);
    }

    _numberChange(axn) {
        this.props.store.changeNumbers(this.props.item.id, axn)
        navigator.vibrate(50) // cordova vibration
    }

    render() {
        // assign item info to new variables
        const { id, name, description, number, done } = this.props.item

        return <div className={done ? 'item item-done' : 'item'}>

            <Link to={'/edit/'+id}>
                <div className="item-info">
                    <div className="item-name">{name}</div>
                    <div className="item-description">{description}</div>
                </div>
            </Link>

            <div id={id} className="item-number"></div>
            
            <button type="button" className="item-plus" onClick={this._numberChange.bind(this, '+')}>&#xf218;</button>
            <button type="button" className="item-minus" onClick={this._numberChange.bind(this, '-')}>&#xf209;</button>

        </div>
    }
}
