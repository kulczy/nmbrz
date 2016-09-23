import React from 'react';
import { observer, inject } from 'mobx-react'
import Item from './Item'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

@inject('store') @observer
export default class List extends React.Component {
    render() {

        // list items loop
        let listLoop = this.props.store.filteredList.map(item =>
            <Item key={item.id} item={item} />
        )

        return <div className="list animation-list">
            <ReactCSSTransitionGroup
                transitionName='anim-listitem'
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {listLoop.length ? listLoop : <div className="list-empty-wrapper"><div className="list-empty">no results ;(</div></div>}
                </ReactCSSTransitionGroup>
            </div>
    }
}
