import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore"
import Root from './components/Root'
import '.././scss/base.scss'
import { restoreUserAfterRefresh } from './actions/index'
const store = configureStore();

store.dispatch(restoreUserAfterRefresh()).then(()=> {
    ReactDOM.render(
        <Root store={store}/>,
        document.getElementById('root')
    );
});