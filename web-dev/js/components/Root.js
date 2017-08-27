import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';
import Layout from './Layout';
import LoginPage from '../routes/login/LoginPage';
import MainPage from '../routes/main/MainPage';

class Root extends Component {

    constructor(props) {
        super(props);
        this.determineView = this.determineView.bind(this);
    }

    determineView(nextState, replace) {
        const state = this.props.store.getState();
        if (!state.user.isAuthenticated) {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={browserHistory}>
                    <Route path='/' component={Layout} onEnter={this.determineView}>
                        <Route path='/main' component={MainPage}/>
                    </Route>
                    <Route path='/login' component={LoginPage}/>
                </Router>
            </Provider>
        );
    }
}

export default Root