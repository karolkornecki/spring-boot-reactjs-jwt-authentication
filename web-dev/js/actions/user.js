import {
    authenticateAPI,
    getUserAccountAPI
} from '../restApi/services'

import { removeToken, saveToken, saveTokenScheduler, removeTokenScheduler, startRefreshTokenScheduler } from '../restApi/services/storageService'
import { browserHistory } from 'react-router'

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED';

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_SUCCEED = 'LOGOUT_SUCCEED';

export const GET_USER_ACCOUNT_REQUESTED = 'GET_USER_ACCOUNT_REQUESTED';
export const GET_USER_ACCOUNT_RECEIVED = 'GET_USER_ACCOUNT_RECEIVED';
export const GET_USER_ACCOUNT_FAILED = 'GET_USER_ACCOUNT_FAILED';

export const SET_AUTHENTICATED_ON_LOAD = 'SET_AUTHENTICATED_ON_LOAD';

export const loginRequested = () =>({
    type: LOGIN_REQUESTED
});

export const loginSucceed = () =>({
    type: LOGIN_SUCCEED
});

export const loginFailed = (error) =>({
    type: LOGIN_FAILED,
    error
});

export const logoutRequested = () => ({
    type: LOGOUT_REQUESTED
})

export const logoutFailed = (error) => ({
    type: LOGOUT_FAILED,
    error
})

export const logoutSucceed = () => ({
    type: LOGOUT_SUCCEED
})

export const getUserAccountRequested = () =>({
    type: GET_USER_ACCOUNT_REQUESTED
})

export const getUserAccountReceived = (account) =>({
    type: GET_USER_ACCOUNT_RECEIVED,
    account

})

export const getUserAccountFailed = (error) =>({
    type: GET_USER_ACCOUNT_FAILED,
    error
})

const setAuthenticatedOnLoad = () => ({
    type: SET_AUTHENTICATED_ON_LOAD
})


export const authenticate = (username, password) => (dispatch) => {
    dispatch(loginRequested());
    return authenticateAPI(username, password)
        .then((response)=> {
            saveToken(response.entity.id_token, response.entity.id_refresh_token);
            startRefreshTokenScheduler();
            dispatch(loginSucceed());
            getUserAccount(dispatch);
        })
        .catch((error)=> {
            removeToken();
            dispatch(loginFailed(error));
            alert('Invalid login or password!'); //TODO add global error handler.
        })
};

const getUserAccount = (dispatch) => {
    dispatch(getUserAccountRequested());
    getUserAccountAPI()
        .then((response)=> {
            dispatch(getUserAccountReceived(response.entity))
        })
        .then(()=> {
            browserHistory.push('/main');
        })
        .catch((error)=> {
            dispatch(getUserAccountFailed(JSON.stringify(error)))
        })
};

export const restoreUserAfterRefresh = () => (dispatch) => {
    dispatch(getUserAccountRequested());
    return getUserAccountAPI()
        .then((response)=> {
            dispatch(getUserAccountReceived(response.entity));
            dispatch(setAuthenticatedOnLoad());
            startRefreshTokenScheduler(); //start again after page reloaded
        })
        .catch((error)=> { /*don't show error on enter*/
        })
};

export const logout = () => (dispatch) => {
    dispatch(logoutRequested())
    try {
        removeToken();
        removeTokenScheduler();
        dispatch(logoutSucceed());
        browserHistory.push('/login')
    } catch (e) {
        dispatch(logoutFailed(e))
    }
};
