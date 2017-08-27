import {
    refreshTokenAPI
} from '../../restApi/services'

import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'app_token';
const REFRESH_TOKEN_KEY = 'app_refresh_token';
const TOKEN_SCHEDULER_KEY = 'app_token_scheduler';

const CHECK_TOKEN_REFRESH_FREQUENCY = 60; //seconds
const SESSION_TIMEOUT = 900; //15 min in seconds
const TWO_MINUTES = 120; // in seconds

export const saveToken = (token, refreshToken) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const removeToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getToken = () => {
    return sessionStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = ()=> {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

export const saveTokenScheduler = (schedulerId) => {
    sessionStorage.setItem(TOKEN_SCHEDULER_KEY, schedulerId);
};

export const removeTokenScheduler = () => {
    var schedulerId = sessionStorage.getItem(TOKEN_SCHEDULER_KEY);
    if (!!schedulerId) {
        window.clearInterval(schedulerId);
        sessionStorage.removeItem(TOKEN_SCHEDULER_KEY)
    }
};

export const startRefreshTokenScheduler = () => {
    removeTokenScheduler();
    var schedulerId = setInterval(()=> {
        GLOBAL_IDLE_TIME = GLOBAL_IDLE_TIME + CHECK_TOKEN_REFRESH_FREQUENCY;
        if (checkAndExpireSession()) {
            return;
        }
        checkAndRefreshToken();
    }, (CHECK_TOKEN_REFRESH_FREQUENCY * 1000));
    saveTokenScheduler(schedulerId);
};

const checkAndExpireSession = () => {
    if (GLOBAL_IDLE_TIME >= SESSION_TIMEOUT) {
        removeToken();
        removeTokenScheduler();
        return true;
    }
    return false;
};

const checkAndRefreshToken = ()=> {
    if (shouldRefreshToken()) {
        refreshTokenAPI()
            .then((response)=> {
                saveToken(response.entity.id_token, response.entity.id_refresh_token)
            })
            .catch((error)=> {
                console.log("Cannot refresh token: " + JSON.stringify(error));
            })
    }
};

const shouldRefreshToken = () => {
    const jwt = sessionStorage.getItem(TOKEN_KEY);
    if (!!jwt) {
        try {
            const decoded = jwt_decode(jwt);
            const now = (new Date().getTime()) / 1000; // in seconds
            const exp = decoded.exp;
            if ((exp - now) < TWO_MINUTES) { // refresh if less than two minute to expiration
                return true;
            }
        } catch (e) {
            console.log("Unexpected error: " + e);
        }
    }
    return false;
};