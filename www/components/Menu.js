import React from 'react';
import { inject, observer } from 'mobx-react'
import touchswipe from 'jquery-touchswipe'

@inject('store') @observer
export default class Menu extends React.Component {

    componentDidMount() {
        const _self = this;
        // slide menu
        const swipeOptions = {
            swipe(e, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'right' && distance > 80 && fingerData[0].start.x < 100) {
                    menu.addClass('sidemenu-open')
                    overlay.addClass('sidemenu-overlay-open')
                }
                if (direction == 'left' && distance > 20) {
                    menu.removeClass('sidemenu-open')
                    overlay.removeClass('sidemenu-overlay-open')
                }
                if (direction == 'down' && distance > 180) {
                    _self.props.store.search = true
                }
            },

            excludedElements: '.noSwipe',
            allowPageScroll: 'vertical',
            threshold: 1
        }

        const menu = $('.sidemenu');
        const overlay = $('.sidemenu-overlay');
        const swipe = $('.nmbrz').swipe(swipeOptions);
    }

    _sort(option) {
        this.props.store.updateSort(option)
    }

    _done() {
        this.props.store.updateDone()
    }

    render() {
        return <div className="nmbrz">
            <div className="sidemenu">
                <div className="sidemenu-in">

                    <div className="sidemenu-logo"><img src="img/nmbrz-ico.svg" alt="nmbrz"/></div>

                    <div className="sidemenu-group">
                        <div className="sidemenu-group-title">Sort:</div>
                        <ul>
                            <li>
                                <label className="nugo-check">
                                    <input id="menu-sort-az" name="sort" type="radio" checked={this.props.store.sort == 'a-z'} onChange={this._sort.bind(this, 'a-z')} />
                                    <div><div></div></div>
                                </label>
                                <span><label htmlFor="menu-sort-az">A-Z</label></span>
                            </li>
                            <li>
                                <label className="nugo-check">
                                    <input id="menu-sort-za" name="sort" type="radio" checked={this.props.store.sort == 'z-a'} onChange={this._sort.bind(this, 'z-a')} />
                                    <div><div></div></div>
                                </label>
                                <span><label htmlFor="menu-sort-za">Z-A</label></span>
                            </li>
                            <li>
                                <label className="nugo-check">
                                    <input id="menu-sort-new" name="sort" type="radio" checked={this.props.store.sort == 'new'} onChange={this._sort.bind(this, 'new')} />
                                    <div><div></div></div>
                                </label>
                                <span><label htmlFor="menu-sort-new">Newest first</label></span>
                            </li>
                            <li>
                                <label className="nugo-check">
                                    <input id="menu-sort-old" name="sort" type="radio" checked={this.props.store.sort == 'old'} onChange={this._sort.bind(this, 'old')} />
                                    <div><div></div></div>
                                </label>
                                <span><label htmlFor="menu-sort-old">Oldest first</label></span>
                            </li>
                        </ul>
                    </div>

                    <div className="sidemenu-group">
                        <div className="sidemenu-group-title">Other:</div>
                        <ul>
                            <li>
                                <label className="nugo-check">
                                    <input id="menu-check" type="checkbox" checked={this.props.store.doneEnd} onChange={this._done.bind(this)} />
                                    <div><div></div></div>
                                </label>
                                <span><label htmlFor="menu-check">Done at the end</label></span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="sidemenu-overlay"></div>
        </div>
    }
}
