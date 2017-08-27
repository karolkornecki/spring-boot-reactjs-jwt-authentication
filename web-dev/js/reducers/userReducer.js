import {
    LOGIN_SUCCEED,
    LOGIN_FAILED,
    LOGOUT_SUCCEED,
    GET_USER_ACCOUNT_RECEIVED,
    GET_USER_ACCOUNT_FAILED,
    SET_AUTHENTICATED_ON_LOAD
} from '../actions/index'

import { endsWith } from 'lodash'

const handleLoginSucceed = (state) => ({
    ...state,
    isAuthenticated: true
});

const handleLoginFailed = (state) => ({
    ...state,
    isAuthenticated: false
});

const handleLogoutSucceed = () => ({
    isAuthenticated: false,
    account: {}
});

const handleGetUserAccountReceived = (state, action) => ({
    ...state,
    account: action.account
});

const handleGetUserAccountFailed = () => ({
    account: {}
});

const handleSetAuthenticatedOnLoad = (state) => ({
    ...state,
    isAuthenticated: true
});

const ACTION_HANDLERS = {
    [LOGIN_SUCCEED]: (state) => handleLoginSucceed(state),
    [LOGIN_FAILED]: (state) => handleLoginFailed(state),
    [LOGOUT_SUCCEED]: (state) => handleLogoutSucceed(),
    [GET_USER_ACCOUNT_RECEIVED]: (state, action) => handleGetUserAccountReceived(state, action),
    [GET_USER_ACCOUNT_FAILED]: (state, action) => handleGetUserAccountFailed(state, action),
    [SET_AUTHENTICATED_ON_LOAD]: (state) => handleSetAuthenticatedOnLoad(state)
};

const userReducer = (state = {}, action = {}) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
};

export default userReducer