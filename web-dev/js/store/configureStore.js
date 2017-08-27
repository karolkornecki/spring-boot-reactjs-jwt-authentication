import {createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import allReducers from '../reducers'
import { persistState } from 'redux-devtools';
import DevTools from '../components/DevTools';


const configureStore = ()=> {

    const logger = createLogger();

    return createStore(
        allReducers,
        applyMiddleware(thunk, promise, logger)
        //compose(
        //   applyMiddleware(thunk, promise, logger) ,
        //    DevTools.instrument(),
        //    persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
        //)
    )

};


export default configureStore