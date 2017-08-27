import client from './client'
import { getToken } from './services/storageService'
import { browserHistory } from 'react-router'

export const authenticatedClient = (params) => {
    try {
        const token = getToken();
        const headers = params.headers || {};
        if (!token) {
            return client({
                ...params,
                headers: {
                    ...headers
                }
            })
        }
        return client({
            ...params,
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        })

    } catch (e) {
        return Promise.reject('Unable to get JWT token')
    }
}