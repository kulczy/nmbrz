import React from 'react';
import { inject, observer } from 'mobx-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Navbar from './Navbar'
import Menu from './Menu'


@inject('store') @observer
export default class Layout extends React.Component {
    render() {

        return <div className="nmbrz">
            <Menu></Menu>
            <Navbar page={this.props.location.pathname} />
            <div className="content">
                <ReactCSSTransitionGroup
                    component='div'
                    transitionName='anim-transition'
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                    >
                    {React.cloneElement(this.props.children, {
                        key: this.props.location.pathname
                    })}
                </ReactCSSTransitionGroup>
            </div>
        </div>
    }
}
