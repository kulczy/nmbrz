const developer_mode = true // for cordova

import './less/index.less' // less
import React from 'react' // react
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { Provider } from 'mobx-react' //mobx
import ListStore from "./store/store" // data store
import Layout from './components/Layout' // components
import List from './components/List'
import Edit from './components/Edit'

function startApp() {
    render((
        <Provider store={ListStore}>
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={List}/>
                    <Route path="/edit(/:id)" component={Edit}/>
                </Route>
            </Router>
        </Provider>
    ), document.getElementById('nmbrz'))
}

developer_mode ? startApp() : document.addEventListener('deviceready', startApp, false);
