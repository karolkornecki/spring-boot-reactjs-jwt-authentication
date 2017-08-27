import client from '../client'
import { authenticatedClient } from '../authenticatedClient'

import { getRefreshToken } from '../services/storageService'

export const authenticateAPI = (username, password) => {
    return client({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        path: '/api/authenticate',
        entity: {
            username,
            password
        }
    })
}

export const refreshTokenAPI = () => {
    const refreshToken = getRefreshToken();
    const headers = refreshToken ? {'Authorization': `Bearer ${refreshToken}`} : {}
    return client({
        method: 'GET',
        headers,
        path: '/api/auth/token?timestamp=' + new Date().getTime()
    })
}

export const getUserAccountAPI = () => {
    return authenticatedClient({
        method: 'GET',
        path: '/api/account?timestamp=' + new Date().getTime()
    })
}